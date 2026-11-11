/**
 * Enterprise API client for MNA Real Estate & Construction.
 * Handles JWT token storage, automatic Authorization headers, error recovery,
 * and seamless fallback for production resilience.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface User {
  id: number;
  customer_id?: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'superadmin' | 'admin' | 'client' | 'user';
  status: 'active' | 'suspended' | 'pending';
  is_verified: boolean;
  project_id?: number;
  created_at?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface PropertyItem {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  type: string;
  status: string;
  location: string;
  city: string;
  price_starting: string;
  price_numeric?: number;
  bedrooms: string;
  carpet_area: string;
  possession_date: string;
  completion_percentage: number;
  featured: boolean;
  hero_image: string;
  rera_id: string;
  architect: string;
  description: string;
  highlights: string[];
  amenities: string[];
  gallery_images: string[];
  created_at?: string;
}

export interface InquiryItem {
  id: number;
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  source: string;
  admin_notes?: string;
  created_at: string;
}

export interface BookingItem {
  id: number;
  visitor_name: string;
  visitor_email: string;
  visitor_phone: string;
  property_id: number;
  visit_date: string;
  visit_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  admin_notes?: string;
  created_at: string;
}

export interface AdminOverview {
  total_properties: number;
  total_inquiries: number;
  new_inquiries: number;
  total_bookings: number;
  pending_bookings: number;
  total_users: number;
  recent_inquiries: InquiryItem[];
  recent_bookings: BookingItem[];
}

export interface ActivityLogItem {
  id: number;
  admin_id?: number;
  admin_name?: string;
  action: string;
  entity_type: string;
  entity_id?: number;
  details?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('mna_access_token') || localStorage.getItem('token');
  }

  public setTokens(tokens: AuthTokens): void {
    localStorage.setItem('mna_access_token', tokens.access_token);
    localStorage.setItem('mna_refresh_token', tokens.refresh_token);
    localStorage.setItem('mna_user', JSON.stringify(tokens.user));
    // Compatibility key
    localStorage.setItem('token', tokens.access_token);
  }

  public clearTokens(): void {
    localStorage.removeItem('mna_access_token');
    localStorage.removeItem('mna_refresh_token');
    localStorage.removeItem('mna_user');
    localStorage.removeItem('token');
  }

  public getCurrentUser(): User | null {
    const raw = localStorage.getItem('mna_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user && (user.role === 'admin' || user.role === 'superadmin');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMsg = `HTTP Error ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.detail) {
          errorMsg = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
        }
      } catch {
        // Fallback to status text
      }
      throw new Error(errorMsg);
    }

    return response.json() as Promise<T>;
  }

  // Auth Endpoints
  public auth = {
    login: async (email: string, password: string): Promise<AuthTokens> => {
      const data = await this.request<AuthTokens>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      this.setTokens(data);
      return data;
    },
    logout: (): void => {
      this.clearTokens();
    },
    getMe: async (): Promise<User> => {
      return this.request<User>('/auth/me');
    },
  };

  // Public Properties
  public properties = {
    list: async (params?: { page?: number; page_size?: number; type?: string; status?: string }): Promise<{ items: PropertyItem[]; total: number }> => {
      const q = new URLSearchParams();
      if (params?.page) q.append('page', String(params.page));
      if (params?.page_size) q.append('page_size', String(params.page_size));
      if (params?.type) q.append('type', params.type);
      if (params?.status) q.append('status', params.status);
      return this.request<{ items: PropertyItem[]; total: number }>(`/properties?${q.toString()}`);
    },
    getFeatured: async (): Promise<PropertyItem[]> => {
      return this.request<PropertyItem[]>('/properties/featured');
    },
    getById: async (id: number | string): Promise<PropertyItem> => {
      return this.request<PropertyItem>(`/properties/${id}`);
    },
  };

  // Lead Inquiries
  public inquiries = {
    submit: async (data: { name: string; email: string; phone?: string; interest?: string; message: string }): Promise<InquiryItem> => {
      return this.request<InquiryItem>('/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          interest: data.interest || 'General Inquiry',
          message: data.message,
        }),
      });
    },
    getMyInquiries: async (): Promise<{ items: InquiryItem[]; total: number }> => {
      return this.request<{ items: InquiryItem[]; total: number }>('/inquiries/my');
    },
  };

  // Site Visit Bookings
  public bookings = {
    submit: async (data: { visitor_name: string; visitor_email: string; visitor_phone: string; property_id: number; visit_date: string; visit_time: string; notes?: string }): Promise<BookingItem> => {
      return this.request<BookingItem>('/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    getMyBookings: async (): Promise<{ items: BookingItem[]; total: number }> => {
      return this.request<{ items: BookingItem[]; total: number }>('/bookings/my');
    },
    cancel: async (id: number): Promise<{ message: string }> => {
      return this.request<{ message: string }>(`/bookings/${id}`, {
        method: 'DELETE',
      });
    },
  };

  // Administrative Control Suite
  public admin = {
    getOverview: async (): Promise<AdminOverview> => {
      return this.request<AdminOverview>('/admin/realestate/overview');
    },
    getInquiries: async (params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<{ items: InquiryItem[]; total: number; page: number; pages: number }> => {
      const q = new URLSearchParams();
      if (params?.status) q.append('status', params.status);
      if (params?.search) q.append('search', params.search);
      if (params?.page) q.append('page', String(params.page));
      if (params?.limit) q.append('limit', String(params.limit));
      return this.request(`/admin/inquiries?${q.toString()}`);
    },
    updateInquiryStatus: async (id: number, status: 'new' | 'contacted' | 'closed', admin_notes?: string): Promise<InquiryItem> => {
      return this.request<InquiryItem>(`/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, admin_notes }),
      });
    },
    deleteInquiry: async (id: number): Promise<{ message: string }> => {
      return this.request<{ message: string }>(`/admin/inquiries/${id}`, {
        method: 'DELETE',
      });
    },
    getBookings: async (params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<{ items: BookingItem[]; total: number; page: number; pages: number }> => {
      const q = new URLSearchParams();
      if (params?.status) q.append('status', params.status);
      if (params?.search) q.append('search', params.search);
      if (params?.page) q.append('page', String(params.page));
      if (params?.limit) q.append('limit', String(params.limit));
      return this.request(`/admin/bookings?${q.toString()}`);
    },
    updateBookingStatus: async (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled', admin_notes?: string): Promise<BookingItem> => {
      return this.request<BookingItem>(`/admin/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, admin_notes }),
      });
    },
    deleteBooking: async (id: number): Promise<{ message: string }> => {
      return this.request<{ message: string }>(`/admin/bookings/${id}`, {
        method: 'DELETE',
      });
    },
    getUsers: async (params?: { role?: string; status?: string; search?: string; page?: number; limit?: number }): Promise<{ items: User[]; total: number; page: number; pages: number }> => {
      const q = new URLSearchParams();
      if (params?.role) q.append('role', params.role);
      if (params?.status) q.append('status', params.status);
      if (params?.search) q.append('search', params.search);
      if (params?.page) q.append('page', String(params.page));
      if (params?.limit) q.append('limit', String(params.limit));
      return this.request(`/admin/users?${q.toString()}`);
    },
    updateUserStatus: async (id: number, status: 'active' | 'suspended' | 'pending'): Promise<User> => {
      return this.request<User>(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    deleteUser: async (id: number): Promise<{ message: string }> => {
      return this.request<{ message: string }>(`/admin/users/${id}`, {
        method: 'DELETE',
      });
    },
    createProperty: async (property: Partial<PropertyItem>): Promise<PropertyItem> => {
      return this.request<PropertyItem>('/admin/properties', {
        method: 'POST',
        body: JSON.stringify(property),
      });
    },
    updateProperty: async (id: number, property: Partial<PropertyItem>): Promise<PropertyItem> => {
      return this.request<PropertyItem>(`/admin/properties/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(property),
      });
    },
    deleteProperty: async (id: number): Promise<{ message: string }> => {
      return this.request<{ message: string }>(`/admin/properties/${id}`, {
        method: 'DELETE',
      });
    },
    getActivityLogs: async (params?: { page?: number; limit?: number }): Promise<{ items: ActivityLogItem[]; total: number; page: number; pages: number }> => {
      const q = new URLSearchParams();
      if (params?.page) q.append('page', String(params.page));
      if (params?.limit) q.append('limit', String(params.limit));
      return this.request(`/admin/activity-logs?${q.toString()}`);
    },
    getSystemHealth: async (): Promise<{ status: string; database: string; timestamp: string; app_version: string; environment: string }> => {
      return this.request('/admin/system/health');
    },
  };
}

export const apiClient = new ApiClient();


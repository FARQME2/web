export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'suspended';
  profilePictureUrl?: string;
  jellyfinUserId?: string;
  createdAt: string;
}

export interface Session {
  token: string;
  user: User;
  expiresAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

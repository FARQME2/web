import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@pixelhaven.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@pixelhaven.com',
      username: 'PixelAdmin',
      role: 'admin',
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
  },
  'user@pixelhaven.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@pixelhaven.com',
      username: 'TestUser',
      role: 'user',
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('pixelhaven_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('pixelhaven_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const account = MOCK_USERS[email.toLowerCase()];

    if (!account || account.password !== password) {
      throw new Error('Invalid email or password');
    }

    if (account.user.status !== 'approved') {
      throw new Error('Your account is pending approval');
    }

    setUser(account.user);
    localStorage.setItem('pixelhaven_user', JSON.stringify(account.user));
  };

  const register = async (email: string, username: string, password: string) => {
    if (MOCK_USERS[email.toLowerCase()]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      role: 'user',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    MOCK_USERS[email.toLowerCase()] = { password, user: newUser };

    throw new Error('Registration successful! Your account is pending admin approval.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pixelhaven_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('Not authenticated');

    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('pixelhaven_user', JSON.stringify(updated));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

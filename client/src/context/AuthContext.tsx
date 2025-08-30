import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { UserProfile } from '../types/auth.types';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (firstName: string, lastName: string, email: string, password: string, phone?: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    // Check auth status on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsLoading(true);
            try {
                if (localStorage.getItem('token')) {
                    const userData = await authService.getUserProfile();
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Token invalid or expired
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authService.login({ email, password });
            localStorage.setItem('token', response.token);
            
            // Get user profile
            const userData = await authService.getUserProfile();
            setUser(userData);
            setIsAuthenticated(true);
            
            toast.success(response.message || 'Welcome back!');
            navigate('/');  
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (firstName: string, lastName: string, email: string, password: string, phone?: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authService.register({ firstName, lastName, email, password, phone });
            localStorage.setItem('token', response.token);
            
            // Get user profile
            const userData = await authService.getUserProfile();
            setUser(userData);
            setIsAuthenticated(true);
            
            toast.success(response.message || 'Account created successfully!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Logged out successfully!');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            signup,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );

};
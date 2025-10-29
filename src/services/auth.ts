import { User } from '@/types';

export type OAuthProvider = 'google' | 'github' | 'facebook';

class AuthService {
  async loginWithOAuth(provider: OAuthProvider): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const user: User = {
            id: 1,
            name: 'Nikolay Viktorovich',
            email: 'nikolas_middle@mail.ru',
            avatar: 'https://i.pravatar.cc/150?img=1',
            provider
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } catch (error) {
          reject(new Error('Ошибка авторизации'));
        }
      }, 1500);
    });
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  checkAuth(): User | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
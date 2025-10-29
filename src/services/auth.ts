import { OAUTH_CONFIG, type OAuthProvider } from '@/config';
import type { User } from '@/types';

const generateState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const saveOAuthState = (state: string, provider: OAuthProvider): void => {
  localStorage.setItem('oauth_state', state);
  localStorage.setItem('oauth_provider', provider);
};

const validateOAuthState = (state: string): boolean => {
  const savedState = localStorage.getItem('oauth_state');
  return savedState === state;
};

const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

class AuthService {
  async loginWithOAuth(provider: OAuthProvider): Promise<void> {
    const config = OAUTH_CONFIG[provider];
    
    if (!config.clientId || config.clientId.includes('your-')) {
      throw new Error(`OAuth provider ${provider} not configured. Please update OAuth configuration in src/config/index.ts`);
    }

    const state = generateState();
    saveOAuthState(state, provider);

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope,
      state: state,
      access_type: 'offline',
      prompt: 'consent'
    });

    const authUrl = `${config.authUrl}?${params.toString()}`;
    window.location.href = authUrl;
  }

  async handleOAuthCallback(): Promise<User> {
    const urlParams = getUrlParams();
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }

    if (!code || !state) {
      throw new Error('Missing OAuth code or state');
    }

    if (!validateOAuthState(state)) {
      throw new Error('Invalid OAuth state');
    }

    const provider = localStorage.getItem('oauth_provider') as OAuthProvider;
    
    if (!provider || !OAUTH_CONFIG[provider]) {
      throw new Error('Invalid OAuth provider');
    }

    try {
      let user: User;

      if (provider === 'google') {
        user = await this.handleGoogleCallback(code);
      } else if (provider === 'github') {
        user = await this.handleGitHubCallback(code);
      } else {
        throw new Error(`Unsupported OAuth provider: ${provider}`);
      }

      this.saveUser(user);
      this.clearOAuthState();
      
      return user;

    } catch (error) {
      this.clearOAuthState();
      throw error;
    }
  }

  private async handleGoogleCallback(code: string): Promise<User> {
    const config = OAUTH_CONFIG.google;
    const clientSecret = config.clientSecret;
    
    if (!clientSecret || clientSecret.includes('your-')) {
      throw new Error('Google OAuth client secret not configured');
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(`Google token exchange failed: ${errorData}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get Google user info');
    }

    const userInfo = await userInfoResponse.json();
    
    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.picture,
      provider: 'google'
    };
  }

private async handleGitHubCallback(code: string): Promise<User> {
  const config = OAUTH_CONFIG.github;
  const clientSecret = config.clientSecret;
  
  if (!clientSecret || clientSecret.includes('your-')) {
    throw new Error('GitHub OAuth client secret not configured');
  }

  console.log('🔧 GitHub OAuth Debug:');
  console.log('Client ID:', config.clientId);
  console.log('Redirect URI:', config.redirectUri);
  console.log('Code:', code.substring(0, 10) + '...');

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: config.redirectUri,
      })
    });

    console.log('GitHub Response Status:', tokenResponse.status);

    const responseText = await tokenResponse.text();
    console.log('GitHub Response Body:', responseText);

    if (!tokenResponse.ok) {
      throw new Error(`GitHub API responded with status: ${tokenResponse.status}. Response: ${responseText}`);
    }

    let tokenData;
    try {
      tokenData = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Failed to parse GitHub response: ${responseText}`);
    }

    if (tokenData.error) {
      throw new Error(`GitHub OAuth error: ${tokenData.error} - ${tokenData.error_description || 'No description'}`);
    }

    if (!tokenData.access_token) {
      throw new Error('GitHub did not return access token');
    }

    const accessToken = tokenData.access_token;
    console.log('Successfully obtained access token');

    const userInfoResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get GitHub user info');
    }

    const userInfo = await userInfoResponse.json();
    console.log('GitHub User Info:', userInfo);

    let email = userInfo.email;
    if (!email) {
      console.log('🔧 No public email, fetching emails...');
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        console.log('🔧 User emails:', emails);
        const primaryEmail = emails.find((e: any) => e.primary && e.verified);
        email = primaryEmail ? primaryEmail.email : userInfo.login;
      }
    }

    return {
      id: userInfo.id,
      name: userInfo.name || userInfo.login,
      email: email || `${userInfo.login}@users.noreply.github.com`,
      avatar: userInfo.avatar_url,
      provider: 'github'
    };

  } catch (error) {
    console.error('GitHub OAuth Full Error:', error);
    throw error;
  }
}

  private saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearOAuthState(): void {
    localStorage.removeItem('oauth_state');
    localStorage.removeItem('oauth_provider');
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

  isOAuthConfigured(provider: OAuthProvider): boolean {
    const config = OAUTH_CONFIG[provider];
    return !!config.clientId && !config.clientId.includes('your-');
  }
}

export const authService = new AuthService();
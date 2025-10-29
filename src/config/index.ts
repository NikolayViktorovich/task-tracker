export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
}

export const OAUTH_CONFIG = {
  google: {
    clientId: '26431774485-2tre2e022i8a42kk7jcmmn00c185ucm4.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: `${window.location.origin}/#/oauth-callback`,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
  },
  github: {
    clientId: 'Ov23liDOPvqeHjOcIQsO',
    clientSecret: 'ae707994d3ccbbd83e16b3a8a81e92f57f4e6812',
    redirectUri: `${window.location.origin}/#/oauth-callback`,
    scope: 'user:email',
    authUrl: 'https://github.com/login/oauth/authorize'
  }
} as const;

export type OAuthProvider = keyof typeof OAUTH_CONFIG;
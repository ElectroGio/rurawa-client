export type SignInCredential = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  roles: string[];
  isPhoneVerified: boolean;
};

export type SignUpResponse = SignInResponse;

export type SignUpCredential = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  countryCode: string;
  phoneNumber: string;
  companyId: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  email: string;
  token: string;
  newPassword: string;
};

export type VerifyPhone = {
  userId: string;
  code: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthRequestStatus = "success" | "failed" | "";

export type AuthResult = Promise<{
  status: AuthRequestStatus;
  message: string;
}>;

export type User = {
  userId?: string | null;
  avatar?: string | null;
  userName?: string | null;
  email?: string | null;
  authority?: string[];
  isPhoneVerified?: boolean;
};

export type Token = {
  accessToken: string;
  refreshToken?: string;
};

export type OauthSignInCallbackPayload = {
  onSignIn: (tokens: Token, user?: User) => void;
  redirect: () => void;
};

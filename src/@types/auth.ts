export type SignInCredential = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: {
    userId: string;
    userName: string;
    authority: string[];
    avatar: string;
    email: string;
  };
};

export type SignUpResponse = SignInResponse;

export type SignUpCredential = {
  company: {
    name: string;
    taxId: string;
    businessCategory: string;
    businessSector: string;
    employeeSize: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    documentNumber: string;
    email: string;
    phone: string;
    password: string;
  };
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
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
};

export type Token = {
  accessToken: string;
  refereshToken?: string;
};

export type OauthSignInCallbackPayload = {
  onSignIn: (tokens: Token, user?: User) => void;
  redirect: () => void;
};

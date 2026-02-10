export class CheckEmailRequest {
  email: string = '';
}

export type AuthFlow = 'LOGIN' | 'REGISTER';

export interface CheckEmailResponse {
  exists: boolean;
  flow: AuthFlow;
}

export class RegisterRequest {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
}

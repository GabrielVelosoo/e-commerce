import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CheckEmailResponse, RegisterRequest} from '../models/auth';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseUrl = environment.apiGatewayUrl + '/auth';

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<CheckEmailResponse> {
    return this.http.post<CheckEmailResponse>(`${this.baseUrl}/check-email`, { email });
  }

  register(data: RegisterRequest): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.baseUrl}/register/send-code`, data);
  }
}

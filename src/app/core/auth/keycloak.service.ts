import { Injectable } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakServiceWrapper {

  private kc!: Keycloak;
  // @ts-ignore
  init(): Promise<void> { /* ... */ }

  register(redirectUri?: string) {
    return this.kc.register({redirectUri});
  }

  getUserInfo(): Promise<KeycloakProfile> {
    return this.kc.loadUserProfile();
  }

  getToken(): Promise<string> {
    return Promise.resolve(this.kc.token ?? '');
  }
}

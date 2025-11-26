import { Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseAppService {
  private readonly app: FirebaseApp;
  private readonly auth: Auth;

  constructor() {
    const existingApps = getApps();
    this.app = existingApps.length ? existingApps[0] : initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
  }

  get firebaseApp(): FirebaseApp {
    return this.app;
  }

  get authInstance(): Auth {
    return this.auth;
  }
}

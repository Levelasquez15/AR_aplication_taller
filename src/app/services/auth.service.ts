import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { FirebaseAppService } from './firebase-app.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth: Auth;
  readonly currentUser$: Observable<User | null>;

  constructor(private readonly firebaseApp: FirebaseAppService) {
    this.auth = this.firebaseApp.authInstance;
    this.currentUser$ = new Observable<User | null>((subscriber) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => subscriber.next(user ?? null),
        (error) => subscriber.error(error),
        () => subscriber.complete()
      );

      return () => unsubscribe();
    });
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}

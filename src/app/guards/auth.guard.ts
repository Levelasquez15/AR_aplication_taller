import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.ensureAuthenticated(state.url);
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    const attemptedUrl = '/' + segments.map((segment) => segment.path).join('/');
    return this.ensureAuthenticated(attemptedUrl);
  }

  private ensureAuthenticated(redirectUrl: string): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login'], { queryParams: { redirectTo: redirectUrl } });
      })
    );
  }
}

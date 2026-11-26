import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

const exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

function toExclude(url: string): boolean {
  return exclude_array.some((excluded) => url.includes(excluded));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!toExclude(req.url)) {
    const jwt = authService.getToken();
    if (jwt) {
      const reqWithToken = req.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` },
      });
      return next(reqWithToken);
    }
  }

  return next(req);
};

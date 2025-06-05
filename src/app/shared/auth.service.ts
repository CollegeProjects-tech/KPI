import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isBrowser: boolean;

  constructor(private router: Router, private api: ApiService,@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  generateUUIDToken(): string {
    return uuidv4();
  }


  setToken(token: string, data: any) {
    if (this.isBrowser) {
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(data));
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}`;
    }
  }

  getToken() {
  if (this.isBrowser) {
    return localStorage.getItem("token");
  }
  return null;
}

  getTokenFromCookies(): string | null {
  if (!this.isBrowser) return null;

  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'authToken') {
      return value;
    }
  }
  return null;
}

  isTokenValid(): boolean {
    const localStorageToken = this.getToken();
    const cookieToken = this.getTokenFromCookies();

    return localStorageToken !== null && cookieToken !== null && localStorageToken === cookieToken;
  }

  isLoggedIn(): boolean {
    if (this.isTokenValid()) { // Check if running in the browser
      return true; // Now safe to access localStorage
    }
    return false; // Return false if running on the server
  }
  logout() {
  if (this.isBrowser) {
    localStorage.clear();
  }
  this.router.navigate(['/']);
}

  login(data: any): Observable<any> {
    return this.api.get('Login/Login/' + data.userid + '/' + data.password).pipe(
      map((res: any) => {
        if (res != "") {
          this.setToken(this.generateUUIDToken(), res);
          return { status: "success", data: res };
        } else {
          return { status: "failed" };
        }
      })
    );
  }
}

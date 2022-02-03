import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private cookieService: CookieService,
  ) { }

  canActivate(): boolean {
    if (this.cookieService.get('DSaAs13S')) {
      window.location.href = environment.redirect_dashboard
      return false
    } else {
      return true
    }
  }
}

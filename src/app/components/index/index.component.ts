import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from 'src/app/services/angular_services/global.service';
import { UserService } from 'src/app/services/angular_services/user.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  faGoogle = faGoogle

  formGroup!: FormGroup
  email = new FormControl()
  password = new FormControl()
  passwordHide = true

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _socialAuthService: SocialAuthService,
  ) { 
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formGroup = this._formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  auth() {
    this._userService.checkPassword('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email, 'email', this.formGroup.value.password, 'password_hash').then(result => {
      if (result) {
        this._userService.checkUser('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email, 'email').then(user => {
          this._cookieService.set('DSaAs13S', CryptoJS.AES.encrypt(`${user[0].id}`, 'DSaAs13S').toString(), 0.08, '/', '', true, 'Strict')
          window.location.href = environment.redirect_dashboard
        })
      }
    })
  }

  loginWithGoogle() {
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        window.location.href = environment.redirect_dashboard
      });
  }

}

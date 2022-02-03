import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from 'src/app/services/angular_services/global.service';
import { UserService } from 'src/app/services/angular_services/user.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  formGroup!: FormGroup
  email = new FormControl()
  password = new FormControl()
  passwordHide = true

  constructor(
    private cookieService: CookieService,
    private globalService: GlobalService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
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
    this.userService.checkPassword('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email, 'email', this.formGroup.value.password, 'password_hash').then(result => {
      if (result) {
        this.userService.checkUser('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email, 'email').then(user => {
          this.cookieService.set('DSaAs13S', CryptoJS.AES.encrypt(`${user[0].id}`, 'DSaAs13S').toString(), 0.08, '/', '', true, 'Strict')
          window.location.href = environment.redirect_dashboard
        })
      }
    })
  }

}

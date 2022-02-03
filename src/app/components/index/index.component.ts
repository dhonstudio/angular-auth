import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from 'src/app/services/angular_services/global.service';
import { UserService } from 'src/app/services/angular_services/user.service';

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
    console.log(this.formGroup.value)
    this.userService.checkPassword('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email, this.formGroup.value.password, 'password_hash').then(result => {
      if (result) {
        this.userService.checkUser('project', 'user_ci', {username: 'admin', password: 'admin'}, this.formGroup.value.email).then(user => {
          this.cookieService.set('DSaAs13S', `${user[0].id}`, 0.08, '/', '', true, 'Strict')
          window.location.href = 'http://localhost/ci_dhonstudio/angular/kesku'
        })
      }
    })
  }

}

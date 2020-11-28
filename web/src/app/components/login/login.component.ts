import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public href = window.location.href;

  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}

  login(): void {
    this.loginService.login();
  }
}

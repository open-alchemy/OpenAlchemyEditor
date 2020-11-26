import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-sign-in-complete',
  templateUrl: './sign-in-complete.component.html',
  styleUrls: ['./sign-in-complete.component.css'],
})
export class SignInCompleteComponent implements OnInit {
  constructor(private _: LoginService) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/AuthService';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { RequestMessage } from 'src/app/services/model/RequestMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup ;
  private formSubmitAttempt: boolean | undefined;
  requestMessage:RequestMessage= new RequestMessage();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private loginService:LoginService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.form.valid) {
        const user = {
          email: this.form.value.email,
          password: this.form.value.password,
        };
        this.requestMessage.RequestObj=user;
        this.loginService.login(user).subscribe((response:any) => {
        this.loginService.notify(true);
        console.log('user',response);
        localStorage.setItem('User', JSON.stringify(response));
        localStorage.setItem('Token', response.token);
        let user:any = localStorage.getItem('User');
        const users = JSON.parse(user);
        if (users){
          this.authService.loginAuth(true);
        }
        });
    }
}
}

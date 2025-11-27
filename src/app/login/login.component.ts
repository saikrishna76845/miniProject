import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm:FormGroup= new FormGroup({
    emailOrMobile: new FormControl(),
    password: new FormControl()
  })

  showPassword:boolean = false;

constructor(private router: Router, private service:LoginService){}

visibility(){
  this.showPassword = !this.showPassword
}

  login(){
    console.log(this.loginForm.value)

    this.service.login(this.loginForm.value).subscribe(
      (data:any)=>{
        alert('login success');
        localStorage.setItem('token:',data.accessToken)
        this.router.navigate(['dashboard'])
      }
    )

  
    
  }
}

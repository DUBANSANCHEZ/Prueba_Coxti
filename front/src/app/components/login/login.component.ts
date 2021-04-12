import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import  decode  from 'jwt-decode';

declare var M: any;
let Cargando = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  tokenPayload;
  constructor( private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }) 
  }

  ngOnInit(): void {
    this.loginService.logout()
    .subscribe((data) => {
      localStorage.setItem('usuario', data['token']);
      this.router.navigate(['login']);
    }); 
  }

  login(form){
    this.loginService.authentication(form.value)
      .subscribe((data) => {
        if (data['fail'] == 1) {
          Cargando = true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                   <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                   <p>Correo y/o contraseña incorrecta</p>
                   <hr>
              </div>`});
        }
        else if (data['fail'] == 2) {   
          Cargando = true;     
          M.toast({          
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                   <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                   <p>Correo y/o contraseña incorrecta</p>
                   <hr>
              </div>`});
        }else {
          localStorage.setItem('usuario', data['token']);      
          this.tokenPayload = decode(data['token']); 
          this.router.navigate(['register']);
          this.loginService.valueSesion = true;
        } 
      });
    }
}

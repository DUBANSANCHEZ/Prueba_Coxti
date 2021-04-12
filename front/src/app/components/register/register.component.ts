import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { RangeofValuesService } from '../../services/rangeof-values.service';
import { Personas } from '../../models/persona';
import decode from 'jwt-decode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var M: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {  

  login = false;
  PERSONAS: Personas = {
    ID_PERSONA : 0,
    NOMBRE : '',
    APELLIDO : '',
    CEDULA : 0,
    CELULAR : 0,
    CORREO : '',
    RECOVERY : '',
    PASSWORD : '',
    DEPARTAMENTO : '',
    CIUDAD : '',
    BARRIO : '',
    DIRECCION : '',
    SALARIO : 0,
    OTROS_INGRESOS : '',
    GASTOS_MENSUALES : 0,
    GASTOS_FINANCIEROS : 0,
  }
  registerForm: FormGroup;  
  constructor(public registerService: RegisterService, public loginService: LoginService, public rangeofValuesService: RangeofValuesService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      Recovery: [''],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],    
      Departamento : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],      
      Ciudad : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])], 
      Barrio : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Direccion : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ 0-9]*$/)])],
      Salario : ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      otros_Ingresos : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Gastos_mensuales : ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Gastos_Financieros : ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
    })
  };

  ngOnInit(): void {      
    if(localStorage.getItem('usuario') != 'null')
    {
      this.login = true;
      const token = localStorage.getItem('usuario');
      const tokenPayload: any = decode(token); 
      this.registerService.getRegisterByIdPersona(tokenPayload.id_persona)
      .subscribe(res =>{
        this.PERSONAS = res[0];
        this.registerForm.patchValue({"Id_persona": this.PERSONAS.ID_PERSONA});
        this.registerForm.patchValue({"Nombre": this.PERSONAS.NOMBRE});
        this.registerForm.patchValue({"Apellido": this.PERSONAS.APELLIDO});
        this.registerForm.patchValue({"Cedula": this.PERSONAS.CEDULA});
        this.registerForm.patchValue({"Celular": this.PERSONAS.CELULAR});
        this.registerForm.patchValue({"Correo": this.PERSONAS.CORREO});
        this.registerForm.patchValue({"Recovery": this.PERSONAS.RECOVERY});
        this.registerForm.patchValue({"Password": this.PERSONAS.PASSWORD});
        this.registerForm.patchValue({"Departamento": this.PERSONAS.DEPARTAMENTO});
        this.registerForm.patchValue({"Ciudad": this.PERSONAS.CIUDAD});
        this.registerForm.patchValue({"Barrio": this.PERSONAS.BARRIO});
        this.registerForm.patchValue({"Direccion": this.PERSONAS.DIRECCION});
        this.registerForm.patchValue({"Salario": this.PERSONAS.SALARIO});
        this.registerForm.patchValue({"otros_Ingresos": this.PERSONAS.OTROS_INGRESOS});
        this.registerForm.patchValue({"Gastos_mensuales": this.PERSONAS.GASTOS_MENSUALES});
        this.registerForm.patchValue({"Gastos_Financieros": this.PERSONAS.GASTOS_FINANCIEROS});
      })
    }    
  }

  addRegister(form){
    this.registerService.usuarioDuplicado(form.value)
    .subscribe((data) =>{
      if(data['fail'] === 1 ){
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">REGISTRO FALLIDO</h4>
                    <p>hay un usuario registrado con ese numero de cedula</p>
                    <hr>
                </div>`});
      }else if (data['fail'] === 2 ) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">REGISTRO FALLIDO</h4>
                    <p>hay un usuario registrado con ese numero de celular</p>
                    <hr>
                </div>`});
      }else if (data['fail'] === 3 ) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">REGISTRO FALLIDO</h4>
                    <p>hay un usuario registrado con ese correo electronico</p>
                    <hr>
                </div>`});
      }else if (data['fail'] === 0 ){
        this.registerService.createRegisterPersona(form.value)
        .subscribe((data) =>{
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                      <p>El usuario se ha registrado correctamente</p>
                      <hr>
                  </div>`});
            this.router.navigate(['login'])
        }) 
      }
    })
  } 
  consultaSalario(){
    this.rangeofValuesService.getSalario(this.PERSONAS.SALARIO)
    .subscribe (res => {
      console.log(res);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd  } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  isRegister: boolean;
  isLogout = false;
  constructor(private loginService: LoginService, private router: Router) { 
    this.routeEvent(this.router);
  }
  routeEvent(router: Router){
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd){
        this.isLogin = e.url === '/login';
        this.isRegister = e.url === '/register';
      }
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem('usuario') != 'null')  this.isLogout = true;
  }

}

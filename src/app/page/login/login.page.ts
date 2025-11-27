import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      console.log('Login with:', this.email, this.password);
      // TODO: Agregar lógica de autenticación
      this.router.navigate(['/home']);
    } else {
      console.log('Por favor completa todos los campos');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

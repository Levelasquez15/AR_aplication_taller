import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.name && this.email && this.password && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        console.log('Las contraseñas no coinciden');
        return;
      }
      console.log('Register with:', this.name, this.email);
      // TODO: Agregar lógica de registro
      this.router.navigate(['/login']);
    } else {
      console.log('Por favor completa todos los campos');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

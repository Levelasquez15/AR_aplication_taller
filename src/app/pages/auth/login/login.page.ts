import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute
  ) {}

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isSubmitting = false;
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/home';
        this.navCtrl.navigateRoot(redirectTo);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = this.resolveErrorMessage(error?.code ?? 'auth/unknown');
      }
    });
  }

  goToRegister(): void {
    this.navCtrl.navigateForward('/auth/register');
  }

  private resolveErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/user-disabled':
        return 'Este usuario fue deshabilitado.';
      case 'auth/user-not-found':
        return 'No encontramos una cuenta con ese correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      default:
        return 'No se pudo iniciar sesión, intenta de nuevo.';
    }
  }
}

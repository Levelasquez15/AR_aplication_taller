import { Component } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { updateProfile } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  private readonly passwordsMatchValidator: ValidatorFn = (group) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  readonly form = this.fb.nonNullable.group(
    {
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: this.passwordsMatchValidator }
  );

  errorMessage = '';
  isSubmitting = false;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly navCtrl: NavController) {}

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { displayName, email, password } = this.form.getRawValue();
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register(email, password).subscribe({
      next: async (credential) => {
        try {
          if (displayName) {
            await updateProfile(credential.user, { displayName });
          }
        } catch (profileError) {
          console.warn('No se pudo actualizar el perfil', profileError);
        }

        this.isSubmitting = false;
        this.navCtrl.navigateRoot('/home');
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = this.resolveErrorMessage(error?.code ?? 'auth/unknown');
      }
    });
  }

  goToLogin(): void {
    this.navCtrl.navigateBack('/auth/login');
  }

  passwordMismatch(): boolean {
    return !!this.form.errors?.['passwordMismatch'] && this.form.touched;
  }

  private resolveErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este correo.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'No se pudo registrar la cuenta, intenta de nuevo.';
    }
  }
}

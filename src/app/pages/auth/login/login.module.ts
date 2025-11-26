import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../shared/components/components.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ComponentsModule, LoginPageRoutingModule],
  declarations: [LoginPage]
})
export class LoginPageModule {}

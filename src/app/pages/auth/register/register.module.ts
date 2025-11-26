import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../shared/components/components.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ComponentsModule, RegisterPageRoutingModule],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}

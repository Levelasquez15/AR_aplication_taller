import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ArViewPageRoutingModule } from './ar-view-routing.module';
import { ArViewPage } from './ar-view.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, ArViewPageRoutingModule],
  declarations: [ArViewPage]
})
export class ArViewPageModule {}

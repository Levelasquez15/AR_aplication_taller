import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ArViewerComponent } from './ar-viewer/ar-viewer.component';

@NgModule({
  declarations: [ArViewerComponent],
  imports: [CommonModule, IonicModule],
  exports: [ArViewerComponent]
})
export class ComponentsModule {}

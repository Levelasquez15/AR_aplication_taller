import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ArTarget } from '../models/ar-target';
import { ArTargetService } from '../services/ar-target.service';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.page.html',
  styleUrls: ['./ar-view.page.scss'],
  standalone: false
})
export class ArViewPage implements OnInit, OnDestroy {
  selectedTarget: ArTarget | null = null;
  private subscription?: Subscription;

  constructor(private readonly arTargetService: ArTargetService, private readonly navCtrl: NavController) {}

  ngOnInit(): void {
    this.subscription = this.arTargetService.selectedTarget$.subscribe((target) => {
      this.selectedTarget = target;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goBack(): void {
    this.arTargetService.clearSelection();
    this.navCtrl.navigateBack('/home');
  }

  openPicker(): void {
    this.arTargetService.clearSelection();
    this.navCtrl.navigateRoot('/home');
  }
}

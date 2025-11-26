import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ArTarget } from '../models/ar-target';
import { ArTargetService } from '../services/ar-target.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  targets: ArTarget[] = [];

  constructor(private readonly arTargetService: ArTargetService, private readonly navCtrl: NavController) {}

  ngOnInit(): void {
    this.targets = this.arTargetService.getTargets();
  }

  openTarget(target: ArTarget): void {
    this.arTargetService.selectTarget(target.id);
    this.navCtrl.navigateForward('/ar-view');
  }
}

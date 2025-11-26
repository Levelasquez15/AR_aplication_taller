import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ArEntityConfig, ArTarget } from '../../../models/ar-target';

@Component({
  selector: 'app-ar-viewer',
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss'],
  standalone: false
})
export class ArViewerComponent implements AfterViewInit, OnChanges {
  @Input() target: ArTarget | null = null;
  @ViewChild('sceneHost', { static: true }) sceneHost?: ElementRef<HTMLDivElement>;

  private isViewReady = false;

  ngAfterViewInit(): void {
    this.isViewReady = true;
    this.renderScene();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['target']) {
      this.renderScene();
    }
  }

  private renderScene(): void {
    const sceneContainer = this.sceneHost?.nativeElement;
    if (!sceneContainer || !this.isViewReady) {
      return;
    }

    sceneContainer.innerHTML = '';

    if (!this.target) {
      return;
    }

    if (typeof (window as unknown as { AFRAME?: unknown }).AFRAME === 'undefined') {
      const warning = document.createElement('p');
      warning.textContent = 'No se pudo cargar A-Frame. Verifica la conexión.';
      sceneContainer.appendChild(warning);
      return;
    }

    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'logarithmicDepthBuffer: true; antialias: true;');
    scene.setAttribute('arjs', 'trackingMethod: best; sourceType: webcam; debugUIEnabled: false;');

    const marker = this.buildMarker(this.target);
    scene.appendChild(marker);

    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    sceneContainer.appendChild(scene);
  }

  private buildMarker(target: ArTarget): HTMLElement {
    const marker = target.type === 'nft' ? document.createElement('a-nft') : document.createElement('a-marker');

    if (target.type === 'nft') {
      marker.setAttribute('type', 'nft');
      if (target.nftUrl) {
        marker.setAttribute('url', target.nftUrl);
      }
      if (target.smooth) {
        marker.setAttribute('smooth', 'true');
        marker.setAttribute('smoothCount', '10');
        marker.setAttribute('smoothTolerance', '0.01');
        marker.setAttribute('smoothThreshold', '5');
      }
    } else {
      if (target.markerPreset) {
        marker.setAttribute('preset', target.markerPreset);
      } else if (target.patternUrl) {
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', target.patternUrl);
      }
    }

    const entity = this.buildEntity(target.entity);
    marker.appendChild(entity);

    return marker;
  }

  private buildEntity(config: ArEntityConfig): HTMLElement {
    switch (config.kind) {
      case 'gltf': {
        const entity = document.createElement('a-entity');
        entity.setAttribute('gltf-model', config.src);
        this.applyTransform(entity, config);
        return entity;
      }
      case 'image': {
        const image = document.createElement('a-image');
        image.setAttribute('src', config.src);
        this.applyTransform(image, config);
        return image;
      }
      case 'text': {
        const text = document.createElement('a-text');
        text.setAttribute('value', config.textValue ?? 'Texto');
        if (config.color) {
          text.setAttribute('color', config.color);
        }
        this.applyTransform(text, config);
        return text;
      }
      default: {
        const fallback = document.createElement('a-box');
        fallback.setAttribute('color', '#EF2D5E');
        this.applyTransform(fallback, config);
        return fallback;
      }
    }
  }

  private applyTransform(element: HTMLElement, config: ArEntityConfig): void {
    if (config.scale) {
      element.setAttribute('scale', config.scale);
    }
    if (config.position) {
      element.setAttribute('position', config.position);
    }
    if (config.rotation) {
      element.setAttribute('rotation', config.rotation);
    }
  }
}

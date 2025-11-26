import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArTarget } from '../models/ar-target';

@Injectable({ providedIn: 'root' })
export class ArTargetService {
  private readonly targets: ArTarget[] = [
    {
      id: 'hiro-trex',
      name: 'Trex (Marker Hiro)',
      description: 'Modelo 3D sobre el marcador Hiro clásico.',
      type: 'marker',
      markerPreset: 'hiro',
      entity: {
        kind: 'gltf',
        src: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
        scale: '0.05 0.05 0.05',
        position: '0 0 0'
      }
    },
    {
      id: 'kanji-banner',
      name: 'Banner (Marker Kanji)',
      description: 'Imagen plana renderizada sobre el marcador Kanji.',
      type: 'marker',
      markerPreset: 'kanji',
      entity: {
        kind: 'image',
        src: 'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
        rotation: '-90 0 0',
        scale: '1.5 1.5 1.5'
      }
    },
    {
      id: 'trex-nft',
      name: 'Trex (NFT)',
      description: 'Seguimiento por imagen NFT con el modelo del T-Rex.',
      type: 'nft',
      nftUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex',
      smooth: true,
      entity: {
        kind: 'gltf',
        src: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf',
        scale: '5 5 5',
        position: '50 150 0'
      }
    }
  ];

  private readonly selectedTargetSubject = new BehaviorSubject<ArTarget | null>(null);
  readonly selectedTarget$: Observable<ArTarget | null> = this.selectedTargetSubject.asObservable();

  getTargets(): ArTarget[] {
    return this.targets;
  }

  selectTarget(targetId: string): void {
    const nextTarget = this.targets.find((target) => target.id === targetId) ?? null;
    this.selectedTargetSubject.next(nextTarget);
  }

  clearSelection(): void {
    this.selectedTargetSubject.next(null);
  }
}

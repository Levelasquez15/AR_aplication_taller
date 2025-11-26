export type ArTargetType = 'marker' | 'nft';

export type ArEntityKind = 'gltf' | 'image' | 'text';

export interface ArEntityConfig {
  kind: ArEntityKind;
  src: string;
  scale?: string;
  position?: string;
  rotation?: string;
  textValue?: string;
  color?: string;
}

export interface ArTarget {
  id: string;
  name: string;
  description: string;
  type: ArTargetType;
  markerPreset?: string;
  patternUrl?: string;
  nftUrl?: string;
  smooth?: boolean;
  entity: ArEntityConfig;
}

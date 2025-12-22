export * from './icon-settings-control/icon-settings-control.component';
export * from './icon.component';

// Interface for icon configuration
export interface AvIconConfig {
  type: string | null;
  size: number;
  color: string;
  rotation: number;
  scale: number;
  opacity: number;
  flipX: boolean;
  flipY: boolean;
  padding: number;
  background: string;
  borderShow: boolean;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

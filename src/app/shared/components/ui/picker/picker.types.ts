/**
 * Color Picker Types
 */

export type PickerMode = 'custom-only' | 'picker-only' | 'custom-and-picker';

export interface CustomColor {
  name: string;
  value: string;
  category?: string;
}

export interface PickerConfig {
  mode: PickerMode;
  customColors?: CustomColor[];
  allowTransparent?: boolean;
  defaultColor?: string;
  showInput?: boolean;
  showAlpha?: boolean;
}

export const DEFAULT_CUSTOM_COLORS: CustomColor[] = [
  // Primary colors
  { name: 'Primary', value: '#1890ff', category: 'primary' },
  { name: 'Success', value: '#52c41a', category: 'primary' },
  { name: 'Warning', value: '#faad14', category: 'primary' },
  { name: 'Error', value: '#ff4d4f', category: 'primary' },
  { name: 'Info', value: '#1890ff', category: 'primary' },

  // Secondary colors
  { name: 'Purple', value: '#722ed1', category: 'secondary' },
  { name: 'Cyan', value: '#13c2c2', category: 'secondary' },
  { name: 'Orange', value: '#fa8c16', category: 'secondary' },
  { name: 'Pink', value: '#eb2f96', category: 'secondary' },
  { name: 'Lime', value: '#a0d911', category: 'secondary' },

  // Neutral colors
  { name: 'White', value: '#ffffff', category: 'neutral' },
  { name: 'Light Gray', value: '#f0f0f0', category: 'neutral' },
  { name: 'Gray', value: '#8c8c8c', category: 'neutral' },
  { name: 'Dark Gray', value: '#595959', category: 'neutral' },
  { name: 'Black', value: '#000000', category: 'neutral' },
];

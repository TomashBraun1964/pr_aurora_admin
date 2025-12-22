import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '@shared/components/ui/button/button.directive';
import { PickerComponent } from '@shared/components/ui/picker/picker.component';
import {
  type CustomColor,
  DEFAULT_CUSTOM_COLORS,
  type PickerMode,
} from '@shared/components/ui/picker/picker.types';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-picker-ui',
  standalone: true,
  imports: [
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzRadioModule,
    ButtonDirective,
    PickerComponent,
  ],
  templateUrl: './picker-ui.component.html',
  styleUrl: './picker-ui.component.scss',
})
export class PickerUiComponent {
  // Demo 1: Custom only
  demo1Color = signal('#1890ff');
  demo1Mode: PickerMode = 'custom-only';

  // Demo 2: Picker only
  demo2Color = signal('#52c41a');
  demo2Mode: PickerMode = 'picker-only';

  // Demo 3: Custom + Picker
  demo3Color = signal('#722ed1');
  demo3Mode: PickerMode = 'custom-and-picker';

  // Demo 4: Custom colors with transparent
  demo4Color = signal('#ff4d4f');
  demo4CustomColors: CustomColor[] = [
    { name: 'Red', value: '#ff4d4f', category: 'brand' },
    { name: 'Orange', value: '#fa8c16', category: 'brand' },
    { name: 'Yellow', value: '#fadb14', category: 'brand' },
    { name: 'Green', value: '#52c41a', category: 'brand' },
    { name: 'Blue', value: '#1890ff', category: 'brand' },
    { name: 'Purple', value: '#722ed1', category: 'brand' },
  ];

  // Interactive playground
  playgroundColor = signal('#1890ff');
  playgroundMode = signal<PickerMode>('custom-and-picker');
  playgroundCustomColors = DEFAULT_CUSTOM_COLORS;
  playgroundAllowTransparent = signal(false);
  playgroundShowInput = signal(true);
  playgroundShowAlpha = signal(false);
  playgroundSize = signal<'default' | 'compact'>('compact');

  onDemo1ColorChange(color: string): void {
    console.log('Demo 1 color changed:', color);
  }

  onDemo2ColorChange(color: string): void {
    console.log('Demo 2 color changed:', color);
  }

  onDemo3ColorChange(color: string): void {
    console.log('Demo 3 color changed:', color);
  }

  onDemo4ColorChange(color: string): void {
    console.log('Demo 4 color changed:', color);
  }

  onPlaygroundColorChange(color: string): void {
    console.log('Playground color changed:', color);
  }

  resetPlayground(): void {
    this.playgroundColor.set('#1890ff');
    this.playgroundMode.set('custom-and-picker');
    this.playgroundAllowTransparent.set(false);
    this.playgroundShowInput.set(true);
    this.playgroundShowAlpha.set(false);
    this.playgroundSize.set('compact');
  }
}

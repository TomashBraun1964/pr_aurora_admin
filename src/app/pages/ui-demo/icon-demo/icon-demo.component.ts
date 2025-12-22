import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import { FieldGroupComponent } from '../../../shared/components/ui/field-group/field-group.component';
import {
  type AvIconConfig,
  IconComponent,
  IconSettingsControlComponent,
} from '../../../shared/components/ui/icon';

@Component({
  selector: 'av-icon-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzTabsModule,
    ButtonDirective,
    IconComponent,
    HelpCopyContainerComponent,
    FieldGroupComponent,
    IconSettingsControlComponent,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrl: './icon-demo.component.scss',
})
export class IconDemoComponent {
  // Icon configuration state
  iconConfig = signal<AvIconConfig>({
    type: 'actions/av_check_mark',
    size: 32,
    color: '#1890ff',
    rotation: 0,
    scale: 1,
    opacity: 1,
    flipX: false,
    flipY: false,
    padding: 16,
    background: 'transparent',
    borderShow: false,
    borderColor: '#d9d9d9',
    borderWidth: 2,
    borderRadius: 8,
  });

  // Icon presets (subset for demo)
  readonly iconPresets = [
    { category: 'actions', value: 'actions/av_add', label: 'Add' },
    { category: 'actions', value: 'actions/av_check_mark', label: 'Check Mark' },
    { category: 'actions', value: 'actions/av_close', label: 'Close' },
    { category: 'actions', value: 'actions/av_copy', label: 'Copy' },
    { category: 'actions', value: 'actions/av_eye', label: 'Eye' },
    { category: 'actions', value: 'actions/av_save', label: 'Save' },
    { category: 'actions', value: 'actions/av_search', label: 'Search' },
    { category: 'actions', value: 'actions/av_trash', label: 'Trash' },
    { category: 'arrows', value: 'arrows/av_arrow_down', label: 'Arrow Down' },
    { category: 'arrows', value: 'arrows/av_arrow_left', label: 'Arrow Left' },
    { category: 'arrows', value: 'arrows/av_arrow_right', label: 'Arrow Right' },
    { category: 'arrows', value: 'arrows/av_arrow_up', label: 'Arrow Up' },
    { category: 'arrows', value: 'arrows/av_chevron-down', label: 'Chevron Down' },
    { category: 'arrows', value: 'arrows/av_chevron-up', label: 'Chevron Up' },
    { category: 'system', value: 'system/av_settings', label: 'Settings' },
    { category: 'system', value: 'system/av_star', label: 'Star' },
    { category: 'system', value: 'system/av_warning', label: 'Warning' },
    { category: 'system', value: 'system/av_info', label: 'Info' },
    { category: 'general', value: 'general/av_home', label: 'Home' },
    { category: 'general', value: 'general/av_like', label: 'Like' },
    { category: 'communication', value: 'communication/av_mail', label: 'Mail' },
    { category: 'communication', value: 'communication/av_chat', label: 'Chat' },
    { category: 'media', value: 'media/av_play', label: 'Play' },
    { category: 'media', value: 'media/av_image', label: 'Image' },
  ];

  // Computed: Icon style for preview
  iconStyle = computed(() => {
    const config = this.iconConfig();
    const style: any = {
      fontSize: `${config.size}px`,
      color: config.color,
      transform: `
        rotate(${config.rotation}deg)
        scale(${config.scale})
        scaleX(${config.flipX ? -1 : 1})
        scaleY(${config.flipY ? -1 : 1})
      `.trim(),
      opacity: config.opacity,
      padding: `${config.padding}px`,
      backgroundColor: config.background,
      borderRadius: `${config.borderRadius}px`,
      transition: 'all 0.3s ease',
    };

    if (config.borderShow) {
      style.border = `${config.borderWidth}px solid ${config.borderColor}`;
    }

    return style;
  });

  // Computed: Generated code
  generatedCode = computed(() => {
    const config = this.iconConfig();
    const transformParts = [];
    if (config.rotation !== 0) transformParts.push(`rotate(${config.rotation}deg)`);
    if (config.scale !== 1) transformParts.push(`scale(${config.scale})`);
    if (config.flipX) transformParts.push('scaleX(-1)');
    if (config.flipY) transformParts.push('scaleY(-1)');
    const transform = transformParts.length > 0 ? transformParts.join(' ') : '';

    const htmlLines = [
      `<av-icon`,
      `  type="${config.type}"`,
      `  [size]="${config.size}"`,
      `  color="${config.color}"`,
    ];
    if (config.opacity !== 1) htmlLines.push(`  [style.opacity]="${config.opacity}"`);
    if (transform) htmlLines.push(`  [style.transform]="'${transform}'"`);
    if (config.padding !== 0) htmlLines.push(`  [style.padding]="'${config.padding}px'"`);
    if (config.background !== 'transparent')
      htmlLines.push(`  [style.background-color]="'${config.background}'"`);
    if (config.borderShow)
      htmlLines.push(`  [style.border]="'${config.borderWidth}px solid ${config.borderColor}'"`);
    if (config.borderRadius !== 0)
      htmlLines.push(`  [style.border-radius]="'${config.borderRadius}px'"`);
    htmlLines.push(`></av-icon>`);

    return htmlLines.join('\n');
  });

  // API Documentation
  readonly apiCode = `/**
 * @component av-icon
 * Высокопроизводительный компонент для отображения SVG-иконок
 */
export interface AvIconProps {
  /** Тип иконки (путь к SVG) - REQUIRED */
  readonly type: string;

  /** Размер в пикселях (W=H). default: 24 */
  readonly size: number;

  /** Цвет иконки. default: inherit */
  readonly color: string | null;
}

// Дополнительная стилизация через [style.*]
// - transform, opacity, padding
// - background-color, border, border-radius`;

  readonly componentUsage = `/**
 * @component av-icon-settings-control
 * Универсальная панель управления всеми свойствами иконки
 */

// TypeScript
iconConfig = signal<AvIconConfig>({
  type: 'actions/av_check_mark',
  size: 32,
  color: '#1890ff',
  rotation: 0,
  scale: 1,
  opacity: 1,
  flipX: false,
  flipY: false,
  padding: 16,
  background: 'transparent',
  borderShow: false,
  borderColor: '#d9d9d9',
  borderWidth: 2,
  borderRadius: 8
});

// HTML Template
<av-icon-settings-control
  [(value)]="iconConfig"
  [presets]="iconPresets"
  [compact]="false"
></av-icon-settings-control>`;
}

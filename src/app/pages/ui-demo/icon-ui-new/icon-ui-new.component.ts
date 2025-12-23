import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelpCopyContainerComponent } from '@shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import {
  AvIconConfig,
  IconComponent,
  IconSettingsControlComponent,
} from '@shared/components/ui/icon';
import { ContainerUiHelpBaseComponent } from '@shared/containers/ui-help/container-ui-help-base/container-ui-help-base.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ICON_REGISTRY } from '../icon-ui/icon-registry';

@Component({
  selector: 'app-icon-ui-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContainerUiHelpBaseComponent,
    IconComponent,
    IconSettingsControlComponent,
    HelpCopyContainerComponent,
    NzGridModule,
    NzCardModule,
    NzSelectModule,
    NzInputModule,
    NzSwitchModule,
    NzSliderModule,
    NzTabsModule,
  ],
  templateUrl: './icon-ui-new.component.html',
  styleUrl: './icon-ui-new.component.scss',
})
export class IconUiNewComponent {
  // Section Visibility
  isSection1Visible = signal(true);
  isSection2Visible = signal(true);
  isSection3Visible = signal(true);

  // Search & Toast
  searchQuery = signal('');
  toastMessage = signal('');

  // Playground State
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

  constructor() {
    // Компонент готов к работе
  }

  // Helper methods for styling
  getTransformStyle(): string {
    const config = this.iconConfig();
    const parts = [];
    if (config.rotation !== 0) parts.push(`rotate(${config.rotation}deg)`);
    if (config.scale !== 1) parts.push(`scale(${config.scale})`);
    if (config.flipX) parts.push('scaleX(-1)');
    if (config.flipY) parts.push('scaleY(-1)');
    return parts.join(' ');
  }

  getBorderStyle(): string | null {
    const config = this.iconConfig();
    if (config.borderShow) {
      return `${config.borderWidth}px solid ${config.borderColor}`;
    }
    return null;
  }

  // Generated Code (Full Version)
  generatedHtml = computed(() => {
    const config = this.iconConfig();
    const transformParts = [];
    if (config.rotation !== 0) transformParts.push(`rotate(${config.rotation}deg)`);
    if (config.scale !== 1) transformParts.push(`scale(${config.scale})`);
    if (config.flipX) transformParts.push('scaleX(-1)');
    if (config.flipY) transformParts.push('scaleY(-1)');
    const transform = transformParts.length > 0 ? transformParts.join(' ') : '';

    const lines = [
      `<av-icon`,
      `  type="${config.type}"`,
      `  [size]="${config.size}"`,
      `  color="${config.color}"`,
    ];

    if (config.opacity !== 1) lines.push(`  [opacity]="${config.opacity}"`);
    if (transform) lines.push(`  [style.transform]="'${transform}'"`);
    if (config.padding !== 0) lines.push(`  [padding]="${config.padding}"`);
    if (config.background !== 'transparent') lines.push(`  background="${config.background}"`);
    if (config.borderShow)
      lines.push(`  border="${config.borderWidth}px solid ${config.borderColor}"`);
    if (config.borderRadius !== 0) lines.push(`  [radius]="${config.borderRadius}"`);

    lines.push(`></av-icon>`);
    return lines.join('\n');
  });

  // Technical Interface
  section1Content = `/**
 * @interface AvIconProps
 * Программный интерфейс компонента av-icon
 */
export interface AvIconProps {
  type: string | null;      // Тип или путь к SVG (напр. 'system/av_settings')
  size?: number;            // Размер в px (По умолчанию: 24)
  color?: string | null;    // Цвет (currentColor, HEX, RGB)
  rotation?: number;        // Угол поворота (0-360)
  scale?: number;           // Масштаб (1.0 - оригинал)
  opacity?: number;         // Прозрачность (0-1)
  flipX?: boolean;          // Отразить по горизонтали
  flipY?: boolean;          // Отразить по вертикали
  padding?: number | string; // Отступы контейнера
  background?: string;      // Фон контейнера (CSS)
  border?: string | null;   // Граница (напр. '1px solid #ccc')
  radius?: number | string; // Радиус скругления
}`;

  // Icon Registry & Filtering
  readonly categories = signal([...ICON_REGISTRY]);

  readonly iconPresets = computed(() => {
    return ICON_REGISTRY.flatMap((cat) =>
      cat.icons.map((icon) => ({
        label: icon.name,
        value: icon.type,
        category: cat.category,
      })),
    );
  });

  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categories();

    return this.categories()
      .map((cat) => ({
        ...cat,
        icons: cat.icons.filter(
          (icon) =>
            icon.name.toLowerCase().includes(query) || cat.category.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.icons.length > 0);
  });

  // Methods
  toggleSection1() {
    this.isSection1Visible.update((v) => !v);
  }
  toggleSection2() {
    this.isSection2Visible.update((v) => !v);
  }
  toggleSection3() {
    this.isSection3Visible.update((v) => !v);
  }

  copyToClipboard(text: string, msg: string) {
    navigator.clipboard.writeText(text);
    this.showToast(msg);
  }

  private showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}

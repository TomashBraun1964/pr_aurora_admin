import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import { FieldGroupComponent } from '../../../shared/components/ui/field-group/field-group.component';
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';

@Component({
  selector: 'av-icon-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzSliderModule,
    NzColorPickerModule,
    NzToolTipModule,
    ButtonDirective,
    IconComponent,
    HelpCopyContainerComponent,
    FieldGroupComponent,
  ],
  templateUrl: './icon-control.component.html',
  styleUrl: './icon-control.component.scss',
})
export class IconControlComponent {
  constructor(private http: HttpClient) {
    // Effect to fetch raw SVG source
    effect(() => {
      const iconPath = this.pgIcon();
      this.fetchRawSource(iconPath);
    });
  }
  // Playground State
  // State for playground visibility
  isPlaygroundVisible = signal(true);

  // Icon State Signals
  pgIcon = signal<string>('actions/av_check_mark');
  pgSize = signal<number>(24);
  pgColor = signal<string>('#1890ff');
  pgRotation = signal<number>(0);
  pgOpacity = signal<number>(1);
  pgScale = signal<number>(1);
  pgFlipHorizontal = signal<boolean>(false);
  pgFlipVertical = signal<boolean>(false);
  pgShowBorder = signal<boolean>(false);
  pgBorderColor = signal<string>('#d9d9d9');
  pgBorderWidth = signal<number>(1);
  pgBorderRadius = signal<number>(4);
  pgPadding = signal<number>(8);
  pgBackgroundColor = signal<string>('transparent');
  pgRawSource = signal<string>('');

  // UI State
  message = signal<string>('');

  readonly iconPresets = [
    { category: 'actions', value: 'actions/av_add', label: 'Add' },
    { category: 'actions', value: 'actions/av_calculator', label: 'Calculator' },
    { category: 'actions', value: 'actions/av_check_mark', label: 'Check Mark' },
    { category: 'actions', value: 'actions/av_close', label: 'Close' },
    { category: 'actions', value: 'actions/av_copy', label: 'Copy' },
    { category: 'actions', value: 'actions/av_eraser', label: 'Eraser' },
    { category: 'actions', value: 'actions/av_exit', label: 'Exit' },
    { category: 'actions', value: 'actions/av_eye', label: 'Eye' },
    { category: 'actions', value: 'actions/av_hammer', label: 'Hammer' },
    { category: 'actions', value: 'actions/av_minus', label: 'Minus' },
    { category: 'actions', value: 'actions/av_plus', label: 'Plus' },
    { category: 'actions', value: 'actions/av_save', label: 'Save' },
    { category: 'actions', value: 'actions/av_search', label: 'Search' },
    { category: 'actions', value: 'actions/av_trash', label: 'Trash' },
    { category: 'actions', value: 'actions/av_upload', label: 'Upload' },
    { category: 'arrows', value: 'arrows/av_arrow_down_right', label: 'Arrow Down Right' },
    { category: 'arrows', value: 'arrows/av_arrow_down', label: 'Arrow Down' },
    { category: 'arrows', value: 'arrows/av_arrow_left', label: 'Arrow Left' },
    { category: 'arrows', value: 'arrows/av_arrow_right', label: 'Arrow Right' },
    { category: 'arrows', value: 'arrows/av_arrow_up', label: 'Arrow Up' },
    { category: 'arrows', value: 'arrows/av_arrow-down', label: 'Arrow Down' },
    { category: 'arrows', value: 'arrows/av_arrow-left', label: 'Arrow Left' },
    { category: 'arrows', value: 'arrows/av_arrow-right', label: 'Arrow Right' },
    { category: 'arrows', value: 'arrows/av_arrow-up', label: 'Arrow Up' },
    { category: 'arrows', value: 'arrows/av_arrows_out', label: 'Arrows Out' },
    { category: 'arrows', value: 'arrows/av_chevron-down', label: 'Chevron Down' },
    { category: 'arrows', value: 'arrows/av_chevron-left', label: 'Chevron Left' },
    { category: 'arrows', value: 'arrows/av_chevron-right', label: 'Chevron Right' },
    { category: 'arrows', value: 'arrows/av_chevron-up', label: 'Chevron Up' },
    { category: 'arrows', value: 'arrows/av_expand', label: 'Expand' },
    { category: 'arrows', value: 'arrows/av_fast_forward', label: 'Fast Forward' },
    { category: 'arrows', value: 'arrows/av_triangle-down', label: 'Triangle Down' },
    { category: 'arrows', value: 'arrows/av_triangle-left', label: 'Triangle Left' },
    { category: 'arrows', value: 'arrows/av_triangle-right', label: 'Triangle Right' },
    { category: 'arrows', value: 'arrows/av_triangle-up', label: 'Triangle Up' },
    { category: 'arrows', value: 'arrows/av_undo', label: 'Undo' },
    { category: 'charts', value: 'charts/av_bar_chart', label: 'Bar Chart' },
    { category: 'charts', value: 'charts/av_line_chart', label: 'Line Chart' },
    { category: 'charts', value: 'charts/av_pie_chart', label: 'Pie Chart' },
    { category: 'communication', value: 'communication/av_chat', label: 'Chat' },
    { category: 'communication', value: 'communication/av_mail', label: 'Mail' },
    { category: 'communication', value: 'communication/av_phone', label: 'Phone' },
    { category: 'communication', value: 'communication/av_rss', label: 'Rss' },
    { category: 'editor', value: 'editor/av_align_center', label: 'Align Center' },
    { category: 'editor', value: 'editor/av_align_right', label: 'Align Right' },
    { category: 'editor', value: 'editor/av_align-center', label: 'Align Center' },
    { category: 'editor', value: 'editor/av_align-justify', label: 'Align Justify' },
    { category: 'editor', value: 'editor/av_align-left', label: 'Align Left' },
    { category: 'editor', value: 'editor/av_align-right', label: 'Align Right' },
    { category: 'editor', value: 'editor/av_bold', label: 'Bold' },
    { category: 'editor', value: 'editor/av_bulleted-list', label: 'Bulleted List' },
    { category: 'editor', value: 'editor/av_edit', label: 'Edit' },
    { category: 'editor', value: 'editor/av_font', label: 'Font' },
    { category: 'editor', value: 'editor/av_italic', label: 'Italic' },
    { category: 'editor', value: 'editor/av_list', label: 'List' },
    { category: 'editor', value: 'editor/av_paint', label: 'Paint' },
    { category: 'files', value: 'files/av_excel', label: 'Excel' },
    { category: 'files', value: 'files/av_folder', label: 'Folder' },
    { category: 'files', value: 'files/av_paperclip', label: 'Paperclip' },
    { category: 'files', value: 'files/av_zip', label: 'Zip' },
    { category: 'general', value: 'general/av_book', label: 'Book' },
    { category: 'general', value: 'general/av_dice', label: 'Dice' },
    { category: 'general', value: 'general/av_earth', label: 'Earth' },
    { category: 'general', value: 'general/av_home', label: 'Home' },
    { category: 'general', value: 'general/av_house', label: 'House' },
    { category: 'general', value: 'general/av_like', label: 'Like' },
    { category: 'general', value: 'general/av_road', label: 'Road' },
    { category: 'general', value: 'general/av_tag', label: 'Tag' },
    { category: 'general', value: 'general/av_ticket', label: 'Ticket' },
    { category: 'general', value: 'general/av_trophy', label: 'Trophy' },
    { category: 'media', value: 'media/av_equalizer', label: 'Equalizer' },
    { category: 'media', value: 'media/av_image', label: 'Image' },
    { category: 'media', value: 'media/av_play', label: 'Play' },
    { category: 'media', value: 'media/av_screen', label: 'Screen' },
    { category: 'media', value: 'media/av_tablet', label: 'Tablet' },
    { category: 'media', value: 'media/av_volume', label: 'Volume' },
    { category: 'rewind', value: 'rewind/av_backward', label: 'Backward' },
    { category: 'rewind', value: 'rewind/av_eject', label: 'Eject' },
    { category: 'rewind', value: 'rewind/av_fast-backward', label: 'Fast Backward' },
    { category: 'rewind', value: 'rewind/av_fast-forward', label: 'Fast Forward' },
    { category: 'rewind', value: 'rewind/av_pause', label: 'Pause' },
    { category: 'rewind', value: 'rewind/av_record', label: 'Record' },
    { category: 'rewind', value: 'rewind/av_stop', label: 'Stop' },
    { category: 'settings', value: 'settings/av_adjust', label: 'Adjust' },
    { category: 'settings', value: 'settings/av_battery-empty', label: 'Battery Empty' },
    { category: 'settings', value: 'settings/av_battery-full', label: 'Battery Full' },
    { category: 'settings', value: 'settings/av_battery-half', label: 'Battery Half' },
    { category: 'settings', value: 'settings/av_bell-crossed', label: 'Bell Crossed' },
    { category: 'settings', value: 'settings/av_bell', label: 'Bell' },
    { category: 'settings', value: 'settings/av_bookmark', label: 'Bookmark' },
    { category: 'settings', value: 'settings/av_camera', label: 'Camera' },
    { category: 'settings', value: 'settings/av_checkmark', label: 'Checkmark' },
    { category: 'settings', value: 'settings/av_cog', label: 'Cog' },
    { category: 'settings', value: 'settings/av_cross', label: 'Cross' },
    { category: 'settings', value: 'settings/av_exclamation-mark', label: 'Exclamation Mark' },
    { category: 'settings', value: 'settings/av_info', label: 'Info' },
    { category: 'settings', value: 'settings/av_question-mark', label: 'Question Mark' },
    { category: 'settings', value: 'settings/av_speaker-mute', label: 'Speaker Mute' },
    {
      category: 'settings',
      value: 'settings/av_speaker-volume-down',
      label: 'Speaker Volume Down',
    },
    { category: 'settings', value: 'settings/av_speaker-volume-up', label: 'Speaker Volume Up' },
    { category: 'settings', value: 'settings/av_speaker', label: 'Speaker' },
    { category: 'settings', value: 'settings/av_sterisk', label: 'Sterisk' },
    { category: 'social', value: 'social/av_github', label: 'Github' },
    { category: 'social', value: 'social/av_twitter', label: 'Twitter' },
    { category: 'social', value: 'social/av_youtube', label: 'Youtube' },
    { category: 'system', value: 'system/av_barcode', label: 'Barcode' },
    { category: 'system', value: 'system/av_brightness', label: 'Brightness' },
    { category: 'system', value: 'system/av_bug', label: 'Bug' },
    { category: 'system', value: 'system/av_cog', label: 'Cog' },
    { category: 'system', value: 'system/av_info', label: 'Info' },
    { category: 'system', value: 'system/av_lock', label: 'Lock' },
    { category: 'system', value: 'system/av_notification', label: 'Notification' },
    { category: 'system', value: 'system/av_qr_code', label: 'Qr Code' },
    { category: 'system', value: 'system/av_settings', label: 'Settings' },
    { category: 'system', value: 'system/av_star', label: 'Star' },
    { category: 'system', value: 'system/av_sterisk', label: 'Sterisk' },
    { category: 'system', value: 'system/av_unlock', label: 'Unlock' },
    { category: 'system', value: 'system/av_warning', label: 'Warning' },
    { category: 'time', value: 'time/av_alarm', label: 'Alarm' },
    { category: 'time', value: 'time/av_clock', label: 'Clock' },
    { category: 'time', value: 'time/av_stopwatch', label: 'Stopwatch' },
    { category: 'user', value: 'user/av_profile', label: 'Profile' },
    { category: 'user', value: 'user/av_users', label: 'Users' },
  ];

  readonly colorPresets = [
    '#1890ff',
    '#52c41a',
    '#faad14',
    '#ff4d4f',
    '#722ed1',
    '#13c2c2',
    '#eb2f96',
    '#f5222d',
    '#fa541c',
    '#a0d911',
    '#1677ff',
    '#722ed1',
  ];

  readonly sizePresets = [
    { value: 12, label: 'Extra Small (12px)' },
    { value: 16, label: 'Small (16px)' },
    { value: 20, label: 'Medium Small (20px)' },
    { value: 24, label: 'Medium (24px)' },
    { value: 32, label: 'Large (32px)' },
    { value: 48, label: 'Extra Large (48px)' },
    { value: 64, label: 'Huge (64px)' },
  ];

  // Computed style for the icon
  iconStyle = computed(() => {
    const style: any = {
      fontSize: `${this.pgSize()}px`,
      color: this.pgColor(),
      transform: `
        rotate(${this.pgRotation()}deg)
        scale(${this.pgScale()})
        scaleX(${this.pgFlipHorizontal() ? -1 : 1})
        scaleY(${this.pgFlipVertical() ? -1 : 1})
      `.trim(),
      opacity: this.pgOpacity(),
      padding: `${this.pgPadding()}px`,
      backgroundColor: this.pgBackgroundColor(),
      borderRadius: `${this.pgBorderRadius()}px`,
      transition: 'all 0.3s ease',
    };

    if (this.pgShowBorder()) {
      style.border = `${this.pgBorderWidth()}px solid ${this.pgBorderColor()}`;
    }

    return style;
  });

  // Generated code for copying
  pgGeneratedCode = computed(() => {
    const transformParts = [];
    if (this.pgRotation() !== 0) transformParts.push(`rotate(${this.pgRotation()}deg)`);
    if (this.pgScale() !== 1) transformParts.push(`scale(${this.pgScale()})`);
    if (this.pgFlipHorizontal()) transformParts.push('scaleX(-1)');
    if (this.pgFlipVertical()) transformParts.push('scaleY(-1)');
    const transform = transformParts.length > 0 ? transformParts.join(' ') : '';

    // TypeScript config
    const tsLines = [
      `  type: '${this.pgIcon()}',`,
      `  size: ${this.pgSize()},`,
      `  color: '${this.pgColor()}',`,
    ];
    if (this.pgOpacity() !== 1) tsLines.push(`  opacity: ${this.pgOpacity()},`);
    if (transform) tsLines.push(`  transform: '${transform}',`);
    if (this.pgPadding() !== 8) tsLines.push(`  padding: '${this.pgPadding()}px',`);
    if (this.pgBackgroundColor() !== 'transparent')
      tsLines.push(`  backgroundColor: '${this.pgBackgroundColor()}',`);
    if (this.pgShowBorder())
      tsLines.push(`  border: '${this.pgBorderWidth()}px solid ${this.pgBorderColor()}',`);
    if (this.pgBorderRadius() !== 4) tsLines.push(`  borderRadius: '${this.pgBorderRadius()}px',`);

    const tsCode = `// TypeScript\niconConfig = {\n${tsLines.join('\n')}\n};`;

    // HTML Template
    const htmlLines = [
      `<av-icon`,
      `  type="${this.pgIcon()}"`,
      `  [size]="${this.pgSize()}"`,
      `  color="${this.pgColor()}"`,
    ];
    if (this.pgOpacity() !== 1) htmlLines.push(`  [style.opacity]="${this.pgOpacity()}"`);
    if (transform) htmlLines.push(`  [style.transform]="'${transform}'"`);
    if (this.pgPadding() !== 8) htmlLines.push(`  [style.padding]="'${this.pgPadding()}px'"`);
    if (this.pgBackgroundColor() !== 'transparent')
      htmlLines.push(`  [style.background-color]="'${this.pgBackgroundColor()}'"`);
    if (this.pgShowBorder())
      htmlLines.push(
        `  [style.border]="'${this.pgBorderWidth()}px solid ${this.pgBorderColor()}'"`,
      );
    if (this.pgBorderRadius() !== 4)
      htmlLines.push(`  [style.border-radius]="'${this.pgBorderRadius()}px'"`);
    htmlLines.push(`></av-icon>`);

    const htmlCode = `// HTML Template\n${htmlLines.join('\n')}`;

    // SCSS Styles
    const scssIconLines = [`    font-size: ${this.pgSize()}px;`, `    color: ${this.pgColor()};`];
    if (this.pgOpacity() !== 1) scssIconLines.push(`    opacity: ${this.pgOpacity()};`);
    if (transform) scssIconLines.push(`    transform: ${transform};`);
    if (this.pgPadding() !== 8) scssIconLines.push(`    padding: ${this.pgPadding()}px;`);
    if (this.pgBackgroundColor() !== 'transparent')
      scssIconLines.push(`    background-color: ${this.pgBackgroundColor()};`);
    if (this.pgShowBorder())
      scssIconLines.push(`    border: ${this.pgBorderWidth()}px solid ${this.pgBorderColor()};`);
    if (this.pgBorderRadius() !== 4)
      scssIconLines.push(`    border-radius: ${this.pgBorderRadius()}px;`);
    scssIconLines.push(`    transition: all 0.3s ease;`);

    const scssCode = `// SCSS Styles\n.icon-container {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  av-icon {\n${scssIconLines.join(
      '\n',
    )}\n  }\n}`;

    return `${tsCode}\n\n${htmlCode}\n\n${scssCode}`;
  });

  apiInterfaceCode = `/**
 * @component av-icon
 * Высокопроизводительный компонент для отображения SVG-иконок.
 */
export interface AvIconProps {
  /** Тип иконки или полный путь к SVG файлу */
  readonly type: string; // required

  /** Размер в пикселях (W=H). default: 24 */
  readonly size: number;

  /** Цвет иконки. default: inherit (currentColor) */
  readonly color: string | null;

  /** Угол поворота (deg). default: 0 */
  readonly rotation: number;

  /** Масштаб (множитель). default: 1 */
  readonly scale: number;

  /** Прозрачность (0-1). default: 1 */
  readonly opacity: number;

  /** Отражение по осям X/Y. default: false */
  readonly flipX: boolean;
  readonly flipY: boolean;

  /** Стилизация контейнера */
  readonly padding: number | string; // default: 0
  readonly background: string;       // default: 'transparent'
  readonly border: string | null;    // default: null
  readonly radius: number | string;  // default: 0
}`;

  readonly howToConnectCode = `// 1. Базовое использование
<av-icon type="actions/av_check_mark"></av-icon>

// 2. С трансформациями и стилизацией
<av-icon
  type="system/av_settings"
  [size]="32"
  color="#1890ff"
  [rotation]="45"
  [scale]="1.5"
  [padding]="8"
  background="#f0f2f5"
  border="1px solid #d9d9d9"
  [radius]="4"
></av-icon>`;

  readonly helpContainerDocsCode = `/**
 * @component av-help-copy-container
 * Контейнер для демонстрации кода с поддержкой копирования и справки.
 */
export interface AvHelpCopyProps {
  /** Заголовок блока */
  title: string; // default: 'Код использования'

  /** Текст/код для отображения и копирования */
  content: string;

  /** Геометрия */
  width: string;  // default: '100%'
  height: string; // default: 'auto'

  /** Стилизация (HEX, slate-800 и т.д.) */
  bgColor: string | null;

  /** Управление кнопками */
  showCopy: boolean;       // default: true
  showHelpButton: boolean; // default: false

  /** Кастомная справка */
  helpContent: string | null;
  disableInternalHelp: boolean; // default: false
}`;

  resetAllSettings(): void {
    this.pgIcon.set('actions/av_check_mark');
    this.pgSize.set(24);
    this.pgColor.set('#1890ff');
    this.pgRotation.set(0);
    this.pgOpacity.set(1);
    this.pgScale.set(1);
    this.pgFlipHorizontal.set(false);
    this.pgFlipVertical.set(false);
    this.pgShowBorder.set(false);
    this.pgBorderColor.set('#d9d9d9');
    this.pgBorderWidth.set(1);
    this.pgBorderRadius.set(4);
    this.pgPadding.set(8);
    this.pgBackgroundColor.set('transparent');
    this.showMessage('Настройки сброшены! 🔄');
  }

  showMessage(msg: string): void {
    this.message.set(msg);
    setTimeout(() => this.message.set(''), 3000);
  }

  selectIconPreset(preset: { category: string; value: string; label: string }): void {
    this.pgIcon.set(preset.value);
    this.showMessage(`Выбрана иконка: ${preset.label} (${preset.category})`);
  }

  selectColorPreset(color: string): void {
    this.pgColor.set(color);
    this.showMessage(`Цвет изменён на: ${color}`);
  }

  selectSizePreset(size: number): void {
    this.pgSize.set(size);
    this.showMessage(`Размер изменён на: ${size}px`);
  }

  private fetchRawSource(iconPath: string): void {
    const url = `assets/icons/${iconPath}.svg`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (source) => this.pgRawSource.set(source),
      error: () => this.pgRawSource.set('Не удалось загрузить исходный код иконки'),
    });
  }
}

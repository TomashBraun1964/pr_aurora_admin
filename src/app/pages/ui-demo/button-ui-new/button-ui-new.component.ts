import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AV_UI_COMPONENTS } from '@shared/components/ui';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-button-ui-new',
  standalone: true,
  imports: [
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzSliderModule,
    NzInputNumberModule,
    NzToolTipModule,
    AV_UI_COMPONENTS,
  ],
  templateUrl: './button-ui-new.component.html',
  styleUrl: './button-ui-new.component.scss',
})
export class ButtonUiNewComponent {
  // Page info
  pageTitle = signal('Buttons Directive Playground ⭐');
  pageDescription = signal(
    'Интерактивная площадка для тестирования новой директивы av-button с поддержкой всех современных возможностей Aurora Admin.',
  );

  // Visibility state
  isSection1Visible = signal(true);
  isSection2Visible = signal(true);
  isSection3Visible = signal(true);
  isSection4Visible = signal(true);
  isSection5Visible = signal(true);

  // Technical Interface
  section1Title = signal('Interface: AvButtonProps');
  section1BgColor = signal('#0a0e1a');
  section1Content = signal(`/**
 * @directive av-button
 * Накладывается на нативные элементы <button> или <a>
 */
export interface AvButtonProps {
  avType: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger';
  avSize: 'small' | 'default' | 'large' | 'square';
  avLoading: boolean;
  avBlock: boolean;
  avVisible: boolean;
  avShape: 'default' | 'circle' | 'square' | 'round' | 'rounded' | 'rounded-big';
  avWidth: string | number | null;
  avHeight: string | number | null;
  avRadius: string | number | null;
  avIconSize: string | number | null;
  avColor: string | null;
  avIconColor: string | null;
  avTextColor: string | null;
  clicked: EventEmitter<MouseEvent>;
}`);
  section1HelpContent = signal(`Директива av-button расширяет возможности стандартных кнопок.
Она позволяет управлять формой, цветами, состоянием загрузки и анимациями без создания лишних оберток в DOM.`);

  // Playground - State
  pgType = signal<'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger'>('primary');
  pgSize = signal<'small' | 'default' | 'large' | 'square' | 'custom'>('default');
  pgShape = signal<'default' | 'circle' | 'square' | 'round' | 'rounded' | 'rounded-big'>(
    'default',
  );
  pgLoading = signal(false);
  pgVisible = signal(true);
  pgBlock = signal(false);
  pgLabel = signal('Custom Button');
  pgIcon = signal<string | null>(null);
  pgIconSize = signal(16);
  pgIconOnly = signal(false);

  // Playground - Colors
  pgColor = signal<string>('');
  pgIconColor = signal<string>('');
  pgTextColor = signal<string>('');

  // Playground - Geometry
  pgWidth = signal<string | number | null>(null);
  pgHeight = signal<string | number | null>(null);
  pgRadius = signal<string | number | null>(null);

  // Computeds for safety
  safePgSize = computed(() => (this.pgSize() === 'custom' ? 'default' : this.pgSize()) as any);

  // Section titles
  section2Title = signal('🎮 Интерактивная площадка');
  section3Title = signal('📖 Примеры использования');
  section4Title = signal('💡 Рекомендации');
  section5Title = signal('🛠️ Траблшутинг');

  // Placeholders for content sections
  placeholderText1 = signal('Здесь будут примеры различных типов кнопок...');
  placeholderText2 = signal('Рекомендации по использованию кнопок в интерфейсе...');
  placeholderText3 = signal('Решение типичных проблем при подключении директивы...');

  // Icons List for Playground
  readonly iconOptions = [
    { label: 'Без иконки', value: null },
    { label: 'Check', value: 'common/av_check' },
    { label: 'Close', value: 'common/av_close' },
    { label: 'Search', value: 'common/av_search' },
    { label: 'Settings', value: 'common/av_settings' },
    { label: 'Download', value: 'arrows/av_download' },
    { label: 'Upload', value: 'arrows/av_upload' },
  ];

  // Computed code
  pgGeneratedCode = computed(() => {
    const isIconOnly = !!this.pgIcon() && !this.pgLabel();
    let code = `<button av-button\n  avType="${this.pgType()}"`;

    if (this.pgSize() !== 'default' && this.pgSize() !== 'custom') {
      code += `\n  avSize="${this.pgSize()}"`;
    }
    if (this.pgShape() !== 'default') {
      code += `\n  avShape="${this.pgShape()}"`;
    }
    if (this.pgLoading()) code += `\n  [avLoading]="true"`;
    if (this.pgBlock()) code += `\n  [avBlock]="true"`;
    if (!this.pgVisible()) code += `\n  [avVisible]="false"`;
    if (isIconOnly) code += `\n  [avIconOnly]="true"`;

    if (this.pgColor()) code += `\n  avColor="${this.pgColor()}"`;
    if (this.pgTextColor()) code += `\n  avTextColor="${this.pgTextColor()}"`;
    if (this.pgIconColor()) code += `\n  avIconColor="${this.pgIconColor()}"`;

    if (this.pgWidth()) code += `\n  avWidth="${this.pgWidth()}"`;
    if (this.pgHeight()) code += `\n  avHeight="${this.pgHeight()}"`;
    if (this.pgRadius()) code += `\n  avRadius="${this.pgRadius()}"`;
    if (this.pgIconSize() !== 16) code += `\n  avIconSize="${this.pgIconSize()}"`;

    code += `\n>`;

    if (this.pgIcon()) {
      code += `\n  <av-icon type="${this.pgIcon()}" [size]="${this.pgIconSize()}"></av-icon>`;
      if (!isIconOnly) {
        code += `\n  <span style="margin-left: 8px;">${this.pgLabel()}</span>`;
      }
    } else {
      code += `\n  ${this.pgLabel()}`;
    }

    code += `\n</button>`;
    return code;
  });

  // Toggles
  toggleSection1() {
    this.isSection1Visible.set(!this.isSection1Visible());
  }

  toggleSection2() {
    this.isSection2Visible.set(!this.isSection2Visible());
  }

  toggleSection3() {
    this.isSection3Visible.set(!this.isSection3Visible());
  }

  toggleSection4() {
    this.isSection4Visible.set(!this.isSection4Visible());
  }

  toggleSection5() {
    this.isSection5Visible.set(!this.isSection5Visible());
  }

  resetAllSettings() {
    this.pgType.set('primary');
    this.pgSize.set('default');
    this.pgShape.set('default');
    this.pgLoading.set(false);
    this.pgVisible.set(true);
    this.pgBlock.set(false);
    this.pgLabel.set('Custom Button');
    this.pgIcon.set(null);
    this.pgIconSize.set(16);
    this.pgColor.set('');
    this.pgIconColor.set('');
    this.pgTextColor.set('');
    this.pgWidth.set(null);
    this.pgHeight.set(null);
    this.pgRadius.set(null);
  }
}

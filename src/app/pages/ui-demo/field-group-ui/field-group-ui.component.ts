import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import { FieldGroupComponent } from '../../../shared/components/ui/field-group';
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';

@Component({
  selector: 'app-field-group-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    FieldGroupComponent,
    IconComponent,
    HelpCopyContainerComponent,
  ],
  templateUrl: './field-group-ui.component.html',
  styleUrl: './field-group-ui.component.scss',
})
export class FieldGroupUiComponent {
  // Section visibility
  isSection1Visible = signal(true);
  isSection2Visible = signal(true);
  isSection3Visible = signal(true);

  toggleSection1() {
    this.isSection1Visible.set(!this.isSection1Visible());
  }

  toggleSection2() {
    this.isSection2Visible.set(!this.isSection2Visible());
  }

  toggleSection3() {
    this.isSection3Visible.set(!this.isSection3Visible());
  }

  // Section 1 - Technical Interface
  section1Title = 'Interface: FieldGroupComponent';
  section1BgColor = '#0a0e1a';
  section1Content = `export interface FieldGroupProps {
  label?: string;                    // Текст метки для группы
  variant?: 'default' | 'minimal' | 'filled' | 'highlighted';
  size?: 'small' | 'medium' | 'large';
  collapsible?: boolean;            // Возможность сворачивания
  isCollapsed?: boolean;            // Состояние (свернуто/развернуто)
}

// Inputs:
label: string
variant: 'default' | 'minimal' | 'filled' | 'highlighted' (default: 'default')
size: 'small' | 'medium' | 'large' (default: 'medium')
collapsible: boolean (default: false)
isCollapsed: boolean (two-way binding через model)`;

  // Demo state
  userName = signal('');
  email = signal('');
  phone = signal('');
  city = signal('');
  country = signal('');
  acceptTerms = signal(false);
  newsletter = signal(true);
  selectedVariant = signal<'default' | 'minimal' | 'filled' | 'highlighted'>('default');
  selectedSize = signal<'small' | 'medium' | 'large'>('medium');

  readonly variants = [
    { value: 'default', label: 'Default (обычная рамка)' },
    { value: 'minimal', label: 'Minimal (пунктир без фона)' },
    { value: 'filled', label: 'Filled (заливка без рамки)' },
    { value: 'highlighted', label: 'Highlighted (выделенная)' },
  ];

  readonly sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  readonly exampleBasic = `<!-- Базовое использование -->
<av-field-group label="Персональные данные">
  <input av-input placeholder="Введите имя..." />
</av-field-group>`;

  readonly exampleButtons = `<!-- С кнопками -->
<av-field-group label="Действия">
  <div style="display: flex; gap: 8px;">
    <button av-button avType="primary">Сохранить</button>
    <button av-button avType="default">Отмена</button>
    <button av-button avType="danger">Удалить</button>
  </div>
</av-field-group>`;

  readonly exampleVariants = `<!-- Варианты стилей -->
<av-field-group label="Default стиль">
  <input av-input placeholder="Обычная рамка с фоном" />
</av-field-group>

<av-field-group label="Minimal стиль" variant="minimal">
  <input av-input placeholder="Пунктирная рамка без фона" />
</av-field-group>

<av-field-group label="Filled стиль" variant="filled">
  <input av-input placeholder="Заливка без рамки" />
</av-field-group>

<av-field-group label="Highlighted стиль" variant="highlighted">
  <input av-input placeholder="Выделенная рамка" />
</av-field-group>`;

  readonly exampleSizes = `<!-- Размеры -->
<av-field-group label="Small размер" size="small">
  <input av-input placeholder="Маленький размер" />
</av-field-group>

<av-field-group label="Medium размер" size="medium">
  <input av-input placeholder="Средний размер (по умолчанию)" />
</av-field-group>

<av-field-group label="Large размер" size="large">
  <input av-input placeholder="Большой размер" />
</av-field-group>`;

  readonly exampleComplex = `<!-- Сложная форма -->
<av-field-group label="Адрес доставки">
  <div nz-row [nzGutter]="16">
    <div nz-col [nzSpan]="12">
      <input av-input placeholder="Город" />
    </div>
    <div nz-col [nzSpan]="12">
      <input av-input placeholder="Страна" />
    </div>
  </div>
</av-field-group>

<av-field-group label="Настройки уведомлений" variant="filled">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <label style="display: flex; justify-content: space-between;">
      <span>Email уведомления</span>
      <nz-switch [(ngModel)]="emailNotifications"></nz-switch>
    </label>
    <label style="display: flex; justify-content: space-between;">
      <span>SMS уведомления</span>
      <nz-switch [(ngModel)]="smsNotifications"></nz-switch>
    </label>
  </div>
</av-field-group>`;

  readonly exampleIcons = `<!-- С иконками -->
<av-field-group label="Статус" variant="highlighted">
  <div style="display: flex; align-items: center; gap: 12px;">
    <av-icon type="actions/av_check_mark" [size]="24" color="#52c41a"></av-icon>
    <span style="color: #52c41a; font-weight: 500;">Успешно завершено</span>
  </div>
</av-field-group>`;

  generatedCode = computed(() => {
    const variant = this.selectedVariant();
    const size = this.selectedSize();
    const variantAttr = variant !== 'default' ? ` variant="${variant}"` : '';
    const sizeAttr = size !== 'medium' ? ` size="${size}"` : '';

    return `<av-field-group label="Демо поле"${variantAttr}${sizeAttr}>
  <input av-input placeholder="Введите текст..." />
</av-field-group>`;
  });

  submitForm(): void {
    console.log('Form submitted:', {
      userName: this.userName(),
      email: this.email(),
      phone: this.phone(),
      city: this.city(),
      country: this.country(),
      acceptTerms: this.acceptTerms(),
      newsletter: this.newsletter(),
    });
    alert('Форма отправлена! Проверьте консоль для деталей.');
  }

  resetForm(): void {
    this.userName.set('');
    this.email.set('');
    this.phone.set('');
    this.city.set('');
    this.country.set('');
    this.acceptTerms.set(false);
    this.newsletter.set(true);
  }
}

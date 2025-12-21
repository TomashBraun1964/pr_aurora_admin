import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
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
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';
import { ModalComponent, ModalService } from '../../../shared/components/ui/modal';

@Component({
  selector: 'app-dialog-icon-ui',
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
    ModalComponent,
    HelpCopyContainerComponent,
  ],
  templateUrl: './dialog-icon-ui.component.html',
  styleUrl: './dialog-icon-ui.component.scss',
})
export class DialogIconUiComponent {
  constructor(private modalService: ModalService) {}

  // Playground State
  pgTitle = signal('Подтверждение');
  pgMessage = signal('Вы уверены, что хотите выполнить это действие?');
  pgIcon = signal('check');
  pgIconSize = signal(64);
  pgIconColor = signal('#52c41a');
  pgSize = signal<'small' | 'medium' | 'large'>('medium');
  pgShowBackdrop = signal(true);
  pgCloseOnBackdrop = signal(true);
  pgCloseOnEsc = signal(true);
  pgShowCloseButton = signal(false);

  // Button Configuration
  pgConfirmText = signal('Подтвердить');
  pgCancelText = signal('Отмена');
  pgConfirmType = signal<'primary' | 'default' | 'danger'>('primary');
  pgShowCancelButton = signal(true);

  // Advanced Features
  pgWidth = signal<string | number>('450px');

  // UI State
  isOpen = signal(false);
  message = signal('');
  refreshTrigger = signal(true);

  readonly iconPresets = [
    { value: 'check', label: 'Check (Success)', color: '#52c41a' },
    { value: 'close', label: 'Close (Error)', color: '#ff4d4f' },
    { value: 'exclamation', label: 'Warning', color: '#faad14' },
    { value: 'question', label: 'Question', color: '#1890ff' },
    { value: 'info', label: 'Info', color: '#1890ff' },
    { value: 'delete', label: 'Delete', color: '#ff4d4f' },
  ];

  readonly colorPresets = ['#52c41a', '#ff4d4f', '#faad14', '#1890ff', '#722ed1', '#13c2c2'];

  pgGeneratedCode = computed(() => {
    const code = `// TypeScript
openDialog() {
  const modal = this.modalService.open({
    title: '${this.pgTitle()}',
    centered: true,
    size: '${this.pgSize()}',
    width: ${typeof this.pgWidth() === 'number' ? this.pgWidth() : `'${this.pgWidth()}'`},
    showBackdrop: ${this.pgShowBackdrop()},
    closeOnBackdrop: ${this.pgCloseOnBackdrop()},
    closeOnEsc: ${this.pgCloseOnEsc()},
    showCloseButton: ${this.pgShowCloseButton()},
  });

  modal.result.subscribe(result => {
    console.log('Dialog result:', result);
  });
}

// HTML Template
<av-modal [(isOpen)]="dialogOpen" [centered]="true">
  <div modal-body>
    <div style="text-align: center; padding: 24px;">
      <app-icon
        type="${this.pgIcon()}"
        [size]="${this.pgIconSize()}"
        [color]="'${this.pgIconColor()}'"
      ></app-icon>
      <h3 style="margin: 16px 0 8px;">${this.pgTitle()}</h3>
      <p style="color: #8c8c8c;">${this.pgMessage()}</p>
    </div>
  </div>
  <div modal-footer style="text-align: center; justify-content: center;">
    ${
      this.pgShowCancelButton()
        ? `<button av-button avType="default">${this.pgCancelText()}</button>`
        : ''
    }
    <button av-button avType="${this.pgConfirmType()}">${this.pgConfirmText()}</button>
  </div>
</av-modal>`;

    return code;
  });

  apiInterfaceCode = `/**
 * Dialog Icon Component - специализированный компонент для диалогов подтверждения
 * с крупными иконками и центрированным текстом
 */
export interface DialogIconConfig {
  /** Заголовок диалога */
  title: string;

  /** Текст сообщения */
  message: string;

  /** Иконка (из библиотеки иконок) */
  icon: string;

  /** Размер иконки в px */
  iconSize?: number; // default: 64

  /** Цвет иконки */
  iconColor?: string; // default: '#52c41a'

  /** Размер диалога */
  size?: 'small' | 'medium' | 'large'; // default: 'medium'

  /** Ширина диалога */
  width?: string | number; // default: '450px'

  /** Текст кнопки подтверждения */
  confirmText?: string; // default: 'Подтвердить'

  /** Текст кнопки отмены */
  cancelText?: string; // default: 'Отмена'

  /** Тип кнопки подтверждения */
  confirmType?: 'primary' | 'default' | 'danger'; // default: 'primary'

  /** Показывать кнопку отмены */
  showCancelButton?: boolean; // default: true

  /** Показывать кнопку закрытия (X) */
  showCloseButton?: boolean; // default: false

  /** Закрывать при клике на backdrop */
  closeOnBackdrop?: boolean; // default: true

  /** Закрывать при нажатии Esc */
  closeOnEsc?: boolean; // default: true
}

// Использование через сервис
this.modalService.openIconDialog({
  icon: 'check',
  iconColor: '#52c41a',
  title: 'Успешно!',
  message: 'Операция выполнена успешно.',
  confirmText: 'ОК',
  showCancelButton: false,
}).result.subscribe(result => {
  if (result === 'confirm') {
    // Действие подтверждено
  }
});`;

  openDialog(): void {
    this.isOpen.set(true);
  }

  showMessage(msg: string): void {
    this.message.set(msg);
    setTimeout(() => this.message.set(''), 3000);
  }

  forceRefresh(): void {
    this.refreshTrigger.set(false);
    setTimeout(() => {
      this.refreshTrigger.set(true);
      this.showMessage('Диалог обновлён! ✨');
    }, 100);
  }

  resetAllSettings(): void {
    this.pgTitle.set('Подтверждение');
    this.pgMessage.set('Вы уверены, что хотите выполнить это действие?');
    this.pgIcon.set('check');
    this.pgIconSize.set(64);
    this.pgIconColor.set('#52c41a');
    this.pgSize.set('medium');
    this.pgShowBackdrop.set(true);
    this.pgCloseOnBackdrop.set(true);
    this.pgCloseOnEsc.set(true);
    this.pgShowCloseButton.set(false);
    this.pgConfirmText.set('Подтвердить');
    this.pgCancelText.set('Отмена');
    this.pgConfirmType.set('primary');
    this.pgShowCancelButton.set(true);
    this.pgWidth.set('450px');
    this.forceRefresh();
  }

  selectIconPreset(preset: { value: string; label: string; color: string }): void {
    this.pgIcon.set(preset.value);
    this.pgIconColor.set(preset.color);
    this.showMessage(`Выбрана иконка: ${preset.label}`);
  }
}

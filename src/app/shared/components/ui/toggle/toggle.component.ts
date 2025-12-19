// src/app/shared/components/ui/toggle/toggle.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleDirective } from './toggle.directive';

/**
 * Toggle Component
 *
 * Standalone компонент для создания toggle-переключателей.
 * Поддерживает Angular Forms (ControlValueAccessor) для использования с ngModel и FormControl.
 *
 * @example Простое использование
 * <av-toggle [(checked)]="isEnabled" />
 *
 * @example С параметрами
 * <av-toggle
 *   [(checked)]="notifications"
 *   [size]="'large'"
 *   [color]="'success'"
 *   [disabled]="false"
 *   (checkedChange)="onToggle($event)"
 * />
 *
 * @example С ngModel (требует FormsModule)
 * <av-toggle [(ngModel)]="isEnabled" />
 *
 * @example С FormControl (требует ReactiveFormsModule)
 * <av-toggle [formControl]="enabledControl" />
 *
 * @example С label
 * <av-toggle [(checked)]="darkMode">
 *   Dark Mode
 * </av-toggle>
 */
@Component({
  selector: 'av-toggle',
  standalone: true,
  imports: [CommonModule, ToggleDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="av-toggle-wrapper"
      [class.av-toggle-wrapper--disabled]="disabled"
      (click)="onWrapperClick()"
    >
      <label class="av-toggle" [attr.for]="inputId">
        <input
          [id]="inputId"
          type="checkbox"
          avToggle
          [avSize]="size"
          [avColor]="color"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onInputChange($event)"
        />
        <span class="av-toggle__slider"></span>
      </label>

      @if (hasLabel) {
      <span class="av-toggle-wrapper__label">
        <ng-content></ng-content>
      </span>
      }
    </div>
  `,
  styles: [],
})
export class ToggleComponent implements ControlValueAccessor {
  /**
   * Состояние переключателя
   */
  @Input() checked = false;

  /**
   * Событие изменения состояния (для two-way binding)
   */
  @Output() checkedChange = new EventEmitter<boolean>();

  /**
   * Размер переключателя
   */
  @Input() size: 'small' | 'default' | 'large' = 'default';

  /**
   * Цветовая схема
   */
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Отключенное состояние
   */
  @Input() disabled = false;

  /**
   * Уникальный ID для input элемента
   */
  inputId = `av-toggle-${Math.random().toString(36).substring(2, 9)}`;

  /**
   * Есть ли label (ng-content)
   */
  get hasLabel(): boolean {
    return true; // Всегда true, чтобы показывать ng-content
  }

  // ControlValueAccessor
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Обработчик изменения input
   */
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;

    this.checked = newValue;
    this.checkedChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  /**
   * Обработчик клика на wrapper (для label)
   */
  onWrapperClick(): void {
    if (this.disabled) {
      return;
    }
    // Клик будет обработан через input
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

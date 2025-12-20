// src/app/shared/components/ui/toggle/toggle-labeled.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Labeled Toggle Component
 * Toggle switch with text labels inside (iOS style)
 * Supports two-way data binding and reactive forms
 */
@Component({
  selector: 'av-toggle-labeled',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="av-toggle-labeled" [class]="'av-toggle-labeled--' + size">
      <input
        type="checkbox"
        [id]="inputId"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onToggleChange($event)"
        class="av-toggle-labeled__input"
      />
      <label [for]="inputId" class="av-toggle-labeled__track">
        <span class="av-toggle-labeled__label av-toggle-labeled__label--left">
          {{ leftLabel }}
        </span>
        <span class="av-toggle-labeled__label av-toggle-labeled__label--right">
          {{ rightLabel }}
        </span>
        <span class="av-toggle-labeled__thumb" [style.background]="thumbColor"></span>
      </label>
    </div>
  `,
  styles: `
    .av-toggle-labeled {
      display: inline-block;
      position: relative;
    }

    .av-toggle-labeled__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .av-toggle-labeled__track {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      border-radius: 20px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    /* Default size */
    .av-toggle-labeled--default .av-toggle-labeled__track {
      width: 140px;
      height: 40px;
      padding: 2px;
    }

    .av-toggle-labeled--default .av-toggle-labeled__label {
      font-size: 14px;
      font-weight: 500;
    }

    .av-toggle-labeled--default .av-toggle-labeled__thumb {
      width: 68px;
      height: 36px;
    }

    /* Small size */
    .av-toggle-labeled--small .av-toggle-labeled__track {
      width: 120px;
      height: 32px;
      padding: 2px;
    }

    .av-toggle-labeled--small .av-toggle-labeled__label {
      font-size: 12px;
      font-weight: 500;
    }

    .av-toggle-labeled--small .av-toggle-labeled__thumb {
      width: 58px;
      height: 28px;
    }

    /* Large size */
    .av-toggle-labeled--large .av-toggle-labeled__track {
      width: 160px;
      height: 48px;
      padding: 3px;
    }

    .av-toggle-labeled--large .av-toggle-labeled__label {
      font-size: 16px;
      font-weight: 500;
    }

    .av-toggle-labeled--large .av-toggle-labeled__thumb {
      width: 78px;
      height: 42px;
    }

    /* Track colors - unchecked state */
    .av-toggle-labeled__track {
      background: #e0e0e0;
      border: 1px solid #d0d0d0;
    }

    .av-toggle-labeled__label {
      position: relative;
      z-index: 1;
      flex: 1;
      text-align: center;
      transition: all 0.3s ease;
      color: #666;
    }

    .av-toggle-labeled__label--left {
      color: #fff;
    }

    .av-toggle-labeled__thumb {
      position: absolute;
      left: 2px;
      background: #2196f3;
      border-radius: 18px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Checked state */
    .av-toggle-labeled__input:checked + .av-toggle-labeled__track {
      background: #e0e0e0;
    }

    .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__label--left {
      color: #666;
    }

    .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__label--right {
      color: #fff;
    }

    .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__thumb {
      transform: translateX(calc(100% - 4px));
    }

    /* Default size checked adjustment */
    .av-toggle-labeled--default .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__thumb {
      transform: translateX(68px);
    }

    /* Small size checked adjustment */
    .av-toggle-labeled--small .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__thumb {
      transform: translateX(58px);
    }

    /* Large size checked adjustment */
    .av-toggle-labeled--large .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__thumb {
      transform: translateX(78px);
    }

    /* Focus state */
    .av-toggle-labeled__input:focus-visible + .av-toggle-labeled__track {
      outline: 2px solid #2196f3;
      outline-offset: 2px;
    }

    /* Disabled state */
    .av-toggle-labeled__input:disabled + .av-toggle-labeled__track {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f5f5f5;
    }

    .av-toggle-labeled__input:disabled + .av-toggle-labeled__track .av-toggle-labeled__thumb {
      background: #999;
    }

    /* Dark theme support */
    [data-theme='dark'] {
      .av-toggle-labeled__track {
        background: #333;
        border-color: #555;
      }

      .av-toggle-labeled__label {
        color: #999;
      }

      .av-toggle-labeled__label--left {
        color: #fff;
      }

      .av-toggle-labeled__input:checked + .av-toggle-labeled__track {
        background: #333;
      }

      .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__label--left {
        color: #999;
      }

      .av-toggle-labeled__input:checked + .av-toggle-labeled__track .av-toggle-labeled__label--right {
        color: #fff;
      }

      .av-toggle-labeled__input:disabled + .av-toggle-labeled__track {
        background: #1a1a1a;
      }
    }

    /* Animation for reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .av-toggle-labeled__track,
      .av-toggle-labeled__thumb,
      .av-toggle-labeled__label {
        transition: none;
      }
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleLabeledComponent),
      multi: true,
    },
  ],
})
export class ToggleLabeledComponent implements ControlValueAccessor {
  @Input() leftLabel = 'OFF';
  @Input() rightLabel = 'ON';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  @Output() checkedChange = new EventEmitter<boolean>();

  get thumbColor(): string {
    switch (this.color) {
      case 'success':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'danger':
        return '#ff4d4f';
      case 'primary':
      default:
        return '#1890ff';
    }
  }

  inputId = `av-toggle-labeled-${Math.random().toString(36).substr(2, 9)}`;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  onToggleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.checked = newValue;
    this.checkedChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = value;
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

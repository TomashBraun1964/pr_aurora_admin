// src/app/shared/components/ui/toggle/toggle.directive.ts
import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Toggle Directive
 *
 * Директива для создания toggle-переключателей на нативных checkbox элементах.
 * Аналогично ButtonDirective - добавляет классы и поведение к нативным элементам.
 *
 * @example
 * <label class="av-toggle">
 *   <input type="checkbox" avToggle [(ngModel)]="isEnabled" />
 *   <span class="av-toggle__slider"></span>
 * </label>
 *
 * @example С параметрами
 * <label class="av-toggle">
 *   <input type="checkbox" avToggle avSize="large" avColor="success" />
 *   <span class="av-toggle__slider"></span>
 * </label>
 */
@Directive({
  selector: 'input[avToggle][type="checkbox"]',
  standalone: true,
  host: {
    class: 'av-toggle-input',
  },
})
export class ToggleDirective implements OnInit {
  /**
   * Размер переключателя
   * - small: 36px × 18px
   * - default: 44px × 22px (по умолчанию)
   * - large: 52px × 26px
   */
  @Input() avSize: 'small' | 'default' | 'large' = 'default';

  /**
   * Цветовая схема (применяется к родительскому .av-toggle)
   * - primary: синий (#1890ff) - по умолчанию
   * - success: зеленый (#52c41a)
   * - warning: оранжевый (#faad14)
   * - danger: красный (#ff4d4f)
   */
  @Input() avColor: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Отключенное состояние (дублирует нативный disabled для стилизации)
   */
  @HostBinding('class.av-toggle-input--disabled')
  @Input()
  disabled = false;

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyClasses();
  }

  /**
   * Применяет классы к родительскому label элементу
   */
  private applyClasses(): void {
    const input = this.el.nativeElement;
    const label = input.closest('.av-toggle');

    if (label) {
      // Размер
      if (this.avSize !== 'default') {
        this.renderer.addClass(label, `av-toggle--${this.avSize}`);
      }

      // Цвет
      if (this.avColor !== 'primary') {
        this.renderer.addClass(label, `av-toggle--${this.avColor}`);
      }
    } else {
      console.warn(
        'ToggleDirective: input должен быть внутри элемента с классом .av-toggle',
        input,
      );
    }
  }
}

// src/app/shared/components/ui/input/input.directive.ts
import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Input Directive
 *
 * Директива для стилизации нативных input элементов.
 * Добавляет классы для размеров, статусов и вариантов отображения.
 *
 * @example Базовый input
 * <input avInput type="text" placeholder="Enter text" />
 *
 * @example С параметрами
 * <input
 *   avInput
 *   avSize="large"
 *   avStatus="error"
 *   avVariant="filled"
 *   type="email"
 *   placeholder="your@email.com"
 * />
 *
 * @example С FormControl
 * <input avInput [formControl]="emailControl" />
 */
@Directive({
  selector: 'input[avInput], textarea[avInput]',
  standalone: true,
  host: {
    class: 'av-input',
  },
})
export class InputDirective implements OnInit {
  /**
   * Размер input
   * - small: 24px height
   * - default: 32px height (по умолчанию)
   * - large: 40px height
   * - x-large: 48px height
   */
  @Input() avSize: 'small' | 'default' | 'large' | 'x-large' = 'default';

  /**
   * Статус (для валидации)
   * - default: обычное состояние
   * - error: ошибка валидации (красная рамка)
   * - warning: предупреждение (оранжевая рамка)
   * - success: успешная валидация (зеленая рамка)
   */
  @Input() avStatus: 'default' | 'error' | 'warning' | 'success' = 'default';

  /**
   * Вариант отображения
   * - outlined: с рамкой (по умолчанию)
   * - filled: залитый фон
   * - borderless: только нижняя линия
   */
  @Input() avVariant: 'outlined' | 'filled' | 'borderless' = 'outlined';

  /**
   * Отключенное состояние
   */
  @HostBinding('class.av-input--disabled')
  @Input()
  disabled = false;

  constructor(
    private el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.applyClasses();
  }

  /**
   * Применяет CSS классы к элементу
   */
  private applyClasses(): void {
    const element = this.el.nativeElement;

    // Размер
    if (this.avSize !== 'default') {
      this.renderer.addClass(element, `av-input--${this.avSize}`);
    }

    // Статус
    if (this.avStatus !== 'default') {
      this.renderer.addClass(element, `av-input--${this.avStatus}`);
    }

    // Вариант
    if (this.avVariant !== 'outlined') {
      this.renderer.addClass(element, `av-input--${this.avVariant}`);
    }
  }
}

import { Component, input, model } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'av-field-group',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="av-field-group" [class.is-collapsed]="isCollapsed()">
      @if (label()) {
      <div
        class="av-field-group__header"
        (click)="toggleCollapse()"
        [class.is-clickable]="collapsible()"
      >
        <span class="av-field-group__label">{{ label() }}</span>
        @if (collapsible()) {
        <button class="av-field-group__toggle" type="button">
          <av-icon
            [type]="isCollapsed() ? 'arrows/av_chevron-down' : 'arrows/av_chevron-up'"
            [size]="14"
          ></av-icon>
        </button>
        }
      </div>
      }
      <div class="av-field-group__content" [hidden]="isCollapsed()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './field-group.component.scss',
})
export class FieldGroupComponent {
  /**
   * Текст метки для группы полей
   */
  label = input<string>();

  /**
   * Можно ли сворачивать группу
   */
  collapsible = input<boolean>(false);

  /**
   * Состояние свернутости
   */
  isCollapsed = model<boolean>(false);

  /**
   * Вариант отображения группы
   * - 'default': обычная рамка с фоном
   * - 'minimal': пунктирная рамка без фона
   * - 'filled': заливка без рамки
   * - 'highlighted': выделенная рамка
   */
  variant = input<'default' | 'minimal' | 'filled' | 'highlighted'>('default');

  /**
   * Размер группы полей
   */
  size = input<'small' | 'medium' | 'large'>('medium');

  toggleCollapse(): void {
    if (this.collapsible()) {
      this.isCollapsed.set(!this.isCollapsed());
    }
  }
}

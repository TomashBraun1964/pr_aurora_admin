import { Component, input, model } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'av-field-group',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="av-field-group" [class.is-collapsed]="isCollapsed()">
      @if (label()) {
      <div class="av-field-group__header">
        <span class="av-field-group__label">{{ label() }}</span>
        @if (collapsible()) {
        <button class="av-field-group__toggle" (click)="toggleCollapse()" type="button">
          <av-icon
            [type]="isCollapsed() ? 'arrows/av_chevron-down' : 'arrows/av_chevron-up'"
            [size]="14"
          ></av-icon>
        </button>
        }
      </div>
      } @if (!isCollapsed()) {
      <div class="av-field-group__content">
        <ng-content></ng-content>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .av-field-group {
        position: relative;
        border: 1px solid var(--color-border-base, #d9d9d9);
        border-radius: 8px;
        padding: 16px 12px 12px;
        background: rgba(24, 144, 255, 0.02);
        margin-top: 10px;
        width: 100%;
        transition: all 0.2s ease;

        &.is-collapsed {
          padding-bottom: 2px;
          min-height: 24px;
        }

        &:hover {
          border-color: var(--color-primary, #1890ff);
          box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
        }

        &__header {
          position: absolute;
          top: -10px;
          left: 8px; // Сдвигаем левее
          display: flex;
          align-items: center;
          background: var(--color-bg-container, #ffffff); // Общий фон для маскировки линии
          padding: 0 4px;
          border-radius: 4px;
        }

        &__label {
          padding: 0 4px;
          font-size: 11px;
          font-weight: 500;
          color: var(--color-text-secondary, #8c8c8c);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          line-height: 20px;
        }

        &__toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent; // Без фона
          border: none; // Без обводки
          padding: 0;
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: var(--color-text-secondary, #8c8c8c);
          transition: all 0.2s ease;

          &:hover {
            color: var(--color-primary, #1890ff);
            transform: scale(1.15);
          }
        }

        &__content {
          display: block;
          width: 100%;

          // Для лучшего отображения дочерних элементов
          > * {
            width: 100%;
          }

          // Стили для flex контейнеров внутри
          .flex-container {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
          }

          .grid-container {
            display: grid;
            gap: 8px;
          }
        }

        // Поддержка вложенности
        & .av-field-group {
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.4); // Более светлый фон для вложенных
          border-style: dashed; // Делаем вложенные группы визуально легче

          &:hover {
            background: rgba(255, 255, 255, 0.6);
          }
        }
      }

      // Темная тема
      :host-context([data-theme='dark']) {
        .av-field-group {
          border-color: var(--dark-border-base, #434343);
          background: rgba(24, 144, 255, 0.05);

          &:hover {
            border-color: var(--color-primary, #1890ff);
            box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
          }

          &__header {
            background: var(--dark-bg-container, #1f1f1f);
            color: var(--dark-text-secondary, #bfbfbf);
          }

          &__toggle {
            background: transparent;
            border: none;
            color: var(--dark-text-secondary, #bfbfbf);

            &:hover {
              color: var(--color-primary, #1890ff);
            }
          }
        }
      }

      // Варианты стилей
      :host([variant='minimal']) {
        .av-field-group {
          border: 1px dashed var(--color-border-base, #d9d9d9);
          background: transparent;
          padding: 12px;

          &__header {
            background: var(--color-bg-container, #ffffff);
          }

          &__label {
            background: transparent;
            color: var(--color-text-tertiary, #bfbfbf);
          }

          &__toggle {
            background: transparent;
          }
        }
      }

      :host([variant='filled']) {
        .av-field-group {
          border: none;
          background: var(--color-fill-quaternary, #f5f5f5);
          padding: 16px;

          &__header {
            background: var(--color-fill-quaternary, #f5f5f5);
          }

          &__label {
            background: var(--color-fill-quaternary, #f5f5f5);
          }

          &__toggle {
            background: var(--color-fill-quaternary, #f5f5f5);
          }
        }
      }

      :host([variant='highlighted']) {
        .av-field-group {
          border: 2px solid var(--color-primary, #1890ff);
          background: rgba(24, 144, 255, 0.05);
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);

          &__label {
            color: var(--color-primary, #1890ff);
            font-weight: 600;
          }

          &__toggle {
            border-color: var(--color-primary, #1890ff);
            color: var(--color-primary, #1890ff);
          }
        }
      }

      // Размеры
      :host([size='small']) {
        .av-field-group {
          padding: 12px 8px 8px;

          &__label {
            font-size: 10px;
            padding: 0 6px;
          }
        }
      }

      :host([size='large']) {
        .av-field-group {
          padding: 20px 16px 16px;

          &__label {
            font-size: 12px;
            padding: 0 10px;
          }
        }
      }
    `,
  ],
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

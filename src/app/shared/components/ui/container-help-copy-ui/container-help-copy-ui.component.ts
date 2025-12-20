import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

/**
 * Help Copy Container Component
 *
 * Специализированный UI-блок для отображения кода или инструкций с кнопкой копирования.
 *
 * Дизайн:
 * - Внешнее "окружение" (wrapper) с настраиваемым цветом.
 * - Внутреннее белое "окно редактора" для контента.
 * - Темно-синий шрифт в светлой теме, адаптация под темную тему.
 */
@Component({
  selector: 'av-help-copy-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="av-copy-container"
      [style.width]="width()"
      [style.height]="height()"
      [style.--av-copy-bg]="bgColor() || 'var(--color-bg-help-wrapper, #1e293b)'"
    >
      <div class="av-copy-container__header">
        <h4 class="av-copy-container__title">{{ title() }}</h4>
        @if (showCopy()) {
        <button class="av-copy-container__copy-btn" (click)="copyContent()">
          {{ copied() ? 'Скопировано!' : 'Копировать' }}
        </button>
        }
      </div>
      <div class="av-copy-container__window">
        <pre class="av-copy-container__pre"><code [innerText]="content()"></code></pre>
      </div>
    </div>
  `,
  styles: [
    `
      @use 'styles/abstracts/variables' as *;
      @use 'styles/abstracts/mixins' as *;

      .av-copy-container {
        /* Переменная для управления цветом фона извне */
        --av-copy-bg: #1e293b;

        display: flex;
        flex-direction: column;
        background: var(--av-copy-bg);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        box-sizing: border-box;

        &__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        &__title {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        &__copy-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #f8fafc;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        &__window {
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #cbd5e1;
          flex: 1;
          overflow: auto;
          min-height: 50px;

          @include dark-theme {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
        }

        &__pre {
          margin: 0;
          white-space: pre;
        }

        code {
          color: #1e293b; /* Темно-синий шрифт в светлой теме */
          font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
          font-size: 13px;
          line-height: 1.6;

          @include dark-theme {
            color: #f8fafc; /* Светлый шрифт в темной теме */
          }
        }

        @include dark-theme {
          box-shadow: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      }
    `,
  ],
})
export class HelpCopyContainerComponent {
  /** Заголовок блока */
  title = input<string>('Код использования');

  /** Контент для отображения и копирования */
  content = input<string>('');

  /** Ширина контейнера (напр. '100%', '500px') */
  width = input<string>('100%');

  /** Высота контейнера (напр. 'auto', '300px') */
  height = input<string>('auto');

  /** Цвет фона внешнего окружения (напр. '#1e293b' или 'red')
   * Если не задан, используется цвет из глобальной переменной или дефолтный slate-800
   */
  bgColor = input<string | null>(null);

  /** Показывать ли кнопку копирования */
  showCopy = input<boolean>(true);

  copied = signal(false);

  copyContent() {
    if (!this.content()) return;

    navigator.clipboard.writeText(this.content()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}

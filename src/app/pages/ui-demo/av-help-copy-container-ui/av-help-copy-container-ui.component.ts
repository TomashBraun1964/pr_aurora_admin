import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';

@Component({
  selector: 'app-help-copy-container-ui',
  standalone: true,
  imports: [CommonModule, HelpCopyContainerComponent],
  template: `
    <div class="demo-container">
      <header class="demo-header">
        <h1>Help Copy Container</h1>
        <p>
          Переиспользуемый UI-блок для отображения документации, кода или инструкций с функцией
          копирования.
        </p>
      </header>

      <!-- Основной пример -->
      <section class="demo-section">
        <h3>Базовое использование</h3>
        <p>Стандартный вид: темно-синий фон (Slate 800) и белое окно контента.</p>
        <av-help-copy-container
          title="Пример заголовка"
          [content]="basicCode"
        ></av-help-copy-container>
      </section>

      <!-- Управление цветом -->
      <section class="demo-section">
        <h3>Управление цветом</h3>
        <p>Вы можете изменить цвет внешнего контейнера через параметр <code>bgColor</code>.</p>

        <div class="demo-grid">
          <div class="demo-item">
            <label>Indigo Theme</label>
            <av-help-copy-container
              title="Indigo Theme"
              content="Background color is #4338ca"
              bgColor="#4338ca"
            ></av-help-copy-container>
          </div>

          <div class="demo-item">
            <label>Emerald Theme</label>
            <av-help-copy-container
              title="Emerald Theme"
              content="Background color is #059669"
              bgColor="#059669"
            ></av-help-copy-container>
          </div>
        </div>
      </section>

      <!-- Управление размерами -->
      <section class="demo-section">
        <h3>Размеры (Width & Height)</h3>
        <p>Контейнер может занимать фиксированное место или адаптироваться под контент.</p>

        <div class="demo-grid">
          <div class="demo-item">
            <label>Fixed width (400px)</label>
            <av-help-copy-container
              title="Small Container"
              content="Width: 400px"
              width="400px"
            ></av-help-copy-container>
          </div>

          <div class="demo-item">
            <label>Fixed height (150px)</label>
            <av-help-copy-container
              title="Scrollable content"
              [content]="longContent"
              height="150px"
            ></av-help-copy-container>
          </div>
        </div>
      </section>

      <!-- Без кнопки копирования -->
      <section class="demo-section">
        <h3>Дополнительные опции</h3>
        <div class="demo-item">
          <label>Без кнопки копирования (showCopy="false")</label>
          <av-help-copy-container
            title="Только просмотр"
            content="Эту информацию нельзя скопировать кнопкой."
            [showCopy]="false"
          ></av-help-copy-container>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      @use 'styles/abstracts/variables' as *;
      @use 'styles/abstracts/mixins' as *;

      .demo-container {
        padding: 24px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .demo-header {
        margin-bottom: 40px;
        h1 {
          margin-bottom: 8px;
        }
        p {
          color: #64748b;
          font-size: 1.1rem;
        }
      }

      .demo-section {
        margin-bottom: 48px;
        h3 {
          margin-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
          @include dark-theme {
            border-color: rgba(255, 255, 255, 0.1);
          }
        }
        p {
          margin-bottom: 20px;
          color: #475569;
        }
      }

      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 24px;
      }

      .demo-item {
        display: flex;
        flex-direction: column;
        gap: 12px;
        label {
          font-weight: 600;
          font-size: 0.85rem;
          color: #64748b;
          text-transform: uppercase;
        }
      }
    `,
  ],
})
export class HelpCopyContainerUiComponent {
  basicCode = `<av-help-copy-container
  title="Код использования"
  [content]="myCode"
  bgColor="#1e293b"
></av-help-copy-container>`;

  longContent = `Это пример длинного текста
для проверки прокрутки (scroll)
внутри белого окна.
Строка 1
Строка 2
Строка 3
Строка 4
Строка 5
Конец примера.`;
}

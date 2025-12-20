import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';
import { ModalComponent } from '../../../shared/components/ui/modal';
import { SearchInputComponent } from '../../../shared/components/ui/search/search.component';

@Component({
  selector: 'app-search-ui',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    HelpCopyContainerComponent,
    ModalComponent,
    ButtonDirective,
  ],
  template: `
    <div class="demo-container">
      <header class="demo-header">
        <div class="header-content">
          <h1>Standard Live Search</h1>
          <p>Компонент поиска с поддержкой Signals, дебаунсом и кнопкой очистки.</p>
        </div>
        <div class="header-actions">
          <button av-button avType="default" (clicked)="showPrincipleModal.set(true)">
            Принцип работы
          </button>
          <button av-button avType="primary" (clicked)="showHelpModal.set(true)">
            Помощь по Search
          </button>
        </div>
      </header>

      <!-- Модал принципа работы -->
      <av-modal [(isOpen)]="showPrincipleModal" title="Принцип работы Search" size="large">
        <div modal-body>
          <av-help-copy-container
            title="Архитектура и логика"
            [content]="principleSearchCode"
            bgColor="#0f172a"
          ></av-help-copy-container>
        </div>
        <div modal-footer>
          <button av-button avType="default" (clicked)="showPrincipleModal.set(false)">
            Закрыть
          </button>
        </div>
      </av-modal>

      <!-- Модал помощи -->
      <av-modal [(isOpen)]="showHelpModal" title="Настройка компонента Search" size="large">
        <div modal-body>
          <av-help-copy-container
            title="Варианты конфигурации"
            [content]="helpSearchCode"
            bgColor="#1e293b"
          ></av-help-copy-container>
        </div>
        <div modal-footer>
          <button av-button avType="default" (clicked)="showHelpModal.set(false)">Закрыть</button>
        </div>
      </av-modal>

      <section class="demo-section">
        <h3>Пример внедрения</h3>
        <div class="demo-preview">
          <av-search
            [(value)]="searchQuery"
            (onSearch)="handleSearch($event)"
            avPlaceholder="Поиск по системе..."
            avButtonText="Найти"
          ></av-search>

          <div class="search-result">
            <strong>Текущий запрос:</strong>
            @if (currentSearch()) {
            <span class="query-tag">{{ currentSearch() }}</span>
            } @else {
            <span class="empty-hint">Введите текст для поиска...</span>
            }
          </div>
        </div>

        <!-- Использование нового переиспользуемого компонента -->
        <av-help-copy-container
          title="Код использования"
          [content]="codeSnippet"
          bgColor="#1e293b"
          width="100%"
        ></av-help-copy-container>
      </section>

      <section class="demo-section">
        <h3>Размеры</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <label>Small</label>
            <av-search avSize="small"></av-search>
          </div>
          <div class="demo-item">
            <label>Default</label>
            <av-search avSize="default"></av-search>
          </div>
          <div class="demo-item">
            <label>Large</label>
            <av-search avSize="large"></av-search>
          </div>
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
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-header {
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .header-content {
          h1 {
            margin-bottom: 8px;
          }
          p {
            color: #64748b;
            font-size: 1.1rem;
          }
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }
      }

      .demo-section {
        margin-bottom: 48px;
        h3 {
          margin-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;

          @include dark-theme {
            border-color: rgba(255, 255, 255, 0.1);
          }
        }
      }

      .demo-preview {
        background: #f8fafc;
        padding: 32px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        margin-bottom: 32px;

        @include dark-theme {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
      }

      .search-result {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px dashed #cbd5e1;

        .query-tag {
          background: #3b82f6;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          margin-left: 8px;
          font-weight: 600;
        }

        .empty-hint {
          color: #94a3b8;
          font-style: italic;
          margin-left: 8px;
        }
      }

      .demo-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .demo-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
export class SearchUiComponent {
  searchQuery = signal('');
  currentSearch = signal('');
  showHelpModal = signal(false);
  showPrincipleModal = signal(false);

  handleSearch(query: string) {
    console.log('🔍 Search triggered:', query);
    this.currentSearch.set(query);
  }

  principleSearchCode = `ПРИНЦИП РАБОТЫ КОМПОНЕНТА SEARCH

1. РЕАКТИВНОСТЬ (Signals)
   Компонент использует Angular Signals для управления состоянием.
   Свойство [(value)] является двусторонним сигналом (model),
   что обеспечивает мгновенную синхронизацию данных.

2. ЖИВОЙ ПОИСК (Debounce)
   При вводе текста срабатывает встроенный механизм задержки (300мс).
   Это предотвращает избыточные вызовы API при каждом нажатии клавиши.
   Событие (onSearch) генерируется только после паузы в наборе.

3. ПРИНУДИТЕЛЬНЫЙ ПОИСК
   Нажатие кнопки "Найти" или клавиши Enter игнорирует дебаунс
   и немедленно вызывает событие (onSearch).

4. ОЧИСТКА (Clear)
   Кнопка "X" появляется только при наличии текста.
   При нажатии она обнуляет сигнал и немедленно уведомляет родителя.

5. ДОСТУПНОСТЬ
   Поддерживается управление с клавиатуры:
   - Enter: Выполнить поиск
   - Escape: Очистить поле`;

  helpSearchCode = `// ВАРИАНТЫ НАСТРОЙКИ КОМПОНЕНТА SEARCH

// 1. БАЗОВЫЙ ПОИСК (с дебаунсом 300мс)
<av-search
  [(value)]="query"
  (onSearch)="handle($event)"
></av-search>

// 2. ПОИСК С КНОПКОЙ И КАСТОМНЫМ ТЕКСТОМ
<av-search
  avButtonText="Найти пользователя"
  avPlaceholder="Введите имя..."
  (onSearch)="handle($event)"
></av-search>

// 3. РАЗНЫЕ РАЗМЕРЫ (small, default, large)
<av-search avSize="small"></av-search>
<av-search avSize="large"></av-search>

// 4. ПОЛНЫЙ ПРИМЕР С ОБРАБОТКОЙ
@Component({
  template: \`
    <av-search
      [(value)]="search"
      (onSearch)="onSearch($event)"
      avPlaceholder="Поиск по ID..."
    ></av-search>
  \`
})
export class MyComp {
  search = signal('');

  onSearch(val: string) {
    if (val.length > 2) {
      this.api.find(val).subscribe(...);
    }
  }
}`;

  codeSnippet = `// 1. Импорт в компоненте
import { SearchInputComponent } from '@shared/components/ui/search';

@Component({
  standalone: true,
  imports: [SearchInputComponent],
  template: \`
    <av-search
      [(value)]="query"
      (onSearch)="doSearch($event)"
      avPlaceholder="Поиск..."
      avButtonText="Найти"
    ></av-search>
  \`
})
export class YourComponent {
  query = signal('');

  doSearch(val: string) {
    // Вызывается при наборе (debounce)
    // или при нажатии кнопки "Найти"
    console.log('Search for:', val);
  }
}`;
}

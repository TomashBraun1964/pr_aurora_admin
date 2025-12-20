import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';
import { SearchInputComponent } from '../../../shared/components/ui/search/search.component';

@Component({
  selector: 'app-search-ui',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, HelpCopyContainerComponent],
  template: `
    <div class="demo-container">
      <header class="demo-header">
        <h1>Standard Live Search</h1>
        <p>Компонент поиска с поддержкой Signals, дебаунсом и кнопкой очистки.</p>
      </header>

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

  handleSearch(query: string) {
    console.log('🔍 Search triggered:', query);
    this.currentSearch.set(query);
  }

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

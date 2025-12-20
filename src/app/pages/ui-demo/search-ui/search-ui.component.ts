import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';
import { ModalComponent } from '../../../shared/components/ui/modal';
import { SearchInputComponent } from '../../../shared/components/ui/search/search.component';

@Component({
  selector: 'app-search-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchInputComponent,
    HelpCopyContainerComponent,
    ModalComponent,
    ButtonDirective,
  ],
  templateUrl: './search-ui.component.html',
  styleUrl: './search-ui.component.scss',
})
export class SearchUiComponent {
  // Playground state
  searchQuery = signal('');
  lastSearchEvent = signal('');
  playgroundPlaceholder = signal('Поиск по системе...');
  playgroundButtonText = signal('Найти');
  playgroundSize = signal<'small' | 'default' | 'large' | 'x-large'>('default');
  playgroundDebounce = signal(300);

  // Modal state
  showHelpModal = signal(false);
  showPrincipleModal = signal(false);
  showGeneratedCodeModal = false;
  generatedCode = signal('');

  handleSearch(query: string) {
    console.log('🔍 Search triggered:', query);
    this.lastSearchEvent.set(query);
  }

  generatePlaygroundCode(): void {
    const attributes: string[] = [];

    attributes.push(`[(value)]="searchQuery"`);
    attributes.push(`(onSearch)="handleSearch($event)"`);

    if (this.playgroundPlaceholder() !== 'Поиск...') {
      attributes.push(`avPlaceholder="${this.playgroundPlaceholder()}"`);
    }
    if (this.playgroundButtonText() !== 'Найти') {
      attributes.push(`avButtonText="${this.playgroundButtonText()}"`);
    }
    if (this.playgroundSize() !== 'default') {
      attributes.push(`avSize="${this.playgroundSize()}"`);
    }
    if (this.playgroundDebounce() !== 300) {
      attributes.push(`[avDebounceTime]="${this.playgroundDebounce()}"`);
    }

    const htmlCode = `<av-search\n  ${attributes.join('\n  ')}\n>\n</av-search>`;

    const tsCode = `// В компоненте
searchQuery = signal('');

handleSearch(query: string) {
  console.log('Запрос:', query);
  // Загрузка данных...
}`;

    this.generatedCode.set(`${htmlCode}\n\n${tsCode}`);
    this.showGeneratedCodeModal = true;
  }

  principleSearchCode = `ПРИНЦИП РАБОТЫ КОМПОНЕНТА SEARCH

1. РЕАКТИВНОСТЬ (Signals)
   Компонент использует Angular Signals для управления состоянием.
   Свойство [(value)] является двусторонним сигналом (model),
   что обеспечивает мгновенную синхронизацию данных.

2. ЖИВОЙ ПОИСК (Debounce)
   При вводе текста срабатывает встроенный механизм задержки (по умолчанию 300мс).
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

// 3. РАЗНЫЕ РАЗМЕРЫ (small, default, large, x-large)
<av-search avSize="small"></av-search>
<av-search avSize="x-large"></av-search>

// 4. УПРАВЛЕНИЕ ЗАДЕРЖКОЙ
<av-search [avDebounceTime]="500"></av-search>`;
}

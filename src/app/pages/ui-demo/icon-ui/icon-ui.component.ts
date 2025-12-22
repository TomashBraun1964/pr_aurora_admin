import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';
import { AvIconCategory } from './icon-metadata.model';
import { ICON_REGISTRY } from './icon-registry';

@Component({
  selector: 'av-icon-ui',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, NzColorPickerModule],
  template: `
    <div class="icon-ui">
      <!-- Header Section -->
      <div class="icon-ui__header glass">
        <div class="header-main">
          <div class="title-group">
            <h1>Icon Library</h1>
            <p class="text-secondary">
              {{ totalIcons() }} иконок в {{ categories().length }} категориях
            </p>
          </div>

          <div class="search-box">
            <av-icon type="actions/av_search" [size]="18" class="search-icon"></av-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Поиск иконок по названию или категории..."
              class="search-input"
            />
            @if (searchQuery()) {
            <button class="clear-btn" (click)="searchQuery.set('')">
              <av-icon type="actions/av_close" [size]="14"></av-icon>
            </button>
            }
          </div>
        </div>

        <div class="controls">
          <div class="control-item">
            <label>Размер: {{ iconSize() }}px</label>
            <input type="range" min="16" max="64" step="4" [(ngModel)]="iconSize" />
          </div>

          <div class="control-item">
            <label>Цвет:</label>
            <div class="color-presets">
              @for (color of colors; track color) {
              <button
                class="color-dot"
                [style.background]="color"
                [class.active]="activeColor() === color"
                (click)="activeColor.set(color)"
              ></button>
              }
              <div class="custom-picker">
                <nz-color-picker
                  [nzValue]="activeColor()"
                  (nzOnChange)="onColorChange($event)"
                  nzSize="small"
                >
                </nz-color-picker>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="icon-ui__content">
        @if (filteredCategories().length === 0) {
        <div class="empty-state">
          <av-icon type="system/av_info" [size]="48"></av-icon>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить поисковый запрос</p>
        </div>
        } @for (cat of filteredCategories(); track cat.category) {
        <section class="category-section">
          <h2 class="category-title">
            {{ cat.category }}
            <span class="count">{{ cat.icons.length }}</span>
          </h2>

          <div class="icon-grid">
            @for (icon of cat.icons; track icon.type) {
            <div class="icon-card" (click)="copyToClipboard(icon.type)">
              <div class="icon-preview" [style.color]="activeColor()">
                <av-icon [type]="icon.type" [size]="iconSize()"></av-icon>
              </div>
              <div class="icon-info">
                <span class="icon-name" [title]="icon.name">{{ icon.name }}</span>
                <button class="copy-hint" (click)="$event.stopPropagation(); copyCode(icon.type)">
                  <av-icon type="actions/av_save" [size]="12"></av-icon>
                  Code
                </button>
              </div>
            </div>
            }
          </div>
        </section>
        }
      </div>

      <!-- Toast Notification (Simplified) -->
      @if (toastMessage()) {
      <div class="toast-notification fade-in">
        {{ toastMessage() }}
      </div>
      }
    </div>
  `,
  styles: [
    `
      .icon-ui {
        padding: 24px;
        padding-top: 200px; /* Space for fixed header */
        min-height: 100vh;
        background: var(--bg-primary);
      }

      .glass {
        background: rgba(var(--bg-primary-rgb, 255, 255, 255), 0.8);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(var(--border-color-rgb, 0, 0, 0), 0.1);
      }

      .icon-ui__header {
        position: fixed;
        top: 64px; /* Adjust based on admin header height */
        left: 280px; /* Adjust based on sidebar width */
        right: 0;
        z-index: 100;
        padding: 24px 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        transition: all 0.3s ease;
      }

      @media (max-width: 992px) {
        .icon-ui__header {
          left: 0;
        }
      }

      .header-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 32px;
      }

      .title-group h1 {
        margin: 0;
        font-size: 24px;
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .search-box {
        flex: 1;
        max-width: 500px;
        position: relative;
        display: flex;
        align-items: center;
      }

      .search-icon {
        position: absolute;
        left: 12px;
        color: var(--text-tertiary);
      }

      .search-input {
        width: 100%;
        padding: 10px 40px;
        border-radius: 12px;
        border: 1px solid rgba(var(--border-color-rgb, 0, 0, 0), 0.15);
        background: rgba(var(--bg-secondary-rgb, 240, 240, 240), 0.5);
        outline: none;
        transition: all 0.2s;
      }

      .search-input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      .clear-btn {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-tertiary);
        display: flex;
      }

      .controls {
        display: flex;
        gap: 40px;
        align-items: center;
      }

      .control-item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
      }

      .color-presets {
        display: flex;
        gap: 8px;
      }

      .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 1px #ddd;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .color-dot:hover {
        transform: scale(1.2);
      }
      .color-dot.active {
        transform: scale(1.2);
        box-shadow: 0 0 0 2px #6366f1;
      }

      .custom-picker {
        margin-left: 8px;
        display: flex;
        align-items: center;
      }

      /* Grid Styles */
      .category-section {
        margin-bottom: 48px;
      }

      .category-title {
        font-size: 18px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .category-title .count {
        font-size: 12px;
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
        padding: 2px 8px;
        border-radius: 10px;
      }

      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 16px;
      }

      .icon-card {
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 16px;
        padding: 20px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .icon-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        border-color: #6366f1;
      }

      .icon-preview {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .icon-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }

      .icon-name {
        font-size: 12px;
        color: var(--text-secondary);
        text-align: center;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .copy-hint {
        font-size: 10px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        color: #64748b;
        padding: 4px 8px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s;
      }

      .icon-card:hover .copy-hint {
        opacity: 1;
      }

      .copy-hint:hover {
        background: #eff6ff;
        border-color: #bfdbfe;
        color: #3b82f6;
      }

      .empty-state {
        text-align: center;
        padding: 80px 0;
        color: var(--text-tertiary);
      }

      .toast-notification {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        background: #1e293b;
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        pointer-events: none;
      }

      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
    `,
  ],
})
export class IconUiComponent {
  // Static state
  readonly colors = ['#1e293b', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Reactive state
  searchQuery = signal('');
  iconSize = signal(24);
  activeColor = signal('#1e293b');
  toastMessage = signal('');

  // Computed state
  totalIcons = computed(() => {
    return ICON_REGISTRY.reduce((acc, cat) => acc + cat.icons.length, 0);
  });

  categories = signal<AvIconCategory[]>(
    [...ICON_REGISTRY].sort((a, b) => {
      if (a.category === 'Другие') return 1;
      if (b.category === 'Другие') return -1;
      return a.category.localeCompare(b.category);
    }),
  );

  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categories();

    return this.categories()
      .map((cat) => ({
        ...cat,
        icons: cat.icons.filter(
          (icon) =>
            icon.name.toLowerCase().includes(query) || cat.category.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.icons.length > 0);
  });

  onColorChange(value: { color: { toHexString: () => string } }): void {
    if (value?.color) {
      this.activeColor.set(value.color.toHexString());
    }
  }

  copyToClipboard(type: string) {
    navigator.clipboard.writeText(type);
    this.showToast(`Тип иконки "${type}" скопирован!`);
  }

  copyCode(type: string) {
    const code = `<av-icon type="${type}" [size]="${this.iconSize()}"></av-icon>`;
    navigator.clipboard.writeText(code);
    this.showToast('Код компонента скопирован!');
  }

  private showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}

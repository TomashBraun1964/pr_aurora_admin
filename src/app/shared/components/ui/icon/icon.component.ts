import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '@core/services/icon/icon.service';

/**
 * Icon Component
 *
 * Улучшенная версия с поддержкой Signals и автоматической очисткой SVG.
 */
@Component({
  selector: 'av-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="av-icon"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.--av-icon-color]="color()"
      [style.transform]="transformStyle()"
      [style.opacity]="opacity()"
      [style.padding]="paddingStyle()"
      [style.background]="background()"
      [style.border]="border()"
      [style.border-radius]="radiusStyle()"
      [innerHTML]="svgContent()"
    ></div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
        line-height: 0;
      }

      .av-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        ::ng-deep svg {
          width: 100% !important;
          height: 100% !important;
          display: block;
          /* Наследуем цвет от родителя */
          fill: currentColor !important;

          path,
          circle,
          rect,
          polyline,
          line,
          polygon {
            /* Приоритет: CSS переменная -> currentColor -> исходный цвет */
            fill: var(--av-icon-color, currentColor) !important;
            stroke: var(--av-icon-color, currentColor) !important;
            vector-effect: non-scaling-stroke;
          }
        }
      }
    `,
  ],
})
export class IconComponent {
  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  /** Тип иконки или путь (напр. 'delete' или 'actions/av_trash') */
  type = input.required<string>();

  /** Размер в пикселях */
  size = input<number>(24);

  /** Цвет иконки (напр. '#ff0000', 'red', 'currentColor') */
  color = input<string | null>(null);

  /** Угол поворота в градусах */
  rotation = input<number>(0);

  /** Масштаб (1 - оригинальный размер) */
  scale = input<number>(1);

  /** Прозрачность (0-1) */
  opacity = input<number>(1);

  /** Отразить по горизонтали */
  flipX = input<boolean>(false);

  /** Отразить по вертикали */
  flipY = input<boolean>(false);

  /** Внутренние отступы (число = px, или строка с единицами) */
  padding = input<number | string>(0);

  /** Фон иконки */
  background = input<string>('transparent');

  /** Граница (напр. '1px solid #ccc') */
  border = input<string | null>(null);

  /** Радиус скругления */
  radius = input<number | string>(0);

  /** Вычисляемая строка трансформации */
  transformStyle = computed(() => {
    const parts = [];
    if (this.rotation() !== 0) parts.push(`rotate(${this.rotation()}deg)`);
    if (this.scale() !== 1) parts.push(`scale(${this.scale()})`);
    if (this.flipX()) parts.push('scaleX(-1)');
    if (this.flipY()) parts.push('scaleY(-1)');
    return parts.join(' ');
  });

  /** Хелпер для отступов */
  paddingStyle = computed(() => {
    const p = this.padding();
    return typeof p === 'number' ? `${p}px` : p;
  });

  /** Хелпер для радиуса */
  radiusStyle = computed(() => {
    const r = this.radius();
    return typeof r === 'number' ? `${r}px` : r;
  });

  /** Обработанное содержимое SVG */
  svgContent = signal<SafeHtml>('');

  private iconFileMap: Record<string, string> = {
    download: 'arrows/av_arrow_down.svg',
    upload: 'actions/av_upload.svg',
    delete: 'actions/av_trash.svg',
    search: 'actions/av_search.svg',
    plus: 'actions/av_plus.svg',
    settings: 'system/av_settings.svg',
    close: 'actions/av_close.svg',
    copy: 'actions/av_copy.svg',
    code: 'actions/av_copy.svg',
    'chevron-up': 'arrows/av_chevron-up.svg',
    'chevron-down': 'arrows/av_chevron-down.svg',
    info: 'system/av_info.svg',
    email: 'communication/av_mail.svg',
    user: 'users/av_user.svg',
    lock: 'security/av_lock.svg',
    check: 'actions/av_check.svg',
  };

  constructor() {
    // Реагируем на изменение type
    effect(() => {
      this.loadIcon(this.type());
    });
  }

  private loadIcon(type: string): void {
    if (!type) return;

    const mappedFile = this.iconFileMap[type];
    let iconPath = mappedFile ? `assets/icons/${mappedFile}` : type;

    // Добавляем расширение и префикс если нужно
    if (!iconPath.endsWith('.svg')) iconPath += '.svg';
    if (!iconPath.startsWith('assets/')) iconPath = `assets/icons/${iconPath}`;

    // HttpClient требует путь без ведущего слеша
    if (iconPath.startsWith('/')) iconPath = iconPath.substring(1);

    this.iconService.getIcon(iconPath).subscribe({
      next: (svgText: string) => {
        // ГЛУБОКАЯ ОЧИСТКА SVG
        const cleanedSvg = svgText
          .replace(/<\?xml.*\?>/gi, '') // Убираем XML заголовок
          .replace(/width="[^"]*"/gi, '') // Убираем жесткую ширину
          .replace(/height="[^"]*"/gi, '') // Убираем жесткую высоту
          // Заменяем все fill="..." на fill="currentColor", кроме none
          .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
          // Аналогично для stroke
          .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"');

        this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(cleanedSvg));
        console.log(`[IconComponent] ✅ Rendered: ${iconPath}`);
      },
      error: (err: any) => {
        console.error(`[IconComponent] ❌ Error loading: ${iconPath}`, err);
        // Fallback: красный квадрат
        this.svgContent.set(
          this.sanitizer.bypassSecurityTrustHtml(
            `<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="red" opacity="0.5"/></svg>`,
          ),
        );
      },
    });
  }
}

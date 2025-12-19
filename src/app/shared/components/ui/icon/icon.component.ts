// src/app/shared/components/ui/icon/icon.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '@core/services/icon/icon.service';

export type IconType =
  | 'download'
  | 'upload'
  | 'delete'
  | 'search'
  | 'plus'
  | 'settings'
  | 'close'
  | 'copy'
  | 'code'
  | 'chevron-up'
  | 'chevron-down'
  | 'info'
  | (string & {});

/**
 * Icon Component
 *
 * Компонент для отображения SVG иконок из папки assets/icons
 *
 * @example
 * <app-icon type="download" [size]="16"></app-icon>
 * <app-icon type="actions/av_add" [size]="20"></app-icon>
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [style.width.px]="size"
      [style.height.px]="size"
      [style.display]="'inline-flex'"
      [style.align-items]="'center'"
      [style.justify-content]="'center'"
      [innerHTML]="svgContent"
    ></span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      :host ::ng-deep svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `,
  ],
})
export class IconComponent implements OnInit {
  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  @Input() type: IconType = 'download';
  @Input() size: number = 24;

  svgContent: SafeHtml = '';

  // Маппинг типов иконок на файлы в assets/icons
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
  };

  ngOnInit(): void {
    this.loadIcon();
  }

  private loadIcon(): void {
    const fileName = this.iconFileMap[this.type as string];
    let iconPath = '';

    if (fileName) {
      iconPath = `assets/icons/${fileName}`;
    } else {
      // Если типа нет в мапе, пробуем загрузить как путь (например 'actions/av_search')
      iconPath = `assets/icons/${this.type}.svg`;
    }

    // Добавляем начальный слэш если его нет
    if (!iconPath.startsWith('/')) {
      iconPath = '/' + iconPath;
    }

    this.iconService.getIcon(iconPath).subscribe({
      next: (svgText) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgText);
      },
      error: (err) => {
        console.error(`Failed to load icon: ${iconPath}`, err);
        // Fallback to simple SVG if file not found
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(
          `<svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>`,
        );
      },
    });
  }
}

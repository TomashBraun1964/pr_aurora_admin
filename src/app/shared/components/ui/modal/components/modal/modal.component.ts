import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { modalAnimation } from '../../animations/modal.animations';
import { ModalPosition, ModalSize } from '../../models/modal-config.model';
import { MODAL_DATA } from '../../tokens/modal-tokens';

/**
 * Базовый компонент модального окна
 * ПРИМЕЧАНИЕ: Это простая версия для декларативного использования
 * Для программного открытия с полной поддержкой CDК используйте ModalService
 *
 * @example
 * ```html
 * <av-modal
 *   [(isOpen)]="showModal"
 *   title="Заголовок"
 *   subtitle="Подзаголовок"
 *   size="medium">
 *
 *   <div modal-body>
 *     <p>Содержимое модала</p>
 *   </div>
 *
 *   <div modal-footer>
 *     <button (click)="showModal = false">Закрыть</button>
 *   </div>
 * </av-modal>
 * ```
 */
@Component({
  selector: 'av-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [modalAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  /** Открыт ли модал */
  @Input() isOpen = false;

  /** Размер модала */
  @Input() size: ModalSize = 'medium';

  /** Позиция модала */
  @Input() position: ModalPosition = 'center';

  /** Заголовок */
  @Input() title?: string;

  /** Подзаголовок */
  @Input() subtitle?: string;

  /** Показывать кнопку закрытия */
  @Input() showCloseButton = true;

  /** Показывать backdrop */
  @Input() showBackdrop = true;

  /** Закрывать по клику на backdrop */
  @Input() closeOnBackdrop = true;

  /** Закрывать по ESC */
  @Input() closeOnEsc = true;

  /** Fullscreen на мобильных */
  @Input() mobileFullscreen = true;

  /** Breakpoint для мобильной версии */
  @Input() mobileBreakpoint = 768;

  /** Hook перед закрытием */
  @Input() beforeClose?: (result?: any) => boolean | Promise<boolean>;

  /** Состояние загрузки */
  @Input() loading = false;

  /** Блокировать footer при loading */
  @Input() disableFooterWhileLoading = true;

  /** Центрировать содержимое (для диалогов с иконками) */
  @Input() centered = false;

  /** Событие изменения isOpen */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /** Событие закрытия с результатом */
  @Output() closed = new EventEmitter<any>();

  /** Событие открытия */
  @Output() opened = new EventEmitter<void>();

  /** Эффективный размер (с учетом мобильной версии) */
  get effectiveSize(): ModalSize {
    if (
      this.mobileFullscreen &&
      typeof window !== 'undefined' &&
      window.innerWidth < this.mobileBreakpoint
    ) {
      return 'fullscreen';
    }
    return this.size;
  }

  /** CSS классы для контейнера */
  get containerClasses(): string[] {
    const classes = [
      'modal-container',
      `modal-container--${this.effectiveSize}`,
      `modal-container--${this.position}`,
    ];

    if (this.centered) {
      classes.push('modal-container--centered');
    }

    return classes;
  }

  /** CSS классы для обертки */
  get wrapperClasses(): string[] {
    return ['modal-wrapper', `modal-wrapper--${this.position}`];
  }

  ngOnInit(): void {
    if (this.isOpen) {
      this.onOpen();
    }
  }

  ngOnDestroy(): void {
    this.removeBodyScrollLock();
  }

  /**
   * Закрыть модал
   */
  async close(result?: any): Promise<void> {
    // Вызываем beforeClose если есть
    if (this.beforeClose) {
      const canClose = await this.beforeClose(result);
      if (!canClose) {
        return; // Отменяем закрытие
      }
    }

    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit(result);
    this.removeBodyScrollLock();
  }

  /**
   * Обработка клика на backdrop
   */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * Обработка нажатия клавиш
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.closeOnEsc && event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Обработка открытия
   */
  private onOpen(): void {
    this.addBodyScrollLock();
    this.opened.emit();
  }

  /**
   * Блокировка скролла body
   */
  private addBodyScrollLock(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Снятие блокировки скролла body
   */
  private removeBodyScrollLock(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}

/**
 * Компонент для рендеринга template внутри CDK Overlay
 * Используется ModalService для программного открытия
 */
@Component({
  selector: 'av-modal-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-content-wrapper">
      <!-- Header -->
      <div class="modal-header" *ngIf="data?.title || data?.showCloseButton !== false">
        <div class="modal-header__content">
          <h2 *ngIf="data?.title" class="modal-header__title">{{ data.title }}</h2>
          <p *ngIf="data?.subtitle" class="modal-header__subtitle">{{ data.subtitle }}</p>
        </div>
        <button
          *ngIf="data?.showCloseButton !== false"
          type="button"
          class="modal-header__close"
          (click)="closeModal()"
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <ng-container
          *ngIf="data?.template"
          [ngTemplateOutlet]="data.template"
          [ngTemplateOutletContext]="data.context || {}"
        ></ng-container>
      </div>

      <!-- Footer -->
      <div class="modal-footer" *ngIf="data?.footerTemplate">
        <ng-container
          [ngTemplateOutlet]="data.footerTemplate"
          [ngTemplateOutletContext]="data.context || {}"
        ></ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ModalContentComponent {
  data = inject(MODAL_DATA, { optional: true });

  closeModal(): void {
    // ModalRef будет инжектирован в родительском компоненте
    // Это просто placeholder для кнопки закрытия
  }
}

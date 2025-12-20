import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ButtonDirective } from '../../../../shared/components/ui/button/button.directive';
import { MODAL_DATA, ModalRef } from '../../../../shared/components/ui/modal';

@Component({
  selector: 'app-demo-modal-content',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="demo-modal-content">
      <h3>{{ data.title || 'Динамический модал' }}</h3>
      <p>{{ data.message || 'Этот компонент был открыт через ModalService' }}</p>

      <div class="data-display" *ngIf="data.items">
        <ul>
          <li *ngFor="let item of data.items">{{ item }}</li>
        </ul>
      </div>

      <div class="actions">
        <button av-button avType="primary" (clicked)="close('success')">Подтвердить</button>
        <button av-button avType="default" (clicked)="close()">Отмена</button>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-modal-content {
        padding: 1rem;
      }
      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }
      .data-display {
        margin: 1rem 0;
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 4px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1.5rem;
      }
    `,
  ],
})
export class DemoModalContentComponent {
  constructor(@Inject(MODAL_DATA) public data: any, private modalRef: ModalRef) {}

  close(result?: any) {
    this.modalRef.close(result);
  }
}

// src/app/pages/ui-demo/toggle-ui/toggle-ui.component.ts
import { Component } from '@angular/core';

/**
 * Toggle UI Demo Component
 *
 * Демонстрация Toggle компонента
 * (будет реализован позже)
 */
@Component({
  selector: 'app-toggle-ui',
  standalone: true,
  imports: [],
  template: `
    <div class="toggle-ui-demo">
      <div class="demo-header">
        <h1>Toggle Component</h1>
        <p class="text-secondary">Toggle компонент будет реализован здесь</p>
      </div>

      <section class="demo-section">
        <h2>Coming Soon...</h2>
        <p>Этот раздел находится в разработке</p>
      </section>
    </div>
  `,
  styles: `
    .toggle-ui-demo {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-header {
      margin-bottom: 48px;

      h1 {
        margin: 0 0 8px 0;
        font-size: 32px;
        font-weight: 600;
      }

      .text-secondary {
        margin: 0;
        font-size: 16px;
        color: var(--color-text-secondary, #8c8c8c);
      }
    }

    .demo-section {
      padding: 24px;
      background: var(--color-bg-container, #fff);
      border: 1px solid var(--color-border-base, #d9d9d9);
      border-radius: 8px;

      h2 {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 600;
      }
    }
  `,
})
export class ToggleUiComponent {}

// src/app/pages/ui-demo/input-ui/input-ui.component.ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/ui/form-field/form-field.component';

/**
 * Input UI Demo Component
 *
 * Демонстрация Input и FormField компонентов
 */
@Component({
  selector: 'app-input-ui',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="input-ui-demo">
      <div class="demo-header">
        <h1>Input & Form Field Components</h1>
        <p class="text-secondary">Демонстрация полей ввода с валидацией</p>
      </div>

      <!-- Form Fields -->
      <section class="demo-section">
        <h2>Form Fields</h2>
        <p class="text-secondary">Поля ввода с валидацией и сообщениями об ошибках</p>

        <div class="demo-group">
          <app-form-field label="Username" [required]="true">
            <input type="text" [formControl]="usernameControl" placeholder="Enter username" />
          </app-form-field>

          <app-form-field label="Email" [required]="true">
            <input type="email" [formControl]="emailControl" placeholder="Enter email" />
          </app-form-field>

          <app-form-field label="Password" [required]="true">
            <input type="password" [formControl]="passwordControl" placeholder="Enter password" />
          </app-form-field>

          <app-form-field label="Description" helpText="Optional field">
            <textarea
              [formControl]="descriptionControl"
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </app-form-field>
        </div>

        <pre class="code-example"><code>&lt;app-form-field label="Username" [required]="true"&gt;
  &lt;input type="text" [formControl]="usernameControl" placeholder="Enter username" /&gt;
&lt;/app-form-field&gt;

&lt;app-form-field label="Email" [required]="true"&gt;
  &lt;input type="email" [formControl]="emailControl" placeholder="Enter email" /&gt;
&lt;/app-form-field&gt;</code></pre>
      </section>
    </div>
  `,
  styles: `
    .input-ui-demo {
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
      margin-bottom: 48px;
      padding: 24px;
      background: var(--color-bg-container, #fff);
      border: 1px solid var(--color-border-base, #d9d9d9);
      border-radius: 8px;

      h2 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 600;
      }

      .text-secondary {
        margin: 0 0 24px 0;
        font-size: 14px;
        color: var(--color-text-secondary, #8c8c8c);
      }
    }

    .demo-group {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 24px;
    }

    .code-example {
      margin: 24px 0 0 0;
      padding: 16px;
      background: var(--color-bg-layout, #f5f5f5);
      border: 1px solid var(--color-border-base, #e8e8e8);
      border-radius: 6px;
      overflow-x: auto;

      code {
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: var(--color-text-primary, #262626);
      }
    }
  `,
})
export class InputUiComponent {
  usernameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  descriptionControl = new FormControl('');
}

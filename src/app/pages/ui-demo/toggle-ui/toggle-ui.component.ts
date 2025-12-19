// src/app/pages/ui-demo/toggle-ui/toggle-ui.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { ToggleLabeledComponent } from '../../../shared/components/ui/toggle/toggle-labeled.component';
import { ToggleComponent } from '../../../shared/components/ui/toggle/toggle.component';
import { ToggleDirective } from '../../../shared/components/ui/toggle/toggle.directive';

/**
 * Toggle UI Demo Component
 *
 * Демонстрация Toggle компонента - переключатель on/off
 * Показывает все варианты использования: Directive, Component, разные размеры и цвета
 */
@Component({
  selector: 'app-toggle-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective,
    ToggleDirective,
    ToggleComponent,
    ToggleLabeledComponent,
  ],
  template: `
    <div class="toggle-ui-demo">
      <div class="demo-header">
        <h1>Toggle Component</h1>
        <p class="text-secondary">
          Кнопка-переключатель (Switch) - 4 способа использования включая iOS-стиль
        </p>
      </div>

      <!-- Help Section -->
      <div class="help-section">
        <button
          av-button
          avType="primary"
          avSize="small"
          (click)="toggleHelp()"
          style="margin-bottom: 16px"
        >
          @if (showHelp()) { ❌ Скрыть инструкцию } @else { ℹ️ Показать инструкцию по подключению }
        </button>

        @if (showHelp()) {
        <div class="help-content">
          <h4>Как подключить Toggle в проекте</h4>

          <div class="help-step">
            <strong>📦 Вариант 1: Директива (рекомендуемый)</strong>
            <p>
              Для использования директивы на нативных checkbox - самый гибкий и легковесный способ
            </p>
            <pre class="code-example"><code>// 1. Импортируйте директиву и FormsModule
import {{ '{' }} ToggleDirective {{ '}' }} from '&#64;shared/components/ui/toggle';
import {{ '{' }} FormsModule {{ '}' }} from '&#64;angular/forms';

// 2. Добавьте в imports компонента
&#64;Component({{ '{' }}
  selector: 'app-my-component',
  standalone: true,
  imports: [FormsModule, ToggleDirective],
  ...
{{ '}' }})

// 3. Используйте в шаблоне
&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" avToggle [(ngModel)]="isEnabled" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;</code></pre>
          </div>

          <div class="help-step">
            <strong>🎨 Вариант 2: Компонент (для сложных кейсов)</strong>
            <p>Готовый компонент с автоматическим label - удобен для форм</p>
            <pre class="code-example"><code>// 1. Импортируйте компонент
import {{ '{' }} ToggleComponent {{ '}' }} from '&#64;shared/components/ui/toggle';

// 2. Добавьте в imports
&#64;Component({{ '{' }}
  imports: [ToggleComponent],
  ...
{{ '}' }})

// 3. Используйте с label
&lt;av-toggle [(checked)]="notifications"&gt;
  Enable Notifications
&lt;/av-toggle&gt;</code></pre>
          </div>

          <div class="help-step">
            <strong>🎯 Доступные параметры директивы:</strong>
            <ul>
              <li>
                <code>avSize</code> - размер переключателя:
                <ul>
                  <li><code>small</code> - маленький (36×18px)</li>
                  <li><code>default</code> - стандартный (44×22px) - по умолчанию</li>
                  <li><code>large</code> - большой (52×26px)</li>
                </ul>
              </li>
              <li>
                <code>avColor</code> - цветовая схема:
                <ul>
                  <li><code>primary</code> - синий (#1890ff) - по умолчанию</li>
                  <li><code>success</code> - зеленый (#52c41a)</li>
                  <li><code>warning</code> - оранжевый (#faad14)</li>
                  <li><code>danger</code> - красный (#ff4d4f)</li>
                </ul>
              </li>
              <li><code>[(ngModel)]</code> - двусторонняя привязка данных</li>
              <li><code>[disabled]</code> - отключенное состояние</li>
            </ul>
          </div>

          <div class="help-step">
            <strong>📝 Примеры использования:</strong>
            <pre class="code-example"><code>&lt;!-- Базовый toggle --&gt;
&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" avToggle [(ngModel)]="isEnabled" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;

&lt;!-- С размером и цветом --&gt;
&lt;label class="av-toggle"&gt;
  &lt;input
    type="checkbox"
    avToggle
    avSize="large"
    avColor="success"
    [(ngModel)]="autoSave"
  /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;

&lt;!-- Отключенный --&gt;
&lt;label class="av-toggle"&gt;
  &lt;input
    type="checkbox"
    avToggle
    [(ngModel)]="value"
    [disabled]="true"
  /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;

&lt;!-- С компонентом и label --&gt;
&lt;av-toggle
  [(checked)]="darkMode"
  [size]="'large'"
  [color]="'primary'"
&gt;
  Dark Mode
&lt;/av-toggle&gt;</code></pre>
          </div>

          <div class="help-step">
            <strong>🔄 Работа с FormControl:</strong>
            <pre class="code-example"><code>// В компоненте
import {{ '{' }} FormControl, ReactiveFormsModule {{ '}' }} from '&#64;angular/forms';

export class MyComponent {{ '{' }}
  enabledControl = new FormControl(false);
{{ '}' }}

// В шаблоне
&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" avToggle [formControl]="enabledControl" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;

&lt;!-- Или с компонентом --&gt;
&lt;av-toggle [formControl]="enabledControl"&gt;Enable Feature&lt;/av-toggle&gt;</code></pre>
          </div>

          <div class="help-step">
            <strong>🎭 Pure CSS (без Angular):</strong>
            <p>Можно использовать только CSS классы без директив</p>
            <pre class="code-example"><code>&lt;!-- Базовый --&gt;
&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;

&lt;!-- С модификаторами --&gt;
&lt;label class="av-toggle av-toggle--large av-toggle--success"&gt;
  &lt;input type="checkbox" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;</code></pre>
          </div>

          <div class="help-step">
            <strong>💡 Рекомендации:</strong>
            <ul>
              <li>
                ✅ Используйте <strong>Directive</strong> для максимальной гибкости и контроля
              </li>
              <li>✅ Используйте <strong>Component</strong> когда нужен label или FormControl</li>
              <li>✅ Используйте <strong>Pure CSS</strong> для кастомной интеграции</li>
              <li>🎯 Используйте <strong>Labeled Toggle</strong> для iOS-стиля с текстом внутри</li>
              <li>⚠️ Всегда оборачивайте input в <code>&lt;label class="av-toggle"&gt;</code></li>
              <li>⚠️ Не забывайте добавлять <code>&lt;span class="av-toggle__slider"&gt;</code></li>
            </ul>
          </div>

          <div class="help-step">
            <strong>🎯 Labeled Toggle (iOS Style):</strong>
            <p>Переключатель с текстовыми метками внутри - идеален для режимов вкл/выкл</p>
            <pre class="code-example"><code>// 1. Импортируйте компонент
import {{ '{' }} ToggleLabeledComponent {{ '}' }} from '&#64;shared/components/ui/toggle';

// 2. Добавьте в imports компонента
&#64;Component({{ '{' }}
  imports: [ToggleLabeledComponent]
{{ '}' }})

// 3. Используйте в шаблоне
&lt;av-toggle-labeled
  [(checked)]="modeToggle"
  leftLabel="Assistive"
  rightLabel="Expert"
/&gt;

&lt;av-toggle-labeled
  [(checked)]="soundToggle"
  leftLabel="ON"
  rightLabel="OFF"
  size="large"
/&gt;</code></pre>
            <p><strong>Параметры:</strong></p>
            <ul>
              <li><code>leftLabel</code> - текст слева (показывается когда checked=false)</li>
              <li><code>rightLabel</code> - текст справа (показывается когда checked=true)</li>
              <li><code>size</code> - small (120×32px), default (140×40px), large (160×48px)</li>
              <li><code>[(checked)]</code> - двустороннее связывание</li>
              <li><code>disabled</code> - отключить переключатель</li>
            </ul>
          </div>
        </div>
        }
      </div>

      <!-- Вариант 1: Directive (рекомендуемый) -->
      <section class="demo-section">
        <h2>1. Toggle Directive (рекомендуемый) ⭐</h2>
        <p class="text-secondary">Использование директивы avToggle на нативных checkbox</p>

        <h3>Базовый пример</h3>
        <div class="demo-group">
          <label class="av-toggle">
            <input type="checkbox" avToggle [(ngModel)]="directiveToggle1" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="toggle-status">{{ directiveToggle1 ? 'ON' : 'OFF' }}</span>
        </div>

        <pre class="code-example"><code>&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" avToggle [(ngModel)]="isEnabled" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;</code></pre>

        <h3>Размеры</h3>
        <div class="demo-group">
          <label class="av-toggle">
            <input type="checkbox" avToggle avSize="small" [(ngModel)]="directiveSmall" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="size-label">Small</span>

          <label class="av-toggle">
            <input type="checkbox" avToggle avSize="default" [(ngModel)]="directiveDefault" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="size-label">Default</span>

          <label class="av-toggle">
            <input type="checkbox" avToggle avSize="large" [(ngModel)]="directiveLarge" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="size-label">Large</span>
        </div>

        <pre class="code-example"><code>&lt;input type="checkbox" avToggle avSize="small" /&gt;
&lt;input type="checkbox" avToggle avSize="default" /&gt;
&lt;input type="checkbox" avToggle avSize="large" /&gt;</code></pre>

        <h3>Цвета</h3>
        <div class="demo-group">
          <label class="av-toggle">
            <input
              type="checkbox"
              avToggle
              avColor="primary"
              [(ngModel)]="directivePrimary"
              checked
            />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="color-label">Primary (синий)</span>

          <label class="av-toggle">
            <input
              type="checkbox"
              avToggle
              avColor="success"
              [(ngModel)]="directiveSuccess"
              checked
            />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="color-label">Success (зеленый)</span>

          <label class="av-toggle">
            <input
              type="checkbox"
              avToggle
              avColor="warning"
              [(ngModel)]="directiveWarning"
              checked
            />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="color-label">Warning (оранжевый)</span>

          <label class="av-toggle">
            <input
              type="checkbox"
              avToggle
              avColor="danger"
              [(ngModel)]="directiveDanger"
              checked
            />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="color-label">Danger (красный)</span>
        </div>

        <pre class="code-example"><code>&lt;input type="checkbox" avToggle avColor="primary" /&gt;
&lt;input type="checkbox" avToggle avColor="success" /&gt;
&lt;input type="checkbox" avToggle avColor="warning" /&gt;
&lt;input type="checkbox" avToggle avColor="danger" /&gt;</code></pre>

        <h3>Состояния</h3>
        <div class="demo-group">
          <label class="av-toggle">
            <input type="checkbox" avToggle [(ngModel)]="directiveDisabled" [disabled]="true" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="state-label">Disabled OFF</span>

          <label class="av-toggle">
            <input
              type="checkbox"
              avToggle
              [(ngModel)]="directiveDisabledChecked"
              [disabled]="true"
            />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="state-label">Disabled ON</span>
        </div>

        <pre
          class="code-example"
        ><code>&lt;input type="checkbox" avToggle disabled /&gt;</code></pre>
      </section>

      <!-- Вариант 2: Component -->
      <section class="demo-section">
        <h2>2. Toggle Component</h2>
        <p class="text-secondary">
          Standalone компонент для упрощенного использования с автоматическим label
        </p>

        <h3>Базовый пример</h3>
        <div class="demo-group">
          <av-toggle [(checked)]="componentToggle1" />
          <span class="toggle-status">{{ componentToggle1 ? 'ON' : 'OFF' }}</span>
        </div>

        <pre class="code-example"><code>&lt;av-toggle [(checked)]="isEnabled" /&gt;</code></pre>

        <h3>С label</h3>
        <div class="demo-group-vertical">
          <av-toggle [(checked)]="notifications">Enable Notifications</av-toggle>
          <av-toggle [(checked)]="darkMode" [color]="'primary'">Dark Mode</av-toggle>
          <av-toggle [(checked)]="autoSave" [color]="'success'">Auto Save</av-toggle>
        </div>

        <pre class="code-example"><code>&lt;av-toggle [(checked)]="notifications"&gt;
  Enable Notifications
&lt;/av-toggle&gt;</code></pre>

        <h3>Размеры с label</h3>
        <div class="demo-group-vertical">
          <av-toggle [(checked)]="small" [size]="'small'">Small Toggle</av-toggle>
          <av-toggle [(checked)]="defaultSize" [size]="'default'">Default Toggle</av-toggle>
          <av-toggle [(checked)]="large" [size]="'large'">Large Toggle</av-toggle>
        </div>

        <pre class="code-example"><code>&lt;av-toggle [(checked)]="value" [size]="'large'"&gt;
  Large Toggle
&lt;/av-toggle&gt;</code></pre>

        <h3>Разные цвета с label</h3>
        <div class="demo-group-vertical">
          <av-toggle [(checked)]="primaryChecked" [color]="'primary'">Primary Color</av-toggle>
          <av-toggle [(checked)]="successChecked" [color]="'success'">Success Color</av-toggle>
          <av-toggle [(checked)]="warningChecked" [color]="'warning'">Warning Color</av-toggle>
          <av-toggle [(checked)]="dangerChecked" [color]="'danger'">Danger Color</av-toggle>
        </div>

        <pre class="code-example"><code>&lt;av-toggle [(checked)]="value" [color]="'success'"&gt;
  Success Color
&lt;/av-toggle&gt;</code></pre>

        <h3>Disabled state</h3>
        <div class="demo-group-vertical">
          <av-toggle [checked]="false" [disabled]="true">Disabled OFF</av-toggle>
          <av-toggle [checked]="true" [disabled]="true">Disabled ON</av-toggle>
        </div>

        <pre class="code-example"><code>&lt;av-toggle [checked]="true" [disabled]="true"&gt;
  Disabled
&lt;/av-toggle&gt;</code></pre>
      </section>

      <!-- Вариант 3: Только CSS -->
      <section class="demo-section">
        <h2>3. Pure CSS (без Angular)</h2>
        <p class="text-secondary">Использование только CSS классов без директив</p>

        <h3>Базовый пример</h3>
        <div class="demo-group">
          <label class="av-toggle">
            <input type="checkbox" [(ngModel)]="cssToggle1" />
            <span class="av-toggle__slider"></span>
          </label>
          <span class="toggle-status">{{ cssToggle1 ? 'ON' : 'OFF' }}</span>
        </div>

        <pre class="code-example"><code>&lt;label class="av-toggle"&gt;
  &lt;input type="checkbox" /&gt;
  &lt;span class="av-toggle__slider"&gt;&lt;/span&gt;
&lt;/label&gt;</code></pre>

        <h3>С модификаторами размеров</h3>
        <div class="demo-group">
          <label class="av-toggle av-toggle--small">
            <input type="checkbox" [(ngModel)]="cssSmall" />
            <span class="av-toggle__slider"></span>
          </label>

          <label class="av-toggle">
            <input type="checkbox" [(ngModel)]="cssDefault" />
            <span class="av-toggle__slider"></span>
          </label>

          <label class="av-toggle av-toggle--large">
            <input type="checkbox" [(ngModel)]="cssLarge" />
            <span class="av-toggle__slider"></span>
          </label>
        </div>

        <pre
          class="code-example"
        ><code>&lt;label class="av-toggle av-toggle--small"&gt;...&lt;/label&gt;
&lt;label class="av-toggle"&gt;...&lt;/label&gt;
&lt;label class="av-toggle av-toggle--large"&gt;...&lt;/label&gt;</code></pre>

        <h3>С модификаторами цвета</h3>
        <div class="demo-group">
          <label class="av-toggle av-toggle--success">
            <input type="checkbox" [(ngModel)]="cssSuccess" checked />
            <span class="av-toggle__slider"></span>
          </label>

          <label class="av-toggle av-toggle--warning">
            <input type="checkbox" [(ngModel)]="cssWarning" checked />
            <span class="av-toggle__slider"></span>
          </label>

          <label class="av-toggle av-toggle--danger">
            <input type="checkbox" [(ngModel)]="cssDanger" checked />
            <span class="av-toggle__slider"></span>
          </label>
        </div>

        <pre
          class="code-example"
        ><code>&lt;label class="av-toggle av-toggle--success"&gt;...&lt;/label&gt;
&lt;label class="av-toggle av-toggle--warning"&gt;...&lt;/label&gt;
&lt;label class="av-toggle av-toggle--danger"&gt;...&lt;/label&gt;</code></pre>
      </section>

      <!-- Вариант 4: Labeled Toggle (iOS Style) -->
      <section class="demo-section">
        <h2>4. Labeled Toggle (iOS Style) 🎯</h2>
        <p class="text-secondary">Переключатель с текстом внутри в стиле iOS</p>

        <h3>Базовые примеры</h3>
        <div class="demo-group-vertical">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled
              [(checked)]="modeToggle"
              leftLabel="Assistive"
              rightLabel="Expert"
            />
            <span class="toggle-status">{{ modeToggle ? 'Expert Mode' : 'Assistive Mode' }}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <av-toggle-labeled [(checked)]="soundToggle" leftLabel="ON" rightLabel="OFF" />
            <span class="toggle-status">Sound: {{ soundToggle ? 'OFF' : 'ON' }}</span>
          </div>
        </div>

        <pre class="code-example"><code>&lt;av-toggle-labeled
  [(checked)]="modeToggle"
  leftLabel="Assistive"
  rightLabel="Expert"
/&gt;

&lt;av-toggle-labeled
  [(checked)]="soundToggle"
  leftLabel="ON"
  rightLabel="OFF"
/&gt;</code></pre>

        <h3>Размеры</h3>
        <div class="demo-group-vertical">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled
              [(checked)]="labeledSmall"
              leftLabel="OFF"
              rightLabel="ON"
              size="small"
            />
            <span class="size-label">Small (120×32px)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled
              [(checked)]="labeledDefault"
              leftLabel="OFF"
              rightLabel="ON"
              size="default"
            />
            <span class="size-label">Default (140×40px)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <av-toggle-labeled
              [(checked)]="labeledLarge"
              leftLabel="OFF"
              rightLabel="ON"
              size="large"
            />
            <span class="size-label">Large (160×48px)</span>
          </div>
        </div>

        <pre class="code-example"><code>&lt;av-toggle-labeled size="small" /&gt;
&lt;av-toggle-labeled size="default" /&gt;
&lt;av-toggle-labeled size="large" /&gt;</code></pre>

        <h3>Различные метки</h3>
        <div class="demo-group-vertical">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled [(checked)]="yesNoToggle" leftLabel="NO" rightLabel="YES" />
            <span class="toggle-status">Answer: {{ yesNoToggle ? 'YES' : 'NO' }}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled [(checked)]="dayNightToggle" leftLabel="DAY" rightLabel="NIGHT" />
            <span class="toggle-status">{{ dayNightToggle ? 'Night Mode' : 'Day Mode' }}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <av-toggle-labeled
              [(checked)]="manualAutoToggle"
              leftLabel="MANUAL"
              rightLabel="AUTO"
            />
            <span class="toggle-status">{{ manualAutoToggle ? 'Auto Mode' : 'Manual Mode' }}</span>
          </div>
        </div>

        <pre class="code-example"><code>&lt;av-toggle-labeled
  leftLabel="NO"
  rightLabel="YES"
/&gt;

&lt;av-toggle-labeled
  leftLabel="DAY"
  rightLabel="NIGHT"
/&gt;</code></pre>

        <h3>Disabled state</h3>
        <div class="demo-group-vertical">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
            <av-toggle-labeled
              [checked]="false"
              [disabled]="true"
              leftLabel="OFF"
              rightLabel="ON"
            />
            <span class="state-label">Disabled (OFF)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <av-toggle-labeled
              [checked]="true"
              [disabled]="true"
              leftLabel="OFF"
              rightLabel="ON"
            />
            <span class="state-label">Disabled (ON)</span>
          </div>
        </div>

        <pre class="code-example"><code>&lt;av-toggle-labeled [disabled]="true" /&gt;</code></pre>
      </section>

      <!-- Сравнительная таблица -->
      <section class="demo-section">
        <h2>📊 Какой вариант выбрать?</h2>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Критерий</th>
              <th>Directive ⭐</th>
              <th>Component</th>
              <th>Pure CSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Простота</strong></td>
              <td>⭐⭐⭐</td>
              <td>⭐⭐⭐</td>
              <td>⭐⭐</td>
            </tr>
            <tr>
              <td><strong>Гибкость</strong></td>
              <td>⭐⭐⭐</td>
              <td>⭐⭐</td>
              <td>⭐⭐⭐</td>
            </tr>
            <tr>
              <td><strong>TypeScript типизация</strong></td>
              <td>⭐⭐⭐</td>
              <td>⭐⭐⭐</td>
              <td>❌</td>
            </tr>
            <tr>
              <td><strong>Two-way binding</strong></td>
              <td>✅ ngModel</td>
              <td>✅ checked</td>
              <td>✅ ngModel</td>
            </tr>
            <tr>
              <td><strong>FormControl</strong></td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td><strong>Рекомендация</strong></td>
              <td>✅ Основной</td>
              <td>⚠️ Для сложных кейсов</td>
              <td>⚠️ Для кастомизации</td>
            </tr>
          </tbody>
        </table>
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
      margin-bottom: 24px;

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

    .help-section {
      margin-bottom: 32px;
      padding: 20px;
      background: #f0f7ff;
      border: 1px solid #bae0ff;
      border-radius: 8px;

      .help-content {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #bae0ff;

        h4 {
          margin: 0 0 20px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-primary, #262626);
        }
      }

      .help-step {
        margin-bottom: 24px;

        strong {
          display: block;
          margin-bottom: 8px;
          font-size: 15px;
          color: var(--color-primary, #1890ff);
        }

        p {
          margin: 4px 0 12px 0;
          font-size: 14px;
          color: var(--color-text-secondary, #8c8c8c);
        }

        ul {
          margin: 8px 0;
          padding-left: 24px;

          li {
            margin-bottom: 6px;
            font-size: 14px;
            color: var(--color-text-secondary, #595959);
            line-height: 1.6;

            code {
              background: white;
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 13px;
              color: var(--color-primary, #1890ff);
              font-family: 'Consolas', 'Monaco', monospace;
            }

            ul {
              margin-top: 4px;
              padding-left: 20px;

              li {
                margin-bottom: 4px;
                font-size: 13px;
              }
            }
          }
        }

        .code-example {
          margin: 8px 0;
          padding: 14px;
          background: white;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          overflow-x: auto;

          code {
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #262626;
            white-space: pre;
          }
        }
      }
    }

    .demo-group {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .demo-group-vertical {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .toggle-status,
    .size-label,
    .color-label,
    .state-label {
      font-weight: 600;
      font-size: 14px;
      color: var(--color-text-primary, #262626);
      min-width: 40px;
    }

    h3 {
      margin: 24px 0 16px 0;
      font-size: 18px;
      font-weight: 500;
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;

      th,
      td {
        padding: 12px;
        text-align: left;
        border: 1px solid var(--color-border-base, #d9d9d9);
      }

      th {
        background: var(--color-bg-layout, #f5f5f5);
        font-weight: 600;
      }

      td {
        font-size: 14px;
      }
    }

    .code-example {
      margin: 16px 0;
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
        white-space: pre;
      }
    }

    /* Dark Theme Support */
    [data-theme='dark'] {
      .demo-section {
        background: #1f1f1f;
        border-color: #434343;
      }

      .code-example {
        background: #1f1f1f;
        border-color: #434343;

        code {
          color: #e0e0e0;
        }
      }

      .toggle-status,
      .size-label,
      .color-label,
      .state-label {
        color: rgba(255, 255, 255, 0.85);
      }

      .comparison-table {
        th {
          background: #262626;
        }

        th,
        td {
          border-color: #434343;
          color: rgba(255, 255, 255, 0.85);
        }
      }

      .help-section {
        background: #1f1f1f;
        border-color: #434343;

        .help-content {
          border-top-color: #434343;

          h4 {
            color: rgba(255, 255, 255, 0.85);
          }

          .help-step {
            strong {
              color: rgba(255, 255, 255, 0.85);
            }

            ul li {
              color: rgba(255, 255, 255, 0.65);
            }

            code {
              background: #262626;
              color: #e0e0e0;
            }

            .code-example {
              background: #262626;
              border-color: #434343;
            }
          }
        }
      }
    }
  `,
})
export class ToggleUiComponent {
  // Help section
  showHelp = signal(false);

  toggleHelp(): void {
    this.showHelp.update((v) => !v);
  }

  // Вариант 1: Directive examples
  directiveToggle1 = false;
  directiveSmall = false;
  directiveDefault = true;
  directiveLarge = false;
  directivePrimary = true;
  directiveSuccess = true;
  directiveWarning = true;
  directiveDanger = true;
  directiveDisabled = false;
  directiveDisabledChecked = true;

  // Вариант 2: Component examples
  componentToggle1 = false;
  notifications = true;
  darkMode = false;
  autoSave = true;
  small = false;
  defaultSize = true;
  large = false;
  primaryChecked = true;
  successChecked = true;
  warningChecked = true;
  dangerChecked = true;

  // Вариант 3: Pure CSS examples
  cssToggle1 = false;
  cssSmall = false;
  cssDefault = true;
  cssLarge = false;
  cssSuccess = true;
  cssWarning = true;
  cssDanger = true;

  // Вариант 4: Labeled Toggle examples
  modeToggle = false;
  soundToggle = false;
  labeledSmall = true;
  labeledDefault = true;
  labeledLarge = true;
  yesNoToggle = false;
  dayNightToggle = false;
  manualAutoToggle = true;
}


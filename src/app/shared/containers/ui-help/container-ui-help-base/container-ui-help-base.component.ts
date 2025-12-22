import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelpCopyContainerComponent } from '@shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import { IconComponent } from '@shared/components/ui/icon/icon.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-container-ui-help-base',
  standalone: true,
  imports: [
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    HelpCopyContainerComponent,
    IconComponent,
  ],
  templateUrl: './container-ui-help-base.component.html',
  styleUrl: './container-ui-help-base.component.scss',
})
export class ContainerUiHelpBaseComponent {
  isSection1Visible = signal(true);
  isSection2Visible = signal(true);
  isSection3Visible = signal(true);
  isSection4Visible = signal(true);
  isSection5Visible = signal(true);

  // Playground - Button properties
  pgButtonType = signal<'primary' | 'default' | 'dashed' | 'text' | 'link' | 'danger'>('primary');
  pgButtonSize = signal<'small' | 'default' | 'large'>('default');
  pgButtonShape = signal<'default' | 'circle' | 'square' | 'round' | 'rounded'>('default');
  pgButtonColor = signal<string>('#1890ff');
  pgShowOtherBlock = signal(true);

  toggleSection1() {
    this.isSection1Visible.set(!this.isSection1Visible());
  }

  toggleSection2() {
    this.isSection2Visible.set(!this.isSection2Visible());
  }

  toggleSection3() {
    this.isSection3Visible.set(!this.isSection3Visible());
  }

  toggleSection4() {
    this.isSection4Visible.set(!this.isSection4Visible());
  }

  toggleSection5() {
    this.isSection5Visible.set(!this.isSection5Visible());
  }

  // Section 1 - Technical Interface
  section1Title = 'Interface: ComponentProps';
  section1BgColor = '#0a0e1a';
  section1Content = `Заглушка`;
  section1HelpContent = ``;

  // Section 3 - Documentation for the layout
  section3Title = 'Документация: Структура и Верстка';
  section3BgColor = '#1e293b';
  section3Content = `<!-- Иерархия классов и структура шаблона -->
<div class="ui-help-container">
  <!-- Заголовок -->
  <div class="ui-help-header">
    <h1>Заголовок</h1>
    <p>Описание</p>
  </div>

  <div class="ui-help-content">
    <!-- Секция (Разборный блок) -->
    <div class="ui-help-section">
      <div class="section-header">
        <button class="collapse-toggle" (click)="toggle()">...</button>
        <h2>Заголовок секции</h2>
      </div>

      <div class="section-content">
        <!-- Обычный блок контента -->
        <div class="content-block">...</div>

        <!-- Блок без внутренних стилей (для вставки контейнеров) -->
        <div class="content-block no-style">
           <av-help-copy-container ...></av-help-copy-container>
        </div>
      </div>
    </div>

    <!-- Контейнер площадки (Playground) -->
    <div class="playground-container">
      <div nz-row [nzGutter]="[24, 24]">
        <!-- 1. Настройки (Слева) -->
        <div nz-col [nzXs]="24" [nzLg]="10">
          <nz-card nzTitle="Настройки">...</nz-card>
        </div>

        <!-- 2. Результат и Код (Справа) -->
        <div nz-col [nzXs]="24" [nzLg]="14">
          <!-- Превью результата -->
          <nz-card nzTitle="Результат">...</nz-card>

          <!-- Сгенерированный код -->
          <div class="content-block no-style">
            <av-help-copy-container title="Код" [content]="..."></av-help-copy-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  section3HelpContent = `Подробное руководство по использованию этого шаблона для создания новых страниц документации UI компонентов.`;

  pgGeneratedCode = computed(() => {
    return `Заглушка`;
  });

  resetAllSettings() {
    // Reset logic here
  }
}

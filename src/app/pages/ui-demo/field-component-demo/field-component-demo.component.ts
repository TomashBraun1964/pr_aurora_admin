import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui/container-help-copy-ui.component';
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';

@Component({
  selector: 'av-field-component-demo',
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
  templateUrl: './field-component-demo.component.html',
  styleUrl: './field-component-demo.component.scss',
})
export class FieldComponentDemoComponent {
  isSection1Visible = signal(true);
  isSection2Visible = signal(true);
  isSection3Visible = signal(true);

  toggleSection1() {
    this.isSection1Visible.set(!this.isSection1Visible());
  }

  toggleSection2() {
    this.isSection2Visible.set(!this.isSection2Visible());
  }

  toggleSection3() {
    this.isSection3Visible.set(!this.isSection3Visible());
  }

  // Section 1 - Technical Interface
  section1Title = 'Interface: FieldGroupComponent';
  section1BgColor = '#0a0e1a';
  section1Content = `export interface FieldGroupProps {
  label?: string;                    // Заголовок группы
  variant?: 'default' | 'minimal' | 'filled' | 'highlighted';
  size?: 'small' | 'medium' | 'large';
  collapsible?: boolean;            // Возможность сворачивания
  collapsed?: boolean;              // Начальное состояние (свернуто/развернуто)
}`;

  // Section 3 - Documentation
  section3Title = 'Использование av-field-group';
  section3BgColor = '#1e293b';
  section3Content = `<!-- Базовое использование -->
<av-field-group label="Настройки профиля">
  <input nz-input placeholder="Имя" />
  <input nz-input placeholder="Email" />
</av-field-group>

<!-- С вариантом стиля -->
<av-field-group
  label="Личные данные"
  variant="filled"
  size="large">
  <!-- Контент -->
</av-field-group>

<!-- Сворачиваемая группа -->
<av-field-group
  label="Дополнительно"
  [collapsible]="true"
  [collapsed]="false">
  <!-- Контент -->
</av-field-group>`;

  pgGeneratedCode = computed(() => {
    return `<av-field-group label="Заглушка">
  <!-- Контент -->
</av-field-group>`;
  });
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';
import { ModalComponent } from '../../../shared/components/ui/modal';
import { ToggleLabeledComponent } from '../../../shared/components/ui/toggle/toggle-labeled.component';
import { ToggleComponent } from '../../../shared/components/ui/toggle/toggle.component';
import { ToggleDirective } from '../../../shared/components/ui/toggle/toggle.directive';

@Component({
  selector: 'app-toggle-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToggleDirective,
    ToggleComponent,
    ToggleLabeledComponent,
    ButtonDirective,
    ModalComponent,
    HelpCopyContainerComponent,
  ],
  templateUrl: './toggle-ui.component.html',
  styleUrl: './toggle-ui.component.scss',
})
export class ToggleUiComponent {
  // Playground state
  playgroundType = signal<'directive' | 'component' | 'labeled'>('directive');
  playgroundSize = signal<'small' | 'default' | 'large'>('default');
  playgroundColor = signal<'primary' | 'success' | 'warning' | 'danger'>('primary');
  playgroundLabel = signal('Enable notifications');
  playgroundLeftLabel = signal('OFF');
  playgroundRightLabel = signal('ON');
  playgroundChecked = signal(false);
  playgroundDisabled = signal(false);

  // Modal state
  showHelpModal = false;
  showGeneratedCodeModal = false;
  generatedCode = signal('');

  generatePlaygroundCode(): void {
    let htmlCode = '';
    const type = this.playgroundType();

    if (type === 'directive') {
      htmlCode = `<label class="av-toggle">
  <input
    type="checkbox"
    avToggle
    [(ngModel)]="isChecked"
    avSize="${this.playgroundSize()}"
    avColor="${this.playgroundColor()}"
    ${this.playgroundDisabled() ? '[disabled]="true"' : ''}
  />
  <span class="av-toggle__slider"></span>
</label>`;
    } else if (type === 'component') {
      htmlCode = `<av-toggle
  [(checked)]="isChecked"
  size="${this.playgroundSize()}"
  color="${this.playgroundColor()}"
  ${this.playgroundDisabled() ? '[disabled]="true"' : ''}
>
  ${this.playgroundLabel()}
</av-toggle>`;
    } else {
      htmlCode = `<av-toggle-labeled
  [(checked)]="isChecked"
  size="${this.playgroundSize()}"
  color="${this.playgroundColor()}"
  leftLabel="${this.playgroundLeftLabel()}"
  rightLabel="${this.playgroundRightLabel()}"
  ${this.playgroundDisabled() ? '[disabled]="true"' : ''}
></av-toggle-labeled>`;
    }

    const tsCode = `// В компоненте\nisChecked = signal(${this.playgroundChecked()});`;

    this.generatedCode.set(`${htmlCode}\n\n${tsCode}`);
    this.showGeneratedCodeModal = true;
  }
}

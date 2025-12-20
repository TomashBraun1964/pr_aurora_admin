import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { HelpCopyContainerComponent } from '../../../shared/components/ui/container-help-copy-ui';
import { ModalComponent } from '../../../shared/components/ui/modal';

@Component({
  selector: 'app-help-copy-container-ui',
  standalone: true,
  imports: [CommonModule, FormsModule, HelpCopyContainerComponent, ButtonDirective, ModalComponent],
  templateUrl: './av-help-copy-container-ui.component.html',
  styleUrl: './av-help-copy-container-ui.component.scss',
})
export class HelpCopyContainerUiComponent {
  // Playground state
  playgroundTitle = signal('Usage Example');
  playgroundContent = signal(`// Your code or instructions here
export class MyComponent {
  title = 'Hello World';
}`);
  playgroundWidth = signal('100%');
  playgroundHeight = signal('auto');
  playgroundBgColor = signal('#1e293b');
  playgroundShowCopy = signal(true);
  playgroundShowHelpButton = signal(false);

  // Modal state
  showGeneratedCodeModal = false;
  generatedCode = signal('');

  // Static examples
  basicCode = `<av-help-copy-container
  title="Код использования"
  [content]="myCode"
  bgColor="#1e293b"
></av-help-copy-container>`;

  longContent = `Это пример длинного текста
для проверки прокрутки (scroll)
внутри белого окна.
Строка 1
Строка 2
Строка 3
Строка 4
Строка 5
Конец примера.`;

  generatePlaygroundCode(): void {
    const attributes: string[] = [];

    attributes.push(`title="${this.playgroundTitle()}"`);
    attributes.push(`[content]="myContent"`);

    if (this.playgroundWidth() !== '100%') {
      attributes.push(`width="${this.playgroundWidth()}"`);
    }
    if (this.playgroundHeight() !== 'auto') {
      attributes.push(`height="${this.playgroundHeight()}"`);
    }
    if (this.playgroundBgColor()) {
      attributes.push(`bgColor="${this.playgroundBgColor()}"`);
    }
    if (!this.playgroundShowCopy()) {
      attributes.push(`[showCopy]="false"`);
    }
    if (this.playgroundShowHelpButton()) {
      attributes.push(`[showHelpButton]="true"`);
    }

    const htmlCode = `<av-help-copy-container\n  ${attributes.join(
      '\n  ',
    )}\n>\n</av-help-copy-container>`;

    const tsCode = `// В компоненте\nmyContent = \`${this.playgroundContent()}\`;`;

    this.generatedCode.set(`${htmlCode}\n\n${tsCode}`);
    this.showGeneratedCodeModal = true;
  }
}

// src/app/pages/ui-demo/input-ui/input-ui.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { InputDirective } from '../../../shared/components/ui/input/input.directive';

/**
 * Input UI Demo Component
 *
 * Демонстрация Input компонента - поля ввода текста
 * Показывает все варианты: Directive, Component, размеры, статусы, варианты, типы
 */
@Component({
  selector: 'app-input-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonDirective,
    InputDirective,
    InputComponent,
  ],
  templateUrl: './input-ui.component.html',
  styleUrls: ['./input-ui.component.scss'],
})
export class InputUiComponent {
  // Help section
  showHelp = signal(false);

  // Code examples for help section
  directiveExample = `import { InputDirective } from '@shared/components/ui/input';

<input avInput type="text" placeholder="Basic input" />
<input avInput avSize="large" avStatus="error" type="email" />`;

  componentExample = `import { InputComponent } from '@shared/components/ui/input';

<av-input
  label="Email"
  type="email"
  placeholder="your@email.com"
  hint="Используется для входа"
  [status]="emailValid ? 'success' : 'error'"
  [errorMessage]="emailError"
/>`;

  formControlExample = `import { FormControl, Validators } from '@angular/forms';

emailControl = new FormControl('', [
  Validators.required,
  Validators.email
]);

<input
  avInput
  type="email"
  [formControl]="emailControl"
  [avStatus]="emailControl.invalid ? 'error' : 'success'"
/>`;

  // Basic examples
  basicValue = '';
  emailValue = '';
  passwordValue = '';

  // Size examples
  smallInput = '';
  defaultInput = '';
  largeInput = '';
  xLargeInput = '';

  // Status examples
  defaultStatus = '';
  errorStatus = '';
  warningStatus = '';
  successStatus = '';

  // Variant examples
  outlinedVariant = '';
  filledVariant = '';
  borderlessVariant = '';

  // Type examples
  textInput = '';
  emailInput = '';
  passwordInput = '';
  passwordWithToggle = '';
  passwordWithoutToggle = '';
  numberInput = 0;
  telInput = '';
  urlInput = '';
  searchInput = '';

  // Textarea
  textareaValue = '';
  textareaLarge = '';

  // FormControl examples
  usernameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.pattern(/^\+?[0-9]{10,}$/)]);

  toggleHelp() {
    this.showHelp.update((v) => !v);
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Это поле обязательно';
    }
    if (control.hasError('email')) {
      return 'Неверный формат email';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Минимум ${minLength} символов`;
    }
    if (control.hasError('pattern')) {
      return 'Неверный формат телефона';
    }
    return '';
  }

  getStatus(control: FormControl): 'default' | 'error' | 'warning' | 'success' {
    if (control.invalid && control.touched) {
      return 'error';
    }
    if (control.valid && control.touched && control.value) {
      return 'success';
    }
    return 'default';
  }
}

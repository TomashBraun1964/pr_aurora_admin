// src/app/pages/ui-demo/phone-number-ui/phone-number-ui.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ButtonDirective } from '../../../shared/components/ui/button/button.directive';
import { FormFieldComponent } from '../../../shared/components/ui/form-field/form-field.component';
import { IconComponent } from '../../../shared/components/ui/icon/icon.component';
import { PhoneInputComponent } from '../../../shared/components/ui/phone-input/phone-input.component';

@Component({
  selector: 'app-phone-number-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneInputComponent,
    FormFieldComponent,
    ButtonDirective,
    IconComponent,
    AlertComponent,
  ],
  templateUrl: './phone-number-ui.component.html',
  styleUrl: './phone-number-ui.component.scss',
})
export class PhoneNumberUiComponent {
  // Signals for code visibility
  showBasicCode = signal(false);
  showCountriesCode = signal(false);
  showValidationCode = signal(false);
  showFormCode = signal(false);
  showImplementationCode = signal(false);

  // Form Controls for examples
  basicPhoneControl = new FormControl('');
  ukrainePhoneControl = new FormControl('', Validators.required);
  usaPhoneControl = new FormControl('', Validators.required);
  requiredPhoneControl = new FormControl('', Validators.required);
  optionalPhoneControl = new FormControl('');

  // Form example
  formPhoneControl = new FormControl('', Validators.required);
  formEmailControl = new FormControl('', [Validators.required, Validators.email]);
  formMessage = signal('');

  toggleCode(section: 'basic' | 'countries' | 'validation' | 'form' | 'implementation'): void {
    switch (section) {
      case 'basic':
        this.showBasicCode.update((v) => !v);
        break;
      case 'countries':
        this.showCountriesCode.update((v) => !v);
        break;
      case 'validation':
        this.showValidationCode.update((v) => !v);
        break;
      case 'form':
        this.showFormCode.update((v) => !v);
        break;
      case 'implementation':
        this.showImplementationCode.update((v) => !v);
        break;
    }
  }

  async copyCode(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      this.formMessage.set('Code copied to clipboard! ✅');
      setTimeout(() => this.formMessage.set(''), 3000);
    } catch (err) {
      this.formMessage.set('Failed to copy code ❌');
      setTimeout(() => this.formMessage.set(''), 3000);
    }
  }

  submitForm(): void {
    this.formPhoneControl.markAsTouched();
    this.formEmailControl.markAsTouched();

    if (this.formPhoneControl.valid && this.formEmailControl.valid) {
      this.formMessage.set(
        `Form submitted! Phone: ${this.formPhoneControl.value}, Email: ${this.formEmailControl.value}`,
      );
    } else {
      this.formMessage.set('Please fill in all required fields ❌');
    }
  }

  resetForm(): void {
    this.formPhoneControl.reset();
    this.formEmailControl.reset();
    this.formMessage.set('Form reset');
  }

  showPhoneValue(control: FormControl): void {
    const value = control.value || '(empty)';
    this.formMessage.set(`Current value: ${value}`);
    setTimeout(() => this.formMessage.set(''), 3000);
  }

  // Code snippets
  basicCodeExample = `<!-- Basic Usage -->
<av-phone-input
  [formControl]="phoneControl"
></av-phone-input>`;

  countriesCodeExample = `<!-- Ukraine (default) -->
<av-phone-input
  [formControl]="ukrainePhoneControl"
  [defaultCountry]="'UA'"
></av-phone-input>

<!-- USA -->
<av-phone-input
  [formControl]="usaPhoneControl"
  [defaultCountry]="'US'"
></av-phone-input>

<!-- Poland -->
<av-phone-input
  [formControl]="polandPhoneControl"
  [defaultCountry]="'PL'"
></av-phone-input>`;

  validationCodeExample = `<!-- Required Field -->
<app-form-field
  label="Phone Number"
  [required]="true"
  [control]="requiredPhoneControl"
>
  <av-phone-input
    [formControl]="requiredPhoneControl"
  ></av-phone-input>
</app-form-field>

<!-- Optional Field -->
<app-form-field
  label="Phone Number (Optional)"
  [control]="optionalPhoneControl"
>
  <av-phone-input
    [formControl]="optionalPhoneControl"
  ></av-phone-input>
</app-form-field>

<!-- TypeScript -->
requiredPhoneControl = new FormControl('', Validators.required);
optionalPhoneControl = new FormControl('');`;

  formCodeExample = `<!-- Complete Form Example -->
<form (ngSubmit)="submitForm()">
  <app-form-field
    label="Phone Number"
    [required]="true"
    [control]="phoneControl"
    helpText="Select country and enter phone number"
  >
    <av-phone-input
      [formControl]="phoneControl"
      [defaultCountry]="'UA'"
    ></av-phone-input>
  </app-form-field>

  <app-form-field
    label="Email"
    [required]="true"
    [control]="emailControl"
  >
    <input
      type="email"
      [formControl]="emailControl"
      placeholder="example@email.com"
    />
  </app-form-field>

  <button type="submit">Submit</button>
</form>

<!-- TypeScript -->
phoneControl = new FormControl('', Validators.required);
emailControl = new FormControl('', [Validators.required, Validators.email]);

submitForm(): void {
  if (this.phoneControl.valid && this.emailControl.valid) {
    console.log('Phone:', this.phoneControl.value);
    console.log('Email:', this.emailControl.value);
  }
}`;

  implementationCodeExample = `// Step 1: Import PhoneInputComponent
import { PhoneInputComponent } from '@shared/components/ui/phone-input';

// Step 2: Add to imports array
@Component({
  imports: [
    PhoneInputComponent,
    ReactiveFormsModule,
    // ... other imports
  ]
})

// Step 3: Create FormControl
phoneControl = new FormControl('', Validators.required);

// Step 4: Use in template
<av-phone-input
  [formControl]="phoneControl"
  [defaultCountry]="'UA'"
></av-phone-input>

// The component returns full phone number with country code
// Example: "+380501234567"`;
}

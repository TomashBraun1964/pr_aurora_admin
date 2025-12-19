# Input Component System

Полнофункциональная система компонентов для работы с полями ввода в Angular приложении. Включает директиву, базовый компонент, специализированные компоненты и SCSS стили.

## 📦 Состав системы

### 1. **InputDirective** (`avInput`)

Директива для улучшения нативных `<input>` и `<textarea>` элементов.

```typescript
import { InputDirective } from '@shared/components/ui/input';

<input avInput type="text" placeholder="Enter text" />
<input avInput avSize="large" avStatus="error" />
<textarea avInput rows="4"></textarea>
```

**Параметры:**

- `avSize`: `'small'` | `'default'` | `'large'` | `'x-large'` - размер поля
- `avStatus`: `'default'` | `'error'` | `'warning'` | `'success'` - статус валидации
- `avVariant`: `'outlined'` | `'filled'` | `'borderless'` - визуальный вариант

### 2. **InputComponent** (`av-input`)

Компонент-обертка с автоматическими label, hint и error сообщениями.

```typescript
import { InputComponent } from '@shared/components/ui/input';

<av-input
  label="Email"
  type="email"
  placeholder="your@email.com"
  hint="Используется для входа"
  [status]="emailValid ? 'success' : 'error'"
  [errorMessage]="emailError"
/>
```

**Свойства:**
| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `label` | `string` | `''` | Текст метки поля |
| `type` | `string` | `'text'` | Тип input (text, email, password и т.д.) |
| `placeholder` | `string` | `''` | Подсказка в поле |
| `hint` | `string` | `''` | Вспомогательный текст под полем |
| `errorMessage` | `string` | `''` | Текст ошибки |
| `size` | `InputSize` | `'default'` | Размер поля |
| `status` | `InputStatus` | `'default'` | Статус валидации |
| `variant` | `InputVariant` | `'outlined'` | Визуальный вариант |
| `disabled` | `boolean` | `false` | Отключенное состояние |
| `showPasswordToggle` | `boolean` | `true` | Показывать кнопку для password полей |

**Password Input с кнопкой показать/скрыть:**

Для `type="password"` автоматически добавляется кнопка показать/скрыть пароль:

```html
<!-- С кнопкой (по умолчанию) -->
<av-input label="Пароль" type="password" placeholder="Введите пароль" [(ngModel)]="password" />

<!-- Без кнопки -->
<av-input
  label="Пароль"
  type="password"
  placeholder="Введите пароль"
  [showPasswordToggle]="false"
  [(ngModel)]="password"
/>
```

**Особенности:**

- ✅ Кнопка показать/скрыть пароль с иконками глаза
- ✅ Автоматическое переключение между `type="password"` и `type="text"`
- ✅ Адаптивные размеры кнопки (small/default/large/x-large)
- ✅ Можно отключить через `[showPasswordToggle]="false"`
- ✅ Доступность: aria-label меняется при клике

### 3. **PasswordInputComponent** (`av-password-input`)

Специализированный компонент для ввода пароля с кнопкой показать/скрыть.

```typescript
import { PasswordInputComponent } from '@shared/components/ui/password-input';

<av-password-input
  label="Пароль"
  placeholder="Введите пароль"
  [(ngModel)]="password"
  [status]="passwordValid ? 'success' : 'error'"
  hint="Минимум 8 символов"
/>
```

**Особенности:**

- ✅ Кнопка показать/скрыть пароль с иконками
- ✅ Автоматическое переключение между `type="password"` и `type="text"`
- ✅ Поддержка всех параметров InputDirective
- ✅ ControlValueAccessor для работы с FormControl

### 4. **FormField Styles** (`av-form-field`)

SCSS классы для создания композитных полей с prefix/suffix.

```html
<div class="av-form-field">
  <label class="av-form-field__label">Price</label>
  <div class="av-form-field__container">
    <div class="av-form-field__prefix">$</div>
    <input avInput type="number" />
    <div class="av-form-field__suffix">.00</div>
  </div>
  <span class="av-form-field__hint">Enter price in USD</span>
</div>
```

---

## 🎨 Размеры (Sizes)

| Размер  | Класс              | Высота | Padding   | Использование                 |
| ------- | ------------------ | ------ | --------- | ----------------------------- |
| Small   | `avSize="small"`   | 24px   | 2px 8px   | Компактные формы, таблицы     |
| Default | `avSize="default"` | 32px   | 4px 12px  | Стандартные формы             |
| Large   | `avSize="large"`   | 40px   | 8px 16px  | Важные поля, мобильные версии |
| X-Large | `avSize="x-large"` | 48px   | 12px 20px | Акцентные поля, лендинги      |

```html
<input avInput avSize="small" placeholder="Small (24px)" />
<input avInput avSize="default" placeholder="Default (32px)" />
<input avInput avSize="large" placeholder="Large (40px)" />
<input avInput avSize="x-large" placeholder="X-Large (48px)" />
```

---

## 🎯 Статусы (Status)

| Статус  | Класс                | Цвет границы | Использование      |
| ------- | -------------------- | ------------ | ------------------ |
| Default | `avStatus="default"` | `#d9d9d9`    | Обычное состояние  |
| Error   | `avStatus="error"`   | `#ff4d4f`    | Ошибка валидации   |
| Warning | `avStatus="warning"` | `#faad14`    | Предупреждение     |
| Success | `avStatus="success"` | `#52c41a`    | Успешная валидация |

```html
<input avInput avStatus="error" placeholder="Error" />
<input avInput avStatus="warning" placeholder="Warning" />
<input avInput avStatus="success" placeholder="Success" />
```

**С компонентом:**

```html
<av-input label="Email" type="email" status="error" errorMessage="Неверный формат email" />
<av-input label="Username" status="success" hint="Имя пользователя доступно" />
```

---

## 🎭 Варианты (Variants)

### Outlined (по умолчанию)

Четкая граница, классический вид.

```html
<input avInput avVariant="outlined" placeholder="Outlined" />
```

### Filled

Заполненный фон, современный вид.

```html
<input avInput avVariant="filled" placeholder="Filled" />
```

### Borderless

Только нижняя граница, минималистичный вид.

```html
<input avInput avVariant="borderless" placeholder="Borderless" />
```

---

## 📝 Типы Input

Поддерживаются все HTML5 типы input:

```html
<!-- Текстовые -->
<input avInput type="text" placeholder="Text" />
<input avInput type="email" placeholder="Email" />
<input avInput type="password" placeholder="Password" />
<input avInput type="search" placeholder="Search" />
<input avInput type="url" placeholder="URL" />
<input avInput type="tel" placeholder="Phone" />

<!-- Числовые -->
<input avInput type="number" placeholder="Number" />
<input avInput type="range" min="0" max="100" />

<!-- Дата/время -->
<input avInput type="date" />
<input avInput type="time" />
<input avInput type="datetime-local" />

<!-- Другие -->
<input avInput type="color" />
<input avInput type="file" />
```

---

## 🔄 Интеграция с FormControl

### Template-driven Forms

```typescript
import { FormsModule } from '@angular/forms';

export class MyComponent {
  username = '';
  email = '';
}
```

```html
<input avInput type="text" [(ngModel)]="username" placeholder="Username" />
<av-input label="Email" type="email" [(ngModel)]="email" />
```

### Reactive Forms

```typescript
import { FormControl, Validators } from '@angular/forms';

export class MyComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  getStatus(): 'error' | 'success' | 'default' {
    if (this.emailControl.invalid && this.emailControl.touched) {
      return 'error';
    }
    if (this.emailControl.valid && this.emailControl.touched) {
      return 'success';
    }
    return 'default';
  }

  getErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'Email обязателен';
    }
    if (this.emailControl.hasError('email')) {
      return 'Неверный формат email';
    }
    return '';
  }
}
```

```html
<input
  avInput
  type="email"
  [formControl]="emailControl"
  [avStatus]="getStatus()"
  placeholder="your@email.com"
/>

@if (emailControl.invalid && emailControl.touched) {
<span class="error-text">{{ getErrorMessage() }}</span>
}
```

**С компонентом:**

```html
<av-input
  label="Email"
  type="email"
  [formControl]="emailControl"
  [status]="getStatus()"
  [errorMessage]="getErrorMessage()"
/>
```

---

## 📱 Textarea

Директива работает и с textarea элементами:

```html
<!-- С директивой -->
<textarea avInput rows="4" placeholder="Введите текст..." [avSize]="'large'"></textarea>

<!-- Размеры для textarea -->
<textarea avInput avSize="small" rows="3"></textarea>
<!-- min-height: 64px -->
<textarea avInput rows="4"></textarea>
<!-- min-height: 80px -->
<textarea avInput avSize="large" rows="5"></textarea>
<!-- min-height: 100px -->
<textarea avInput avSize="x-large" rows="6"></textarea>
<!-- min-height: 120px -->
```

**Особенности:**

- ✅ Автоматическая высота (`height: auto`)
- ✅ Вертикальный resize (`resize: vertical`)
- ✅ Минимальная высота зависит от размера
- ✅ Line-height: 1.5 для читаемости

---

## ♿ Доступность (Accessibility)

### Автоматические ARIA атрибуты

```html
<av-input
  label="Email"
  type="email"
  hint="Enter your email address"
  errorMessage="Invalid email format"
  [status]="'error'"
/>

<!-- Генерируется: -->
<label for="input-xyz">Email</label>
<input id="input-xyz" type="email" aria-describedby="hint-xyz error-xyz" aria-invalid="true" />
<span id="hint-xyz">Enter your email address</span>
<span id="error-xyz">Invalid email format</span>
```

### Клавиатурная навигация

- ✅ Tab - переход между полями
- ✅ Enter - отправка формы (если в `<form>`)
- ✅ Esc - очистка поля (для type="search")

### Focus управление

```scss
.av-input:focus {
  border-color: $color-primary;
  outline: none; // Кастомная обводка без двойной рамки
}

.av-input:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}
```

---

## 🌙 Dark Theme

Автоматическая поддержка темной темы через медиа-запрос:

```scss
@media (prefers-color-scheme: dark) {
  .av-input {
    background-color: $dark-bg-light;
    border-color: $dark-border-base;
    color: $dark-text-primary;

    &::placeholder {
      color: $dark-text-tertiary;
    }
  }
}
```

**Переменные темной темы:**

- `$dark-bg-base: #141414` - основной фон
- `$dark-bg-light: #1f1f1f` - светлый фон (для input)
- `$dark-bg-gray: #262626` - серый фон (для filled variant)
- `$dark-text-primary: rgba(255, 255, 255, 0.85)` - основной текст
- `$dark-text-tertiary: rgba(255, 255, 255, 0.45)` - placeholder
- `$dark-border-base: #434343` - границы

---

## 💡 Best Practices

### ✅ DO

```html
<!-- Используйте семантичные типы -->
<input avInput type="email" />
<!-- ✅ Правильно -->

<!-- Добавляйте label для доступности -->
<av-input label="Email" type="email" />
<!-- ✅ Правильно -->

<!-- Используйте hint для пояснений -->
<av-input label="Пароль" type="password" hint="Минимум 8 символов, включая цифры" />
<!-- ✅ Правильно -->

<!-- Показывайте статус валидации -->
<input
  avInput
  [formControl]="emailControl"
  [avStatus]="emailControl.invalid ? 'error' : 'success'"
/>
<!-- ✅ Правильно -->

<!-- Используйте av-password-input для паролей -->
<av-password-input label="Пароль" />
<!-- ✅ Правильно -->
```

### ❌ DON'T

```html
<!-- Не используйте type="text" для email -->
<input avInput type="text" placeholder="Email" />
<!-- ❌ Плохо -->

<!-- Не забывайте про label -->
<input avInput placeholder="Введите email" />
<!-- ❌ Плохо (нет label) -->

<!-- Не смешивайте статусы с ошибками -->
<av-input status="success" errorMessage="Ошибка!" />
<!-- ❌ Плохо (противоречие) -->

<!-- Не переопределяйте базовые стили inline -->
<input avInput style="border: 1px solid red" />
<!-- ❌ Плохо -->
```

---

## 📊 Размеры и производительность

| Компонент              | Размер (gzip) | Зависимости                   |
| ---------------------- | ------------- | ----------------------------- |
| InputDirective         | ~1.2 KB       | ElementRef, Renderer2         |
| InputComponent         | ~2.5 KB       | CommonModule, InputDirective  |
| PasswordInputComponent | ~3.5 KB       | CommonModule, InputDirective  |
| Input SCSS             | ~4.8 KB       | variables, mixins, sass:color |

**Общий размер системы:** ~12 KB (gzip)

---

## 🔧 Кастомизация

### Переопределение переменных

```scss
// В вашем styles.scss ДО импорта компонентов
$color-primary: #0066cc;
$color-error: #d32f2f;
$border-radius-base: 8px;

@use 'styles/components/input';
```

### Кастомные стили

```scss
// Кастомный класс для логин формы
.login-form {
  .av-input {
    border-radius: 12px;
    font-size: 16px;
  }

  .av-input:focus {
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
  }
}
```

---

## 📖 Примеры использования

### Форма логина

```html
<form class="login-form">
  <av-input
    label="Email"
    type="email"
    placeholder="your@email.com"
    size="large"
    [(ngModel)]="email"
    [status]="emailValid ? 'success' : 'default'"
  />

  <av-password-input
    label="Пароль"
    placeholder="Введите пароль"
    size="large"
    [(ngModel)]="password"
    hint="Минимум 8 символов"
  />

  <button type="submit" av-button avType="primary" avSize="large">Войти</button>
</form>
```

### Форма регистрации с валидацией

```typescript
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
}
```

```html
<form [formGroup]="form">
  <av-input
    label="Имя пользователя"
    formControlName="username"
    [status]="form.get('username').invalid ? 'error' : 'success'"
    [errorMessage]="getUsernameError()"
  />

  <av-input
    label="Email"
    type="email"
    formControlName="email"
    [status]="form.get('email').invalid ? 'error' : 'success'"
    [errorMessage]="getEmailError()"
  />

  <av-password-input
    label="Пароль"
    formControlName="password"
    [status]="form.get('password').invalid ? 'error' : 'success'"
    [errorMessage]="getPasswordError()"
  />
</form>
```

---

## 🐛 Troubleshooting

### Проблема: Стили не применяются

**Решение:** Проверьте, что импортировали SCSS:

```scss
// В styles.scss
@use 'styles/components/input';
```

### Проблема: FormControl не работает

**Решение:** Добавьте ReactiveFormsModule:

```typescript
imports: [ReactiveFormsModule, InputComponent];
```

### Проблема: Двойная граница при фокусе

**Решение:** Это было исправлено, используйте только `outline: none` в стилях.

---

## 📄 Лицензия

MIT © Aurora Admin

---

## 🤝 Контрибьюция

Нашли баг или хотите добавить функцию? Создайте issue или pull request!

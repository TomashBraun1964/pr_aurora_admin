# Toggle Labeled Component

## Описание

Компонент переключателя в стиле iOS с текстовыми метками внутри. Идеален для создания двух-состояний интерфейсов типа "ON/OFF", "Assistive/Expert", "Day/Night" и т.д.

## Превью

```
┌──────────────────────┐
│  Assistive │ Expert  │  ← когда checked=false (слева активна)
└──────────────────────┘

┌──────────────────────┐
│  Assistive │ Expert  │  ← когда checked=true (справа активна)
└──────────────────────┘
```

## Установка

```typescript
import { ToggleLabeledComponent } from '@shared/components/ui/toggle';

@Component({
  imports: [ToggleLabeledComponent]
})
```

## Использование

### Базовый пример

```html
<av-toggle-labeled [(checked)]="modeToggle" leftLabel="OFF" rightLabel="ON" />
```

### С размерами

```html
<!-- Small: 120×32px -->
<av-toggle-labeled [(checked)]="toggle1" size="small" leftLabel="NO" rightLabel="YES" />

<!-- Default: 140×40px -->
<av-toggle-labeled [(checked)]="toggle2" size="default" leftLabel="OFF" rightLabel="ON" />

<!-- Large: 160×48px -->
<av-toggle-labeled [(checked)]="toggle3" size="large" leftLabel="DAY" rightLabel="NIGHT" />
```

### С FormControl

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export class MyComponent {
  modeControl = new FormControl(false);
}
```

```html
<av-toggle-labeled [formControl]="modeControl" leftLabel="Assistive" rightLabel="Expert" />
```

### Disabled state

```html
<av-toggle-labeled [checked]="true" [disabled]="true" leftLabel="OFF" rightLabel="ON" />
```

## API

### Inputs

| Параметр     | Тип                               | По умолчанию | Описание                                       |
| ------------ | --------------------------------- | ------------ | ---------------------------------------------- |
| `leftLabel`  | `string`                          | `'OFF'`      | Текст слева (показывается когда checked=false) |
| `rightLabel` | `string`                          | `'ON'`       | Текст справа (показывается когда checked=true) |
| `checked`    | `boolean`                         | `false`      | Состояние переключателя                        |
| `disabled`   | `boolean`                         | `false`      | Отключить переключатель                        |
| `size`       | `'small' \| 'default' \| 'large'` | `'default'`  | Размер компонента                              |

### Outputs

| Событие         | Тип                     | Описание                    |
| --------------- | ----------------------- | --------------------------- |
| `checkedChange` | `EventEmitter<boolean>` | Событие изменения состояния |

### Two-way binding

Компонент поддерживает двустороннее связывание через `[(checked)]`.

## Примеры использования

### Режим работы приложения

```html
<av-toggle-labeled
  [(checked)]="isExpertMode"
  leftLabel="Assistive"
  rightLabel="Expert"
  size="large"
/>
```

### Звук

```html
<av-toggle-labeled [(checked)]="isSoundOff" leftLabel="ON" rightLabel="OFF" />
```

### Тема

```html
<av-toggle-labeled [(checked)]="isDarkMode" leftLabel="DAY" rightLabel="NIGHT" />
```

### Автоматический режим

```html
<av-toggle-labeled [(checked)]="isAutoMode" leftLabel="MANUAL" rightLabel="AUTO" />
```

## Стилизация

Компонент автоматически поддерживает:

- ✅ Темную тему через `[data-theme='dark']`
- ✅ Focus states для доступности
- ✅ Анимации (отключаются при `prefers-reduced-motion`)
- ✅ Responsive дизайн

## Accessibility

- Использует нативный `<input type="checkbox">`
- Генерирует уникальные ID для связи input и label
- Поддерживает `focus-visible` для навигации с клавиатуры
- Работает с screen readers

## Совместимость

- Angular 19+
- Standalone component
- Поддержка Reactive Forms
- ControlValueAccessor interface

## Лучшие практики

1. **Короткие метки**: Используйте краткие текста (2-8 символов)

   ```html
   ✅ leftLabel="ON" rightLabel="OFF" ❌ leftLabel="Turn On" rightLabel="Turn Off"
   ```

2. **Смысловые пары**: Левая и правая метки должны быть противоположностями

   ```html
   ✅ leftLabel="DAY" rightLabel="NIGHT" ❌ leftLabel="MODE" rightLabel="AUTO"
   ```

3. **Размер по контексту**:

   - `small` - для компактных интерфейсов
   - `default` - для обычных форм
   - `large` - для важных настроек

4. **Accessible**: Добавляйте aria-label если метки не очевидны
   ```html
   <av-toggle-labeled
     [(checked)]="mode"
     leftLabel="A"
     rightLabel="E"
     aria-label="Application mode: Assistive or Expert"
   />
   ```

## Сравнение с другими Toggle вариантами

| Характеристика | Labeled Toggle | Toggle Directive | Toggle Component |
| -------------- | -------------- | ---------------- | ---------------- |
| Текст внутри   | ✅ Да          | ❌ Нет           | ❌ Нет           |
| Размеры        | 3 (120-160px)  | 3 (36-52px)      | 3 (36-52px)      |
| iOS стиль      | ✅ Да          | ❌ Нет           | ❌ Нет           |
| Цвета          | 1 (blue)       | 4 варианта       | 4 варианта       |
| Формы          | ✅ Да          | ✅ Да            | ✅ Да            |

## Примеры из дизайна

Дизайн как на скриншоте:

```html
<!-- Mode Toggle -->
<div class="toggle-group">
  <label>Mode :</label>
  <av-toggle-labeled [(checked)]="isExpertMode" leftLabel="Assistive" rightLabel="Expert" />
</div>

<!-- Sound Toggle -->
<div class="toggle-group">
  <label>Sound :</label>
  <av-toggle-labeled [(checked)]="isSoundOff" leftLabel="ON" rightLabel="OFF" />
</div>
```

CSS:

```css
.toggle-group {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
}

.toggle-group label {
  font-weight: 500;
  color: #333;
}
```


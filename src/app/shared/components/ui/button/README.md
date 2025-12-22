# Button Directive ⭐

Директива `av-button` на обычных кнопках — основной способ создания кнопок в Aurora Admin.

## Использование

Использует директиву `av-button` на нативных элементах для создания производительных и семантически корректных кнопок.

```html
<button
  av-button
  avType="primary"
  avSize="large"
  [avLoading]="isLoading()"
  (clicked)="handleClick()"
>
  Сохранить
</button>

<button av-button avType="danger" disabled>Удалить</button>
```

### Кнопки с иконками

Для кнопок с иконками используйте компонент `<av-icon>` внутри кнопки:

```html
<button av-button avType="primary">
  <av-icon type="plus" [size]="16"></av-icon>
  <span style="margin-left: 8px;">Создать</span>
</button>

<button av-button avType="default" class="av-btn--icon-only">
  <av-icon type="search" [size]="16"></av-icon>
</button>
```

## API Reference

### Directive (`av-button`)

| Input         | Type                                                                         | Default     | Description                               |
| ------------- | ---------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `avType`      | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link' \| 'danger'`         | `'default'` | Тип кнопки                                |
| `avSize`      | `'small' \| 'default' \| 'large'`                                            | `'default'` | Размер                                    |
| `avShape`     | `'default' \| 'circle' \| 'square' \| 'round' \| 'rounded' \| 'rounded-big'` | `'default'` | Форма кнопки                              |
| `avLoading`   | `boolean`                                                                    | `false`     | Состояние загрузки                        |
| `avBlock`     | `boolean`                                                                    | `false`     | На всю ширину                             |
| `avVisible`   | `boolean`                                                                    | `true`      | Видимость с плавной анимацией             |
| `avColor`     | `string \| null`                                                             | `null`      | Кастомный цвет (фон и границы)            |
| `avTextColor` | `string \| null`                                                             | `null`      | Кастомный цвет текста                     |
| `avWidth`     | `string \| number`                                                           | `null`      | Кастомная ширина                          |
| `avHeight`    | `string \| number`                                                           | `null`      | Кастомная высота                          |
| `avRadius`    | `string \| number`                                                           | `null`      | Кастомный радиус скругления               |
| `avIconOnly`  | `boolean`                                                                    | `false`     | Режим "только иконка" (влияет на отступы) |
| `avIconSize`  | `string \| number`                                                           | `null`      | Размер иконок внутри кнопки               |
| `avIconColor` | `string \| null`                                                             | `null`      | Цвет иконок внутри кнопки                 |

| Output    | Type                       | Description    |
| --------- | -------------------------- | -------------- |
| `clicked` | `EventEmitter<MouseEvent>` | Клик по кнопке |

## Styling

Директива использует BEM классы с префиксом `av-btn`:

- `.av-btn` - базовый класс
- `.av-btn--primary`, `.av-btn--danger`, ... - модификаторы типа
- `.av-btn--small`, `.av-btn--large` - модификаторы размера
- `.av-btn--shape-circle`, `.av-btn--shape-square`, ... - модификаторы формы
- `.av-btn--loading` - состояние загрузки
- `.av-btn--block` - на всю ширину
- `.av-btn--icon-only` - оптимизация для кнопок без текста

## Импорт

```typescript
import { ButtonDirective } from '@shared/components/ui/button/button.directive';
```

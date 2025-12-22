==============================================
🎯 Base:
src\app\shared\containers\ui-help\container-ui-help-base
==============================================
==============================================
🎯 color-picker-demo:
src\app\pages\ui-demo\color-picker-demo
Icon Control UI - это полноценная демонстрационная страница с интерактивным управлением всеми свойствами компонента av-icon. Именно на основе этого компонента был создан универсальный av-icon-settings-control.

Доступен по URL: /ui-demo/icon-control

\*\* Рамка обертка

# Рамка "НАСТРОЙКИ ИКОНКИ" - это компонент av-field-group! Вот как он подключен:

==============================================
🎯 av-field-group:
Рамка "НАСТРОЙКИ ИКОНКИ" - это компонент av-field-group
Как подключен:
<av-field-group label="Настройки иконки" [collapsible]="true">

  <!-- Весь контент с элементами управления -->
</av-field-group>

📦 Что это за компонент:
Файлы компонента:
d:\_PROGECT\pr_aurora_admin\src\app\shared\components\ui\field-group\field-group.component.ts
d:\_PROGECT\pr_aurora_admin\src\app\shared\components\ui\field-group\field-group.component.html
d:\_PROGECT\pr_aurora_admin\src\app\shared\components\ui\field-group\field-group.component.scss

🔧 Как работает:
Импортируется в компонент:
// icon-control.component.ts
import { FieldGroupComponent } from '../../../shared/components/ui/field-group/field-group.component';

@Component({
imports: [
// ...
FieldGroupComponent,
],
})

Используется в шаблоне:
<av-field-group label="Настройки иконки" [collapsible]="true">

  <!-- Внутри может быть любой контент -->
</av-field-group>
🎨 Возможности av-field-group:
label - текст заголовка рамки ("Настройки иконки")
[collapsible]="true" - возможность сворачивать/разворачивать секцию
variant - варианты стилей: 'default' | 'minimal' | 'filled' | 'highlighted'
size - размеры: 'small' | 'medium' | 'large'
Это универсальный компонент-обёртка для группировки полей с метками, который вы создали ранее! 🎉
==============================================
==============================================
🎯 КОНТРОЛ field-component-demo.component.ts
src\app\pages\ui-demo\field-component-demo\field-component-demo.component.ts

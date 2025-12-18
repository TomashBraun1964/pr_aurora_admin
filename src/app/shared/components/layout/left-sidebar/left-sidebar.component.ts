import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { filter } from 'rxjs/operators';
import { EventBusService } from '../../../../core/services/event-bus/event-bus.service';
import { DEFAULT_SIDEBAR_CONFIG } from './sidebar-default.config';
import { MenuItem, SidebarConfig, SidebarState, SubMenuItem } from './sidebar.model';

/**
 * Left Sidebar Component
 *
 * Навигационная панель с поддержкой:
 * - State Machine логики переходов
 * - Иерархических меню с подменю
 * - BEM классов для стилизации
 * - Event Bus интеграции
 * - Конфигурации через input
 *
 * Согласно архитектуре SOW ЧАСТЬ 4.2
 */
@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NzIconModule,
    NzBadgeModule,
    NzToolTipModule,
  ],
  template: `
    <aside
      class="left-sidebar"
      [class.is-collapsed]="state() === 'collapsed'"
      [class.is-expanded]="state() === 'expanded'"
    >
      <!-- Toggle Button -->
      <div class="sidebar-toggle" (click)="toggleSidebar()">
        <span nz-icon [nzType]="state() === 'collapsed' ? 'menu-unfold' : 'menu-fold'"></span>
      </div>

      <!-- Close Submenu Button -->
      @if (showCloseSubmenuButton()) {
      <button class="sidebar-close-submenu" (click)="closeSubmenu()">
        <span nz-icon nzType="close"></span>
        <span class="sidebar-close-submenu__text">Закрыть подменю</span>
      </button>
      <div class="sidebar-divider"></div>
      }

      <!-- Menu Groups -->
      <nav class="sidebar-nav">
        @for (group of menuGroups(); track group.id) {
        <div class="menu-group">
          @if (group.title && state() === 'expanded') {
          <div class="menu-group__title">{{ group.title }}</div>
          }

          <!-- Menu Items -->
          @for (item of group.items; track item.id) { @if (item.visible !== false) {
          <div class="menu-item-wrapper">
            <!-- Menu Item without submenu -->
            @if (item.type === 'link') {
            <a
              [routerLink]="item.route"
              routerLinkActive="is-active"
              class="menu-item"
              [class.is-disabled]="item.disabled"
              [class.is-active]="isActive(item.id)"
              nz-tooltip
              [nzTooltipTitle]="state() === 'collapsed' ? item.label : ''"
              nzTooltipPlacement="right"
              (click)="handleMenuClick(item)"
            >
              <span class="menu-item__icon" nz-icon [nzType]="item.icon"></span>
              @if (state() === 'expanded') {
              <span class="menu-item__label">{{ item.label }}</span>
              @if (item.badge) {
              <span
                class="menu-item__badge"
                [class]="'menu-item__badge--' + (item.badge.intent || 'default')"
              >
                {{ item.badge.value }}
              </span>
              } }
            </a>
            }

            <!-- Menu Item with submenu -->
            @if (item.type === 'submenu') {
            <div
              class="menu-item"
              [class.is-disabled]="item.disabled"
              [class.is-active]="isActive(item.id)"
              [class.has-submenu-open]="isSubmenuOpen(item.id)"
              nz-tooltip
              [nzTooltipTitle]="state() === 'collapsed' ? item.label : ''"
              nzTooltipPlacement="right"
              (click)="handleSubmenuToggle(item)"
            >
              <span class="menu-item__icon" nz-icon [nzType]="item.icon"></span>
              @if (state() === 'expanded') {
              <span class="menu-item__label">{{ item.label }}</span>
              @if (item.badge) {
              <span
                class="menu-item__badge"
                [class]="'menu-item__badge--' + (item.badge.intent || 'default')"
              >
                {{ item.badge.value }}
              </span>
              }
              <span
                class="menu-item__arrow"
                nz-icon
                [nzType]="isSubmenuOpen(item.id) ? 'down' : 'right'"
              ></span>
              }
            </div>

            <!-- Submenu Items -->
            @if (isSubmenuOpen(item.id) && state() === 'expanded' && item.submenu) {
            <div class="submenu">
              @for (subItem of item.submenu; track subItem.id) { @if (subItem.visible !== false) {
              <a
                [routerLink]="subItem.route"
                routerLinkActive="is-active"
                class="submenu-item"
                [class.is-disabled]="subItem.disabled"
                (click)="handleSubmenuItemClick(item, subItem)"
              >
                @if (subItem.icon) {
                <span class="submenu-item__icon" nz-icon [nzType]="subItem.icon"></span>
                }
                <span class="submenu-item__label">{{ subItem.label }}</span>
                @if (subItem.badge) {
                <span
                  class="submenu-item__badge"
                  [class]="'submenu-item__badge--' + (subItem.badge.intent || 'default')"
                >
                  {{ subItem.badge.value }}
                </span>
                }
              </a>
              } }
            </div>
            } }
          </div>
          } }
        </div>
        }
      </nav>
    </aside>
  `,
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly eventBus = inject(EventBusService);

  // Input конфигурация
  config = input<SidebarConfig>(DEFAULT_SIDEBAR_CONFIG);

  // Внутреннее состояние (signals)
  state = signal<SidebarState>('expanded');
  openSubmenuId = signal<string | undefined>(undefined);
  activeMenuId = signal<string | undefined>(undefined);

  // Computed
  menuGroups = computed(() => {
    const groups = this.config()?.menuGroups || [];
    console.log('[LeftSidebar] menuGroups computed:', groups.length, 'groups');
    return groups;
  });

  showCloseSubmenuButton = computed(() => {
    return this.state() === 'expanded' && this.openSubmenuId() !== undefined;
  });

  ngOnInit(): void {
    console.log('[LeftSidebar] ngOnInit called');

    // Инициализация состояния из конфига
    const cfg = this.config();
    console.log('[LeftSidebar] config:', cfg);
    console.log('[LeftSidebar] menuGroups:', this.menuGroups());

    if (cfg) {
      this.state.set(cfg.state);
      this.openSubmenuId.set(cfg.openSubmenuId);
      this.activeMenuId.set(cfg.activeMenuId);
      console.log('[LeftSidebar] State initialized:', {
        state: cfg.state,
        menuGroupsCount: cfg.menuGroups?.length,
      });
    } else {
      console.warn('[LeftSidebar] Config is undefined!');
    }

    // Подписка на изменения роута для автоматического определения активного меню
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateActiveMenu();
    });

    // Установка активного меню при загрузке
    this.updateActiveMenu();
  }

  /**
   * STATE MACHINE: COLLAPSED ↔ EXPANDED
   */
  toggleSidebar(): void {
    const newState: SidebarState = this.state() === 'collapsed' ? 'expanded' : 'collapsed';
    this.state.set(newState);

    // При сворачивании закрываем подменю
    if (newState === 'collapsed') {
      this.openSubmenuId.set(undefined);
    }

    // Event Bus: sidebarToggled
    this.eventBus.publish({
      type: 'sidebarToggled',
      payload: { state: newState },
    });
  }

  /**
   * STATE MACHINE: Клик по пункту БЕЗ подменю
   */
  handleMenuClick(item: MenuItem): void {
    if (item.disabled) return;

    // Закрываем текущее подменю
    this.openSubmenuId.set(undefined);

    // Устанавливаем активный пункт
    this.activeMenuId.set(item.id);

    // Event Bus: navigationStarted
    this.eventBus.publish({
      type: 'navigationStarted',
      payload: {
        menuId: item.id,
        route: item.route,
      },
    });
  }

  /**
   * STATE MACHINE: Клик по пункту С подменю
   */
  handleSubmenuToggle(item: MenuItem): void {
    if (item.disabled) return;

    // Если sidebar свёрнут - раскрываем и сразу открываем подменю
    if (this.state() === 'collapsed') {
      this.state.set('expanded');
      this.openSubmenuId.set(item.id);

      // Event Bus: sidebarToggled
      this.eventBus.publish({
        type: 'sidebarToggled',
        payload: { state: 'expanded' },
      });

      // Event Bus: submenuOpened
      this.eventBus.publish({
        type: 'submenuOpened',
        payload: { menuId: item.id },
      });

      return;
    }

    const currentOpenId = this.openSubmenuId();

    if (currentOpenId === item.id) {
      // Если подменю уже открыто - закрываем
      this.openSubmenuId.set(undefined);

      // Event Bus: submenuClosed
      this.eventBus.publish({
        type: 'submenuClosed',
        payload: { menuId: item.id },
      });
    } else {
      // Закрываем другое подменю и открываем текущее
      this.openSubmenuId.set(item.id);

      // Event Bus: submenuOpened
      this.eventBus.publish({
        type: 'submenuOpened',
        payload: { menuId: item.id },
      });
    }
  }

  /**
   * STATE MACHINE: Клик по пункту ПОДМЕНЮ
   */
  handleSubmenuItemClick(parentItem: MenuItem, subItem: SubMenuItem): void {
    if (subItem.disabled) return;

    // Подменю остаётся открытым!
    // Устанавливаем активный пункт = parent
    this.activeMenuId.set(parentItem.id);

    // Event Bus: navigationStarted
    this.eventBus.publish({
      type: 'navigationStarted',
      payload: {
        menuId: parentItem.id,
        submenuId: subItem.id,
        route: subItem.route,
      },
    });
  }

  /**
   * STATE MACHINE: Кнопка "Закрыть подменю"
   */
  closeSubmenu(): void {
    const currentOpenId = this.openSubmenuId();
    this.openSubmenuId.set(undefined);

    // Event Bus: submenuClosed
    if (currentOpenId) {
      this.eventBus.publish({
        type: 'submenuClosed',
        payload: { menuId: currentOpenId },
      });
    }
  }

  /**
   * Проверка активности пункта меню
   */
  isActive(menuId: string): boolean {
    return this.activeMenuId() === menuId;
  }

  /**
   * Проверка открытости подменю
   */
  isSubmenuOpen(menuId: string): boolean {
    return this.openSubmenuId() === menuId;
  }

  /**
   * Автоматическое определение активного меню по текущему роуту
   */
  private updateActiveMenu(): void {
    const currentUrl = this.router.url;

    // Поиск активного пункта в меню
    for (const group of this.menuGroups()) {
      for (const item of group.items) {
        // Проверка обычного пункта
        if (item.type === 'link' && item.route && currentUrl.includes(item.route)) {
          this.activeMenuId.set(item.id);
          return;
        }

        // Проверка подменю
        if (item.type === 'submenu' && item.submenu) {
          for (const subItem of item.submenu) {
            if (currentUrl.includes(subItem.route)) {
              this.activeMenuId.set(item.id);
              // Автоматически открываем подменю если мы на одном из его пунктов
              if (this.state() === 'expanded') {
                this.openSubmenuId.set(item.id);
              }
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Получение цвета бейджа
   */
  getBadgeColor(intent?: string): string {
    const colors: Record<string, string> = {
      default: '#d9d9d9',
      info: '#1890ff',
      warning: '#faad14',
      error: '#ff4d4f',
      success: '#52c41a',
    };
    return colors[intent || 'default'];
  }
}

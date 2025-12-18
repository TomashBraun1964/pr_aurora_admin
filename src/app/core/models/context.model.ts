// src/app/core/models/context.model.ts

export interface AppContext {
  // Идентификация текущей области
  activeArea: ContextArea | null;

  // Состояние данных
  dataState: ContextDataState;

  // Операционное состояние
  operationalState: ContextOperationalState;

  // Права доступа
  permissions: ContextPermissions;

  // Метаданные
  metadata: ContextMetadata;
}

/**
 * Описание активной области работы
 */
export interface ContextArea {
  // Тип контента (таблица/форма/дашборд)
  type: 'table' | 'form' | 'dashboard' | 'custom';

  // Идентификатор сущности (например, 'users', 'orders')
  entityId: string;

  // Режим работы
  mode: ContextMode;

  // ID конкретной записи (для form в режиме edit/view)
  recordId?: string;

  // Выбранные элементы (для bulk операций)
  selection?: ContextSelection;
}

export type ContextMode =
  | 'view' // Просмотр
  | 'edit' // Редактирование
  | 'create' // Создание
  | 'readonly'; // Только чтение (системная блокировка)

export interface ContextSelection {
  // Массив ID выбранных элементов
  selectedIds: string[];

  // Общее количество доступных элементов
  totalCount: number;

  // Выбраны все элементы?
  allSelected: boolean;
}

/**
 * Состояние данных в контексте
 */
export interface ContextDataState {
  // Есть несохранённые изменения?
  dirty: boolean;

  // Валидность данных
  valid: boolean;

  // Текущая операция
  operation?: DataOperation | null;

  // Состояние загрузки
  loading: boolean;

  // Время последнего изменения
  lastModified?: Date;
}

export type DataOperation =
  | 'loading' // Загрузка данных
  | 'saving' // Сохранение
  | 'deleting' // Удаление
  | 'exporting' // Экспорт
  | 'importing'; // Импорт

/**
 * Операционное состояние
 */
export interface ContextOperationalState {
  // Система работает нормально?
  healthy: boolean;

  // Backend доступен?
  backendAvailable: boolean;

  // Режим только для чтения (глобальный)?
  globalReadOnly: boolean;

  // Текущие блокировки
  locks: ContextLock[];

  // Фоновые операции
  backgroundTasks: BackgroundTask[];
}

export interface ContextLock {
  id: string;
  reason: string;
  source: 'system' | 'user' | 'backend';
  timestamp: Date;
}

export interface BackgroundTask {
  id: string;
  name: string;
  progress: number; // 0-100
  status: 'running' | 'completed' | 'failed';
}

/**
 * Права доступа пользователя
 */
export interface ContextPermissions {
  // Информация о пользователе
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[]; // ['admin', 'editor']
  } | null;

  // Глобальные права
  global: string[]; // ['admin.read', 'admin.write']

  // Права на текущую сущность
  entity: EntityPermissions | null;
}

export interface EntityPermissions {
  // Название сущности
  entityName: string;

  // Доступные операции
  operations: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    export: boolean;
  };

  // Ограничения на поля
  fieldRestrictions?: Record<string, 'hidden' | 'readonly' | 'writable'>;
}

/**
 * Метаданные контекста
 */
export interface ContextMetadata {
  // Версия контекста (для отладки)
  version: number;

  // Время создания контекста
  createdAt: Date;

  // Время последнего обновления
  updatedAt: Date;

  // Произвольные данные
  extra?: Record<string, any>;
}

export interface IContextService {
  // Получить текущий контекст
  getContext(): AppContext;

  // Обновить контекст (полностью)
  setContext(context: AppContext): void;

  // Обновить контекст (частично)
  updateContext(partial: Partial<AppContext>): void;

  // Обновить активную область
  setActiveArea(area: Partial<ContextArea>): void;

  // Обновить состояние данных
  updateDataState(state: Partial<ContextDataState>): void;

  // Проверка прав
  hasPermission(permission: string): boolean;
  hasAnyPermission(permissions: string[]): boolean;
  hasRole(role: string): boolean;

  // Управление блокировками
  addLock(lock: ContextLock): void;
  removeLock(lockId: string): void;
  isLocked(): boolean;

  // Управление выбором
  setSelection(selection: ContextSelection): void;
  clearSelection(): void;

  // Сброс контекста
  reset(): void;
}

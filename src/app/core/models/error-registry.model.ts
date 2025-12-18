// src/app/core/models/error-registry.model.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Уровень ошибки в системе
 */
export type ErrorLevel =
  | 'global' // Системная ошибка (backend, network)
  | 'contextual' // Ошибка формы/таблицы
  | 'local'; // Ошибка поля/строки

/**
 * Источник ошибки
 */
export type ErrorSource =
  | 'http' // HTTP запрос
  | 'validation' // Client-side validation
  | 'runtime' // JavaScript runtime error
  | 'system' // Системная ошибка
  | 'plugin'; // Ошибка плагина

/**
 * Статус жизненного цикла ошибки
 */
export type ErrorLifecycle =
  | 'active' // Активная ошибка
  | 'resolved' // Исправлена
  | 'dismissed'; // Закрыта пользователем

/**
 * Зарегистрированная ошибка
 */
export interface RegisteredError {
  // Уникальный ID ошибки в Registry
  registryId: string;

  // Уровень ошибки
  level: ErrorLevel;

  // Источник ошибки
  source: ErrorSource;

  // Связанный контекст (если есть)
  contextId?: string; // formId, tableId

  // Связанное поле/строка (если есть)
  fieldId?: string;
  rowId?: string;

  // Сама ошибка (обертка над HttpErrorResponse или Error или string)
  originalError: any;
  message: string;
  code?: string;

  // Жизненный цикл
  lifecycle: ErrorLifecycle;

  // Временные метки
  registeredAt: Date;
  resolvedAt?: Date;
  dismissedAt?: Date;

  // Метаданные
  metadata?: Record<string, any>;
}

/**
 * Фильтр для поиска ошибок
 */
export interface ErrorFilter {
  level?: ErrorLevel | ErrorLevel[];
  source?: ErrorSource | ErrorSource[];
  lifecycle?: ErrorLifecycle | ErrorLifecycle[];
  contextId?: string;
  fieldId?: string;
  rowId?: string;
}

/**
 * Агрегированное состояние ошибок
 */
export interface ErrorSummary {
  // Общее количество активных ошибок
  total: number;

  // По уровням
  byLevel: {
    global: number;
    contextual: number;
    local: number;
  };

  // По severity (из ErrorResponse)
  bySeverity: {
    critical: number; // 500+
    error: number; // 400+
    warning: number; // 409, etc
    info: number;
  };

  // Самая критичная ошибка
  highestSeverity: 'critical' | 'error' | 'warning' | 'info' | null;
}

/**
 * Сервис Error Registry
 */
export interface IErrorRegistry {
  // ===== РЕГИСТРАЦИЯ =====

  /**
   * Зарегистрировать новую ошибку
   */
  register(error: Omit<RegisteredError, 'registryId' | 'registeredAt' | 'lifecycle'>): string;

  /**
   * Зарегистрировать HTTP ошибку
   */
  registerHttpError(errorResponse: HttpErrorResponse, contextId?: string): string;

  /**
   * Зарегистрировать ошибку валидации
   */
  registerValidationError(fieldId: string, message: string, contextId: string): string;

  // ===== ПОЛУЧЕНИЕ =====

  /**
   * Получить ошибку по ID
   */
  get(registryId: string): RegisteredError | null;

  /**
   * Получить все ошибки (с фильтром)
   */
  getAll(filter?: ErrorFilter): RegisteredError[];

  /**
   * Получить агрегированную сводку
   */
  getSummary(filter?: ErrorFilter): ErrorSummary;

  /**
   * Observable всех ошибок
   */
  errors$: Observable<RegisteredError[]>;

  /**
   * Observable сводки
   */
  summary$: Observable<ErrorSummary>;

  // ===== УПРАВЛЕНИЕ ЖИЗНЕННЫМ ЦИКЛОМ =====

  /**
   * Пометить ошибку как исправленную
   */
  resolve(registryId: string): void;

  /**
   * Закрыть ошибку (dismiss)
   */
  dismiss(registryId: string): void;

  /**
   * Очистить ошибки по фильтру
   */
  clear(filter: ErrorFilter): void;

  /**
   * Очистить все ошибки контекста
   */
  clearContext(contextId: string): void;

  /**
   * Очистить все ошибки
   */
  clearAll(): void;
}

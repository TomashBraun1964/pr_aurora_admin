// src/app/core/models/command.model.ts
import { Observable } from 'rxjs';
import { AppContext } from './context.model';

/**
 * Статус выполнения команды
 */
export type CommandStatus =
  | 'pending' // Ожидает выполнения
  | 'validating' // Валидация
  | 'executing' // Выполняется
  | 'completed' // Успешно завершена
  | 'failed'; // Ошибка

/**
 * Базовый интерфейс команды
 */
export interface Command<T = any, R = any> {
  // Уникальный ID команды (например, 'save', 'delete')
  id: string;

  // Параметры команды
  payload: T;

  // Результат выполнения
  result?: R;

  // Ошибка (если была)
  error?: Error;

  // Статус выполнения
  status: CommandStatus;

  // Временные метки
  requestedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

/**
 * Обработчик команды
 */
export type CommandHandler<T = any, R = any> = (
  payload: T,
  context: AppContext,
) => Observable<R> | Promise<R>;

/**
 * Результат выполнения команды
 */
export interface CommandResult<R = any> {
  success: boolean;
  data?: R;
  error?: Error;
}

/**
 * Сервис команд
 */
export interface ICommandService {
  /**
   * Зарегистрировать команду
   */
  register<T = any, R = any>(commandId: string, handler: CommandHandler<T, R>): void;

  /**
   * Выполнить команду
   */
  execute<T = any, R = any>(commandId: string, payload: T): Observable<CommandResult<R>>;

  /**
   * Проверить доступность команды
   */
  isAvailable(commandId: string): boolean;

  /**
   * Получить список зарегистрированных команд
   */
  getRegisteredCommands(): string[];
}

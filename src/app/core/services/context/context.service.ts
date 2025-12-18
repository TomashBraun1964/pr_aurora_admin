// src/app/core/services/context/context.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AppContext,
  ContextArea,
  ContextDataState,
  ContextLock,
  ContextSelection,
  IContextService,
} from '../../models/context.model';

const INITIAL_CONTEXT: AppContext = {
  activeArea: null,
  dataState: {
    dirty: false,
    valid: true,
    loading: false,
    operation: null,
  },
  operationalState: {
    healthy: true,
    backendAvailable: true,
    globalReadOnly: false,
    locks: [],
    backgroundTasks: [],
  },
  permissions: {
    user: null,
    global: [],
    entity: null,
  },
  metadata: {
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

@Injectable({
  providedIn: 'root',
})
export class ContextService implements IContextService {
  // Используем BehaviorSubject для совместимости с RxJS подписками
  private readonly contextSubject = new BehaviorSubject<AppContext>(INITIAL_CONTEXT);

  // Публичный Observable
  readonly context$ = this.contextSubject.asObservable();

  constructor() {}

  getContext(): AppContext {
    return this.contextSubject.value;
  }

  setContext(context: AppContext): void {
    this.updateWithMetadata(context);
  }

  updateContext(partial: Partial<AppContext>): void {
    const current = this.getContext();
    const newContext = { ...current, ...partial };
    this.updateWithMetadata(newContext);
  }

  setActiveArea(area: Partial<ContextArea>): void {
    const current = this.getContext();
    const currentArea =
      current.activeArea ||
      ({
        type: 'custom',
        entityId: '',
        mode: 'view',
      } as ContextArea);

    this.updateContext({
      activeArea: { ...currentArea, ...area },
    });
  }

  updateDataState(state: Partial<ContextDataState>): void {
    const current = this.getContext();
    this.updateContext({
      dataState: { ...current.dataState, ...state },
    });
  }

  // --- Permissions ---

  hasPermission(permission: string): boolean {
    const context = this.getContext();
    return context.permissions.global.includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    const context = this.getContext();
    return permissions.some((p) => context.permissions.global.includes(p));
  }

  hasRole(role: string): boolean {
    const user = this.getContext().permissions.user;
    return user ? user.roles.includes(role) : false;
  }

  // --- Locks ---

  addLock(lock: ContextLock): void {
    const current = this.getContext();
    this.updateContext({
      operationalState: {
        ...current.operationalState,
        locks: [...current.operationalState.locks, lock],
      },
    });
  }

  removeLock(lockId: string): void {
    const current = this.getContext();
    this.updateContext({
      operationalState: {
        ...current.operationalState,
        locks: current.operationalState.locks.filter((l) => l.id !== lockId),
      },
    });
  }

  isLocked(): boolean {
    const state = this.getContext().operationalState;
    return state.globalReadOnly || state.locks.length > 0;
  }

  // --- Selection ---

  setSelection(selection: ContextSelection): void {
    const current = this.getContext();
    if (!current.activeArea) return; // Cannot set selection without active area

    this.updateContext({
      activeArea: { ...current.activeArea, selection },
    });
  }

  clearSelection(): void {
    const current = this.getContext();
    if (!current.activeArea) return;

    this.updateContext({
      activeArea: { ...current.activeArea, selection: undefined },
    });
  }

  reset(): void {
    this.contextSubject.next({
      ...INITIAL_CONTEXT,
      metadata: {
        ...INITIAL_CONTEXT.metadata,
        updatedAt: new Date(),
      },
    });
  }

  // Helper
  private updateWithMetadata(context: AppContext): void {
    this.contextSubject.next({
      ...context,
      metadata: {
        ...context.metadata,
        updatedAt: new Date(),
        version: context.metadata.version + 1,
      },
    });
  }
}

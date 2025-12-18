// src/app/core/services/event-bus/event-bus.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  AppEvent,
  EventHandler,
  EventSubscription,
  EventType,
  IEventBus,
} from '../../models/event-bus.model';

@Injectable({
  providedIn: 'root',
})
export class EventBusService implements IEventBus {
  private readonly events$ = new Subject<AppEvent>();
  private readonly history: AppEvent[] = [];
  private readonly maxHistorySize = 100;

  publish<T = any>(event: Omit<AppEvent<T>, 'timestamp'>): void {
    const fullEvent: AppEvent<T> = {
      ...event,
      timestamp: new Date(),
    };

    // Добавить в историю
    this.history.push(fullEvent);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }

    // Опубликовать
    this.events$.next(fullEvent);

    // Log for debug (optional, can be removed)
    // console.debug('[EventBus]', fullEvent.type, fullEvent);
  }

  subscribe<T = any>(type: EventType | EventType[], handler: EventHandler<T>): EventSubscription {
    const types = Array.isArray(type) ? type : [type];

    const subscription = this.events$
      .pipe(filter((event) => types.includes(event.type as EventType)))
      .subscribe(handler);

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }

  on<T = any>(type: EventType | EventType[]): Observable<AppEvent<T>> {
    const types = Array.isArray(type) ? type : [type];

    return this.events$.pipe(
      filter((event) => types.includes(event.type as EventType)),
    ) as Observable<AppEvent<T>>;
  }

  getHistory(type?: EventType): AppEvent[] {
    if (!type) return [...this.history];
    return this.history.filter((e) => e.type === (type as string));
  }

  clearHistory(): void {
    this.history.length = 0;
  }
}

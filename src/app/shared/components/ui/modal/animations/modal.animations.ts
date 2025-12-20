import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * Анимация появления/исчезновения backdrop
 */
export const backdropAnimation: AnimationTriggerMetadata = trigger('backdrop', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('void => enter', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
  transition('enter => void', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
]);

/**
 * Анимация появления/исчезновения модала (центральная позиция)
 */
export const modalAnimation: AnimationTriggerMetadata = trigger('modal', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scale(0.95) translateY(-20px)',
    }),
  ),
  state(
    'enter',
    style({
      opacity: 1,
      transform: 'scale(1) translateY(0)',
    }),
  ),
  transition('void => enter', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
  transition('enter => void', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
]);

/**
 * Анимация для модала с позицией "top"
 */
export const modalTopAnimation: AnimationTriggerMetadata = trigger('modalTop', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(-100%)',
    }),
  ),
  state(
    'enter',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    }),
  ),
  transition('void => enter', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
  transition('enter => void', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
]);

/**
 * Анимация для модала с позицией "bottom" (Bottom Sheet)
 */
export const modalBottomAnimation: AnimationTriggerMetadata = trigger('modalBottom', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    }),
  ),
  state(
    'enter',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    }),
  ),
  transition('void => enter', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')),
  transition('enter => void', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
]);

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createToastItem,
  addToastItem,
  removeToastItem,
  calculateRemainingDuration,
  getToastAriaAttributes,
  DEFAULT_TOAST_DURATION,
  MAX_VISIBLE_TOASTS,
} from './toast-manager';
import { ToastItem } from '../types';


test('createToastItem generates valid item with default duration and id', () => {
  const toast = createToastItem({
    title: 'Message Sent Successfully',
    message: 'We will be in touch.',
    type: 'success',
  });

  assert.equal(toast.title, 'Message Sent Successfully');
  assert.equal(toast.message, 'We will be in touch.');
  assert.equal(toast.type, 'success');
  assert.equal(toast.duration, DEFAULT_TOAST_DURATION);
  assert.ok(toast.id.startsWith('toast-'));
  assert.ok(toast.createdAt > 0);
});

test('createToastItem supports custom id and duration', () => {
  const toast = createToastItem({
    id: 'custom-123',
    title: 'Custom Title',
    duration: 3000,
    type: 'info',
    now: 1700000000000,
  });

  assert.equal(toast.id, 'custom-123');
  assert.equal(toast.duration, 3000);
  assert.equal(toast.createdAt, 1700000000000);
  assert.equal(toast.type, 'info');
});

test('addToastItem adds toast to the front of list', () => {
  const toast1 = createToastItem({ id: '1', title: 'First' });
  const toast2 = createToastItem({ id: '2', title: 'Second' });

  const list1 = addToastItem([], toast1);
  assert.equal(list1.length, 1);
  assert.equal(list1[0].id, '1');

  const list2 = addToastItem(list1, toast2);
  assert.equal(list2.length, 2);
  assert.equal(list2[0].id, '2');
  assert.equal(list2[1].id, '1');
});

test('addToastItem caps list length at maxVisible', () => {
  let list: ToastItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const item = createToastItem({ id: `toast-${i}`, title: `Toast ${i}` });
    list = addToastItem(list, item, 3);
  }

  assert.equal(list.length, 3);
  assert.equal(list[0].id, 'toast-6');
  assert.equal(list[1].id, 'toast-5');
  assert.equal(list[2].id, 'toast-4');
});

test('addToastItem replaces existing item if duplicate id is provided', () => {
  const initial = [
    createToastItem({ id: 'a', title: 'Old A' }),
    createToastItem({ id: 'b', title: 'B' }),
  ];

  const updated = addToastItem(initial, createToastItem({ id: 'a', title: 'New A' }));
  assert.equal(updated.length, 2);
  assert.equal(updated[0].id, 'a');
  assert.equal(updated[0].title, 'New A');
  assert.equal(updated[1].id, 'b');
});

test('removeToastItem properly filters out target id', () => {
  const initial = [
    createToastItem({ id: '1', title: 'One' }),
    createToastItem({ id: '2', title: 'Two' }),
    createToastItem({ id: '3', title: 'Three' }),
  ];

  const removed = removeToastItem(initial, '2');
  assert.equal(removed.length, 2);
  assert.equal(removed.find((t) => t.id === '2'), undefined);
  assert.equal(removed[0].id, '1');
  assert.equal(removed[1].id, '3');
});

test('removeToastItem handles non-existent id gracefully', () => {
  const initial = [createToastItem({ id: '1', title: 'One' })];
  const result = removeToastItem(initial, 'non-existent');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
});

test('calculateRemainingDuration returns accurate remaining time or Infinity', () => {
  const createdAt = 10000;
  const duration = 5000;

  assert.equal(calculateRemainingDuration(createdAt, duration, 10000), 5000);
  assert.equal(calculateRemainingDuration(createdAt, duration, 12000), 3000);
  assert.equal(calculateRemainingDuration(createdAt, duration, 16000), 0);
  assert.equal(calculateRemainingDuration(createdAt, 0, 12000), Infinity); // Persistent
});

test('getToastAriaAttributes returns alert for errors and status for others', () => {
  const errorA11y = getToastAriaAttributes('error');
  assert.equal(errorA11y.role, 'alert');
  assert.equal(errorA11y.ariaLive, 'assertive');

  const successA11y = getToastAriaAttributes('success');
  assert.equal(successA11y.role, 'status');
  assert.equal(successA11y.ariaLive, 'polite');

  const infoA11y = getToastAriaAttributes('info');
  assert.equal(infoA11y.role, 'status');
  assert.equal(infoA11y.ariaLive, 'polite');

  const warningA11y = getToastAriaAttributes('warning');
  assert.equal(warningA11y.role, 'status');
  assert.equal(warningA11y.ariaLive, 'polite');
});

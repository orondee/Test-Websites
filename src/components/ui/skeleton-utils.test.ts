import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSkeletonCardCount,
  isFeaturedCard,
  getSkeletonGridSpan,
  getSkeletonAriaAttributes
} from './skeleton-utils';

test('getSkeletonCardCount returns default 5 for "all" category', () => {
  assert.equal(getSkeletonCardCount('all'), 5);
  assert.equal(getSkeletonCardCount('all', 6), 6);
});

test('getSkeletonCardCount returns 2 for specific industry categories', () => {
  assert.equal(getSkeletonCardCount('hospitality'), 2);
  assert.equal(getSkeletonCardCount('healthcare'), 2);
  assert.equal(getSkeletonCardCount('saas'), 2);
  assert.equal(getSkeletonCardCount('legal'), 2);
});

test('isFeaturedCard identifies first card as featured only when totalCount > 2', () => {
  assert.equal(isFeaturedCard(0, 5), true);
  assert.equal(isFeaturedCard(1, 5), false);
  assert.equal(isFeaturedCard(0, 2), false);
  assert.equal(isFeaturedCard(0, 1), false);
});

test('getSkeletonGridSpan returns correct column span classes', () => {
  assert.equal(getSkeletonGridSpan(0, 5), 'md:col-span-2 lg:col-span-2');
  assert.equal(getSkeletonGridSpan(1, 5), '');
  assert.equal(getSkeletonGridSpan(0, 2), '');
});

test('getSkeletonAriaAttributes generates proper ARIA attributes', () => {
  const loading = getSkeletonAriaAttributes(true);
  assert.equal(loading['aria-busy'], true);
  assert.equal(loading['aria-live'], 'polite');
  assert.equal(loading.role, 'region');

  const ready = getSkeletonAriaAttributes(false);
  assert.equal(ready['aria-busy'], false);
  assert.equal(ready['aria-live'], 'polite');
});

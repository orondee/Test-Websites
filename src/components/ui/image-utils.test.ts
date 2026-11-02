import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateShimmerSvg,
  getAspectRatioStyle,
  getImageTransitionClasses,
  getLoadingAttributes,
} from './image-utils.js';

describe('image-utils', () => {
  describe('generateShimmerSvg', () => {
    it('generates a valid SVG data URI', () => {
      const dataUri = generateShimmerSvg(100, 50);
      assert.ok(dataUri.startsWith('data:image/svg+xml'));
      assert.ok(dataUri.length > 30);
    });
  });

  describe('getAspectRatioStyle', () => {
    it('returns undefined if no ratio is provided', () => {
      assert.strictEqual(getAspectRatioStyle(undefined), undefined);
    });

    it('formats string ratio with colon or slash', () => {
      const res1 = getAspectRatioStyle('16:9');
      assert.deepStrictEqual(res1, { aspectRatio: '16/9' });

      const res2 = getAspectRatioStyle('4/3');
      assert.deepStrictEqual(res2, { aspectRatio: '4/3' });
    });

    it('formats numeric ratio', () => {
      const res = getAspectRatioStyle(1.5);
      assert.deepStrictEqual(res, { aspectRatio: '1.5' });
    });
  });

  describe('getImageTransitionClasses', () => {
    it('returns blur and scale-up when not yet loaded', () => {
      const classes = getImageTransitionClasses(false, false);
      assert.match(classes, /blur-md/);
      assert.match(classes, /opacity-0/);
    });

    it('returns crisp full opacity and zero blur when loaded', () => {
      const classes = getImageTransitionClasses(true, false);
      assert.match(classes, /opacity-100/);
      assert.match(classes, /blur-0/);
      assert.match(classes, /duration-700/);
    });

    it('returns hidden when error occurred', () => {
      const classes = getImageTransitionClasses(false, true);
      assert.match(classes, /invisible/);
    });
  });

  describe('getLoadingAttributes', () => {
    it('defaults to lazy loading and async decoding for non-priority images', () => {
      const attrs = getLoadingAttributes(false);
      assert.strictEqual(attrs.loading, 'lazy');
      assert.strictEqual(attrs.decoding, 'async');
      assert.strictEqual(attrs.fetchPriority, 'auto');
    });

    it('sets eager loading and high priority when priority is true', () => {
      const attrs = getLoadingAttributes(true);
      assert.strictEqual(attrs.loading, 'eager');
      assert.strictEqual(attrs.decoding, 'async');
      assert.strictEqual(attrs.fetchPriority, 'high');
    });
  });
});

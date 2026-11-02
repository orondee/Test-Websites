import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScrollProgress,
  isScrollAboveThreshold,
  getScrollToTopOptions
} from './scroll-utils.js';

describe('scroll-utils', () => {
  describe('calculateScrollProgress', () => {
    it('returns 0 when page is at the very top', () => {
      const progress = calculateScrollProgress({
        scrollY: 0,
        documentHeight: 4000,
        viewportHeight: 1000
      });
      assert.strictEqual(progress, 0);
    });

    it('returns 50 when scrolled halfway down', () => {
      const progress = calculateScrollProgress({
        scrollY: 1500,
        documentHeight: 4000,
        viewportHeight: 1000
      });
      assert.strictEqual(progress, 50);
    });

    it('returns 100 when scrolled to the very bottom', () => {
      const progress = calculateScrollProgress({
        scrollY: 3000,
        documentHeight: 4000,
        viewportHeight: 1000
      });
      assert.strictEqual(progress, 100);
    });

    it('clamps negative scroll values (bounce/overscroll on Safari) to 0', () => {
      const progress = calculateScrollProgress({
        scrollY: -50,
        documentHeight: 4000,
        viewportHeight: 1000
      });
      assert.strictEqual(progress, 0);
    });

    it('clamps scroll values exceeding max scroll to 100', () => {
      const progress = calculateScrollProgress({
        scrollY: 3500,
        documentHeight: 4000,
        viewportHeight: 1000
      });
      assert.strictEqual(progress, 100);
    });

    it('returns 0 if documentHeight <= viewportHeight (no scrollable area)', () => {
      const progress = calculateScrollProgress({
        scrollY: 10,
        documentHeight: 800,
        viewportHeight: 800
      });
      assert.strictEqual(progress, 0);
    });

    it('handles zero or negative viewport heights safely', () => {
      const progress = calculateScrollProgress({
        scrollY: 200,
        documentHeight: 1000,
        viewportHeight: 0
      });
      assert.strictEqual(progress, 0);
    });
  });

  describe('isScrollAboveThreshold', () => {
    it('returns false when scrollY is below threshold', () => {
      assert.strictEqual(isScrollAboveThreshold(100, 350), false);
      assert.strictEqual(isScrollAboveThreshold(0), false);
    });

    it('returns false when scrollY is equal to threshold', () => {
      assert.strictEqual(isScrollAboveThreshold(350, 350), false);
    });

    it('returns true when scrollY exceeds threshold', () => {
      assert.strictEqual(isScrollAboveThreshold(351, 350), true);
      assert.strictEqual(isScrollAboveThreshold(1200), true);
    });

    it('handles invalid or negative scrollY gracefully', () => {
      assert.strictEqual(isScrollAboveThreshold(-50), false);
      assert.strictEqual(isScrollAboveThreshold(NaN), false);
    });
  });

  describe('getScrollToTopOptions', () => {
    it('returns smooth behavior by default', () => {
      const options = getScrollToTopOptions(false);
      assert.deepStrictEqual(options, {
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });

    it('returns auto behavior when reducedMotion is true', () => {
      const options = getScrollToTopOptions(true);
      assert.deepStrictEqual(options, {
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    });
  });
});

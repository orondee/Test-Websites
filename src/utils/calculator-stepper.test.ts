import test from 'node:test';
import assert from 'node:assert';
import { calculateStepperProgress } from './calculator-stepper';

test('calculateStepperProgress - calculates initial 100% when default steps are visited', () => {
  const result = calculateStepperProgress({
    siteType: 'business',
    pagesCount: 5,
    brandingTier: 'included',
    activeAddonsCount: 4,
    visitedSteps: [1, 2, 3, 4]
  });

  assert.strictEqual(result.progressPercentage, 100);
  assert.strictEqual(result.isFullyReady, true);
  assert.strictEqual(result.steps.length, 5);
  assert.strictEqual(result.steps[0].subtitle, 'Business');
  assert.strictEqual(result.steps[1].subtitle, '5 Custom Pages');
  assert.strictEqual(result.steps[2].subtitle, 'Existing Assets');
  assert.strictEqual(result.steps[3].subtitle, '4 Selected');
});

test('calculateStepperProgress - calculates partial progress when user explores step by step', () => {
  const step1Result = calculateStepperProgress({
    siteType: 'ecommerce',
    pagesCount: 4,
    brandingTier: 'included',
    activeAddonsCount: 0,
    visitedSteps: [1]
  });

  assert.strictEqual(step1Result.progressPercentage, 20);
  assert.strictEqual(step1Result.isFullyReady, false);
  assert.strictEqual(step1Result.steps[0].isCompleted, true);
  assert.strictEqual(step1Result.steps[1].isCompleted, false);

  const step2Result = calculateStepperProgress({
    siteType: 'ecommerce',
    pagesCount: 8,
    brandingTier: 'included',
    activeAddonsCount: 0,
    visitedSteps: [1, 2]
  });

  assert.strictEqual(step2Result.progressPercentage, 40);
  assert.strictEqual(step2Result.steps[1].subtitle, '8 Custom Pages');
});

test('calculateStepperProgress - properly reflects full brand kit status', () => {
  const result = calculateStepperProgress({
    siteType: 'saas',
    pagesCount: 10,
    brandingTier: 'full',
    activeAddonsCount: 5,
    visitedSteps: [1, 2, 3, 4]
  });

  assert.strictEqual(result.steps[2].subtitle, 'Full Brand Kit');
  assert.strictEqual(result.statusText, 'Estimate 100% complete & ready to lock in');
});

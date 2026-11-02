import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePricingEstimate, BASE_PRICES, EXTRA_PAGE_RATE, ADDON_COSTS } from './pricing.js';

test('calculatePricingEstimate calculates minimum starter website with 1-4 pages correctly', () => {
  const result = calculatePricingEstimate({
    siteType: 'starter',
    pagesCount: 4,
    cms: false,
    booking: false,
    ecommerce: false,
    seo: false,
    animations: false,
    rush: false
  });

  assert.equal(result.basePrice, 129);
  assert.equal(result.extraPageCost, 0);
  assert.equal(result.totalEstimate, 129);
  assert.equal(result.estimatedDays, 3);
});

test('calculatePricingEstimate calculates business tier with extra pages and add-ons', () => {
  const result = calculatePricingEstimate({
    siteType: 'business',
    pagesCount: 6, // 2 extra pages = $40
    cms: true,     // $35
    booking: true, // $25
    ecommerce: false,
    seo: true,     // $20
    animations: true, // $25
    rush: false
  });

  // Base: 199 + 40 (extra pages) + 35 + 25 + 20 + 25 = 344
  assert.equal(result.basePrice, 199);
  assert.equal(result.extraPageCost, 40);
  assert.equal(result.totalEstimate, 344);
  assert.equal(result.estimatedDays, 5);
});

test('calculatePricingEstimate accelerates timeline when rush sprint is enabled', () => {
  const standard = calculatePricingEstimate({
    siteType: 'bespoke',
    pagesCount: 8,
    cms: true,
    booking: true,
    ecommerce: false,
    seo: true,
    animations: true,
    rush: false
  });

  const rushed = calculatePricingEstimate({
    siteType: 'bespoke',
    pagesCount: 8,
    cms: true,
    booking: true,
    ecommerce: false,
    seo: true,
    animations: true,
    rush: true
  });

  assert.equal(rushed.totalEstimate, standard.totalEstimate + ADDON_COSTS.rush);
  assert.ok(rushed.estimatedDays <= standard.estimatedDays);
  assert.ok(rushed.estimatedDays >= 3);
});

test('calculatePricingEstimate handles ecommerce with full suite within accessible rate', () => {
  const result = calculatePricingEstimate({
    siteType: 'ecommerce',
    pagesCount: 4,
    cms: true,
    booking: false,
    ecommerce: true,
    seo: true,
    animations: true,
    rush: false
  });

  // 249 + 35 + 45 + 20 + 25 = 374
  assert.equal(result.totalEstimate, 374);
  assert.ok(result.totalEstimate < 400); // Significantly lower than previous $600+
});

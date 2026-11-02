import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculatePricingEstimate, 
  BASE_PRICES, 
  EXTRA_PAGE_RATE, 
  ADDON_COSTS,
  BRANDING_COSTS,
  formatQuoteSummaryText 
} from './pricing.js';

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
  assert.equal(result.depositAmount, 65);
  assert.equal(result.completionAmount, 64);
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
  assert.equal(result.depositAmount, 172);
  assert.equal(result.completionAmount, 172);
});

test('calculatePricingEstimate calculates branding tier and performance pack correctly', () => {
  const result = calculatePricingEstimate({
    siteType: 'starter',
    pagesCount: 4,
    cms: false,
    booking: false,
    ecommerce: false,
    seo: false,
    animations: false,
    rush: false,
    brandingTier: 'full',
    performancePack: true
  });

  // Base 129 + full branding (60) + performancePack (20) = 209
  assert.equal(result.basePrice, 129);
  assert.equal(result.brandingCost, 60);
  assert.equal(result.performanceCost, 20);
  assert.equal(result.totalEstimate, 209);
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

test('formatQuoteSummaryText generates complete message with email and breakdown', () => {
  const config = {
    siteType: 'business' as const,
    pagesCount: 5,
    cms: true,
    booking: true,
    ecommerce: false,
    seo: true,
    animations: false,
    rush: false
  };

  const estimate = calculatePricingEstimate(config);
  const text = formatQuoteSummaryText(config, estimate, {
    name: 'Jordan Miller',
    business: 'Miller Bakery'
  });

  assert.ok(text.includes("Hi Oronde"));
  assert.ok(text.includes("Jordan Miller"));
  assert.ok(text.includes("Miller Bakery"));
  assert.ok(text.includes("TOTAL BUILD ESTIMATE"));
  assert.ok(text.includes("30 Days Free Edits"));
});

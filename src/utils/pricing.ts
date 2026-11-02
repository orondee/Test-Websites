export interface PricingConfig {
  siteType: 'starter' | 'business' | 'ecommerce' | 'saas' | 'bespoke';
  pagesCount: number;
  cms: boolean;
  booking: boolean;
  ecommerce: boolean;
  seo: boolean;
  animations: boolean;
  rush: boolean;
}

export const BASE_PRICES: Record<PricingConfig['siteType'], number> = {
  starter: 129,
  business: 199,
  ecommerce: 249,
  saas: 289,
  bespoke: 299
};

export const BASE_DAYS: Record<PricingConfig['siteType'], number> = {
  starter: 3,
  business: 5,
  ecommerce: 6,
  saas: 7,
  bespoke: 7
};

export const EXTRA_PAGE_RATE = 20;

export const ADDON_COSTS = {
  cms: 35,
  booking: 25,
  ecommerce: 45,
  seo: 20,
  animations: 25,
  rush: 40
};

export function calculatePricingEstimate(config: PricingConfig) {
  const basePrice = BASE_PRICES[config.siteType] ?? 199;
  const extraPages = Math.max(0, config.pagesCount - 4);
  const extraPageCost = extraPages * EXTRA_PAGE_RATE;

  const cmsCost = config.cms ? ADDON_COSTS.cms : 0;
  const bookingCost = config.booking ? ADDON_COSTS.booking : 0;
  const ecommerceCost = config.ecommerce ? ADDON_COSTS.ecommerce : 0;
  const seoCost = config.seo ? ADDON_COSTS.seo : 0;
  const animationsCost = config.animations ? ADDON_COSTS.animations : 0;
  const rushCost = config.rush ? ADDON_COSTS.rush : 0;

  const totalEstimate =
    basePrice +
    extraPageCost +
    cmsCost +
    bookingCost +
    ecommerceCost +
    seoCost +
    animationsCost +
    rushCost;

  let estimatedDays = (BASE_DAYS[config.siteType] ?? 5) + Math.floor(extraPages / 4);
  if (config.rush) {
    estimatedDays = Math.max(3, Math.floor(estimatedDays * 0.6));
  }

  return {
    basePrice,
    extraPageCost,
    totalEstimate,
    estimatedDays,
    timelineString: `${estimatedDays} Business Days`
  };
}

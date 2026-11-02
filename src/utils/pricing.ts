export interface PricingConfig {
  siteType: 'starter' | 'business' | 'ecommerce' | 'saas' | 'bespoke';
  pagesCount: number;
  cms: boolean;
  booking: boolean;
  ecommerce: boolean;
  seo: boolean;
  animations: boolean;
  rush: boolean;
  brandingTier?: 'included' | 'polish' | 'full';
  performancePack?: boolean;
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

export const BRANDING_COSTS = {
  included: 0,
  polish: 30,
  full: 60
} as const;

export const ADDON_COSTS = {
  cms: 35,
  booking: 25,
  ecommerce: 45,
  seo: 20,
  animations: 25,
  performancePack: 20,
  rush: 40
};

export interface PricingCalculationResult {
  basePrice: number;
  extraPages: number;
  extraPageCost: number;
  brandingCost: number;
  cmsCost: number;
  bookingCost: number;
  ecommerceCost: number;
  seoCost: number;
  animationsCost: number;
  performanceCost: number;
  rushCost: number;
  totalEstimate: number;
  depositAmount: number;
  completionAmount: number;
  estimatedDays: number;
  timelineString: string;
}

export function calculatePricingEstimate(config: PricingConfig): PricingCalculationResult {
  const basePrice = BASE_PRICES[config.siteType] ?? 199;
  const extraPages = Math.max(0, config.pagesCount - 4);
  const extraPageCost = extraPages * EXTRA_PAGE_RATE;

  const brandingTier = config.brandingTier || 'included';
  const brandingCost = BRANDING_COSTS[brandingTier] ?? 0;

  const cmsCost = config.cms ? ADDON_COSTS.cms : 0;
  const bookingCost = config.booking ? ADDON_COSTS.booking : 0;
  const ecommerceCost = config.ecommerce ? ADDON_COSTS.ecommerce : 0;
  const seoCost = config.seo ? ADDON_COSTS.seo : 0;
  const animationsCost = config.animations ? ADDON_COSTS.animations : 0;
  const performanceCost = config.performancePack ? ADDON_COSTS.performancePack : 0;
  const rushCost = config.rush ? ADDON_COSTS.rush : 0;

  const totalEstimate =
    basePrice +
    extraPageCost +
    brandingCost +
    cmsCost +
    bookingCost +
    ecommerceCost +
    seoCost +
    animationsCost +
    performanceCost +
    rushCost;

  let estimatedDays = (BASE_DAYS[config.siteType] ?? 5) + Math.floor(extraPages / 4);
  if (config.rush) {
    estimatedDays = Math.max(3, Math.floor(estimatedDays * 0.6));
  }

  const depositAmount = Math.round(totalEstimate * 0.5);
  const completionAmount = totalEstimate - depositAmount;

  return {
    basePrice,
    extraPages,
    extraPageCost,
    brandingCost,
    cmsCost,
    bookingCost,
    ecommerceCost,
    seoCost,
    animationsCost,
    performanceCost,
    rushCost,
    totalEstimate,
    depositAmount,
    completionAmount,
    estimatedDays,
    timelineString: `${estimatedDays} Business Days`
  };
}

export function formatQuoteSummaryText(
  config: PricingConfig,
  result: PricingCalculationResult,
  clientDetails?: { name?: string; business?: string; notes?: string }
): string {
  const siteTypeLabels: Record<PricingConfig['siteType'], string> = {
    starter: 'Starter Presence Website ($129)',
    business: 'Local Business & Appointment Site ($199)',
    ecommerce: 'E-Commerce Store & Cart Drawer ($249)',
    saas: 'B2B SaaS / Product Platform ($289)',
    bespoke: 'Bespoke Advisory / Law Practice ($299)'
  };

  const brandingLabels = {
    included: 'Client Provides Existing Assets ($0)',
    polish: 'Logo Polish & Color Palette Setup (+$30)',
    full: 'Full Custom Brand Kit & Curated Photography (+$60)'
  };

  const activeAddons: string[] = [];
  if (config.cms) activeAddons.push(`Client CMS Integration (+$${ADDON_COSTS.cms})`);
  if (config.booking) activeAddons.push(`Appointment & Booking Wizard (+$${ADDON_COSTS.booking})`);
  if (config.ecommerce) activeAddons.push(`Store & Stripe Checkout (+$${ADDON_COSTS.ecommerce})`);
  if (config.seo) activeAddons.push(`Google SEO & Meta Setup (+$${ADDON_COSTS.seo})`);
  if (config.animations) activeAddons.push(`60fps Micro-Interactions (+$${ADDON_COSTS.animations})`);
  if (config.performancePack) activeAddons.push(`Speed & Performance CDN Engine (+$${ADDON_COSTS.performancePack})`);
  if (config.rush) activeAddons.push(`Priority 3-Day Sprint (+$${ADDON_COSTS.rush})`);

  let text = `Hi Oronde,\n\nI configured a website build quote on your website calculator and would like to discuss working together:\n\n`;
  if (clientDetails?.name) text += `Name: ${clientDetails.name}\n`;
  if (clientDetails?.business) text += `Business / Brand: ${clientDetails.business}\n`;

  text += `--------------------------------------------------\n`;
  text += `PROJECT QUOTE BREAKDOWN (Oronde's Web Studio)\n`;
  text += `--------------------------------------------------\n`;
  text += `• Category: ${siteTypeLabels[config.siteType]}\n`;
  text += `• Total Pages: ${config.pagesCount} ${config.pagesCount > 4 ? `(+${config.pagesCount - 4} extra @ $${EXTRA_PAGE_RATE}/page = +$${result.extraPageCost})` : '(Included)'}\n`;
  text += `• Brand Identity: ${brandingLabels[config.brandingTier || 'included']}\n`;

  if (activeAddons.length > 0) {
    text += `• Selected Features & Add-ons:\n`;
    activeAddons.forEach(a => {
      text += `   - ${a}\n`;
    });
  } else {
    text += `• Selected Features: Standard Base Setup\n`;
  }

  text += `--------------------------------------------------\n`;
  text += `TOTAL BUILD ESTIMATE: $${result.totalEstimate.toLocaleString()} USD\n`;
  text += `• 50% Kickoff Deposit: $${result.depositAmount.toLocaleString()}\n`;
  text += `• 50% Balance on Final Approval: $${result.completionAmount.toLocaleString()}\n`;
  text += `• Estimated Delivery Timeline: ${result.timelineString}\n`;
  text += `• Included Guarantee: 30 Days Free Edits + 100% Code Ownership\n`;
  text += `--------------------------------------------------\n\n`;

  if (clientDetails?.notes) {
    text += `Additional Project Notes:\n${clientDetails.notes}\n\n`;
  }

  text += `Looking forward to hearing from you!\n`;
  return text;
}

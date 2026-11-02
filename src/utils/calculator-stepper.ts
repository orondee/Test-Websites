export interface StepperStep {
  id: number;
  key: 'category' | 'pages' | 'branding' | 'addons' | 'quote';
  title: string;
  shortTitle: string;
  subtitle: string;
  isCompleted: boolean;
  targetId: string;
}

export interface StepperInput {
  siteType?: string;
  pagesCount: number;
  brandingTier?: string;
  activeAddonsCount: number;
  visitedSteps?: number[];
  activeStep?: number;
}

export interface StepperProgressResult {
  progressPercentage: number;
  statusText: string;
  isFullyReady: boolean;
  steps: StepperStep[];
}

/**
 * Calculates the stepper and progress bar completion state for the Pricing Calculator.
 */
export function calculateStepperProgress(input: StepperInput): StepperProgressResult {
  const {
    siteType,
    pagesCount,
    brandingTier,
    activeAddonsCount,
    visitedSteps = [1, 2, 3, 4]
  } = input;

  const visitedSet = new Set(visitedSteps);

  const steps: StepperStep[] = [
    {
      id: 1,
      key: 'category',
      title: 'Website Category',
      shortTitle: 'Category',
      subtitle: siteType ? siteType.charAt(0).toUpperCase() + siteType.slice(1) : 'Select category',
      isCompleted: Boolean(siteType) && visitedSet.has(1),
      targetId: 'calc-step-category'
    },
    {
      id: 2,
      key: 'pages',
      title: 'Page Scope',
      shortTitle: 'Pages',
      subtitle: `${pagesCount} Custom ${pagesCount === 1 ? 'Page' : 'Pages'}`,
      isCompleted: pagesCount > 0 && visitedSet.has(2),
      targetId: 'calc-step-pages'
    },
    {
      id: 3,
      key: 'branding',
      title: 'Brand Identity',
      shortTitle: 'Branding',
      subtitle: brandingTier === 'full' 
        ? 'Full Brand Kit' 
        : brandingTier === 'polish' 
          ? 'Color & Logo Polish' 
          : 'Existing Assets',
      isCompleted: Boolean(brandingTier) && visitedSet.has(3),
      targetId: 'calc-step-branding'
    },
    {
      id: 4,
      key: 'addons',
      title: 'Add-ons & Speed',
      shortTitle: 'Add-ons',
      subtitle: `${activeAddonsCount} Selected`,
      isCompleted: visitedSet.has(4),
      targetId: 'calc-step-addons'
    },
    {
      id: 5,
      key: 'quote',
      title: 'Review Quote',
      shortTitle: 'Quote',
      subtitle: 'Ready to email',
      isCompleted: visitedSet.size >= 4,
      targetId: 'calc-step-quote'
    }
  ];

  const completedCount = steps.filter(s => s.isCompleted).length;
  // Progress goes from 20% to 100%
  const progressPercentage = Math.min(100, Math.round((completedCount / steps.length) * 100));
  const isFullyReady = progressPercentage === 100;

  let statusText = 'Configuring your estimate...';
  if (progressPercentage === 100) {
    statusText = 'Estimate 100% complete & ready to lock in';
  } else if (progressPercentage >= 80) {
    statusText = 'Almost ready! Review features & finalize';
  } else if (progressPercentage >= 60) {
    statusText = 'Step 3: Brand identity configured';
  } else if (progressPercentage >= 40) {
    statusText = 'Step 2: Page scope selected';
  } else {
    statusText = 'Step 1: Website category chosen';
  }

  return {
    progressPercentage,
    statusText,
    isFullyReady,
    steps
  };
}

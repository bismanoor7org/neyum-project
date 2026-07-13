import type {
  DealCtaVariant,
  DealPackageDetail,
  DealPackageTag,
  DealTrustKind,
  DealUrgencyKind,
  DealValueBlock,
} from "@/lib/content/deals";
import type { FAQItem } from "@/lib/content/types";

/** Commercial package fields stored in Prisma `content` Json column */
export type DealContentJson = {
  nights?: number;
  travelWindow?: string;
  travelDates?: string;
  bookBefore?: string;
  bookBeforeDate?: string;
  destination?: string;
  resortName?: string;
  duration?: string;
  urgency?: DealUrgencyKind;
  spotsLeft?: number;
  flightsIncluded?: boolean;
  transfersIncluded?: boolean;
  breakfastIncluded?: boolean;
  allInclusive?: boolean;
  kidsStayFree?: boolean;
  kidsEatFree?: boolean;
  familyPackage?: boolean;
  honeymoonPackage?: boolean;
  luxuryCollection?: boolean;
  freeCancellation?: boolean;
  instantConfirmation?: boolean;
  verifiedSupplier?: boolean;
  trustTags?: DealTrustKind[];
  packageTags?: DealPackageTag[];
  rating?: number;
  reviewCount?: number;
  originalPrice?: string;
  discountLabel?: string;
  resortCredit?: string;
  bonusValue?: string;
  valueBlock?: DealValueBlock;
  complimentaryActivities?: string;
  complimentaryTransfers?: boolean;
  freeExcursions?: string;
  highlights?: string[];
  ctaPrimary?: DealCtaVariant;
  ctaSecondary?: DealCtaVariant;
  packageDetail?: DealPackageDetail;
  faqs?: FAQItem[];
};

export const defaultDealContent = (): DealContentJson => ({
  trustTags: [],
  packageTags: [],
  highlights: [],
  packageDetail: {
    exclusions: [],
    roomTypes: [],
    activities: [],
    transportation: [],
    highlights: [],
    faqs: [],
  },
  faqs: [],
});

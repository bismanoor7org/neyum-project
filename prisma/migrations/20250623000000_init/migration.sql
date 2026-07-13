-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TRAVELER', 'SUPPLIER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "AuthTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'VERIFIED');

-- CreateEnum
CREATE TYPE "TourStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('AIRPORT_TRANSFER', 'BOAT_TRANSFER', 'PRIVATE_DRIVER', 'ISLAND_TRANSFER');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "StripePaymentStatus" AS ENUM ('REQUIRES_PAYMENT_METHOD', 'REQUIRES_CONFIRMATION', 'REQUIRES_ACTION', 'PROCESSING', 'SUCCEEDED', 'CANCELED', 'FAILED');

-- CreateEnum
CREATE TYPE "SettlementStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOKING', 'SUPPLIER', 'TOUR', 'PAYMENT', 'REFUND', 'REVIEW', 'SUPPORT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ActivityModule" AS ENUM ('AUTH', 'USERS', 'SUPPLIERS', 'TOURS', 'TRANSPORT', 'BOOKINGS', 'PAYMENTS', 'SETTLEMENTS', 'REVIEWS', 'CONTENT', 'SETTINGS', 'SUPPORT', 'ANALYTICS');

-- CreateEnum
CREATE TYPE "GuideCategory" AS ENUM ('FIRST_TIME', 'VISA', 'WEATHER', 'CULTURE', 'TRANSPORT', 'DINING', 'SAFETY', 'ITINERARY', 'GENERAL');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('USER', 'SUPPLIER', 'COMPLAINT');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "AnalyticsSource" AS ENUM ('GOOGLE_ANALYTICS', 'MICROSOFT_CLARITY', 'SEARCH_CONSOLE', 'INTERNAL');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('NOT_STARTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'RESUBMIT_REQUIRED');

-- CreateEnum
CREATE TYPE "SupplierMemberRole" AS ENUM ('OWNER', 'MANAGER', 'SALES_AGENT', 'OPERATIONS', 'FINANCE', 'GUIDE_MANAGER', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SupplierMemberStatus" AS ENUM ('ACTIVE', 'INVITED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LICENSE', 'INSURANCE', 'CERTIFICATION', 'CONTRACT', 'KYC_ID', 'COMPLIANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CalendarBlockType" AS ENUM ('BLACKOUT', 'HOLIDAY', 'MAINTENANCE', 'STAFF_UNAVAILABLE');

-- CreateEnum
CREATE TYPE "AutomationTrigger" AS ENUM ('BOOKING_CONFIRMED', 'BOOKING_REMINDER', 'PAYMENT_REMINDER', 'REVIEW_REQUEST', 'DOCUMENT_EXPIRY', 'PAYOUT_SENT', 'CANCELLATION');

-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('CUSTOMER', 'ADMIN', 'INTERNAL');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "WishlistItemType" AS ENUM ('TOUR', 'ACTIVITY', 'DESTINATION', 'PACKAGE');

-- CreateEnum
CREATE TYPE "FavouriteType" AS ENUM ('TOUR', 'SUPPLIER', 'DESTINATION');

-- CreateEnum
CREATE TYPE "TravelDocumentType" AS ENUM ('PASSPORT', 'VISA', 'INSURANCE', 'VACCINATION', 'EMERGENCY', 'OTHER');

-- CreateEnum
CREATE TYPE "LoyaltyTier" AS ENUM ('EXPLORER', 'VOYAGER', 'ELITE', 'AMBASSADOR');

-- CreateEnum
CREATE TYPE "LoyaltyTransactionType" AS ENUM ('EARN', 'REDEEM', 'BONUS', 'REFERRAL', 'EXPIRE', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "ItineraryStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TravellerMessageChannel" AS ENUM ('SUPPLIER', 'SUPPORT');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('REQUESTED', 'PROCESSING', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CARD', 'WALLET', 'BANK');

-- CreateEnum
CREATE TYPE "CompanionRelation" AS ENUM ('FAMILY', 'FRIEND', 'PARTNER', 'COLLEAGUE', 'OTHER');

-- CreateEnum
CREATE TYPE "BookingEventType" AS ENUM ('CREATED', 'CONFIRMED', 'PAYMENT_RECEIVED', 'VOUCHER_SENT', 'REMINDER', 'CHECK_IN', 'COMPLETED', 'CANCEL_REQUESTED', 'CANCELLED', 'REFUND_INITIATED', 'REFUND_COMPLETED', 'RESCHEDULED', 'NOTE');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('FULL', 'DEPOSIT', 'PARTIAL');

-- CreateEnum
CREATE TYPE "CheckoutSessionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "PaymentAttemptStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CHARGE', 'REFUND', 'DEPOSIT', 'WALLET_CREDIT');

-- CreateEnum
CREATE TYPE "PromoDiscountType" AS ENUM ('PERCENT', 'FIXED');

-- CreateEnum
CREATE TYPE "BookingLogAction" AS ENUM ('SESSION_STARTED', 'VALIDATED', 'TRAVELLERS_SAVED', 'COUPON_APPLIED', 'PAYMENT_INTENT_CREATED', 'PAYMENT_SUCCEEDED', 'PAYMENT_FAILED', 'BOOKING_CONFIRMED', 'VOUCHER_ISSUED', 'INVOICE_ISSUED', 'REFUND_REQUESTED', 'AVAILABILITY_UPDATED');

-- CreateEnum
CREATE TYPE "AdminStaffRole" AS ENUM ('SUPER_ADMIN', 'EDITOR', 'CONTENT_MANAGER', 'SUPPORT_MANAGER');

-- CreateEnum
CREATE TYPE "CmsEntityType" AS ENUM ('HOMEPAGE', 'DESTINATION', 'TOUR', 'TRANSPORT', 'GUIDE', 'FAQ', 'TESTIMONIAL', 'BANNER', 'ACCOMMODATION', 'DEAL', 'NAVIGATION', 'PAGE');

-- CreateEnum
CREATE TYPE "DealCategory" AS ENUM ('PACKAGE', 'ACCOMMODATION', 'EXPERIENCE');

-- CreateEnum
CREATE TYPE "NavigationLocation" AS ENUM ('PRIMARY', 'MEGA_MENU', 'FOOTER');

-- CreateEnum
CREATE TYPE "SupplierContentType" AS ENUM ('TOUR', 'TRANSPORT', 'DESCRIPTION', 'IMAGE', 'GALLERY');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REVISION_REQUESTED');

-- CreateEnum
CREATE TYPE "VisaType" AS ENUM ('VISA_FREE', 'VISA_ON_ARRIVAL', 'EVISA', 'VISA_REQUIRED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT,
    "googleId" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'TRAVELER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "country" TEXT,
    "city" TEXT,
    "taxId" TEXT,
    "businessLicenseNo" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "kycStatus" "KycStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "onboardingStep" INTEGER NOT NULL DEFAULT 0,
    "rejectionReason" TEXT,
    "resubmissionNote" TEXT,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "healthScore" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "responseRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "cancellationRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "stripeAccountId" TEXT,
    "stripeOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "paypalMerchantId" TEXT,
    "instantBooking" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "excerpt" TEXT,
    "tagline" TEXT,
    "heroImage" TEXT,
    "gallery" TEXT[],
    "highlights" JSONB,
    "content" JSONB,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "durationMinutes" INTEGER,
    "price" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "featuredImage" TEXT,
    "gallery" TEXT[],
    "status" "TourStatus" NOT NULL DEFAULT 'DRAFT',
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "maxGuests" INTEGER NOT NULL DEFAULT 10,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportation_services" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "destinationId" TEXT,
    "title" TEXT NOT NULL,
    "type" "TransportType" NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "image" TEXT,
    "status" "ServiceStatus" NOT NULL DEFAULT 'PENDING',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transportation_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "travelerId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "tourId" TEXT,
    "transportId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "commissionAmount" DECIMAL(12,2) NOT NULL,
    "supplierAmount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMode" "PaymentMode" NOT NULL DEFAULT 'FULL',
    "adultCount" INTEGER NOT NULL DEFAULT 1,
    "childCount" INTEGER NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "serviceFee" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "walletCredit" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "depositAmount" DECIMAL(12,2),
    "promoCode" TEXT,
    "timeSlot" TEXT,
    "pickupLocation" TEXT,
    "checkoutSessionId" TEXT,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "travelDate" TIMESTAMP(3),
    "guestCount" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "cancelReason" TEXT,
    "refundedAt" TIMESTAMP(3),
    "refundAmount" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "stripePaymentId" TEXT,
    "stripeIntentId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "status" "StripePaymentStatus" NOT NULL DEFAULT 'REQUIRES_PAYMENT_METHOD',
    "failureMessage" TEXT,
    "refundedAmount" DECIMAL(12,2),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settlements" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "grossAmount" DECIMAL(12,2) NOT NULL,
    "commission" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "invoiceNumber" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "status" "SettlementStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "invoiceUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settlements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_guides" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "body" JSONB,
    "excerpt" TEXT,
    "featuredImage" TEXT,
    "category" "GuideCategory" NOT NULL DEFAULT 'GENERAL',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "module" "ActivityModule" NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "platformName" TEXT NOT NULL DEFAULT 'My Fiji Tour',
    "supportEmail" TEXT NOT NULL DEFAULT 'concierge@myfijitour.com',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'FJD',
    "timezone" TEXT NOT NULL DEFAULT 'Pacific/Fiji',
    "commissionPercentage" DECIMAL(5,2) NOT NULL DEFAULT 15,
    "stripeMode" TEXT NOT NULL DEFAULT 'test',
    "emailFromName" TEXT,
    "emailFromAddress" TEXT,
    "googleAnalyticsId" TEXT,
    "microsoftClarityId" TEXT,
    "searchConsoleProperty" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commission_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DECIMAL(5,2) NOT NULL,
    "minBookingAmount" DECIMAL(12,2),
    "maxBookingAmount" DECIMAL(12,2),
    "supplierId" TEXT,
    "tourCategory" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commission_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "position" TEXT NOT NULL DEFAULT 'homepage',
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homepage_sections" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homepage_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "destinationId" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "priceFrom" TEXT,
    "overview" TEXT NOT NULL,
    "heroImage" TEXT,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "experiences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" JSONB,
    "collection" TEXT,
    "relatedSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "destinationId" TEXT,
    "price" TEXT NOT NULL,
    "priceNote" TEXT,
    "image" TEXT,
    "category" "DealCategory" NOT NULL DEFAULT 'PACKAGE',
    "includes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "content" JSONB,
    "packageDestination" TEXT,
    "resortName" TEXT,
    "duration" TEXT,
    "travelDates" TEXT,
    "bookBeforeDate" TEXT,
    "bonusValue" TEXT,
    "resortCredit" TEXT,
    "includedFlights" BOOLEAN NOT NULL DEFAULT false,
    "includedTransfers" BOOLEAN NOT NULL DEFAULT false,
    "includedMeals" TEXT,
    "includedActivities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "packageTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_items" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "description" TEXT,
    "location" "NavigationLocation" NOT NULL DEFAULT 'PRIMARY',
    "parentKey" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_tickets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "supplierId" TEXT,
    "assignedToId" TEXT,
    "type" "TicketType" NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_snapshots" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "visitors" INTEGER NOT NULL DEFAULT 0,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "conversionRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "revenue" DECIMAL(12,2),
    "source" "AnalyticsSource" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_integrations" (
    "id" TEXT NOT NULL,
    "source" "AnalyticsSource" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "lastSync" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enquiries" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "destination" TEXT,
    "travelDates" TEXT,
    "guests" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_team_members" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "SupplierMemberRole" NOT NULL DEFAULT 'SALES_AGENT',
    "customRole" TEXT,
    "status" "SupplierMemberStatus" NOT NULL DEFAULT 'INVITED',
    "permissions" JSONB,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_documents" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_calendar_blocks" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "tourId" TEXT,
    "type" "CalendarBlockType" NOT NULL DEFAULT 'BLACKOUT',
    "title" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_calendar_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_availabilities" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "slots" INTEGER NOT NULL DEFAULT 10,
    "booked" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(12,2),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tour_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_automations" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "trigger" "AutomationTrigger" NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "lastRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_messages" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "senderId" TEXT,
    "recipientId" TEXT,
    "bookingId" TEXT,
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "attachments" JSONB,
    "readAt" TIMESTAMP(3),
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_guides" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "languages" TEXT[],
    "status" "ResourceStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_vehicles" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "registrationNo" TEXT,
    "status" "ResourceStatus" NOT NULL DEFAULT 'ACTIVE',
    "maintenanceNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_customer_notes" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "travelerId" TEXT NOT NULL,
    "tags" TEXT[],
    "segment" TEXT,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_customer_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_performance_logs" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "healthScore" DECIMAL(5,2) NOT NULL,
    "responseRate" DECIMAL(5,2) NOT NULL,
    "cancellationRate" DECIMAL(5,2) NOT NULL,
    "reviewScore" DECIMAL(3,2) NOT NULL,
    "revenue" DECIMAL(12,2),
    "bookings" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_performance_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_notification_preferences" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "email" BOOLEAN NOT NULL DEFAULT true,
    "sms" BOOLEAN NOT NULL DEFAULT false,
    "push" BOOLEAN NOT NULL DEFAULT true,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "inApp" BOOLEAN NOT NULL DEFAULT true,
    "booking" BOOLEAN NOT NULL DEFAULT true,
    "payment" BOOLEAN NOT NULL DEFAULT true,
    "review" BOOLEAN NOT NULL DEFAULT true,
    "document" BOOLEAN NOT NULL DEFAULT true,
    "marketing" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "nationality" TEXT,
    "passportNumber" TEXT,
    "passportExpiry" TIMESTAMP(3),
    "passportCountry" TEXT,
    "emergencyName" TEXT,
    "emergencyPhone" TEXT,
    "emergencyRelation" TEXT,
    "dietaryPreferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "accessibilityNeeds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languagePreferences" TEXT[] DEFAULT ARRAY['en']::TEXT[],
    "travelStyle" TEXT,
    "budgetRange" TEXT,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferredDestinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "newsletterOptIn" BOOLEAN NOT NULL DEFAULT true,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" "WishlistItemType" NOT NULL,
    "tourId" TEXT,
    "destinationId" TEXT,
    "supplierId" TEXT,
    "packageSlug" TEXT,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "priceSnapshot" DECIMAL(12,2),
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "notes" TEXT,
    "collectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_collections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isShared" BOOLEAN NOT NULL DEFAULT false,
    "shareToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlist_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "favouriteType" "FavouriteType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "tourId" TEXT,
    "supplierId" TEXT,
    "destinationId" TEXT,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favourites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_itineraries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "title" TEXT NOT NULL,
    "destination" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "ItineraryStatus" NOT NULL DEFAULT 'DRAFT',
    "isShared" BOOLEAN NOT NULL DEFAULT false,
    "shareToken" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" TEXT NOT NULL,
    "itineraryId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "date" DATE,
    "title" TEXT,
    "activities" JSONB NOT NULL DEFAULT '[]',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_documents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TravelDocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileKey" TEXT,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "country" TEXT,
    "documentNo" TEXT,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_companions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "relation" "CompanionRelation" NOT NULL DEFAULT 'FRIEND',
    "dateOfBirth" TIMESTAMP(3),
    "passportNo" TEXT,
    "dietaryNotes" TEXT,
    "canBook" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_companions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_searches" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "query" JSONB NOT NULL,
    "alertEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_messages" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "supplierId" TEXT,
    "channel" "TravellerMessageChannel" NOT NULL DEFAULT 'SUPPLIER',
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "senderRole" TEXT NOT NULL DEFAULT 'TRAVELER',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "traveller_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_message_attachments" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "traveller_message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_payment_methods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PaymentMethodType" NOT NULL DEFAULT 'CARD',
    "stripeMethodId" TEXT,
    "brand" TEXT,
    "last4" TEXT,
    "expMonth" INTEGER,
    "expYear" INTEGER,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "billingName" TEXT,
    "billingCountry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_invoices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT,
    "invoiceNumber" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "taxAmount" DECIMAL(12,2),
    "pdfUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "traveller_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_refunds" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "status" "RefundStatus" NOT NULL DEFAULT 'REQUESTED',
    "reason" TEXT,
    "processedAt" TIMESTAMP(3),
    "stripeRefundId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loyalty_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "lifetimePoints" INTEGER NOT NULL DEFAULT 0,
    "tier" "LoyaltyTier" NOT NULL DEFAULT 'EXPLORER',
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loyalty_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loyalty_transactions" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "LoyaltyTransactionType" NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT,
    "bookingId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loyalty_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_wallets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_promo_redemptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DECIMAL(12,2),
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "bookingId" TEXT,

    CONSTRAINT "traveller_promo_redemptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveller_notification_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" BOOLEAN NOT NULL DEFAULT true,
    "sms" BOOLEAN NOT NULL DEFAULT false,
    "push" BOOLEAN NOT NULL DEFAULT true,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "booking" BOOLEAN NOT NULL DEFAULT true,
    "payment" BOOLEAN NOT NULL DEFAULT true,
    "refund" BOOLEAN NOT NULL DEFAULT true,
    "message" BOOLEAN NOT NULL DEFAULT true,
    "promo" BOOLEAN NOT NULL DEFAULT true,
    "travelAlert" BOOLEAN NOT NULL DEFAULT true,
    "reminder" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "traveller_notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "AuthTokenType" NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceName" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "ipAddress" TEXT,
    "location" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "login_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_events" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "eventType" "BookingEventType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_media" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'photo',
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_sessions" (
    "id" TEXT NOT NULL,
    "tourSlug" TEXT NOT NULL,
    "tourId" TEXT,
    "supplierId" TEXT,
    "travelerId" TEXT,
    "status" "CheckoutSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "selection" JSONB,
    "travellers" JSONB,
    "pricing" JSONB,
    "promoCode" TEXT,
    "paymentMode" "PaymentMode" NOT NULL DEFAULT 'FULL',
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_items" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_travellers" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "nationality" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "age" INTEGER,
    "passportNo" TEXT,
    "dietaryNotes" TEXT,
    "accessibilityNeeds" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_travellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_attempts" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT,
    "checkoutSessionId" TEXT,
    "paymentId" TEXT,
    "stripeIntentId" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "status" "PaymentAttemptStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "failureMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "stripeChargeId" TEXT,
    "reference" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_invoices" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "taxAmount" DECIMAL(12,2) NOT NULL,
    "serviceFee" DECIMAL(12,2) NOT NULL,
    "discountAmount" DECIMAL(12,2) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'FJD',
    "pdfUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_vouchers" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "voucherNumber" TEXT NOT NULL,
    "qrCodeData" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "PromoDiscountType" NOT NULL,
    "discountValue" DECIMAL(12,2) NOT NULL,
    "minAmount" DECIMAL(12,2),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promo_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "PromoDiscountType" NOT NULL,
    "discountValue" DECIMAL(12,2) NOT NULL,
    "minAmount" DECIMAL(12,2),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_logs" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT,
    "sessionId" TEXT,
    "action" "BookingLogAction" NOT NULL,
    "message" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_staff_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "staffRole" "AdminStaffRole" NOT NULL DEFAULT 'CONTENT_MANAGER',
    "permissions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_staff_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_meta" (
    "id" TEXT NOT NULL,
    "entityType" "CmsEntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "canonicalUrl" TEXT,
    "schemaMarkup" JSONB,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "format" TEXT,
    "resourceType" TEXT NOT NULL DEFAULT 'image',
    "width" INTEGER,
    "height" INTEGER,
    "bytes" INTEGER,
    "folder" TEXT NOT NULL DEFAULT 'mft',
    "altText" TEXT,
    "caption" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorTitle" TEXT,
    "authorImage" TEXT,
    "location" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_content_submissions" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "contentType" "SupplierContentType" NOT NULL,
    "entityId" TEXT,
    "title" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_content_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_rules" (
    "id" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL DEFAULT 'FJ',
    "visaType" "VisaType" NOT NULL,
    "stayDuration" TEXT NOT NULL,
    "processingTime" TEXT NOT NULL,
    "entryType" TEXT,
    "entryConditions" TEXT,
    "notes" TEXT,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visa_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_document_requirements" (
    "id" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "passportValidity" TEXT NOT NULL,
    "returnTicketRequired" BOOLEAN NOT NULL DEFAULT true,
    "hotelBookingRequired" BOOLEAN NOT NULL DEFAULT true,
    "proofOfFundsRequired" BOOLEAN NOT NULL DEFAULT false,
    "insuranceRequired" BOOLEAN NOT NULL DEFAULT false,
    "passportPhotosRequired" BOOLEAN NOT NULL DEFAULT false,
    "bankStatementRequired" BOOLEAN NOT NULL DEFAULT false,
    "additionalDocuments" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_document_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_guides" (
    "id" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL DEFAULT 'FJ',
    "arrivalProcess" TEXT NOT NULL,
    "immigrationProcess" TEXT NOT NULL,
    "customsInfo" TEXT NOT NULL,
    "airportInfo" TEXT NOT NULL,
    "healthRequirements" TEXT NOT NULL,
    "travelAdvice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_guides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_userId_key" ON "suppliers"("userId");

-- CreateIndex
CREATE INDEX "suppliers_verificationStatus_idx" ON "suppliers"("verificationStatus");

-- CreateIndex
CREATE INDEX "suppliers_kycStatus_idx" ON "suppliers"("kycStatus");

-- CreateIndex
CREATE INDEX "suppliers_companyName_idx" ON "suppliers"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE INDEX "destinations_featured_sortOrder_idx" ON "destinations"("featured", "sortOrder");

-- CreateIndex
CREATE INDEX "destinations_status_idx" ON "destinations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE INDEX "tours_supplierId_idx" ON "tours"("supplierId");

-- CreateIndex
CREATE INDEX "tours_destinationId_idx" ON "tours"("destinationId");

-- CreateIndex
CREATE INDEX "tours_status_featured_idx" ON "tours"("status", "featured");

-- CreateIndex
CREATE INDEX "tours_createdAt_idx" ON "tours"("createdAt");

-- CreateIndex
CREATE INDEX "transportation_services_supplierId_status_idx" ON "transportation_services"("supplierId", "status");

-- CreateIndex
CREATE INDEX "transportation_services_type_featured_idx" ON "transportation_services"("type", "featured");

-- CreateIndex
CREATE INDEX "transportation_services_destinationId_idx" ON "transportation_services"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_bookingNumber_key" ON "bookings"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_checkoutSessionId_key" ON "bookings"("checkoutSessionId");

-- CreateIndex
CREATE INDEX "bookings_travelerId_idx" ON "bookings"("travelerId");

-- CreateIndex
CREATE INDEX "bookings_supplierId_idx" ON "bookings"("supplierId");

-- CreateIndex
CREATE INDEX "bookings_tourId_idx" ON "bookings"("tourId");

-- CreateIndex
CREATE INDEX "bookings_transportId_idx" ON "bookings"("transportId");

-- CreateIndex
CREATE INDEX "bookings_bookingStatus_paymentStatus_idx" ON "bookings"("bookingStatus", "paymentStatus");

-- CreateIndex
CREATE INDEX "bookings_bookingDate_idx" ON "bookings"("bookingDate");

-- CreateIndex
CREATE INDEX "bookings_travelDate_idx" ON "bookings"("travelDate");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripePaymentId_key" ON "payments"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeIntentId_key" ON "payments"("stripeIntentId");

-- CreateIndex
CREATE INDEX "payments_bookingId_idx" ON "payments"("bookingId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "settlements_invoiceNumber_key" ON "settlements"("invoiceNumber");

-- CreateIndex
CREATE INDEX "settlements_supplierId_status_idx" ON "settlements"("supplierId", "status");

-- CreateIndex
CREATE INDEX "settlements_periodStart_periodEnd_idx" ON "settlements"("periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "reviews_tourId_status_idx" ON "reviews"("tourId", "status");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_tourId_key" ON "reviews"("userId", "tourId");

-- CreateIndex
CREATE UNIQUE INDEX "travel_guides_slug_key" ON "travel_guides"("slug");

-- CreateIndex
CREATE INDEX "travel_guides_category_status_idx" ON "travel_guides"("category", "status");

-- CreateIndex
CREATE INDEX "travel_guides_featured_status_idx" ON "travel_guides"("featured", "status");

-- CreateIndex
CREATE INDEX "travel_guides_publishedAt_idx" ON "travel_guides"("publishedAt");

-- CreateIndex
CREATE INDEX "faqs_published_sortOrder_idx" ON "faqs"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "faqs_status_idx" ON "faqs"("status");

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_idx" ON "notifications"("userId", "isRead");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_userId_idx" ON "activity_logs"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_module_createdAt_idx" ON "activity_logs"("module", "createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_entityId_idx" ON "activity_logs"("entityId");

-- CreateIndex
CREATE INDEX "commission_rules_active_idx" ON "commission_rules"("active");

-- CreateIndex
CREATE INDEX "commission_rules_supplierId_idx" ON "commission_rules"("supplierId");

-- CreateIndex
CREATE INDEX "banners_position_status_idx" ON "banners"("position", "status");

-- CreateIndex
CREATE UNIQUE INDEX "homepage_sections_key_key" ON "homepage_sections"("key");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_slug_key" ON "accommodations"("slug");

-- CreateIndex
CREATE INDEX "accommodations_status_featured_sortOrder_idx" ON "accommodations"("status", "featured", "sortOrder");

-- CreateIndex
CREATE INDEX "accommodations_destinationId_idx" ON "accommodations"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "deals_slug_key" ON "deals"("slug");

-- CreateIndex
CREATE INDEX "deals_status_featured_category_idx" ON "deals"("status", "featured", "category");

-- CreateIndex
CREATE INDEX "deals_destinationId_idx" ON "deals"("destinationId");

-- CreateIndex
CREATE INDEX "navigation_items_location_parentKey_sortOrder_idx" ON "navigation_items"("location", "parentKey", "sortOrder");

-- CreateIndex
CREATE INDEX "support_tickets_status_priority_idx" ON "support_tickets"("status", "priority");

-- CreateIndex
CREATE INDEX "support_tickets_userId_idx" ON "support_tickets"("userId");

-- CreateIndex
CREATE INDEX "support_tickets_supplierId_idx" ON "support_tickets"("supplierId");

-- CreateIndex
CREATE INDEX "analytics_snapshots_date_idx" ON "analytics_snapshots"("date");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_snapshots_date_source_key" ON "analytics_snapshots"("date", "source");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_integrations_source_key" ON "analytics_integrations"("source");

-- CreateIndex
CREATE INDEX "enquiries_createdAt_idx" ON "enquiries"("createdAt");

-- CreateIndex
CREATE INDEX "enquiries_email_idx" ON "enquiries"("email");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_team_members_userId_key" ON "supplier_team_members"("userId");

-- CreateIndex
CREATE INDEX "supplier_team_members_supplierId_status_idx" ON "supplier_team_members"("supplierId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_team_members_supplierId_email_key" ON "supplier_team_members"("supplierId", "email");

-- CreateIndex
CREATE INDEX "supplier_documents_supplierId_type_idx" ON "supplier_documents"("supplierId", "type");

-- CreateIndex
CREATE INDEX "supplier_documents_status_expiresAt_idx" ON "supplier_documents"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "supplier_calendar_blocks_supplierId_startAt_endAt_idx" ON "supplier_calendar_blocks"("supplierId", "startAt", "endAt");

-- CreateIndex
CREATE INDEX "tour_availabilities_supplierId_date_idx" ON "tour_availabilities"("supplierId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "tour_availabilities_tourId_date_key" ON "tour_availabilities"("tourId", "date");

-- CreateIndex
CREATE INDEX "supplier_automations_supplierId_enabled_idx" ON "supplier_automations"("supplierId", "enabled");

-- CreateIndex
CREATE INDEX "supplier_messages_supplierId_channel_createdAt_idx" ON "supplier_messages"("supplierId", "channel", "createdAt");

-- CreateIndex
CREATE INDEX "supplier_guides_supplierId_status_idx" ON "supplier_guides"("supplierId", "status");

-- CreateIndex
CREATE INDEX "supplier_vehicles_supplierId_status_idx" ON "supplier_vehicles"("supplierId", "status");

-- CreateIndex
CREATE INDEX "supplier_customer_notes_supplierId_isVip_idx" ON "supplier_customer_notes"("supplierId", "isVip");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_customer_notes_supplierId_travelerId_key" ON "supplier_customer_notes"("supplierId", "travelerId");

-- CreateIndex
CREATE INDEX "supplier_performance_logs_supplierId_date_idx" ON "supplier_performance_logs"("supplierId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_performance_logs_supplierId_date_key" ON "supplier_performance_logs"("supplierId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_notification_preferences_supplierId_key" ON "supplier_notification_preferences"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_profiles_userId_key" ON "traveller_profiles"("userId");

-- CreateIndex
CREATE INDEX "traveller_profiles_nationality_idx" ON "traveller_profiles"("nationality");

-- CreateIndex
CREATE INDEX "wishlist_items_userId_itemType_idx" ON "wishlist_items"("userId", "itemType");

-- CreateIndex
CREATE INDEX "wishlist_items_collectionId_idx" ON "wishlist_items"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_collections_shareToken_key" ON "wishlist_collections"("shareToken");

-- CreateIndex
CREATE INDEX "wishlist_collections_userId_idx" ON "wishlist_collections"("userId");

-- CreateIndex
CREATE INDEX "favourites_userId_favouriteType_idx" ON "favourites"("userId", "favouriteType");

-- CreateIndex
CREATE UNIQUE INDEX "favourites_userId_favouriteType_referenceId_key" ON "favourites"("userId", "favouriteType", "referenceId");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_itineraries_shareToken_key" ON "traveller_itineraries"("shareToken");

-- CreateIndex
CREATE INDEX "traveller_itineraries_userId_status_idx" ON "traveller_itineraries"("userId", "status");

-- CreateIndex
CREATE INDEX "traveller_itineraries_startDate_idx" ON "traveller_itineraries"("startDate");

-- CreateIndex
CREATE INDEX "itinerary_days_itineraryId_idx" ON "itinerary_days"("itineraryId");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_days_itineraryId_dayNumber_key" ON "itinerary_days"("itineraryId", "dayNumber");

-- CreateIndex
CREATE INDEX "travel_documents_userId_type_idx" ON "travel_documents"("userId", "type");

-- CreateIndex
CREATE INDEX "travel_documents_expiresAt_idx" ON "travel_documents"("expiresAt");

-- CreateIndex
CREATE INDEX "travel_companions_userId_idx" ON "travel_companions"("userId");

-- CreateIndex
CREATE INDEX "saved_searches_userId_idx" ON "saved_searches"("userId");

-- CreateIndex
CREATE INDEX "traveller_messages_userId_channel_isRead_idx" ON "traveller_messages"("userId", "channel", "isRead");

-- CreateIndex
CREATE INDEX "traveller_messages_supplierId_idx" ON "traveller_messages"("supplierId");

-- CreateIndex
CREATE INDEX "traveller_messages_createdAt_idx" ON "traveller_messages"("createdAt");

-- CreateIndex
CREATE INDEX "traveller_message_attachments_messageId_idx" ON "traveller_message_attachments"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_payment_methods_stripeMethodId_key" ON "traveller_payment_methods"("stripeMethodId");

-- CreateIndex
CREATE INDEX "traveller_payment_methods_userId_isDefault_idx" ON "traveller_payment_methods"("userId", "isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_invoices_invoiceNumber_key" ON "traveller_invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "traveller_invoices_userId_idx" ON "traveller_invoices"("userId");

-- CreateIndex
CREATE INDEX "traveller_invoices_bookingId_idx" ON "traveller_invoices"("bookingId");

-- CreateIndex
CREATE INDEX "traveller_refunds_userId_status_idx" ON "traveller_refunds"("userId", "status");

-- CreateIndex
CREATE INDEX "traveller_refunds_bookingId_idx" ON "traveller_refunds"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "loyalty_accounts_userId_key" ON "loyalty_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "loyalty_accounts_referralCode_key" ON "loyalty_accounts"("referralCode");

-- CreateIndex
CREATE INDEX "loyalty_transactions_accountId_createdAt_idx" ON "loyalty_transactions"("accountId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_wallets_userId_key" ON "traveller_wallets"("userId");

-- CreateIndex
CREATE INDEX "traveller_promo_redemptions_code_idx" ON "traveller_promo_redemptions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_promo_redemptions_userId_code_key" ON "traveller_promo_redemptions"("userId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "traveller_notification_preferences_userId_key" ON "traveller_notification_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_tokenHash_key" ON "auth_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "auth_tokens_userId_type_idx" ON "auth_tokens"("userId", "type");

-- CreateIndex
CREATE INDEX "auth_tokens_expiresAt_idx" ON "auth_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "login_sessions_userId_revokedAt_idx" ON "login_sessions"("userId", "revokedAt");

-- CreateIndex
CREATE INDEX "booking_events_bookingId_occurredAt_idx" ON "booking_events"("bookingId", "occurredAt");

-- CreateIndex
CREATE INDEX "review_media_reviewId_idx" ON "review_media"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_idempotencyKey_key" ON "checkout_sessions"("idempotencyKey");

-- CreateIndex
CREATE INDEX "checkout_sessions_status_expiresAt_idx" ON "checkout_sessions"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "checkout_sessions_tourSlug_idx" ON "checkout_sessions"("tourSlug");

-- CreateIndex
CREATE INDEX "booking_items_bookingId_idx" ON "booking_items"("bookingId");

-- CreateIndex
CREATE INDEX "booking_travellers_bookingId_idx" ON "booking_travellers"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_attempts_stripeIntentId_key" ON "payment_attempts"("stripeIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_attempts_idempotencyKey_key" ON "payment_attempts"("idempotencyKey");

-- CreateIndex
CREATE INDEX "payment_attempts_checkoutSessionId_idx" ON "payment_attempts"("checkoutSessionId");

-- CreateIndex
CREATE INDEX "payment_attempts_status_idx" ON "payment_attempts"("status");

-- CreateIndex
CREATE INDEX "transactions_bookingId_type_idx" ON "transactions"("bookingId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "booking_invoices_bookingId_key" ON "booking_invoices"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_invoices_invoiceNumber_key" ON "booking_invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "booking_invoices_invoiceNumber_idx" ON "booking_invoices"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "booking_vouchers_bookingId_key" ON "booking_vouchers"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "booking_vouchers_voucherNumber_key" ON "booking_vouchers"("voucherNumber");

-- CreateIndex
CREATE INDEX "booking_vouchers_voucherNumber_idx" ON "booking_vouchers"("voucherNumber");

-- CreateIndex
CREATE UNIQUE INDEX "promo_codes_code_key" ON "promo_codes"("code");

-- CreateIndex
CREATE INDEX "promo_codes_active_expiresAt_idx" ON "promo_codes"("active", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE INDEX "coupons_active_expiresAt_idx" ON "coupons"("active", "expiresAt");

-- CreateIndex
CREATE INDEX "booking_logs_bookingId_createdAt_idx" ON "booking_logs"("bookingId", "createdAt");

-- CreateIndex
CREATE INDEX "booking_logs_sessionId_idx" ON "booking_logs"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_staff_profiles_userId_key" ON "admin_staff_profiles"("userId");

-- CreateIndex
CREATE INDEX "admin_staff_profiles_staffRole_idx" ON "admin_staff_profiles"("staffRole");

-- CreateIndex
CREATE INDEX "seo_meta_entityType_idx" ON "seo_meta"("entityType");

-- CreateIndex
CREATE UNIQUE INDEX "seo_meta_entityType_entityId_key" ON "seo_meta"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_cloudinaryId_key" ON "media_assets"("cloudinaryId");

-- CreateIndex
CREATE INDEX "media_assets_folder_createdAt_idx" ON "media_assets"("folder", "createdAt");

-- CreateIndex
CREATE INDEX "media_assets_uploadedById_idx" ON "media_assets"("uploadedById");

-- CreateIndex
CREATE INDEX "testimonials_status_featured_sortOrder_idx" ON "testimonials"("status", "featured", "sortOrder");

-- CreateIndex
CREATE INDEX "supplier_content_submissions_supplierId_status_idx" ON "supplier_content_submissions"("supplierId", "status");

-- CreateIndex
CREATE INDEX "supplier_content_submissions_contentType_status_idx" ON "supplier_content_submissions"("contentType", "status");

-- CreateIndex
CREATE INDEX "supplier_content_submissions_submittedAt_idx" ON "supplier_content_submissions"("submittedAt");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");

-- CreateIndex
CREATE INDEX "countries_name_idx" ON "countries"("name");

-- CreateIndex
CREATE INDEX "countries_slug_idx" ON "countries"("slug");

-- CreateIndex
CREATE INDEX "visa_rules_destinationCountry_idx" ON "visa_rules"("destinationCountry");

-- CreateIndex
CREATE INDEX "visa_rules_visaType_idx" ON "visa_rules"("visaType");

-- CreateIndex
CREATE UNIQUE INDEX "visa_rules_nationalityId_destinationCountry_key" ON "visa_rules"("nationalityId", "destinationCountry");

-- CreateIndex
CREATE UNIQUE INDEX "travel_document_requirements_nationalityId_key" ON "travel_document_requirements"("nationalityId");

-- CreateIndex
CREATE UNIQUE INDEX "entry_guides_destinationCountry_key" ON "entry_guides"("destinationCountry");

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportation_services" ADD CONSTRAINT "transportation_services_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportation_services" ADD CONSTRAINT "transportation_services_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transportation_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_checkoutSessionId_fkey" FOREIGN KEY ("checkoutSessionId") REFERENCES "checkout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_rules" ADD CONSTRAINT "commission_rules_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_team_members" ADD CONSTRAINT "supplier_team_members_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_documents" ADD CONSTRAINT "supplier_documents_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_calendar_blocks" ADD CONSTRAINT "supplier_calendar_blocks_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_calendar_blocks" ADD CONSTRAINT "supplier_calendar_blocks_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_availabilities" ADD CONSTRAINT "tour_availabilities_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_availabilities" ADD CONSTRAINT "tour_availabilities_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_automations" ADD CONSTRAINT "supplier_automations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_messages" ADD CONSTRAINT "supplier_messages_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_messages" ADD CONSTRAINT "supplier_messages_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "supplier_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_guides" ADD CONSTRAINT "supplier_guides_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_vehicles" ADD CONSTRAINT "supplier_vehicles_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_customer_notes" ADD CONSTRAINT "supplier_customer_notes_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_performance_logs" ADD CONSTRAINT "supplier_performance_logs_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_notification_preferences" ADD CONSTRAINT "supplier_notification_preferences_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_profiles" ADD CONSTRAINT "traveller_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "wishlist_collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_collections" ADD CONSTRAINT "wishlist_collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_itineraries" ADD CONSTRAINT "traveller_itineraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "traveller_itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_documents" ADD CONSTRAINT "travel_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_companions" ADD CONSTRAINT "travel_companions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_messages" ADD CONSTRAINT "traveller_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_message_attachments" ADD CONSTRAINT "traveller_message_attachments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "traveller_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_payment_methods" ADD CONSTRAINT "traveller_payment_methods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_invoices" ADD CONSTRAINT "traveller_invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_invoices" ADD CONSTRAINT "traveller_invoices_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_refunds" ADD CONSTRAINT "traveller_refunds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_refunds" ADD CONSTRAINT "traveller_refunds_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loyalty_accounts" ADD CONSTRAINT "loyalty_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loyalty_transactions" ADD CONSTRAINT "loyalty_transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "loyalty_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_wallets" ADD CONSTRAINT "traveller_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_promo_redemptions" ADD CONSTRAINT "traveller_promo_redemptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveller_notification_preferences" ADD CONSTRAINT "traveller_notification_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_sessions" ADD CONSTRAINT "login_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_events" ADD CONSTRAINT "booking_events_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_travellers" ADD CONSTRAINT "booking_travellers_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_checkoutSessionId_fkey" FOREIGN KEY ("checkoutSessionId") REFERENCES "checkout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_invoices" ADD CONSTRAINT "booking_invoices_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_vouchers" ADD CONSTRAINT "booking_vouchers_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_logs" ADD CONSTRAINT "booking_logs_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_staff_profiles" ADD CONSTRAINT "admin_staff_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_content_submissions" ADD CONSTRAINT "supplier_content_submissions_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_content_submissions" ADD CONSTRAINT "supplier_content_submissions_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_rules" ADD CONSTRAINT "visa_rules_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_document_requirements" ADD CONSTRAINT "travel_document_requirements_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

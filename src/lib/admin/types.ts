export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";
export type BookingStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "refunded";

export type SupplierStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended"
  | "verified";

export type TourStatus = "draft" | "pending" | "approved" | "rejected" | "featured";
export type UserStatus = "active" | "inactive" | "blocked";
export type SettlementStatus = "pending" | "processing" | "paid";
export type NotificationType =
  | "booking"
  | "supplier"
  | "tour"
  | "payment"
  | "refund";

export type Booking = {
  id: string;
  travelerName: string;
  travelerEmail: string;
  tourName: string;
  supplierName: string;
  destination: string;
  bookingDate: string;
  travelDate: string;
  amount: number;
  commission: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
};

export type Supplier = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  status: SupplierStatus;
  toursListed: number;
  totalRevenue: number;
  joinedAt: string;
  verified: boolean;
};

export type TourListing = {
  id: string;
  name: string;
  supplierName: string;
  destination: string;
  category: string;
  price: number;
  bookings: number;
  rating: number;
  status: TourStatus;
  featured: boolean;
  updatedAt: string;
};

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  country: string;
  bookings: number;
  totalSpent: number;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
};

export type Settlement = {
  id: string;
  supplierName: string;
  period: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: SettlementStatus;
  invoiceId: string;
  dueDate: string;
};

export type AdminNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type ContentItem = {
  id: string;
  type:
    | "destination"
    | "tour"
    | "transport"
    | "guide"
    | "faq"
    | "homepage"
    | "banner";
  title: string;
  status: "published" | "draft" | "scheduled";
  updatedAt: string;
  author: string;
};

export type DashboardMetrics = {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueChange: number;
  totalBookings: number;
  todayBookings: number;
  bookingsChange: number;
  activeSuppliers: number;
  totalTravelers: number;
  travelersChange: number;
  websiteVisitors: number;
  visitorsChange: number;
  conversionRate: number;
  conversionChange: number;
};

export type ChartPoint = { label: string; value: number };

export type FinanceSummary = {
  totalRevenue: number;
  commissionEarned: number;
  supplierEarnings: number;
  pendingSettlements: number;
  paidSettlements: number;
  monthlyCommission: number;
  avgOrderValue: number;
};

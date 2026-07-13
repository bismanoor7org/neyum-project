export type EnquirySource = "contact" | "booking" | "journey" | "newsletter" | "visa-checker";

export type BookingTab = "stay" | "experiences" | "packages";

export type EnquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  locale: string;
  source: EnquirySource;
  bookingTab?: BookingTab;
};

export type EnquiryRecord = EnquiryPayload & {
  id: string;
  createdAt: string;
};

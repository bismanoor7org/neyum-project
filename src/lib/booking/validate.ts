import type { BookingDraft, ValidationErrors } from "@/lib/booking/types";
import { daysBetween, isPastDate } from "@/lib/booking/calendar";

export function validateBookingDraft(draft: BookingDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.tab === "stay") {
    if (!draft.destinationSlug) {
      errors.destination = "Please select a Fiji destination.";
    }
  }

  if (draft.tab === "experiences") {
    if (!draft.experienceType?.trim()) {
      errors.experience = "Please choose an experience type.";
    }
  }

  if (draft.tab === "packages") {
    if (!draft.packageStyle?.trim()) {
      errors.package = "Please choose a package style.";
    }
  }

  if (!draft.checkIn) {
    errors.dates = "Please select your check-in date.";
  } else if (isPastDate(draft.checkIn)) {
    errors.dates = "Check-in cannot be in the past.";
  } else if (!draft.checkOut) {
    errors.dates = "Please select your check-out date.";
  } else if (isPastDate(draft.checkOut)) {
    errors.dates = "Check-out cannot be in the past.";
  } else if (daysBetween(draft.checkIn, draft.checkOut) < 1) {
    errors.dates = "Check-out must be at least one day after check-in.";
  } else if (daysBetween(draft.checkIn, draft.checkOut) > 30) {
    errors.dates = "For stays over 30 nights, please contact our concierge.";
  }

  const { adults, children, infants, rooms } = draft.travellers;
  if (adults < 1) {
    errors.travellers = "At least one adult is required.";
  } else if (adults + children + infants > 20) {
    errors.travellers = "For groups over 20, please contact our concierge.";
  } else if (rooms < 1) {
    errors.travellers = "Please select at least one room.";
  } else if (rooms > adults) {
    errors.travellers = "Rooms cannot exceed the number of adults.";
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function firstValidationMessage(errors: ValidationErrors): string | null {
  return (
    errors.destination ??
    errors.dates ??
    errors.travellers ??
    errors.experience ??
    errors.package ??
    errors.general ??
    null
  );
}

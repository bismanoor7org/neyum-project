import type { TransportType } from "@prisma/client";

export const TRANSPORT_CMS_STATUS = [
  { value: "DRAFT", label: "Draft" },
  { value: "APPROVED", label: "Published" },
  { value: "SUSPENDED", label: "Archived" },
] as const;

export type TransportCmsStatus = (typeof TRANSPORT_CMS_STATUS)[number]["value"];

export const TRANSPORT_TYPES: { value: TransportType; label: string }[] = [
  { value: "AIRPORT_TRANSFER", label: "Airport transfer" },
  { value: "BOAT_TRANSFER", label: "Boat transfer" },
  { value: "PRIVATE_DRIVER", label: "Private driver" },
  { value: "ISLAND_TRANSFER", label: "Island transfer" },
];

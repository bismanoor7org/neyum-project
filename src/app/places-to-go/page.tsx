import { permanentRedirect } from "next/navigation";

export default function LegacyPlacesToGoPage() {
  permanentRedirect("/destinations");
}

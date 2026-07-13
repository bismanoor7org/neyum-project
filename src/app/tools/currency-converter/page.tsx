import { CurrencyConverterClient } from "@/components/tools/currency-converter/CurrencyConverterClient";
import { currencyConverterMetadata } from "@/lib/tools/currency-converter/seo";

export const metadata = currencyConverterMetadata();

export default function CurrencyConverterPage() {
  return <CurrencyConverterClient />;
}

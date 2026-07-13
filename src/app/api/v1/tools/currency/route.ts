import { NextResponse } from "next/server";
import {
  convertCurrency,
  getExchangeRateSnapshot,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
} from "@/server/services/currency.service";

function parseCurrency(value: string | null): CurrencyCode | null {
  if (!value) return null;
  const code = value.toUpperCase();
  return SUPPORTED_CURRENCIES.includes(code as CurrencyCode)
    ? (code as CurrencyCode)
    : null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const base = parseCurrency(searchParams.get("base")) ?? "FJD";
    const snapshot = await getExchangeRateSnapshot(base);
    return NextResponse.json({ data: snapshot });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Currency lookup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);
    const from = parseCurrency(body.from);
    const to = parseCurrency(body.to);

    if (!from || !to) {
      return NextResponse.json({ error: "Invalid currency codes" }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const result = await convertCurrency(amount, from, to);
    return NextResponse.json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

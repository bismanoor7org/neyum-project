/**
 * Validates visa assistant API responses for key nationalities.
 * Run with dev server: npx tsx scripts/test-visa-assistant-chat.ts
 */
const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";

const CASES = [
  { label: "Pakistan → Fiji", message: "Do Pakistanis need a visa for Fiji?" },
  { label: "India → Fiji", message: "Do Indians need a visa for Fiji?" },
  { label: "UK → Fiji", message: "Do UK citizens need a visa for Fiji?" },
  { label: "USA → Fiji", message: "Do Americans need a visa for Fiji?" },
  { label: "Australia → Fiji", message: "Do Australians need a visa for Fiji?" },
  { label: "New Zealand → Fiji", message: "Do New Zealanders need a visa for Fiji?" },
  { label: "Documents (PK)", message: "What documents are required?", slug: "pakistan" },
  { label: "Family (IN)", message: "Can I travel with my family?", slug: "india" },
];

async function chat(message: string, nationalitySlug?: string) {
  const res = await fetch(`${BASE}/api/v1/visa-assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "chat", message, nationalitySlug }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<{ reply: string; suggestedQuestions?: string[] }>;
}

async function main() {
  let passed = 0;
  for (const c of CASES) {
    const res = await chat(c.message, c.slug);
    const lower = res.reply.toLowerCase();
    const hasVisaInfo =
      lower.includes("visa free") ||
      lower.includes("visa on arrival") ||
      lower.includes("visa required") ||
      (lower.includes("visa") && lower.includes("fiji"));
    const mentionsCountry =
      !c.message.toLowerCase().includes("uk") ||
      lower.includes("uk") ||
      lower.includes("united kingdom") ||
      lower.includes("visa free");
    const ok =
      res.reply.length > 80 &&
      hasVisaInfo &&
      mentionsCountry &&
      (res.suggestedQuestions?.length ?? 0) >= 3;
    console.log(`\n${ok ? "✓" : "✗"} ${c.label}`);
    console.log(res.reply.slice(0, 300).replace(/\n/g, " ") + "…");
    if (ok) passed += 1;
  }
  console.log(`\n${passed}/${CASES.length} cases passed`);
  process.exit(passed === CASES.length ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

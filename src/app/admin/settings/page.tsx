"use client";

import { useState } from "react";
import {
  CreditCard,
  Globe,
  Percent,
  Shield,
  Users,
} from "lucide-react";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { cn } from "@/lib/utils";

type Tab = "general" | "payment" | "commission" | "permissions" | "security";

const TABS: { id: Tab; label: string; icon: typeof Globe }[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "commission", label: "Commission", icon: Percent },
  { id: "permissions", label: "User permissions", icon: Users },
  { id: "security", label: "Security", icon: Shield },
];

function Field({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--admin-border-soft)] py-5 last:border-0">
      <label className="admin-text block text-sm font-medium">{label}</label>
      {description && (
        <p className="admin-text-subtle mt-0.5 text-xs">{description}</p>
      )}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "admin-input w-full max-w-md rounded-lg px-3 py-2 text-sm",
        props.className,
      )}
    />
  );
}

function Select({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
}) {
  return (
    <select
      {...props}
      className="admin-select w-full max-w-md rounded-lg px-3 py-2 text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Platform configuration — payments, commission, permissions and security."
        actions={
          <AdminButton onClick={handleSave}>
            {saved ? "Saved ✓" : "Save changes"}
          </AdminButton>
        }
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex shrink-0 gap-1 overflow-x-auto lg:w-52 lg:flex-col lg:gap-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "admin-tab flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                tab === id && "admin-tab-active",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </nav>

        <div className="admin-card min-w-0 flex-1 rounded-xl p-6">
          {tab === "general" && (
            <>
              <h3 className="admin-text font-serif text-lg">General settings</h3>
              <div className="mt-4">
                <Field label="Platform name" description="Displayed in admin and emails">
                  <Input defaultValue="My Fiji Tour" />
                </Field>
                <Field label="Support email">
                  <Input defaultValue="concierge@myfijitour.com" type="email" />
                </Field>
                <Field label="Default currency">
                  <Select
                    defaultValue="FJD"
                    options={[
                      { value: "FJD", label: "Fijian Dollar (FJD)" },
                      { value: "AUD", label: "Australian Dollar (AUD)" },
                      { value: "USD", label: "US Dollar (USD)" },
                    ]}
                  />
                </Field>
                <Field label="Timezone">
                  <Select
                    defaultValue="Pacific/Fiji"
                    options={[
                      { value: "Pacific/Fiji", label: "Pacific/Fiji (FJT)" },
                      { value: "Australia/Sydney", label: "Australia/Sydney" },
                    ]}
                  />
                </Field>
              </div>
            </>
          )}

          {tab === "payment" && (
            <>
              <h3 className="admin-text font-serif text-lg">Payment settings</h3>
              <div className="mt-4">
                <Field label="Payment gateway">
                  <Select
                    defaultValue="stripe"
                    options={[
                      { value: "stripe", label: "Stripe" },
                      { value: "paypal", label: "PayPal" },
                    ]}
                  />
                </Field>
                <Field label="Stripe publishable key">
                  <Input defaultValue="pk_live_••••••••" />
                </Field>
                <Field label="Auto-capture payments">
                  <Select
                    defaultValue="yes"
                    options={[
                      { value: "yes", label: "Yes — capture on booking" },
                      { value: "no", label: "No — authorize only" },
                    ]}
                  />
                </Field>
                <Field label="Refund window (days)">
                  <Input defaultValue="14" type="number" />
                </Field>
              </div>
            </>
          )}

          {tab === "commission" && (
            <>
              <h3 className="admin-text font-serif text-lg">Commission settings</h3>
              <div className="mt-4">
                <Field
                  label="Platform commission rate"
                  description="Percentage taken from each booking"
                >
                  <Input defaultValue="15" type="number" />
                </Field>
                <Field label="Settlement cycle">
                  <Select
                    defaultValue="monthly"
                    options={[
                      { value: "weekly", label: "Weekly" },
                      { value: "biweekly", label: "Bi-weekly" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                  />
                </Field>
                <Field label="Minimum payout threshold (FJD)">
                  <Input defaultValue="500" type="number" />
                </Field>
              </div>
            </>
          )}

          {tab === "permissions" && (
            <>
              <h3 className="admin-text font-serif text-lg">User permissions</h3>
              <div className="mt-4 space-y-3">
                {[
                  { role: "Super Admin", access: "Full access" },
                  { role: "Operations", access: "Bookings, suppliers, tours" },
                  { role: "Finance", access: "Revenue, settlements" },
                  { role: "Content", access: "Content management only" },
                ].map((r) => (
                  <div
                    key={r.role}
                    className="admin-card flex items-center justify-between rounded-lg px-4 py-3"
                  >
                    <div>
                      <p className="admin-text text-sm font-medium">{r.role}</p>
                      <p className="admin-text-subtle text-xs">{r.access}</p>
                    </div>
                    <AdminButton size="sm" variant="ghost">
                      Edit
                    </AdminButton>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "security" && (
            <>
              <h3 className="admin-text font-serif text-lg">Security settings</h3>
              <div className="mt-4">
                <Field label="Admin key" description="Set via CONCIERGE_ADMIN_KEY in .env.local">
                  <Input defaultValue="••••••••••••••••" type="password" readOnly />
                </Field>
                <Field label="Session timeout (minutes)">
                  <Input defaultValue="480" type="number" />
                </Field>
                <Field label="Two-factor authentication">
                  <Select
                    defaultValue="optional"
                    options={[
                      { value: "required", label: "Required for all admins" },
                      { value: "optional", label: "Optional" },
                      { value: "disabled", label: "Disabled" },
                    ]}
                  />
                </Field>
                <Field label="IP allowlist">
                  <Input placeholder="Leave empty to allow all IPs" />
                </Field>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

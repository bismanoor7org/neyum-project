"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import {
  AdminButton,
  DataTable,
  PageHeader,
  TableShell,
  Td,
  Th,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import { financeSummary, settlements } from "@/lib/admin/mock-data";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { Banknote, Clock, CheckCircle } from "lucide-react";

export default function SettlementsPage() {
  const [items, setItems] = useState(settlements);

  const pending = items.filter((s) => s.status === "pending");
  const processing = items.filter((s) => s.status === "processing");
  const paid = items.filter((s) => s.status === "paid");

  const markPaid = (id: string) => {
    setItems((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "paid" as const } : s,
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Settlements"
        subtitle="Generate and track supplier payment settlements and invoices."
        actions={
          <AdminButton>
            <Plus className="h-4 w-4" />
            Generate settlement
          </AdminButton>
        }
      />

      <KpiGrid>
        <KpiCard
          label="Pending settlements"
          value={formatCurrency(financeSummary.pendingSettlements)}
          icon={Clock}
          accent="gold"
        />
        <KpiCard
          label="Paid settlements"
          value={formatCurrency(financeSummary.paidSettlements, "FJD", true)}
          icon={CheckCircle}
          accent="emerald"
        />
        <KpiCard
          label="Awaiting payment"
          value={String(pending.length + processing.length)}
          icon={Banknote}
          accent="navy"
        />
        <KpiCard
          label="Completed this month"
          value={String(paid.length)}
          icon={CheckCircle}
          accent="teal"
        />
      </KpiGrid>

      <div className="mt-8">
        <TableShell>
          <DataTable>
            <thead>
              <tr>
                <Th>Settlement ID</Th>
                <Th>Supplier</Th>
                <Th>Period</Th>
                <Th>Gross</Th>
                <Th>Commission</Th>
                <Th>Net payout</Th>
                <Th>Invoice</Th>
                <Th>Due date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="hover:bg-[#faf9f7]/80">
                  <Td>
                    <span className="font-mono text-xs">{s.id}</span>
                  </Td>
                  <Td className="font-medium">{s.supplierName}</Td>
                  <Td>{s.period}</Td>
                  <Td className="tabular-nums">
                    {formatCurrency(s.grossAmount)}
                  </Td>
                  <Td className="tabular-nums text-[#64748b]">
                    −{formatCurrency(s.commission)}
                  </Td>
                  <Td className="font-semibold tabular-nums">
                    {formatCurrency(s.netAmount)}
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1 text-xs text-gold">
                      <FileText className="h-3 w-3" />
                      {s.invoiceId}
                    </span>
                  </Td>
                  <Td className="text-xs">{formatDate(s.dueDate)}</Td>
                  <Td>
                    <StatusBadge status={s.status} />
                  </Td>
                  <Td>
                    {s.status !== "paid" ? (
                      <AdminButton
                        size="sm"
                        variant="primary"
                        onClick={() => markPaid(s.id)}
                      >
                        Mark paid
                      </AdminButton>
                    ) : (
                      <AdminButton size="sm" variant="ghost">
                        View
                      </AdminButton>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </TableShell>
      </div>
    </>
  );
}

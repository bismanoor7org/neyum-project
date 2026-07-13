"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { AdminButton } from "@/components/admin/ui/AdminUi";

type ProfileData = {
  user: { firstName: string; lastName: string; email: string; phone: string | null; avatar: string | null };
  profile: {
    nationality?: string | null;
    dietaryPreferences?: string[];
    accessibilityNeeds?: string[];
    languagePreferences?: string[];
    emergencyName?: string | null;
    emergencyPhone?: string | null;
  } | null;
};

export default function TravellerProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/profile", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Profile" subtitle="Personal info, passport, emergency contact, travel & dietary preferences." actions={<AdminButton>Save changes</AdminButton>}>
      {data && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="admin-card rounded-xl p-6">
            <h3 className="admin-text font-serif text-lg">Personal information</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="admin-text-subtle text-xs uppercase">Name</dt><dd className="admin-text">{data.user.firstName} {data.user.lastName}</dd></div>
              <div><dt className="admin-text-subtle text-xs uppercase">Email</dt><dd className="admin-text">{data.user.email}</dd></div>
              {data.user.phone && <div><dt className="admin-text-subtle text-xs uppercase">Phone</dt><dd className="admin-text">{data.user.phone}</dd></div>}
            </dl>
          </section>
          <section className="admin-card rounded-xl p-6">
            <h3 className="admin-text font-serif text-lg">Travel preferences</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {data.profile?.nationality && <div><dt className="admin-text-subtle text-xs uppercase">Nationality</dt><dd className="admin-text">{data.profile.nationality}</dd></div>}
              {data.profile?.dietaryPreferences && data.profile.dietaryPreferences.length > 0 && (
                <div><dt className="admin-text-subtle text-xs uppercase">Dietary</dt><dd className="admin-text">{data.profile.dietaryPreferences.join(", ")}</dd></div>
              )}
              {data.profile?.languagePreferences && (
                <div><dt className="admin-text-subtle text-xs uppercase">Languages</dt><dd className="admin-text">{data.profile.languagePreferences.join(", ")}</dd></div>
              )}
              {data.profile?.emergencyName && (
                <div><dt className="admin-text-subtle text-xs uppercase">Emergency contact</dt><dd className="admin-text">{data.profile.emergencyName} · {data.profile.emergencyPhone}</dd></div>
              )}
            </dl>
          </section>
        </div>
      )}
    </TravellerSectionPage>
  );
}

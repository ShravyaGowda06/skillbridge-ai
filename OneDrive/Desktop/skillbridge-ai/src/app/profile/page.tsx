"use client";

import { type FormEvent, useState } from "react";
import { Save, UserRound } from "lucide-react";
import { Field } from "@/components/field";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorPanel, LoadingPanel } from "@/components/ui/status";
import { saveStoredProfile } from "@/lib/profile-storage";
import type { StudentProfile } from "@/lib/types";

export default function StudentProfilePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as StudentProfile;

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Profile could not be saved.");
      const result = (await response.json()) as { profile?: StudentProfile };
      saveStoredProfile(result.profile || formData);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Badge>Student Profile</Badge>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black sm:text-5xl">Tell SkillBridge where you are starting.</h1>
              <p className="mt-4 max-w-2xl text-[var(--muted)]">
                This profile gives Gemini the context it needs to create skill-gap analysis, learning plans, and mentor guidance.
              </p>
            </div>
            <div className="grid size-16 place-items-center rounded-lg bg-[rgba(17,97,73,0.1)] text-[var(--primary)]">
              <UserRound size={30} aria-hidden="true" />
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-10 grid gap-5 rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm md:grid-cols-2">
            <Field label="Full name" name="fullName" placeholder="Aarav Sharma" />
            <Field label="Location" name="location" placeholder="City, state, country" />
            <Field label="Education level" name="educationLevel" placeholder="Class 12, diploma, undergraduate..." />
            <Field label="Preferred language" name="language" placeholder="English, Hindi, Tamil..." />
            <Field label="Career goals" name="careerGoals" placeholder="Data analyst for climate projects, solar technician..." className="md:col-span-2" />
            <Field label="Monthly learning budget" name="budget" placeholder="Free only, under INR 500, under $20..." />
            <Field label="Career interests" name="interests" placeholder="Sustainability, healthcare, data..." multiline className="md:col-span-2" />
            <Field label="Constraints and support needs" name="constraints" placeholder="Device access, time, internet, budget, commute..." multiline className="md:col-span-2" />
            <Field label="Current skills" name="skills" placeholder="Excel, public speaking, Python basics..." multiline className="md:col-span-2" />
            <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center">
              <Button type="submit">
                <Save size={18} aria-hidden="true" />
                Save profile
              </Button>
              <p className="text-sm text-[var(--muted)]">Saved locally in this browser and sent to AI routes when you request guidance.</p>
            </div>
          </form>

          <div className="mt-6">
            {status === "loading" && <LoadingPanel label="Saving profile..." />}
            {status === "saved" && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                Profile saved. You can now run AI analysis or ask the AI mentor.
              </div>
            )}
            {status === "error" && <ErrorPanel message="Something went wrong while saving the profile." />}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

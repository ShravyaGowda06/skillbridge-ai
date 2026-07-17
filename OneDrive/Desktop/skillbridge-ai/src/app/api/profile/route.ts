import { NextResponse } from "next/server";
import type { StudentProfile } from "@/lib/types";

const profileFields: Array<keyof StudentProfile> = [
  "fullName",
  "location",
  "educationLevel",
  "language",
  "careerGoals",
  "budget",
  "interests",
  "constraints",
  "skills"
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StudentProfile;

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid profile payload." }, { status: 400 });
    }

    const profile = profileFields.reduce<StudentProfile>((cleaned, field) => {
      const value = body[field];
      if (typeof value === "string") cleaned[field] = value.trim();
      return cleaned;
    }, {});

    return NextResponse.json({
      ok: true,
      profile,
      message: "Profile saved in this browser and ready for AI analysis."
    });
  } catch {
    return NextResponse.json({ error: "Could not parse profile request." }, { status: 400 });
  }
}

import type { StudentProfile } from "@/lib/types";

export const STUDENT_PROFILE_STORAGE_KEY = "skillbridge.studentProfile";

export function loadStoredProfile(): StudentProfile {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as StudentProfile) : {};
  } catch {
    return {};
  }
}

export function saveStoredProfile(profile: StudentProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

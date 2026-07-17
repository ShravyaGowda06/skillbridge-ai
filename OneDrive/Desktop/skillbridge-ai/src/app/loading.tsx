import { LoadingPanel } from "@/components/ui/status";

export default function Loading() {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <LoadingPanel label="Loading SkillBridge AI..." />
      </div>
    </main>
  );
}

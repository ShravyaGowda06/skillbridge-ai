"use client";

import { type FormEvent, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ErrorPanel, LoadingPanel } from "@/components/ui/status";
import { mentorMessages, mentorPrompts } from "@/lib/data";
import { loadStoredProfile } from "@/lib/profile-storage";
import type { ChatMessage } from "@/lib/types";

export default function MentorPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([...mentorMessages]);
  const [errorMessage, setErrorMessage] = useState("");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const text = typeof body.message === "string" ? body.message.trim() : "";
    if (!text) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "student", text }];
    setMessages(nextMessages);
    form.reset();

    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          profile: loadStoredProfile(),
          history: messages
        })
      });
      const result = (await response.json()) as {
        reply?: string;
        fallback?: string;
        error?: string;
      };

      if (!response.ok) {
        const fallback = result.fallback || "I could not reach Gemini right now. Please try again shortly.";
        setMessages([...nextMessages, { role: "mentor", text: fallback }]);
        throw new Error(result.error || "Mentor route failed.");
      }

      setMessages([...nextMessages, { role: "mentor", text: result.reply || "I need a little more context before I can help." }]);
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "The AI mentor route failed.");
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Badge>AI Mentor</Badge>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">Ask Gemini for practical career guidance.</h1>
            <p className="mt-4 text-[var(--muted)]">
              The mentor uses your saved profile, skills, budget, interests, constraints, and career goals to suggest realistic next steps.
            </p>
            <div className="mt-8 grid gap-3">
              {mentorPrompts.map((prompt) => (
                <div key={prompt} className="rounded-lg border border-[var(--line)] bg-white p-4 text-sm font-semibold text-[var(--muted)]">
                  {prompt}
                </div>
              ))}
            </div>
          </div>

          <Panel className="flex min-h-[620px] flex-col p-0">
            <div className="border-b border-[var(--line)] p-5">
              <h2 className="text-xl font-black">Mentor chat</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Gemini-powered guidance</p>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "student" ? "flex justify-end" : "flex justify-start"}>
                  <div className={message.role === "student" ? "max-w-[82%] rounded-lg bg-[var(--primary)] p-4 text-sm leading-6 text-white" : "max-w-[82%] rounded-lg bg-[var(--panel-strong)] p-4 text-sm leading-6 text-[var(--foreground)]"}>
                    {message.text}
                  </div>
                </div>
              ))}
              {status === "loading" && <LoadingPanel label="Asking Gemini for mentor guidance..." />}
              {status === "error" && <ErrorPanel message={errorMessage || "The AI mentor route failed."} />}
            </div>
            <form onSubmit={sendMessage} className="flex gap-3 border-t border-[var(--line)] p-4">
              <input
                name="message"
                required
                placeholder="Ask a mentor question..."
                className="focus-ring min-w-0 flex-1 rounded-lg border border-[var(--line)] px-4 py-3 text-sm"
              />
              <Button type="submit">
                <SendHorizonal size={18} aria-hidden="true" />
                Send
              </Button>
            </form>
          </Panel>
        </div>
      </section>
    </PageShell>
  );
}

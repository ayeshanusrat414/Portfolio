"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/motion";
import { profile } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

// EmailJS config comes from environment variables (see .env.example).
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // If EmailJS isn't configured yet, fall back to a mailto: link so the
    // form is still usable out of the box.
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const body = encodeURIComponent(
        `${form.message}\n\nFrom: ${form.name} (${form.email})`
      );
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        form.subject
      )}&body=${body}`;
      setStatus("success");
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Have a project or role in mind? Send a message and I'll get back to you."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-6">
            <p className="text-muted">
              I&rsquo;m open to full-time roles, contract work and interesting
              collaborations. The fastest way to reach me is the form — or email
              me directly.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block font-display text-xl font-semibold text-accent hover:underline"
            >
              {profile.email}
            </a>

            <div className="mt-3">
              <a
                href="mailto:sehrishnusrat1010@gmail.com"
                className="inline-block font-display text-xl font-semibold text-accent hover:underline"
              >
                sehrishnusrat1010@gmail.com
              </a>
              <p className="text-sm text-muted">For new projects &amp; enquiries</p>
            </div>

            <p className="text-sm text-muted">{profile.location}</p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                value={form.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
            </div>
            <Field
              id="subject"
              label="Subject"
              value={form.subject}
              onChange={(v) => update("subject", v)}
            />
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full resize-none rounded-xl border border-default bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.span>
                  Message sent! I&rsquo;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-5 w-5" />
                  Something went wrong. Please email me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-default bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
      />
    </div>
  );
}
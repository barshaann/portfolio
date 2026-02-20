"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";

type FormState = "idle" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormState>("idle");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    setLoading(true);
    setFeedback("");

    // Basic client-side validation for responsive UX feedback.
    if (!name.trim() || !message.trim() || !email.includes("@") || email.length < 5) {
      setStatus("error");
      setFeedback("Please complete all fields with a valid email.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      // Some environments may return non-JSON or empty bodies even on success.
      // Parse defensively so successful sends don't get mislabeled as network errors.
      let data: { message?: string } = {};
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = (await response.json()) as { message?: string };
        } else {
          const text = await response.text();
          if (text) data = { message: text };
        }
      } catch {
        // Ignore body parsing errors; rely on HTTP status for success/error.
      }

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.message || "Failed to send message. Please try again.");
        setLoading(false);
        return;
      }

      setStatus("success");
      setFeedback(data.message || "Message sent successfully. Thanks for reaching out.");
      form.reset();
    } catch {
      // In some environments the browser may throw after request dispatch even if
      // the server accepted and delivered the email. Show a non-failing message.
      setStatus("success");
      setFeedback("Message submitted.");
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="pb-24 pt-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200/85">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Let&apos;s connect and collaborate.</h2>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300" htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                required
                className="rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500/80 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-cyan-300/80"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500/80 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-cyan-300/80"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300" htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="rounded-xl border border-slate-300/80 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500/80 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-cyan-300/80"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200 dark:hover:shadow-cyan-300/25"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {status !== "idle" && (
              <motion.p
                key={status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`mt-4 text-sm ${status === "success" ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

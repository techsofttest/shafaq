"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

interface CaptchaResponse {
  question: string;
  captcha_token: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
}

export default function ContactForm({service}:{service:any[]}) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Steel Fabrication",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Laravel CAPTCHA state
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const searchParams = useSearchParams();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

useEffect(() => {
  const selectedService = searchParams.get("service");

  if (!selectedService) return;

  // Match the URL value against the available service options.
  const matchingService = service.find(
    (item) => {
      const serviceName =
        typeof item === "string" ? item : item.title;

      return (
        serviceName?.trim().toLowerCase() ===
        selectedService.trim().toLowerCase()
      );
    }
  );

  if (matchingService) {
    const serviceName =
      typeof matchingService === "string"
        ? matchingService
        : matchingService.title;

    setFormData((prev) => ({
      ...prev,
      service: serviceName,
    }));
  }
}, [searchParams, service]);

  // Fetch a new CAPTCHA from Laravel
  const loadCaptcha = useCallback(async () => {
    if (!baseUrl) {
      setCaptchaError("CAPTCHA is not configured. Please try again later.");
      return;
    }

    setCaptchaLoading(true);
    setCaptchaError("");
    setCaptchaQuestion("");
    setCaptchaToken("");
    setCaptchaAnswer("");

    try {
      const response = await fetch(`${baseUrl}/send`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load CAPTCHA.");
      }

      const data: CaptchaResponse = await response.json();

      if (!data.question || !data.captcha_token) {
        throw new Error("Invalid CAPTCHA response from the server.");
      }

      setCaptchaQuestion(data.question);
      setCaptchaToken(data.captcha_token);
    } catch (error) {
      console.error("CAPTCHA loading error:", error);
      setCaptchaError(
        "Unable to load the CAPTCHA. Please refresh and try again."
      );
    } finally {
      setCaptchaLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!baseUrl) {
      setSubmitError(
        "The contact form is not configured. Please try again later."
      );
      return;
    }

    if (captchaLoading || !captchaToken || !captchaQuestion) {
      setSubmitError("Please wait for the CAPTCHA to load.");
      return;
    }

    if (!captchaAnswer.trim()) {
      setSubmitError("Please enter the CAPTCHA code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/send`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captcha: captchaAnswer.trim().toUpperCase(),
          captcha_token: captchaToken,
        }),
      });

      let result: ApiResponse;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an unexpected response. Please try again."
        );
      }

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || "Your inquiry could not be sent. Please try again."
        );
      }

      setSubmitted(true);
      setSubmitError("");

      // CAPTCHA tokens should not be reused.
      setCaptchaQuestion("");
      setCaptchaToken("");
      setCaptchaAnswer("");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Your inquiry could not be sent. Please try again."
      );

      // Load a fresh CAPTCHA after a failed submission.
      void loadCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSubmitted(false);

    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "Steel Fabrication",
      message: "",
    });

    setSubmitError("");
    void loadCaptcha();
  };

  return (
    <section
      id="contact-form"
      className="relative bg-[#f9f9f9] px-6 py-28 text-[#121212] md:px-12"
    >
      {/* Fixed Background Logo Watermark */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] grayscale"
        style={{
          backgroundImage: "url('/logo/logo.png')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center 15vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "min(80vw, 500px)",
        }}
      />

      <ScrollReveal>
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="mb-16 text-center">
            <h2 className="text-[2.8rem] font-bold uppercase leading-none tracking-tighter text-[#121212] md:text-[4rem]">
              SEND US A MESSAGE
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
              Fill out the form below and our engineering team will get back
              to you with specs and estimations.
            </p>
          </div>

          {/* Form and Side Image */}
          <div className="grid grid-cols-1 items-stretch overflow-hidden border border-gray-200 bg-white shadow-xl lg:grid-cols-12">
            {/* Form Section */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      autoComplete="name"
                      className="w-full border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Petroleum Development Oman"
                      autoComplete="organization"
                      className="w-full border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      autoComplete="email"
                      className="w-full border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Phone / Mobile *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +968 9000 0000"
                      autoComplete="tel"
                      className="w-full border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-4 py-3.5 lowercase text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                  > {service.map((item, idx) => {
                    const serviceName =
                      typeof item === "string" ? item : item.title;

                    if (!serviceName) return null;

                    return (
                      <option key={`${serviceName}-${idx}`} value={serviceName}> {serviceName}</option> );})}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Project Message / Specifications *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, specifications, or inquiry details..."
                    className="w-full resize-none border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                  />
                </div>

                {/* Laravel CAPTCHA */}
                <div>
                  <label
                    htmlFor="captcha-answer"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    CAPTCHA Verification *
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      aria-live="polite"
                      className="flex min-h-[52px] min-w-[180px] items-center justify-center rounded-sm border border-gray-300 bg-gray-100 px-5 py-3 font-mono text-xl font-bold tracking-[0.3em] text-gray-900"
                    >
                      {captchaLoading
                        ? "Loading..."
                        : captchaQuestion || "Unavailable"}
                    </div>

                    <button
                      type="button"
                      onClick={() => void loadCaptcha()}
                      disabled={captchaLoading || isSubmitting}
                      className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {captchaLoading ? "Loading..." : "Refresh Code"}
                    </button>
                  </div>

                  <input
                    id="captcha-answer"
                    type="text"
                    name="captcha_answer"
                    required
                    autoComplete="off"
                    value={captchaAnswer}
                    onChange={(e) =>
                      setCaptchaAnswer(e.target.value.toUpperCase())
                    }
                    placeholder="Enter the code shown above"
                    aria-describedby="captcha-help captcha-error"
                    className="mt-3 w-full border border-gray-300 bg-white px-4 py-3.5 text-sm uppercase tracking-wider text-[#121212] outline-none transition-colors focus:border-[#FE0002]"
                  />

                  <p id="captcha-help" className="mt-2 text-xs text-gray-500">
                    Enter the six-character code displayed above.
                  </p>

                  {captchaError && (
                    <p
                      id="captcha-error"
                      role="alert"
                      className="mt-2 text-sm text-red-700"
                    >
                      {captchaError}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    captchaLoading ||
                    !captchaToken ||
                    !captchaQuestion
                  }
                  className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[var(--color-button-blue)] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[var(--color-button-blue-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Side Image */}
            <div className="relative min-h-[400px] w-full overflow-hidden lg:col-span-5 lg:min-h-full">
              <Image
                src="/contact-page/c2.png"
                alt="Shafaq Al Group Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-md rounded-sm border border-gray-800 bg-[#121212] p-8 text-center text-white shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FE0002] bg-[#FE0002]/15 text-[#FE0002]">
                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.15,
                    }}
                  />
                </svg>
              </div>

              <h3
                id="contact-success-title"
                className="mb-3 text-2xl font-bold uppercase tracking-tight text-white"
              >
                Inquiry Received!
              </h3>

              <p className="mb-8 text-sm leading-relaxed text-gray-300">
                Thank you for getting in touch. Your message has been
                successfully routed to our engineering and procurement team.
              </p>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full bg-[#FE0002] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-red-700"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

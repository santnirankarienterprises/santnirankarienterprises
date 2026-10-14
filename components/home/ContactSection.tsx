"use client";

import {
    Clock3,
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        const text = `Hi, I am ${formData.name}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/917088642658?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank');
        toast.success("Redirecting to WhatsApp...");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-zinc-50 py-16 dark:bg-[#030303] sm:py-20 lg:py-32"
        >
            {/* Background Decor */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden" aria-hidden="true">
                <div className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/15" />
                <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/15" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 dark:bg-white/5 shadow-sm">
                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Connect With Us
                        </span>
                    </div>

                    <h2 className="mt-6 text-4xl font-serif font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl dark:text-white">
                        Start Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">
                            Professional Journey.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
                        Whether you are looking for your next big career move or need assistance with your profile, our dedicated support team is ready to guide you.
                    </p>
                </div>

                {/* Content */}
                <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 xl:gap-20">
                    {/* Contact Information */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Address */}
                        <div className="group relative rounded-3xl p-[2px] bg-gradient-to-r from-blue-700/50 via-violet-700/50 to-emerald-600/50 transition-all duration-500 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                            <div className="relative flex items-center gap-5 overflow-hidden rounded-[22px] bg-white p-6 dark:bg-[#080808]">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10" />
                                
                                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white dark:bg-white/5 dark:text-blue-400 dark:group-hover:bg-white/10">
                                    <MapPin size={24} strokeWidth={1.5} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">Head Office</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Near Raja Biscuit Chowk and Jasmine Hotel,<br />
                                        SIDCUL, Haridwar<br />
                                        Uttarakhand - 249402
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <a href="mailto:jobs.santnirankarienterprises@gmail.com" className="group relative block rounded-3xl p-[2px] bg-gradient-to-r from-blue-700/50 via-violet-700/50 to-emerald-600/50 transition-all duration-500 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                            <div className="relative flex items-center gap-5 overflow-hidden rounded-[22px] bg-white p-6 dark:bg-[#080808]">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10" />
                                
                                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white dark:bg-white/5 dark:text-blue-400 dark:group-hover:bg-white/10">
                                    <Mail size={24} strokeWidth={1.5} />
                                </div>
                                <div className="relative z-10 min-w-0">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">Email Us</h3>
                                    <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                                        jobs.santnirankarienterprises@gmail.com
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Phone */}
                        <a href="tel:+917088642658" className="group relative block rounded-3xl p-[2px] bg-gradient-to-r from-blue-700/50 via-violet-700/50 to-emerald-600/50 transition-all duration-500 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                            <div className="relative flex items-center gap-5 overflow-hidden rounded-[22px] bg-white p-6 dark:bg-[#080808]">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10" />
                                
                                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white dark:bg-white/5 dark:text-blue-400 dark:group-hover:bg-white/10">
                                    <Phone size={24} strokeWidth={1.5} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">Call Us</h3>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                        +91 7088642658
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Working Hours */}
                        <div className="group relative rounded-3xl p-[2px] bg-gradient-to-r from-blue-700/50 via-violet-700/50 to-emerald-600/50 transition-all duration-500 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                            <div className="relative flex items-center gap-5 overflow-hidden rounded-[22px] bg-white p-6 dark:bg-[#080808]">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10" />
                                
                                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-white dark:bg-white/5 dark:text-blue-400 dark:group-hover:bg-white/10">
                                    <Clock3 size={24} strokeWidth={1.5} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">Working Hours</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Monday - Saturday<br />
                                        9:30 AM - 5:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                        <div className="h-full rounded-[22px] bg-white p-8 sm:p-12 dark:bg-[#080808]">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    Quick Response
                                </p>
                                <h3 className="mt-3 text-2xl font-serif font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                                    Drop us a line
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                    Fill out the form below and our team will get back to you promptly to assist with your journey.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                                            Your Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            placeholder="Enter your name"
                                            className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-[#030303] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#080808]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                                            Email Address
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="you@example.com"
                                            className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-[#030303] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#080808]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                                        Phone Number
                                    </label>
                                    <input
                                        id="contact-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-[#030303] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#080808]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        placeholder="How can we help you?"
                                        className="min-h-[140px] w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5 text-sm leading-6 text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-[#030303] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#080808]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-6 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                    {!loading && (
                                        <Send size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    )}
                                </button>

                                <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
                                    We&apos;ll use your details only to respond to your enquiry.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
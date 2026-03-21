"use client";

import React, { useMemo, useState } from "react";
import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  whatsappNumber?: string;
  address?: string;
}

const SERVICE_OPTIONS = [
  "Bridal Mehndi",
  "Engagement Mehndi",
  "Portrait Mehndi",
  "Festival Mehndi",
  "Baby Shower Mehndi",
  "Guest Mehndi",
];

export const Contact2 = ({
  title = "Book Appointment",
  description = "Share your event details and we will continue the conversation on WhatsApp for quick mehndi booking.",
  phone = "9351260318",
  whatsappNumber = "919351260318",
  address = "Shop no. 390, Raja Park, Jaipur, Rajasthan",
}: Contact2Props) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Bridal Mehndi",
    eventDate: "",
    venue: "",
    guests: "",
    message: "",
  });

  const whatsappHref = useMemo(() => {
    const message = [
      "Hello Vikas Mehandi Art, I would like to book an appointment.",
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Service: ${form.service || "-"}`,
      `Event Date: ${form.eventDate || "-"}`,
      `Venue/Area: ${form.venue || "-"}`,
      `Number of Guests: ${form.guests || "-"}`,
      `Additional Details: ${form.message || "-"}`,
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [form, whatsappNumber]);

  const setField =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-3 text-5xl font-semibold tracking-[-0.04em] text-[#5a2a17] lg:text-6xl">
                {title}
              </h1>
              <p className="text-base leading-7 text-[#7a5842]">{description}</p>
            </div>
            <div className="mx-auto w-fit rounded-[1.75rem] border border-amber-300/35 bg-white/72 p-6 shadow-[0_18px_50px_rgba(176,106,31,0.10)] lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold text-[#5a2a17] lg:text-left">
                Booking Details
              </h3>
              <ul className="space-y-4 text-sm text-[#6d4630]">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-[#b06a1f]" />
                  <span>
                    <span className="font-bold">Call: </span>
                    {phone}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 text-[#b06a1f]" />
                  <span>
                    <span className="font-bold">WhatsApp: </span>
                    +91 93512 60318
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#b06a1f]" />
                  <span>
                    <span className="font-bold">Studio: </span>
                    {address}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 text-[#b06a1f]" />
                  <span>
                    Share your event date, service type, and guest count for faster confirmation.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-[1.8rem] border border-amber-300/35 bg-white/72 p-6 shadow-[0_18px_50px_rgba(176,106,31,0.10)] backdrop-blur-md sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Full Name" value={form.name} onChange={setField("name")} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Mobile Number" value={form.phone} onChange={setField("phone")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="service">Service Needed</Label>
                <select
                  id="service"
                  value={form.service}
                  onChange={setField("service")}
                  className="flex h-11 w-full rounded-xl border border-amber-300/40 bg-white/85 px-3 py-2 text-sm text-[#5a2a17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" value={form.eventDate} onChange={setField("eventDate")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="venue">Venue / Area</Label>
                <Input id="venue" placeholder="Raja Park / Jaipur / Event Venue" value={form.venue} onChange={setField("venue")} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="guests">Guest Count</Label>
                <Input id="guests" type="number" min="0" placeholder="How many people?" value={form.guests} onChange={setField("guests")} />
              </div>
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Design Notes</Label>
              <Textarea
                id="message"
                placeholder="Tell us if you want Arabic, bridal full hand, portrait work, couple initials, festival quick designs, or any custom request."
                value={form.message}
                onChange={setField("message")}
              />
            </div>

            <Button asChild className="h-12 w-full rounded-full bg-amber-400 text-[#2a120d] hover:bg-amber-300">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                Send Message on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

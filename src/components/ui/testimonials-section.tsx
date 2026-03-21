"use client";

import { Testimonials, type Testimonial } from "@/components/ui/testimonials";

const indianTestimonials: Testimonial[] = [
  {
    image:
      "./src/components/abc/forportfolioprroifle.jpg",
    text:
      "My bridal mehndi came out exactly the way I imagined. The detailing was so neat, and the stain turned out beautifully for every wedding function.",
    name: "Aarohi Sharma",
    username: "@aarohi.jaipur",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80",
    text:
      "We booked for an engagement event and the whole experience felt calm, professional, and so elegant. Everyone kept asking who did the mehndi.",
    name: "Riya Mehta",
    username: "@riya.mehta",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    text:
      "The guest mehndi service was smooth and well managed. Designs were quick, stylish, and matched the festive mood perfectly.",
    name: "Kunal Verma",
    username: "@kunal.verma",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    text:
      "What stood out for us was the balance of speed and detail. The portrait mehndi concept looked premium and very special in our photos.",
    name: "Ishaan Kapoor",
    username: "@ishaan.kapoor",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=80",
    text:
      "I booked for Karwa Chauth and loved how graceful the designs felt. The finishing was clean, and the aftercare guidance really helped.",
    name: "Nandini Joshi",
    username: "@nandini.joshi",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&auto=format&fit=crop&q=80",
    text:
      "For our family baby shower, the designs felt festive without being overdone. It looked polished and suited every age group.",
    name: "Prateek Bansal",
    username: "@prateek.bansal",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=600&auto=format&fit=crop&q=80",
    text:
      "The bridal booking was one of the easiest parts of our wedding planning. The artist understood references quickly and delivered beautifully.",
    name: "Mehak Arora",
    username: "@mehak.arora",
    social: "https://www.instagram.com/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&auto=format&fit=crop&q=80",
    text:
      "I appreciated how the mehndi design was tailored to the event instead of feeling generic. It felt thoughtful and photo-ready.",
    name: "Dev Malhotra",
    username: "@dev.malhotra",
    social: "https://www.instagram.com/",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="mx-auto inline-flex rounded-full border border-amber-300/50 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[#9a5a1a] shadow-sm">
          Testimonials
        </span>
        <div className="mt-6">
          <Testimonials
            testimonials={indianTestimonials}
            title="Reviews from brides, families, and celebration hosts"
            description="Responsive testimonials built for every screen size, featuring warm feedback from Indian clients who booked Vikas Mehandi Art for weddings, engagements, festive events, and family occasions."
            maxDisplayed={6}
          />
        </div>
      </div>
    </section>
  );
}

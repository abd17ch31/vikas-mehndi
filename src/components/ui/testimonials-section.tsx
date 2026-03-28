"use client";

import { Testimonials, type Testimonial } from "@/components/ui/testimonials";

const indianTestimonials: Testimonial[] = [
  {
    image:
      "./src/assets/images/test-2.png",
    text:
      "My bridal mehndi came out exactly the way I imagined. The detailing was so neat, and the stain turned out beautifully for every wedding function.",
    name: "Aarohi Sharma",
    username: "@aarohi.jaipur",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-1.png",
    text:
      "We booked for an engagement event and the whole experience felt calm, professional, and so elegant. Everyone kept asking who did the mehndi.",
    name: "Riya Mehta",
    username: "@riya.mehta",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-3.png",
    text:
      "The guest mehndi service was smooth and well managed. Designs were quick, stylish, and matched the festive mood perfectly.",
    name: "Preeti Arora",
    username: "@preeti.arora",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
     "./src/assets/images/test-4.png",
    text:
      "What stood out for us was the balance of speed and detail. The portrait mehndi concept looked premium and very special in our photos.",
    name: "Ishaani Kapoor",
    username: "@ishaani.kapoor",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-5.png",
    text:
      "I booked for Karwa Chauth and loved how graceful the designs felt. The finishing was clean, and the aftercare guidance really helped.",
    name: "Nandini Joshi",
    username: "@nandini.joshi",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-6.png",
    text:
      "For our family baby shower, the designs felt festive without being overdone. It looked polished and suited every age group.",
    name: "Preeti Bansal",
    username: "@preeti.bansal",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-7.png",
    text:
      "The bridal booking was one of the easiest parts of our wedding planning. The artist understood references quickly and delivered beautifully.",
    name: "Mehak Arora",
    username: "@mehak.arora",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
  },
  {
    image:
      "./src/assets/images/test-8.png",
    text:
      "I appreciated how the mehndi design was tailored to the event instead of feeling generic. It felt thoughtful and photo-ready.",
    name: "Devika Malhotra",
    username: "@devika.malhotra",
    social: "https://www.instagram.com/vikashmehandiart01?igsh=N2dkMzYwZjJjZjJ3",
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

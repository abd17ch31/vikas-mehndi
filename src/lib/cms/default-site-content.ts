import type { SiteContent } from "@/lib/cms/types";

export const defaultSiteContent: SiteContent = {
  business: {
    name: "Nitin Mehandi Official",
    owner: "Nitin Nayak",
    location: "Zeta 1, Greater Noida, Uttar Pradesh, India",
    phone: "7703988599",
    whatsappNumber: "917703988599",
    instagramUrl:
      "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    instagramHandle: "@nitin_mehandi_official",
    facebookUrl: "https://www.facebook.com/",
    xUrl: "https://x.com/",
    mapsUrl:
      "https://maps.google.com/?q=Zeta+1,+Greater+Noida,+Uttar+Pradesh,+India",
    areaLabel: "Greater Noida",
    regionLabel: "Uttar Pradesh",
    logoUrl: "/assets/hero.png",
  },
  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/why-choose-us" },
      { label: "Gallery", href: "/our-work" },
      { label: "Services", href: "/services" },
      { label: "Locate Us", href: "/locate-us" },
    ],
    ctaLabel: "Book Appointment",
    ctaHref: "/book-appointment",
  },
  hero: {
    tagline: "Bridal Mehndi Artist in Greater Noida",
    title: "Elegant Mehndi Designs for Weddings and Celebrations",
    description:
      "Nitin Mehandi Official creates bridal, Arabic, traditional, and festive mehndi experiences in Greater Noida with graceful detailing, polished presentation, and client-first artistry.",
    ctaText: "Book Appointment",
    showcaseImages: [
      "/assets/images/h6.jpeg",
      "/assets/images/h1.jpeg",
      "/assets/images/h2.jpeg",
      "/assets/images/h3.jpeg",
      "/assets/images/h4.jpeg",
      "/assets/images/h5.jpeg",
    ],
  },
  homeServicesSection: {
    badge: "Services",
    title: "Mehndi services designed for every kind of celebration",
    description:
      "Explore bridal, engagement, portrait, baby shower, festival, and guest mehndi options. On mobile, each card stacks vertically and opens vertically for easier browsing.",
  },
  testimonialsSection: {
    badge: "Testimonials",
    title: "Reviews from brides, families, and celebration hosts",
    description:
      "Responsive testimonials built for every screen size, featuring warm feedback from Indian clients who booked Nitin Mehandi Official for weddings, engagements, festive events, and family occasions.",
    maxDisplayed: 6,
  },
  aboutSection: {
    badge: "Why Choose Us",
    title:
      "Why clients choose our artistry, precision, and celebration-ready mehndi experience",
    description:
      "Our artists focus on graceful detailing, clean application, patient service, and designs that suit the event, the outfit, and the client's style. From bridal bookings to guest groups, the experience stays polished from start to finish.",
    ctaLabel: "Explore Why Choose Us",
    ctaHref: "/why-choose-us",
    artistImages: [
      {
        src: "/assets/artists/nitin.jpeg",
        alt: "Nitin Nayak, owner and lead mehndi artist",
        label: "Owner Artist",
      },
      {
        src: "/assets/artists/artist3.png",
        alt: "Mehndi artist portrait",
        label: "Artist",
      },
      {
        src: "/assets/artists/monu%20.jpeg",
        alt: "Mehndi artist portrait",
        label: "Artist",
      },
      {
        src: "/assets/artists/artist2.png",
        alt: "Mehndi artist portrait",
        label: "Artist",
      },
    ],
  },
  socialSection: {
    badge: "Follow Us",
    title: "Follow us on social media",
    description:
      "Stay connected for bridal highlights, festive mehndi inspiration, fresh design updates, and booking-friendly contact options.",
    links: [
      {
        name: "Instagram",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        href: "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
      },
      {
        name: "Facebook",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        href: "https://www.facebook.com/",
      },
      {
        name: "WhatsApp",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        href: "https://wa.me/917703988599",
      },
      {
        name: "Google",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        href: "https://maps.google.com/?q=Zeta+1,+Greater+Noida,+Uttar+Pradesh,+India",
      },
    ],
  },
  servicesPage: {
    badge: "Services",
    title: "Mehndi services tailored for every celebration and personal style",
    description:
      "Explore Bridal, Engagement, Portrait, Festival, Baby Shower, and Guest mehndi services. Each card opens a simple popup with more details so clients can quickly understand the style and experience.",
  },
  galleryPage: {
    badge: "Our Work",
    title: "Explore featured mehndi styles through an interactive design gallery",
    description:
      "Click any spotlight card to open a larger popup gallery with an immersive 3D image experience. This page highlights bridal, engagement, festive, portrait, guest, and baby shower design moods.",
    popupBadge: "Popup Gallery",
    popupSubtitle:
      "Drag to look around • Scroll to zoom • Click cards to view details",
  },
  whyChoosePage: {
    badge: "Why Choose Us",
    title: "Why choose Nitin Mehandi Official for your special occasions",
    description:
      "We blend elegant mehndi artistry with comfort, hygiene, and a dependable booking experience for brides, families, and event guests across Greater Noida.",
    callLabel: "Call 7703988599",
    backLabel: "Back to Home",
    highlights: [
      { value: "7703988599", label: "Call for bookings" },
      { value: "Greater Noida", label: "Prime local service area" },
      { value: "Bridal to Guest", label: "Designs for every event" },
    ],
    interactiveBadge: "Interactive Highlights",
    standardsBadge: "About Our Standards",
    standardsTitle:
      "Beautiful mehndi is not just about design, it is also about care",
    standardsParagraphs: [
      "We focus on quality of hygiene, organized setup, clean cone handling, calm artist behavior, and a comfortable client experience during long bridal sessions as well as festive bookings.",
      "Our work is designed to feel elegant in person and photograph beautifully for weddings, engagements, baby showers, and family celebrations.",
    ],
    contactBadge: "Contact & Location",
    features: [
      {
        id: "hygiene",
        label: "Hygiene",
        icon: "ShieldCheck",
        title: "Clean tools, neat setup, and artist-first hygiene standards",
        description:
          "We maintain a tidy application environment, use clean cones and organized materials, and keep the service setup comfortable so clients can relax through longer bridal sessions.",
        points: [
          "Clean mehndi cones and organized working materials",
          "Comfort-focused setup for bridal and group bookings",
          "Neat handling before, during, and after application",
        ],
      },
      {
        id: "design",
        label: "Design Quality",
        icon: "Sparkles",
        title: "Elegant detailing that suits the event, outfit, and personality",
        description:
          "From bridal to festive mehndi, every design is planned to feel balanced, graceful, and photo-ready instead of rushed or repetitive.",
        points: [
          "Bridal, engagement, guest, and festive customization",
          "Fine detailing for premium visual finish",
          "Designs tailored to the occasion and client preference",
        ],
      },
      {
        id: "experience",
        label: "Experience",
        icon: "TimerReset",
        title: "A smooth booking experience from consultation to final stain care",
        description:
          "Clients choose Nitin Mehandi Official for patient communication, dependable event timing, and practical aftercare guidance that helps the color develop beautifully.",
        points: [
          "Clear discussion before bridal and event bookings",
          "Punctual support for special-day schedules",
          "Helpful aftercare tips for richer stain results",
        ],
      },
      {
        id: "care",
        label: "Client Care",
        icon: "Droplets",
        title: "Comfortable service with attention to detail and client satisfaction",
        description:
          "We focus on making the mehndi experience feel calm, polished, and memorable, whether it is one bridal booking or a full family celebration.",
        points: [
          "Friendly and patient artist approach",
          "Thoughtful pace for long sitting sessions",
          "Suitable service for individual and group bookings",
        ],
      },
    ],
  },
  locatePage: {
    badge: "Locate Us",
    title: "Visit Nitin Mehandi Official in Greater Noida",
    description:
      "We welcome bridal bookings, festive mehndi appointments, guest group sessions, and custom design consultations at our Greater Noida location. Reach out before visiting and we will help you plan the best time for your appointment.",
    addressLabel: "Address",
    contactLabel: "Contact",
    callButtonLabel: "Contact on Call",
    directionsButtonLabel: "Get Directions",
  },
  bookingPage: {
    badge: "Book Appointment",
    title: "Book your mehndi session in a few simple steps",
    description:
      "Fill in your event details and we will open WhatsApp with a ready message to Nitin Mehandi Official so your bridal, engagement, festival, guest, portrait, or baby shower booking can be confirmed quickly.",
    formTitle: "Book Appointment",
    formDescription:
      "Share your event details and we will continue the conversation on WhatsApp for quick mehndi booking.",
  },
  footer: {
    description:
      "Bridal, engagement, festive, and custom mehndi artistry crafted in Zeta 1, Greater Noida, Uttar Pradesh, India with elegant detail and celebration-ready designs.",
    exploreLabel: "Explore",
    servicesLabel: "Services",
    contactLabel: "Contact",
    copyrightText: "All rights reserved.",
    serviceNames: [
      "Bridal Mehndi",
      "Engagement Mehndi",
      "Festival Mehndi",
      "Guest Mehndi",
    ],
  },
  services: [
    {
      id: "bridal",
      title: "Bridal",
      shortDescription:
        "Full bridal mehndi with intricate palms, feet, and personalized motifs for wedding functions and portraits.",
      categoryImage: "/assets/images/cat-bridal.jpeg",
      carouselImage: "/assets/Services/bridal.png",
      galleryCover: "/assets/Gallery/Bridal/cover.jpeg",
      galleryImages: [
        "/assets/Gallery/Bridal/b1.jpeg",
        "/assets/Gallery/Bridal/b2.jpeg",
        "/assets/Gallery/Bridal/b3.jpeg",
        "/assets/Gallery/Bridal/b4.jpeg",
        "/assets/Gallery/Bridal/b5.jpeg",
        "/assets/Gallery/Bridal/b6.jpeg",
        "/assets/Gallery/Bridal/b7.jpeg",
        "/assets/Gallery/Bridal/b8.jpeg",
        "/assets/Gallery/Bridal/b9.jpeg",
      ],
      icon: "Gem",
      popupTitle: "Bridal Mehndi",
      popupText:
        "Our bridal mehndi service focuses on dense detailing, balanced symmetry, rich stain planning, and elegant storytelling motifs that photograph beautifully for weddings in Greater Noida and beyond.",
    },
    {
      id: "engagement",
      title: "Engagement",
      shortDescription:
        "Stylish engagement designs that feel elegant, balanced, and camera-ready for rings, couple shots, and celebrations.",
      categoryImage: "/assets/images/cat-engagement.jpeg",
      carouselImage: "/assets/Services/engagement.png",
      galleryCover: "/assets/Gallery/Engagement/cover.png",
      galleryImages: [
        "/assets/Gallery/Engagement/e1.png",
        "/assets/Gallery/Engagement/e2.png",
        "/assets/Gallery/Engagement/e3.png",
        "/assets/Gallery/Engagement/e4.png",
        "/assets/Gallery/Engagement/e5.png",
        "/assets/Gallery/Engagement/e6.png",
        "/assets/Gallery/Engagement/e7.png",
        "/assets/Gallery/Engagement/e8.png",
        "/assets/Gallery/Engagement/e9.png",
      ],
      icon: "HandHeart",
      popupTitle: "Engagement Mehndi",
      popupText:
        "This service is ideal for ring ceremonies and pre-wedding events, with refined patterns that feel elegant, modern, and comfortable to wear through long celebrations.",
    },
    {
      id: "portrait",
      title: "Portrait",
      shortDescription:
        "Custom portrait mehndi concepts created with careful detailing for standout bridal storytelling and signature looks.",
      categoryImage: "/assets/images/cat-portrait.jpeg",
      carouselImage: "/assets/Services/portrait.jpeg",
      galleryCover: "/assets/Gallery/Portrait/cover.jpeg",
      galleryImages: [
        "/assets/Gallery/Portrait/p1.jpeg",
        "/assets/Gallery/Portrait/p2.jpeg",
        "/assets/Gallery/Portrait/p3.jpeg",
        "/assets/Gallery/Portrait/p4.jpeg",
        "/assets/Gallery/Portrait/p5.jpeg",
        "/assets/Gallery/Portrait/p6.jpeg",
        "/assets/Gallery/Portrait/p7.jpeg",
        "/assets/Gallery/Portrait/p8.jpeg",
        "/assets/Gallery/Portrait/p9.jpeg",
      ],
      icon: "Sparkles",
      popupTitle: "Portrait Mehndi",
      popupText:
        "Portrait mehndi is designed for clients who want highly personalized artwork, including custom faces, initials, meaningful symbols, and story-led compositions.",
    },
    {
      id: "baby-shower",
      title: "Baby Shower",
      shortDescription:
        "Soft celebratory mehndi styling for godh bharai and family events with graceful patterns and occasion-focused charm.",
      categoryImage: "/assets/images/cat-baby.jpeg",
      carouselImage: "/assets/Services/baby.jpeg",
      galleryCover: "/assets/Gallery/Baby/cover.jpeg",
      galleryImages: [
        "/assets/Gallery/Baby/s1.jpeg",
        "/assets/Gallery/Baby/s2.jpeg",
        "/assets/Gallery/Baby/s3.jpeg",
        "/assets/Gallery/Baby/s4.jpeg",
        "/assets/Gallery/Baby/s5.jpeg",
        "/assets/Gallery/Baby/s6.jpeg",
        "/assets/Gallery/Baby/s7.jpeg",
        "/assets/Gallery/Baby/s8.jpeg",
        "/assets/Gallery/Baby/s9.jpeg",
      ],
      icon: "Baby",
      popupTitle: "Baby Shower Mehndi",
      popupText:
        "Our baby shower mehndi service uses soft motifs, gentle compositions, and joyful detailing that suits intimate family moments and celebration photos.",
    },
    {
      id: "festival",
      title: "Stylish",
      shortDescription:
        "Quick festive designs for Teej, Karwa Chauth, Diwali, and seasonal celebrations with rich ornamental flow.",
      categoryImage: "/assets/images/cat-stylish.jpeg",
      carouselImage: "/assets/Services/festival.png",
      galleryCover: "/assets/Gallery/Stylish/cover.jpeg",
      galleryImages: [
        "/assets/Gallery/Stylish/f1.jpeg",
        "/assets/Gallery/Stylish/f2.jpeg",
        "/assets/Gallery/Stylish/f3.jpeg",
        "/assets/Gallery/Stylish/f4.jpeg",
        "/assets/Gallery/Stylish/f5.jpeg",
        "/assets/Gallery/Stylish/f6.jpeg",
        "/assets/Gallery/Stylish/f7.jpeg",
        "/assets/Gallery/Stylish/f8.jpeg",
        "/assets/Gallery/Stylish/f9.jpeg",
      ],
      icon: "PartyPopper",
      popupTitle: "Festival Mehndi",
      popupText:
        "Festival mehndi is perfect for seasonal celebrations, offering stylish floral and traditional patterns with quick application and a bright, festive presence.",
    },
    {
      id: "guest",
      title: "Guest",
      shortDescription:
        "Guest mehndi packages for wedding groups, friends, and family members with coordinated, polished event designs.",
      categoryImage: "/assets/images/cat-guest.jpeg",
      carouselImage: "/assets/Services/Guest.jpeg",
      galleryCover: "/assets/Gallery/Guest/cover.jpeg",
      galleryImages: [
        "/assets/Gallery/Guest/g1.jpeg",
        "/assets/Gallery/Guest/g2.jpeg",
        "/assets/Gallery/Guest/g3.jpeg",
        "/assets/Gallery/Guest/g4.jpeg",
        "/assets/Gallery/Guest/g5.jpeg",
        "/assets/Gallery/Guest/g6.jpeg",
        "/assets/Gallery/Guest/g7.jpeg",
        "/assets/Gallery/Guest/g8.jpeg",
        "/assets/Gallery/Guest/g9.jpeg",
      ],
      icon: "Users",
      popupTitle: "Guest Mehndi",
      popupText:
        "Guest mehndi is planned for smooth event flow, allowing family members and guests to enjoy coordinated, elegant designs without long waiting or rushed results.",
    },
  ],
  testimonials: [
    {
      image: "/assets/images/test-2.png",
      text: "My bridal mehndi came out exactly the way I imagined. The detailing was so neat, and the stain turned out beautifully for every wedding function.",
      name: "Aarohi Sharma",
      username: "@aarohi.jaipur",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-1.png",
      text: "We booked for an engagement event and the whole experience felt calm, professional, and so elegant. Everyone kept asking who did the mehndi.",
      name: "Riya Mehta",
      username: "@riya.mehta",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-3.png",
      text: "The guest mehndi service was smooth and well managed. Designs were quick, stylish, and matched the festive mood perfectly.",
      name: "Preeti Arora",
      username: "@preeti.arora",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-4.png",
      text: "What stood out for us was the balance of speed and detail. The portrait mehndi concept looked premium and very special in our photos.",
      name: "Ishaani Kapoor",
      username: "@ishaani.kapoor",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-5.png",
      text: "I booked for Karwa Chauth and loved how graceful the designs felt. The finishing was clean, and the aftercare guidance really helped.",
      name: "Nandini Joshi",
      username: "@nandini.joshi",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-6.png",
      text: "For our family baby shower, the designs felt festive without being overdone. It looked polished and suited every age group.",
      name: "Preeti Bansal",
      username: "@preeti.bansal",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-7.png",
      text: "The bridal booking was one of the easiest parts of our wedding planning. The artist understood references quickly and delivered beautifully.",
      name: "Mehak Arora",
      username: "@mehak.arora",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
    {
      image: "/assets/images/test-8.png",
      text: "I appreciated how the mehndi design was tailored to the event instead of feeling generic. It felt thoughtful and photo-ready.",
      name: "Devika Malhotra",
      username: "@devika.malhotra",
      social:
        "https://www.instagram.com/nitin_mehandi_official?igsh=MWQza29uZGM3MXlnYw%3D%3D&utm_source=qr",
    },
  ],
};

import { Suspense, lazy, type JSX } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BookAppointmentPage } from "@/components/ui/book-appointment-page";
import { HomePage } from "@/components/ui/home-page";
import { LocateUsPage } from "@/components/ui/locate-us-page";
import { OurWorkPage } from "@/components/ui/our-work-page";
import { PageBackground } from "@/components/ui/page-background";
import { ServicesPage } from "@/components/ui/services-page";
import { WhyChooseUsPage } from "@/components/ui/why-choose-us-page";

const StudioPage = lazy(async () => import("@/components/ui/studio-page").then((module) => ({
  default: module.StudioPage,
})));

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <PageBackground />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/locate-us" element={<LocateUsPage />} />
          <Route
            path="/studio/*"
            element={
              <Suspense fallback={<div className="min-h-screen" />}>
                <StudioPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// app/our-impact/page.tsx

"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function OurImpactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-800">
        {/* HERO */}
        <section id="hero" className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-6 text-sm text-green-700 font-medium">
              Empowering students through community support
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Our Mission at EduFund
            </h1>

            <div className="prose prose-lg max-w-none">
              <p>
                EduFund is a community-driven platform where students can
                receive donations and support to continue their education.
                Whether it’s tuition fees, books, or living expenses — EduFund
                helps students overcome financial barriers and achieve their
                dreams.
              </p>
              <p>
                We believe that education should be accessible to everyone,
                regardless of background. Through the generosity of donors and
                the transparency of our platform, we connect those who want to
                help with those who need it most.
              </p>
            </div>
          </div>
        </section>

        {/* SPOTLIGHTS */}
        <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* Spotlight item - image left */}
          <article className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <img
                src="/images/our-impact/1.jpg"
                alt="Scholarship Support"
                className="w-full h-auto rounded-lg shadow"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-3">
                Scholarship Support Fund
              </h2>
              <p className="mb-4">
                Many bright students are forced to pause their education due to
                financial struggles. The Scholarship Support Fund helps them
                continue their journey by covering essential academic costs.
              </p>
              <div className="flex gap-3">
                <a
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-md shadow hover:opacity-95"
                  href="/"
                >
                  Donate
                </a>
              </div>
            </div>
          </article>

          {/* Spotlight item - image right */}
          <article className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 order-2 md:order-1">
              <h2 className="text-2xl font-semibold mb-3">
                Tech & Learning Fund
              </h2>
              <p className="mb-4">
                Technology is essential for modern education. This fund provides
                laptops, tablets, and learning resources to underprivileged
                students, ensuring equal access to digital learning tools.
              </p>
              <div className="flex gap-3">
                <a
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-md shadow hover:opacity-95"
                  href="/"
                >
                  Donate
                </a>

                <a
                  className="inline-block px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                  href=""
                >
                  Learn more
                </a>
              </div>
            </div>

            <div className="md:col-span-1 order-1 md:order-2">
              <img
                src="/images/our-impact/2.jpg"
                alt="Tech Learning Support"
                className="w-full h-auto rounded-lg shadow"
                loading="lazy"
              />
            </div>
          </article>

          {/* Spotlight item - image left */}
          <article className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <img
                src="/images/our-impact/3.jpg"
                alt="Female Education Support"
                className="w-full h-auto rounded-lg shadow"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-3">
                Girls’ Education Fund
              </h2>
              <p className="mb-4">
                Supporting girls to pursue education is key to building a better
                future. This fund ensures that young women have access to safe
                schools, mentorship programs, and scholarships.
              </p>
              <div>
                <a
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-md shadow hover:opacity-95"
                  href="/"
                >
                  Donate
                </a>
              </div>
            </div>
          </article>
        </section>

        {/* LISTICLE */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                Emergency Assistance Funds
              </h2>
              <p className="text-gray-600">
                EduFund also provides quick financial aid for students facing
                sudden hardships such as medical emergencies or housing crises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-medium">
                  Student Emergency Relief Fund
                </h3>
                <p className="mb-4">
                  Unexpected life events shouldn’t end a student’s academic
                  journey. This fund provides immediate relief to those in need
                  of urgent help.
                </p>
                <a
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-md shadow hover:opacity-95"
                  href="/"
                >
                  Donate
                </a>
              </div>

              <div>
                <img
                  src="/images/our-impact/5.jpg"
                  alt="Student Relief"
                  className="w-full h-auto rounded-lg shadow"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

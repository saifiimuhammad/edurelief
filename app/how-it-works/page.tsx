import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HandCoins, ShieldCheck, Sparkles, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";

export default function EduReliefHowItWorks() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Start Fundraising with EDUFUND
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Everything you need to support your education journey is here.
                Start your campaign today and let the world contribute to your
                dream.
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              >
                Start a Fundraiser
              </Button>
            </div>
            <div>
              <img
                src="/images/howitworks-main.jpg"
                alt="EduRelief Fundraising"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="pt-8 pb-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              {
                text: "No fee to start your fundraiser",
                icon: <HandCoins className="text-gray-700 w-12 h-12" />,
              },
              {
                text: "Smart tools to reach your goals",
                icon: <Sparkles className="text-gray-700 w-12 h-12" />,
              },
              {
                text: "Secure payments directly to you",
                icon: <ShieldCheck className="text-gray-700 w-12 h-12" />,
              },
            ].map((item, i) => (
              <Card key={i} className="shadow-md p-8 border-none outline-none">
                <CardContent className="flex flex-col items-center py-10">
                  {item.icon}{" "}
                  <p className="text-gray-700 text-2xl mt-6">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Start */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              How to Start an EDUFUND
            </h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
            {[
              {
                step: "Step 1",
                title: "Create Your Campaign",
                desc: "Click 'Start a Fundraiser' and follow simple steps to add details, set your goal, and share your story.",
                img: "https://source.unsplash.com/400x300/?laptop,student",
              },
              {
                step: "Step 2",
                title: "Share with Your Community",
                desc: "Spread your fundraiser link with friends, family, and social networks to start gaining momentum.",
                img: "https://source.unsplash.com/400x300/?friends,share",
              },
              {
                step: "Step 3",
                title: "Receive Funds Securely",
                desc: "Connect your bank account and receive contributions directly, even before reaching your goal.",
                img: "https://source.unsplash.com/400x300/?money,bank",
              },
            ].map((item, i) => (
              <Card key={i} className="border rounded-xl overflow-hidden">
                <CardContent className="p-8 text-left">
                  <span className="text-sm font-semibold text-green-600">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg">Start EDUFUND</Button>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Callout */}
        <section className="py-36 flowing-gradient-container text-white text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl lg:text-5xl font-bold mb-14">
              Join thousands of students fundraising for their education today
            </h3>
            <Button
              size="lg"
              variant="secondary"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start a Fundraiser
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

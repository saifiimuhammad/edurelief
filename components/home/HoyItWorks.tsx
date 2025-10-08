export default function HowItWorks() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            How EDUFUND Works
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Simple, transparent, and secure fundraising for education
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: "1",
              title: "Students Apply",
              desc: "Students submit funding requests with detailed profiles, educational goals, and personal stories.",
            },
            {
              step: "2",
              title: "Community Supports",
              desc: "Donors browse verified profiles and contribute any amount to help students achieve their goals.",
            },
            {
              step: "3",
              title: "Dreams Realized",
              desc: "Students receive funding directly and update supporters on their educational journey and achievements.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-600 text-lg font-semibold mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

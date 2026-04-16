import React from "react";

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About USA Flight Services
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Your trusted partner for hassle-free airline support
        </p>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>

        <p className="mb-4 leading-relaxed">
          USA Flight Services is a customer-focused travel support platform that
          helps passengers manage their flight bookings with ease.
        </p>

        <p className="leading-relaxed">
          From name corrections to cancellations and airline policy guidance, we
          simplify complex airline processes so you can travel stress-free.
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">✈️ Name Change</h3>
              <p className="text-sm text-gray-600">
                Assistance with correcting or updating passenger names as per
                airline rules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">❌ Cancellation</h3>
              <p className="text-sm text-gray-600">
                Smooth guidance through airline cancellation policies and
                processes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">💰 Refund Support</h3>
              <p className="text-sm text-gray-600">
                Help in understanding eligibility and claiming refunds easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">🔄 Flight Changes</h3>
              <p className="text-sm text-gray-600">
                Modify dates, routes, or booking details with expert help.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">📜 Policy Guidance</h3>
              <p className="text-sm text-gray-600">
                Clear explanations of airline policies, baggage rules, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">📞 24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Round-the-clock assistance for all your travel concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>✔ Fast and reliable service</div>
            <div>✔ Easy airline policy understanding</div>
            <div>✔ Dedicated customer support</div>
            <div>✔ Transparent assistance</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Need Help With Your Flight?
        </h2>
        <p className="mb-6 text-gray-200">
          Contact our support team and get instant assistance
        </p>

        <a
          href="tel:+18555578723"
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold inline-block transition"
        >
          Call Now: +1 855 557 8723
        </a>
      </section>
    </div>
  );
};

export default AboutUs;

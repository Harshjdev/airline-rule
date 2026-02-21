
import bannerImage from "../assets/Copilot.png"
const CancellationPolicy = () => {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
       style={{
  backgroundImage: `url(${bannerImage})`,
}}
      >
        {/* Overlay */}
        <div className="absolute inset-0"></div>

        <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center px-4">
          Cancellation Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">

          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            General Airline Cancellation Rules
          </h2>

          <p className="text-gray-700 leading-7 mb-6">
            Most airlines allow passengers to cancel their flight within
            24 hours of booking without penalty. Refund eligibility depends
            on the ticket type, fare class, and airline-specific rules.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Key Highlights
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-3">
            <li>24-hour risk-free cancellation for most airlines.</li>
            <li>Refundable tickets are eligible for full refund.</li>
            <li>Non-refundable tickets usually provide travel credit.</li>
            <li>Cancellation fees may apply after 24 hours.</li>
            <li>International flights may have different rules.</li>
          </ul>

        </div>
      </div>
    </>
  );
};

export default CancellationPolicy;

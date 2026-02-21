import bannerImage from "../assets/Copilot.png"

const FlightChange = () => {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
             style={{
         backgroundImage: `url(${bannerImage})`,
       }}
      >
        <div className="absolute inset-0 "></div>

        <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center px-4">
          Flight Change Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">

          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Airline Flight Change Rules
          </h2>

          <p className="text-gray-700 leading-7 mb-6">
            Many airlines allow passengers to change their flight date or time.
            Fees may apply depending on fare type and timing of the request.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Important Points
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-3">
            <li>Basic economy tickets may have restrictions.</li>
            <li>Flexible fares often allow free changes.</li>
            <li>Fare difference must be paid if new ticket costs more.</li>
            <li>Changes can usually be made online via airline portal.</li>
            <li>International change rules may differ.</li>
          </ul>

        </div>
      </div>
    </>
  );
};

export default FlightChange;

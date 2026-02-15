const ReservationPolicy = () => {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529070538774-1843cb3265df)",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>

        <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center px-4">
          Reservation Policy
        </h1>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">

          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Airline Reservation Guidelines
          </h2>

          <p className="text-gray-700 leading-7 mb-6">
            Airline reservation policies define booking rules, payment
            conditions, seat selection, and fare regulations.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Reservation Highlights
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-3">
            <li>Bookings must be confirmed with valid payment.</li>
            <li>Passenger details must match government ID.</li>
            <li>Seat selection may incur additional charges.</li>
            <li>Special assistance must be requested in advance.</li>
            <li>Fare rules vary depending on ticket class.</li>
          </ul>

        </div>
      </div>
    </>
  );
};

export default ReservationPolicy;

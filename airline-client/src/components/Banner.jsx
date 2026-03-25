const Banner = ({ title, image }) => {
  return (
    <div
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 h-[400px]"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Banner;

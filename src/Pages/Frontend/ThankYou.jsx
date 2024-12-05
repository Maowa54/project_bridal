import Navbar from "../../Component/Frontend/Navbar";
import Footer from "../../Component/Frontend/Footer";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="">
        <Navbar />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center py-6 px-4 md:px-8 pt-20 md:pt-40 pb-16 md:pb-32">
        {/* Shopping Bag Image */}
        <img
          src="/assets/Images/bag.png"
          alt="Shopping Bag"
          className="size-10 md:size-16 mb-6"
        />

        {/* Thank You Message */}
        <h1 className="text-2xl md:text-4xl font-semibold text-teal-600 mb-4 text-center">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-700 mb-6 text-xs md:text-sm text-center max-w-lg">
          Your order has been successfully placed. We are processing it and will send you a confirmation email soon.
        </p>

        {/* Buttons */}
        <div className="space-x-4 mb-6 flex flex-col sm:flex-row gap-2">
          <a
            href="/"
            className="inline-block px-6 py-3 text-white text-sm md:text-base bg-yellow-400 font-semibold rounded-full hover:bg-yellow-500 transition duration-300 text-center"
          >
            Continue Shopping
          </a>
          <a
            href="/checkout"
            className="inline-block px-8 py-2 md:py-3 text-sm md:text-base   text-white bg-teal-500 font-semibold rounded-full hover:bg-teal-600 transition duration-300 text-center"
          >
            Go Back
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/attireidyllbd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/Images/icons8-facebook-circled-94.png"
              alt="Facebook"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
          <a
            href="https://www.instagram.com/attire_idyll/channel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/Images/icons8-instagram-94.png"
              alt="Instagram"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
          <a
            href="https://wa.me/01632460342"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/Images/icons8-whatsapp-94.png"
              alt="WhatsApp"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
        </div>
      </div>


      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default ThankYouPage;

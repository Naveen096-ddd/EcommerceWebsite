import Footer from "../footer/Footer";
import Header from "../header/Header"

const ContactUs = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 flex justify-center items-center px-4 py-12">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Have questions? We'd love to hear from you. Fill out the form below
          and our team will get back to you shortly.
        </p>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              className="bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-gray-700 font-semibold mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Type your message here..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;

import Footer from "../footer/Footer";
import Header from "../header/Header"

const ContactUs = () => {
  return (
    <>
    <Header/>
    <section className="relative min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 flex justify-center items-center px-4 py-12">
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=India&ie=UTF8&t=&z=5&iwloc=B&output=embed"
          className="filter grayscale contrast-125 opacity-40"
        ></iframe>
      </div>
      <div className="container px-5 py-15 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-xl p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-lg">
          <h2 className="text-gray-900 text-2xl mb-2 font-semibold title-font">Get in Touch</h2>
          <p className="leading-relaxed mb-6 text-gray-600">
            Have a question about our furniture? Send us a message and we'll get back to you promptly.
          </p>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <button className="text-white bg-green-600 border-0 py-3 px-6 focus:outline-none hover:bg-green-700 rounded-lg text-lg transition">
            Send Message
          </button>

          <p className="text-xs text-gray-500 mt-3">
            We value your feedback and inquiries. Visit our showroom for a firsthand experience of our furniture collection.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ContactUs;

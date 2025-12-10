import React, { useState } from 'react';

const Support = ({ darkMode }) => {
  const [tickets, setTickets] = useState([
    { id: 'T1001', subject: 'Order not received', status: 'Open' },
    { id: 'T1002', subject: 'Payment issue', status: 'Resolved' },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
  });

  const handleTicketChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    const id = `T${Math.floor(Math.random() * 10000)}`;
    setTickets([...tickets, { id, subject: newTicket.subject, status: 'Open' }]);
    setNewTicket({ subject: '', message: '' });
    alert('Support ticket submitted successfully!');
  };

  const faqs = [
    { question: 'How do I track my order?', answer: 'You can track your order in the Orders section of your dashboard.' },
    { question: 'How do I change my password?', answer: 'Go to Account Settings and update your password there.' },
    { question: 'How can I cancel an order?', answer: 'Contact support with your order ID and request cancellation.' },
  ];

  return (
    <div className={'t'}>
      <h2 className="text-3xl font-bold mb-6">Support & Help</h2>

      {/* FAQ Section */}
      <div className="mb-8 ">
        <h3 className="text-2xl font-semibold mb-4">FAQs</h3>
        <div className="space-y-2 text-black">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'} cursor-pointer`}
            >
              <summary className="font-semibold text-black">{faq.question}</summary>
              <p className="mt-2 text-black dark:text-gray-200 ">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Submit Support Ticket */}
      <div className="mb-8 max-w-xl ">
        <h3 className="text-2xl font-semibold mb-4">Submit a Support Ticket</h3>
        <form
          onSubmit={handleSubmitTicket}
          className={`p-6 rounded-2xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={newTicket.subject}
              onChange={handleTicketChange}
              required
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
                darkMode
                  ? 'bg-black border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Ticket subject"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black " htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={newTicket.message}
              onChange={handleTicketChange}
              required
              rows={4}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Describe your issue"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg shadow-lg transition transform hover:scale-105"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Track Tickets */}
      <div className="mb-8 max-w-xl">
        <h3 className="text-2xl font-semibold mb-4">Your Tickets</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`text-black p-4 rounded-xl shadow-md flex justify-between items-center ${
                darkMode ? 'bg-gray-500' : 'bg-white'
              }`}
            >
              <div>
                <p className="font-semibold">{ticket.subject}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">Status: {ticket.status}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition"
                onClick={() =>
                  setTickets((prev) => prev.filter((t) => t.id !== ticket.id))
                }
              >
                Close
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Live Chat */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg font-bold transition transform hover:scale-110">
          Live Chat
        </button>
      </div>
    </div>
  );
};

export default Support;

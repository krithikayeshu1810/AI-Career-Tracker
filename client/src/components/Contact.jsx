function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950"
    >

      <div className="max-w-5xl mx-auto text-center">

        <p className="text-blue-400 font-semibold">
          CONTACT
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-2">
          Have Questions?
        </h2>

        <p className="text-slate-400 mt-5">
          We'd love to hear from you.
        </p>

        <div className="max-w-xl mx-auto mt-10 space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold transition">
            Send Message
          </button>

        </div>

      </div>

    </section>
  );
}

export default Contact;
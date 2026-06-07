import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactDetails = [
    { icon: Mail, label: "Email Us", val: "support@booknest.com", subVal: "Response in 24 hours" },
    { icon: Phone, label: "Call Us", val: "+1 (555) 019-2834", subVal: "Mon-Fri, 9am - 6pm EST" },
    { icon: MapPin, label: "Visit Our Nest", val: "100 Reading Ave, Suite 400", subVal: "San Francisco, CA 94107" }
  ];

  return (
    <div className="bg-[#fcfdff] min-h-screen text-slate-800 font-sans selection:bg-blue-100 pb-20">
      
      {/* 📞 HERO HEADER */}
      <section className="bg-gradient-to-br from-[#d4e6fa] via-[#edf4fe] to-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-blue-600/10 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We'd Love to Hear <span className="text-blue-600">From You</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Got questions about a book, shipping delays, or partnerships? Drop us a message, and our friendly team will reply shortly.
          </p>
        </div>
      </section>

      {/* 📇 MAIN GRID */}
      <main className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact info (5 Cols) */}
          <section className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reach Out Directly</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Skip the form and connect with us through email or phone. Our support team is online to assist you.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow transition-shadow">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{detail.label}</h4>
                      <p className="text-sm font-bold text-slate-800 mt-1">{detail.val}</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">{detail.subVal}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Support Hours Card */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 flex gap-4 items-start">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800">Support Availability</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monday to Friday: 9:00 AM – 6:00 PM EST <br />
                  Saturday and Sunday: Closed
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT: Contact Form Card (7 Cols) */}
          <section className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-100/30 border border-slate-100/50">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Thank you for writing to us. One of our support assistants will reach out to your inbox shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Write Us a Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition focus:outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Inquiry about shipping/book stock"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your details here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </section>

        </div>
      </main>

    </div>
  );
};

export default Contact;

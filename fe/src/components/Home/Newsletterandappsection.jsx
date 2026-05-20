import { useState } from "react";
import toast from "react-hot-toast";

const NewsletterAndAppSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) return toast.error("Please enter your email address.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Please enter a valid email.");

    setLoading(true);
    try {
      const res = await fetch("/api/v1/user/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success("You're subscribed! 🎉");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#eef3fb] px-4 py-10 flex flex-col gap-6">

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl px-8 py-10 flex flex-col items-center text-center shadow-sm">
        {/* Email icon */}
        <div className="mb-4">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Get the best reads in your inbox</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Join our newsletter for exclusive deals, new releases, and personalized book recommendations.
        </p>

        {/* Input row */}
        <div className="flex items-center gap-2 mt-6 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          By subscribing, you agree to our{" "}
          <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
          {" "}Unsubscribe at any time.
        </p>
      </div>

      {/* App download */}
      <div className="max-w-2xl mx-auto w-full bg-blue-500 rounded-2xl px-8 py-10 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-white">Read on any device</h2>
        <p className="text-sm text-blue-100 mt-2 max-w-md">
          Download our app for the ultimate reading experience with offline access and sync across devices.
        </p>

        {/* Store buttons */}
        <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
          <a href="#" className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors duration-150">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>
              <span className="block text-[10px] font-normal leading-none">Download on the</span>
              App Store
            </span>
          </a>

          <a href="#" className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors duration-150">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.22.99.14l.11-.06 10.72-6.2-2.38-2.39-9.44 8.51zm14.35-8.7L5.08 22.1l2.38-2.14 9.44-5.45-.37.55zm3.24-5.56c-.36-.33-.81-.5-1.26-.5s-.9.17-1.26.5L17.38 11 14.9 8.52l1.87-1.06c.72-.41.72-1.41 0-1.82L4.05.42C3.69.09 3.24-.07 2.78.04L15.53 12.8l5.24-3.03v-.27zM3.06.22c-.19.14-.31.37-.31.62v22.32c0 .25.12.48.31.62L15.3 12 3.06.22z" />
            </svg>
            <span>
              <span className="block text-[10px] font-normal leading-none">Get it on</span>
              Google Play
            </span>
          </a>
        </div>

        {/* Platform chips */}
        <div className="flex items-center gap-5 mt-6 flex-wrap justify-center">
          {[
            {
              label: "Mobile App",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
            },
            {
              label: "Tablet Optimized",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />,
            },
            {
              label: "Desktop Reader",
              icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></>,
            },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-1.5 text-blue-100 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
              {label}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NewsletterAndAppSection;
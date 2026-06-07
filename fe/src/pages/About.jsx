import React from 'react';
import { BookOpen, Award, Users, Heart, Bookmark, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, count: "5,000+", label: "Curated Books" },
    { icon: Users, count: "10,000+", label: "Active Readers" },
    { icon: Award, count: "120+", label: "Famous Authors" },
    { icon: Heart, count: "98%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: Compass,
      title: "Curated Selections",
      desc: "Every title in our collection is handpicked by passionate readers to ensure a quality literary journey."
    },
    {
      icon: Bookmark,
      title: "Reading Community",
      desc: "We foster an interactive space with verified reviews, sharing book reviews and personal recommendations."
    },
    {
      icon: Users,
      title: "Author Spotlights",
      desc: "Direct support and highlight events for both bestselling icons and promising indie authors."
    }
  ];

  return (
    <div className="bg-[#fcfdff] min-h-screen text-slate-800 font-sans selection:bg-blue-100 pb-20">
      
      {/* 📖 HERO SECTION */}
      <section className="bg-gradient-to-br from-[#d4e6fa] via-[#edf4fe] to-white py-20 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="bg-blue-600/10 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Where Stories Find <br />
            <span className="text-blue-600">Their True Home</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            BookNest was founded on a simple premise: books have the power to transform lives. We curate, connect, and deliver the world's best writing straight to your nest.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/books')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              Explore Our Collection
            </button>
          </div>
        </div>
        
        {/* Subtle blur background blobs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-300/15 rounded-full blur-3xl" />
      </section>

      {/* 📊 STATS GRID */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center space-y-2">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Icon size={20} />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.count}</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🎯 CORE VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">What Drives BookNest</h2>
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Our Foundation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ✉️ NEWSLETTER BANNER (Dry mock) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="space-y-4 relative z-10 max-w-lg">
            <h2 className="text-3xl font-extrabold tracking-tight">Stay updated with fresh reviews</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to our monthly digest of handpicked releases, exclusive author interviews, and members-only discounts.
            </p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-3 relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 text-white placeholder-slate-500 border border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 md:w-64"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl active:scale-95 transition-all cursor-pointer whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl" />
        </div>
      </section>
      
    </div>
  );
};

export default About;

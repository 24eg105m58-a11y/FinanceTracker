import { NavLink } from "react-router";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 pt-20 pb-24">
        
        {/* BACKGROUND BLOBS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-cyan-100 rounded-full px-4 py-2 text-sm font-medium text-cyan-700 mb-6 shadow-sm">
              ✨ Smart AI-Powered Finance Tracking
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight text-slate-900">
              Take Control
              <br />
              Of Your
              <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                {" "}Finances
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Track expenses, manage savings goals, scan receipts using AI,
              and gain powerful insights into your monthly spending habits —
              all in one beautiful dashboard.
            </p>

            {/* BUTTONS */}
           {/* BUTTONS */}
<div className="flex flex-wrap gap-4 mt-10">

  <NavLink
    to="/register"
    className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-[1.03] transition-transform duration-200"
  >
    Get Started
  </NavLink>

  <NavLink
    to="/login"
    className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-[1.03] transition-transform duration-200"
  >
    Explore Dashboard
  </NavLink>
</div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-5 mt-14">

              <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h2 className="text-3xl font-bold text-cyan-600">
                  10K+
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Expenses Tracked
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h2 className="text-3xl font-bold text-green-600">
                  AI
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Receipt Scanner
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h2 className="text-3xl font-bold text-sky-600">
                  Smart
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Budget Insights
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* MAIN CARD */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-7">

              {/* TOP */}
              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    📊 Monthly Overview
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    Financial analytics dashboard
                  </p>
                </div>

                <div className="bg-cyan-50 text-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
                  June 2026
                </div>
              </div>

              {/* CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 mb-2">
                     Income
                  </p>

                  <h2 className="text-3xl font-bold text-cyan-600">
                    ₹85,000
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 mb-2">
                     Expenses
                  </p>

                  <h2 className="text-3xl font-bold text-red-500">
                    ₹38,000
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 mb-2">
                     Savings
                  </p>

                  <h2 className="text-3xl font-bold text-green-600">
                    ₹47,000
                  </h2>
                </div>
              </div>

              {/* INSIGHT CARD */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white">

                <div className="flex items-start justify-between gap-5">

                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      🤖 AI Insight
                    </h3>

                    <p className="text-slate-300 leading-relaxed">
                      Your food expenses increased by 18% this month.
                      Consider setting a category-wise budget limit.
                    </p>
                  </div>

                  <div className="bg-white/10 px-4 py-2 rounded-2xl text-sm whitespace-nowrap">
                    Smart Analysis
                  </div>
                </div>
              </div>
            </div>

            FLOATING CARD
            <div className="absolute -bottom-8 -left-6 bg-white rounded-3xl border border-slate-200 shadow-xl p-5 w-64 hidden md:block">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                  🌱
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Savings Goal
                  </p>

                  <h3 className="font-bold text-slate-800">
                    82% Completed
                  </h3>
                </div>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 lg:px-12 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Everything You Need
            </h2>

            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
              Powerful tools designed to simplify personal finance management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {[
              {
                icon: "📷",
                title: "Receipt Scanner",
                desc: "Scan bills instantly using AI-powered OCR technology.",
              },
              {
                icon: "📊",
                title: "Analytics",
                desc: "Visual charts and reports for smarter financial decisions.",
              },
              {
                icon: "🎯",
                title: "Budget Goals",
                desc: "Set monthly limits and track category-wise spending.",
              },
              {
                icon: "🤖",
                title: "AI Insights",
                desc: "Get intelligent spending suggestions and savings tips.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-[30px] p-7 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-50 to-sky-100 flex items-center justify-center text-3xl mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
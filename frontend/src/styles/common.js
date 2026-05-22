// src/styles/common.js
// Theme: Soft Minimal Light UI
// Calm premium finance dashboard using Tailwind CSS

// ─────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────
export const pageBackground =
  "min-h-screen bg-[#f7f8fc] text-slate-900";

export const pageWrapper =
  "max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10";

export const section = "mb-8 md:mb-12";

export const dashboardGrid =
  "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";

// ─────────────────────────────────────────────
// Cards
// ─────────────────────────────────────────────
export const glassCard =
  "bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm";

export const statCard =
  "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300";

export const hoverCard =
  "hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300";

// ─────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────
export const pageTitle =
  "text-4xl md:text-5xl font-bold tracking-tight text-slate-900";

export const headingClass =
  "text-2xl md:text-3xl font-bold tracking-tight text-emerald-900";

export const subHeadingClass =
  "text-lg md:text-xl font-semibold text-slate-700";

export const bodyText =
  "text-slate-600 leading-relaxed text-sm md:text-base";

export const mutedText =
  "text-slate-500 text-sm";

export const gradientText =
  "bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent";

// ─────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-5 py-3 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-md cursor-pointer";

export const secondaryBtn =
  "bg-white border border-slate-300 text-slate-700 font-medium px-5 py-3 rounded-2xl hover:bg-slate-100 transition-all duration-300 cursor-pointer";

export const successBtn =
  "bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold px-5 py-3 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer";

export const dangerBtn =
  "bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-5 py-3 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer";

// ─────────────────────────────────────────────
// Forms
// ─────────────────────────────────────────────
export const formCard =
  "bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm max-w-2xl mx-auto";

export const formTitle =
  "text-3xl font-bold text-center text-slate-900 mb-8 tracking-tight";

export const formGroup = "mb-5";

export const labelClass =
  "block text-sm font-medium text-slate-700 mb-2";

export const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all";

export const selectClass =
  "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-400 transition-all";

export const submitBtn =
  "bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-2xl hover:scale-[1.01] transition-all duration-300 shadow-md";

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
export const navbarClass =
  "sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200";

export const navContainer =
  "max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between";

export const navBrand =
  "text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent";

export const navLinks =
  "flex items-center gap-6";

export const navLink =
  "text-slate-600 hover:text-cyan-600 transition-colors duration-200 font-medium";

export const navActive =
  "text-cyan-600 font-semibold";

// ─────────────────────────────────────────────
// Dashboard / Stats
// ─────────────────────────────────────────────
export const statValue =
  "text-3xl md:text-4xl font-bold text-slate-900 mt-2";

export const statLabel =
  "text-sm text-slate-500 uppercase tracking-wider";

export const positiveText =
  "text-emerald-600 font-semibold";

export const negativeText =
  "text-red-500 font-semibold";

export const warningText =
  "text-amber-500 font-semibold";

// ─────────────────────────────────────────────
// Tables / Lists
// ─────────────────────────────────────────────
export const tableWrapper =
  "overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm";

export const tableClass =
  "w-full text-left border-collapse";

export const tableHead =
  "bg-slate-100 text-slate-600 text-sm uppercase tracking-wide";

export const tableRow =
  "border-b border-slate-100 hover:bg-slate-50 transition-colors";

export const tableCell =
  "px-5 py-4 text-slate-700";

// ─────────────────────────────────────────────
// Alerts
// ─────────────────────────────────────────────
export const alertSuccess =
  "bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-4 py-3";

export const alertDanger =
  "bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3";

export const alertWarning =
  "bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl px-4 py-3";

// ─────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────
export const modalOverlay =
  "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4";

export const modalCard =
  "w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-xl";

// ─────────────────────────────────────────────
// Empty / Loading
// ─────────────────────────────────────────────
export const loadingClass =
  "text-cyan-600 text-center py-10 animate-pulse";

export const emptyStateClass =
  "text-slate-500 text-center py-12";

// ─────────────────────────────────────────────
// Feedback
// ─────────────────────────────────────────────
export const errorClass =
  "bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm";

export const successClass =
  "bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-4 py-3 text-sm";

// ─────────────────────────────────────────────
// Divider
// ─────────────────────────────────────────────
export const divider =
  "border-t border-slate-200 my-6";

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────
export const flexBetween =
  "flex items-center justify-between";

export const centerFlex =
  "flex items-center justify-center";

  export const cardClass =
  "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm";

export const sectionTitle =
  "text-xl font-semibold text-slate-800";

export const inputField =
  "w-full border border-slate-200 rounded-2xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-cyan-400";

export const editBtn =
  "bg-cyan-100 text-cyan-700 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-cyan-200 transition";

export const tagClass =
  "bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full";

export const listCard =
  "border border-slate-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4";

  // ─────────────────────────────────────────────
// Modal Buttons Layout
// ─────────────────────────────────────────────
export const modalActions =
  "flex gap-3 mt-5";

// ─────────────────────────────────────────────
// Dashboard Widgets
// ─────────────────────────────────────────────
export const widgetCard =
  "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm";

export const widgetTitle =
  "text-base font-semibold text-slate-700 mb-4";

// ─────────────────────────────────────────────
// Charts
// ─────────────────────────────────────────────
export const chartWrapper =
  "w-full h-80";

export const chartCard =
  "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm";

// ─────────────────────────────────────────────
// File Upload
// ─────────────────────────────────────────────
export const uploadInput =
  "block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-medium file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100";

// ─────────────────────────────────────────────
// Progress Bars
// ─────────────────────────────────────────────
export const progressTrack =
  "w-full bg-slate-100 rounded-full h-2.5";

export const progressBar =
  "h-2.5 rounded-full transition-all duration-500";

// ─────────────────────────────────────────────
// Expense Item Cards
// ─────────────────────────────────────────────
export const expenseItemCard =
  "border border-slate-200 rounded-3xl p-5 bg-white shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between";

export const expenseItemInfo =
  "flex flex-col gap-1";

export const expenseItemActions =
  "flex items-center gap-2 flex-wrap";

// ─────────────────────────────────────────────
// Tiny Buttons
// ─────────────────────────────────────────────
export const smallPrimaryBtn =
  "bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 py-2 rounded-2xl transition";

export const smallDangerBtn =
  "bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-2xl transition";

export const smallSuccessBtn =
  "bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-2xl transition";

// ─────────────────────────────────────────────
// Status Pills
// ─────────────────────────────────────────────
export const successPill =
  "bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full";

export const warningPill =
  "bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full";

export const dangerPill =
  "bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full";

// ─────────────────────────────────────────────
// Scroll Areas
// ─────────────────────────────────────────────
export const scrollArea =
  "max-h-[500px] overflow-y-auto pr-2";

// ─────────────────────────────────────────────
// Animation Helpers
// ─────────────────────────────────────────────
export const fadeHover =
  "transition-all duration-300 hover:shadow-md hover:-translate-y-1";

export const expenseActionBtn =
  "bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-5 py-3 rounded-2xl transition shadow-sm";

  // ALERT CARDS
export const alertErrorCard =
  "bg-red-50 border border-red-200 rounded-2xl p-4";

export const alertSuccessCard =
  "bg-emerald-50 border border-emerald-200 rounded-2xl p-4";

// ALERT BADGES
export const alertWarningBadge =
  "bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap";

export const alertSuccessBadge =
  "bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap";

// ALERT TEXT
export const errorText =
  "text-red-600";

export const successText =
  "text-emerald-700";

  export const cancelBtn =
  "bg-violet-500 text-white font-semibold py-3 rounded-2xl transition-transform duration-200 hover:scale-[1.02]";


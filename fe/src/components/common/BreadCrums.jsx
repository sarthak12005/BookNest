import { ChevronRight } from "lucide-react";
const Breadcrumbs = ({ crumbs, current }) => (
  <nav className="flex items-center gap-1 text-sm text-slate-500 mb-8 flex-wrap">
    {crumbs.map((c) => (
      <span key={c.label} className="flex items-center gap-1">
        <a href={c.href} className="hover:text-blue-600 transition-colors">{c.label}</a>
        <ChevronRight className="w-4 h-4 text-slate-300" />
      </span>
    ))}
    <span className="font-semibold text-slate-800">{current}</span>
  </nav>
);

export default Breadcrumbs;
/* Reusable active-style resolver for NavLink className prop */
export const desktopLinkClass = (isActive: boolean) =>
  `relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
    isActive
      ? "text-orange-500 group-[.is-top]/header:text-orange-400"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 group-[.is-top]/header:text-white/90 group-[.is-top]/header:hover:text-white group-[.is-top]/header:hover:bg-white/10"
  }`;

export const mobileLinkClass = (isActive: boolean) =>
  `px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
    isActive
      ? "text-orange-500 bg-orange-50"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
  }`;

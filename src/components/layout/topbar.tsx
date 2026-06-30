"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export function Topbar() {
  const { data: user } = useCurrentUser();

  function logout() {}

  return (
    <header className="sticky top-0 z-30 h-16 glass border-b border-white/[0.06]">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Page context */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <h2 className="text-sm font-medium text-foreground">
              Welcome back
            </h2>
            <p className="text-xs text-muted-foreground">
              Here&apos;s what&apos;s happening today
            </p>
          </div>
        </div>

        {/* Right: User */}
        <div className="flex items-center gap-4">
          {/* Role badge */}
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-accent/12 text-accent border border-accent/20">
            {user?.role?.replace("-", " ") || "admin"}
          </span>

          {/* Avatar + Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-accent/20">
              {user?.firstName?.[0] || "A"}
              {user?.lastName?.[0] || ""}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground leading-none">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all duration-200 cursor-pointer"
            title="Logout"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

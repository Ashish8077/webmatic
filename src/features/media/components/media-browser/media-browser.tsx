"use client";

import { useState } from "react";
import { Media } from "../../types";
import { useMedia } from "../../hooks/use-media";
import { useMediaFilters } from "../../hooks/use-media-filters";
import { MediaGrid } from "../media-grid";
import { MediaToolbar } from "../media-toolbar";
import { MediaPagination } from "../media-pagination";
import { MediaUploadDialog } from "../media-upload";
import { MediaInspector } from "../media-inspector";

// ─── Mode Configuration ─────────────────────────────────────────────────────

type MediaBrowserMode = "manage" | "select";

interface BrowserModeConfig {
  showInspector: boolean;
  showHeader: boolean;
  showDelete: boolean;
  showMetadata: boolean;
}

const BROWSER_CONFIG: Record<MediaBrowserMode, BrowserModeConfig> = {
  manage: {
    showInspector: true,
    showHeader: true,
    showDelete: true,
    showMetadata: true,
  },
  select: {
    showInspector: false,
    showHeader: false,
    showDelete: false,
    showMetadata: false,
  },
};

// ─── Public API ──────────────────────────────────────────────────────────────

interface MediaBrowserProps {
  /** Controls which features are enabled (inspector, delete, metadata editing). */
  mode: MediaBrowserMode;
  /** Future-proofing: "single" today, "multiple" for galleries later. */
  selectionMode?: "single" | "multiple";
  /** Pre-filters the library to a specific folder (e.g. "services", "blog"). */
  defaultFolder?: string;
  /** Callback fired when a media item is selected (select mode only). */
  onSelect?: (media: Media) => void;
  /** Whether data fetching is enabled. Useful for modals that should only fetch when open. */
  enabled?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function MediaBrowser({
  mode,
  selectionMode = "single",
  defaultFolder,
  onSelect,
  enabled = true,
}: MediaBrowserProps) {
  const config = BROWSER_CONFIG[mode];

  // ── Orchestration (the single source of truth) ─────────────────────────
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [inspectedMedia, setInspectedMedia] = useState<Media | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    query,
    updateSearch,
    updateFolder,
    updateType,
    updateSort,
    updatePagination,
  } = useMediaFilters({ folder: defaultFolder });

  const { data, isLoading } = useMedia(query, { enabled });

  // ── Event Handlers (mode-aware via config, not inline if-checks) ───────

  const handleMediaClick = (media: Media) => {
    if (config.showInspector) {
      // Manage mode → open the inspector sidebar
      setInspectedMedia(media);
    } else {
      // Select mode → track selection and notify parent
      if (selectionMode === "single") {
        setSelectedIds([media.id]);
      } else {
        setSelectedIds((prev) =>
          prev.includes(media.id)
            ? prev.filter((id) => id !== media.id)
            : [...prev, media.id]
        );
      }
      onSelect?.(media);
    }
  };

  // ── Layout ─────────────────────────────────────────────────────────────

  const isManageMode = config.showHeader;

  return (
    <div
      className={`flex flex-col overflow-hidden ${
        isManageMode
          ? "h-[calc(100vh-theme(spacing.16))] -m-4 sm:-m-6 md:-m-8"
          : "h-full min-h-0 gap-4"
      }`}
    >
      {/* Header / Toolbar Area */}
      <div
        className={
          isManageMode
            ? "flex-none border-b border-border bg-background p-4 sm:p-6 md:p-8 pb-4"
            : "flex-none"
        }
      >
        {isManageMode && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Media Library
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your images, videos, and documents
            </p>
          </div>
        )}

        <MediaToolbar
          query={query}
          onSearchChange={updateSearch}
          onFolderChange={updateFolder}
          onTypeChange={updateType}
          onSortChange={updateSort}
          onUploadClick={() => setIsUploadOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-1 min-h-0 ${isManageMode ? "bg-muted/10" : ""}`}
      >
        <div
          className={`flex-1 overflow-y-auto flex flex-col min-h-0 ${
            isManageMode ? "p-4 sm:p-6 md:p-8" : "pr-2"
          }`}
        >
          <div className="flex-1">
            <MediaGrid
              media={data?.items || []}
              isLoading={isLoading}
              selectedIds={selectedIds}
              onMediaClick={handleMediaClick}
              onUploadClick={() => setIsUploadOpen(true)}
              isFiltered={!!query.search || !!query.folder || !!query.type}
            />
          </div>

          {data?.pagination && (
            <div
              className={`flex-none ${
                isManageMode
                  ? "mt-6"
                  : "mt-4 pt-4 border-t border-card-border"
              }`}
            >
              <MediaPagination
                pagination={data.pagination}
                onPaginationChange={updatePagination}
              />
            </div>
          )}
        </div>

        {/* Inspector Sidebar (manage mode only) */}
        {config.showInspector && (
          <MediaInspector
            media={inspectedMedia}
            isOpen={!!inspectedMedia}
            onClose={() => setInspectedMedia(null)}
          />
        )}
      </div>

      {/* Upload Dialog */}
      <MediaUploadDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultFolder={query.folder}
      />
    </div>
  );
}

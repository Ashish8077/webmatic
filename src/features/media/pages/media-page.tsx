"use client";

import { MediaBrowser } from "../components/media-browser";

/**
 * MediaPage — thin composition wrapper.
 *
 * All orchestration (fetching, filtering, pagination, inspector state)
 * is delegated to MediaBrowser. This page only sets the mode to "manage".
 */
export function MediaPage() {
  return <MediaBrowser mode="manage" />;
}

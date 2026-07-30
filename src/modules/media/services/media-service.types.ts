/**
 * Generic media metadata extracted from uploaded files.
 * This contract isolates the orchestrator from specific metadata extractors (e.g. Sharp).
 */
export interface ExtractedMediaMetadata {
  width: number | null;
  height: number | null;
  metadata: {
    format: string | null;
    orientation: number | null;
    colorSpace: string | null;
  };
}

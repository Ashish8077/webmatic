/**
 * Full column list for the media table.
 *
 * Used in SELECT queries to avoid `SELECT *` and ensure consistent
 * column ordering across all repository methods. Any new column
 * added to the media table must be added here and to {@link MediaRow}.
 */
export const MEDIA_SELECT_COLUMNS = `
  id,
  original_name,
  file_name,
  extension,
  mime_type,
  size,
  checksum,
  disk,
  storage_path,
  folder,
  width,
  height,
  alt_text,
  caption,
  metadata,
  type,
  provider_file_id,
  uploaded_by,
  created_at,
  updated_at,
  deleted_at
`;

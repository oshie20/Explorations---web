/** Public URL for the SVG that matches a file name / extension (uploaded attachment previews). */
export function getAttachmentIconSrc(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  const base = "/attachments";

  if (ext === "pdf") return `${base}/pdf.svg`;
  if (["doc", "docx", "dot", "dotx", "odt"].includes(ext)) return `${base}/word.svg`;
  if (["xls", "xlsx", "csv", "ods"].includes(ext)) return `${base}/xlsx.svg`;
  if (["ppt", "pptx", "key", "odp"].includes(ext)) return `${base}/ppt.svg`;
  if (["txt", "md", "rtf", "log"].includes(ext)) return `${base}/txt.svg`;
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "ico", "svg", "heic", "tif", "tiff"].includes(ext)) return `${base}/jpg.svg`;
  if (["mov", "mp4", "m4v", "avi", "webm", "mkv", "wmv"].includes(ext)) return `${base}/mov.svg`;
  if (["mp3", "wav", "aac", "flac", "m4a", "ogg", "wma", "aiff"].includes(ext)) return `${base}/mp3.svg`;
  if (["zip", "rar", "7z", "tar", "gz", "tgz", "bz2"].includes(ext)) return `${base}/zip.svg`;
  if (["url", "htm", "html", "webloc"].includes(ext)) return `${base}/link.svg`;

  return `${base}/other.svg`;
}

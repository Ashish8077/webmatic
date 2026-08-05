export interface SeoWarning {
  field: "seoTitle" | "metaDescription";
  message: string;
  level: "warning";
}

export function analyzeSeo(data: {
  seoTitle: string;
  metaDescription: string;
}): SeoWarning[] {
  const warnings: SeoWarning[] = [];

  const title = data.seoTitle.trim();
  const desc = data.metaDescription.trim();

  if (title.length > 0 && title.length < 30) {
    warnings.push({
      field: "seoTitle",
      message: "SEO title is shorter than the recommended 30–60 characters.",
      level: "warning",
    });
  }

  if (title.length > 60) {
    warnings.push({
      field: "seoTitle",
      message: `SEO title is ${title.length} characters. Consider keeping it under 60 characters to reduce truncation in search results.`,
      level: "warning",
    });
  }

  if (desc.length > 0 && desc.length < 120) {
    warnings.push({
      field: "metaDescription",
      message:
        "Meta description is shorter than the recommended 120–160 characters.",
      level: "warning",
    });
  }

  if (desc.length > 160) {
    warnings.push({
      field: "metaDescription",
      message: `Meta description is ${desc.length} characters. Consider keeping it under 160 characters to reduce truncation in search results.`,
      level: "warning",
    });
  }

  return warnings;
}

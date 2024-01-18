import matter from "gray-matter";
import { marked } from "marked";

export async function mdToHtmlAndMetadata(
  filePath: string
): Promise<{ html: string; metadata: any }> {
  const mdContent = await Bun.file(filePath).text();
  const parsed = matter(mdContent);
  const html = await marked(parsed.content);
  return { html, metadata: parsed.data };
}

export function generateSlug(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

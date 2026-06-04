import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getModuleBySlug, allModules } from "@/data/courses";
import LessonClient from "@/components/LessonClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const mMeta = getModuleBySlug(params.slug);
  if (!mMeta) return {};
  
  return {
    title: `${mMeta.title} - Modul ${mMeta.moduleNumber}`,
    description: mMeta.description,
  };
}

export async function generateStaticParams() {
  return allModules.map((m) => ({
    slug: m.slug,
  }));
}

// 1. Parser for Legacy HTML modules
function parseLegacyHtml(htmlContent: string) {
  const articleRegex = /<article id="actual-content"[^>]*>([\s\S]*?)<\/article>/i;
  const match = htmlContent.match(articleRegex);
  if (!match) return { cleanHtml: htmlContent, toc: [] };
  
  let contentHtml = match[1];

  // Strip navigation blocks
  const navContainerRegex = /<div class="[^"]*flex flex-col sm:flex-row justify-between[^"]*">[\s\S]*?<\/div>/gi;
  contentHtml = contentHtml.replace(navContainerRegex, "");
  
  const backLinkRegex = /<a href="[^"]*index\.html"[^>]*>[\s\S]*?<\/a>/gi;
  contentHtml = contentHtml.replace(backLinkRegex, "");

  const genericModuleLinkRegex = /<a href="[^"]*html"[^>]*class="[^"]*bg-brand[^"]*">[\s\S]*?<\/a>/gi;
  contentHtml = contentHtml.replace(genericModuleLinkRegex, "");

  // Collect headings for Table of Contents
  const toc: { id: string; text: string; depth: number }[] = [];
  let headingIdCounter = 0;

  contentHtml = contentHtml.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, text) => {
    const idMatch = attrs.match(/id="([^"]+)"/i);
    let id = idMatch ? idMatch[1] : "";
    const cleanText = text.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "").trim();
    
    if (!id) {
      id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (!id) id = `section-${headingIdCounter++}`;
      attrs = ` id="${id}"${attrs}`;
    }

    toc.push({
      id,
      text: cleanText,
      depth: tag.toLowerCase() === "h2" ? 2 : 3,
    });

    return `<${tag}${attrs}>${text}</${tag}>`;
  });

  return { cleanHtml: contentHtml, toc };
}

// 2. Custom Parser for Modern Markdown modules
function parseMarkdownToHtml(md: string) {
  // Convert basic entities
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code Blocks: ```lang ... ```
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'code'}">${code}</code></pre>`;
  });

  // Alert Note Box
  html = html.replace(/^\s*>\s*\[!NOTE\]\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
    const text = content.replace(/\n/g, "<br />").trim();
    return `<div class="p-5 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl my-6 text-sm text-slate-700 dark:text-blue-200"><strong>Note:</strong> ${text}</div>`;
  });

  // Alert Warning Box
  html = html.replace(/^\s*>\s*\[!WARNING\]\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
    const text = content.replace(/\n/g, "<br />").trim();
    return `<div class="p-5 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-xl my-6 text-sm text-slate-700 dark:text-amber-200"><strong>Warning:</strong> ${text}</div>`;
  });

  // Generic Blockquotes
  html = html.replace(/^\s*>\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
    const text = content.replace(/\n/g, "<br />").trim();
    return `<blockquote class="border-l-4 border-slate-300 dark:border-zinc-750 pl-4 italic my-6 text-slate-600 dark:text-slate-400">${text}</blockquote>`;
  });

  // Table of Contents Headings & Slug IDs
  let headingIdCounter = 0;
  const toc: { id: string; text: string; depth: number }[] = [];

  html = html.replace(/^## (.*?)$/gm, (match, text) => {
    const cleanText = text.trim();
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `h2-${headingIdCounter++}`;
    toc.push({ id, text: cleanText, depth: 2 });
    return `<h2 id="${id}">${cleanText}</h2>`;
  });

  html = html.replace(/^### (.*?)$/gm, (match, text) => {
    const cleanText = text.trim();
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `h3-${headingIdCounter++}`;
    toc.push({ id, text: cleanText, depth: 3 });
    return `<h3 id="${id}">${cleanText}</h3>`;
  });

  // Lists parsing
  html = html.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, "<ul>$&</ul>");

  html = html.replace(/^\s*\d+\.\s+(.*?)$/gm, "<li>$1</li>");
  html = html.replace(/(<ul>)?(<li>[\s\S]*?<\/li>)+(<\/ul>)?/g, (match) => {
    if (match.startsWith("<ul>")) return match;
    return `<ol>${match}</ol>`;
  });

  // Text decorations
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Paragraph wrapping
  const paragraphs = html.split(/\n\n+/);
  const parsedParagraphs = paragraphs.map(p => {
    p = p.trim();
    if (!p) return "";
    if (/^<(pre|ul|ol|div|blockquote|h2|h3)/i.test(p)) {
      return p;
    }
    return `<p>${p.replace(/\n/g, "<br />")}</p>`;
  });

  html = parsedParagraphs.join("\n");

  return { cleanHtml: html, toc };
}

export default async function ModulePage({ params }: PageProps) {
  const mMeta = getModuleBySlug(params.slug);
  if (!mMeta) {
    notFound();
  }

  // 1. Look for new Markdown file (.md)
  const mdFilePath = path.join(process.cwd(), "src", "content", "modules", `${params.slug}.md`);
  // 2. Look for legacy HTML file (.html) as fallback
  const htmlFilePath = path.join(process.cwd(), "module", `${params.slug}.html`);

  let cleanHtml = "";
  let toc: { id: string; text: string; depth: number }[] = [];

  if (fs.existsSync(mdFilePath)) {
    const fileContent = fs.readFileSync(mdFilePath, "utf-8");
    const parsed = parseMarkdownToHtml(fileContent);
    cleanHtml = parsed.cleanHtml;
    toc = parsed.toc;
  } else if (fs.existsSync(htmlFilePath)) {
    const fileContent = fs.readFileSync(htmlFilePath, "utf-8");
    const parsed = parseLegacyHtml(fileContent);
    cleanHtml = parsed.cleanHtml;
    toc = parsed.toc;
  } else {
    cleanHtml = `
      <h2 id="materi-sedang-dalam-penyusunan">Materi Sedang Dalam Penyusunan</h2>
      <p>Halo Developer! Catatan materi untuk modul <strong>${mMeta.title}</strong> saat ini sedang disusun oleh tim kontributor kami untuk memastikan kesesuaian dengan standar industri terbaru.</p>
      <div class="p-5 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl my-6 text-sm text-slate-700 dark:text-blue-200">
        <strong>Info Update:</strong> Modul ini dijadwalkan rilis pada pembaruan syllabus berikutnya. Silakan selesaikan atau jelajahi materi aktif lainnya di dashboard!
      </div>
      <p>Terima kasih atas antusiasme Anda belajar di Catatan Kader Academy.</p>
    `;
    toc = [{ id: "materi-sedang-dalam-penyusunan", text: "Materi Sedang Dalam Penyusunan", depth: 2 }];
  }

  // Calculate prev/next pagination links
  const currentIndex = allModules.findIndex(m => m.slug === params.slug);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : undefined;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : undefined;

  return (
    <LessonClient
      currentModule={mMeta}
      cleanHtml={cleanHtml}
      toc={toc}
      prevModule={prevModule}
      nextModule={nextModule}
    />
  );
}

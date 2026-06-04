"use server";

import fs from "fs";
import path from "path";
import { coursesData } from "@/data/courses";

export async function saveModuleAction(data: {
  courseId: string;
  title: string;
  description: string;
  moduleNumber: number;
  readTime: string;
  date: string;
  bannerImage: string;
  content: string;
}) {
  try {
    // Generate URL slug from title
    const slugifiedTitle = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const slug = `${data.courseId}-${slugifiedTitle}`;
    
    // 1. Create content directory if not exists
    const contentDir = path.join(process.cwd(), "src", "content", "modules");
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    // 2. Write Markdown file
    const mdPath = path.join(contentDir, `${slug}.md`);
    fs.writeFileSync(mdPath, data.content);
    
    // 3. Update coursesData in memory
    const updatedCourses = coursesData.map(course => {
      if (course.id === data.courseId) {
        // Prevent duplicate slugs
        const existingModules = course.modules.filter(m => m.slug !== slug);
        return {
          ...course,
          modules: [
            ...existingModules,
            {
              slug,
              title: data.title,
              description: data.description,
              category: data.courseId,
              moduleNumber: Number(data.moduleNumber),
              readTime: data.readTime,
              date: data.date,
              bannerImage: data.bannerImage || "/asset/image/course/laravel/instalasi.jpeg"
            }
          ].sort((a, b) => a.moduleNumber - b.moduleNumber) // Sort by module number
        };
      }
      return course;
    });

    // 4. Overwrite src/data/courses.ts with updated metadata
    const tsPath = path.join(process.cwd(), "src", "data", "courses.ts");
    const fileContent = `export interface ModuleMetadata {
  slug: string; // matches the .md file name without extension
  title: string;
  description: string;
  category: string;
  moduleNumber: number;
  readTime: string;
  date: string;
  bannerImage: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  modules: ModuleMetadata[];
}

export const coursesData: Course[] = ${JSON.stringify(updatedCourses, null, 2)};

export const allModules = coursesData.flatMap(course => course.modules);

export function getModuleBySlug(slug: string): ModuleMetadata | undefined {
  return allModules.find(m => m.slug === slug);
}

export function getCourseByModuleSlug(slug: string): Course | undefined {
  return coursesData.find(c => c.modules.some(m => m.slug === slug));
}

export function isModuleUnlocked(course: Course, moduleSlug: string, completedLessons: string[]): boolean {
  const modules = [...course.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);
  const targetIndex = modules.findIndex(m => m.slug === moduleSlug);
  if (targetIndex <= 0) return true; // First module is always unlocked
  
  for (let i = 0; i < targetIndex; i++) {
    if (!completedLessons.includes(modules[i].slug)) {
      return false;
    }
  }
  return true;
}
`;
    fs.writeFileSync(tsPath, fileContent);
    
    return { success: true, slug };
  } catch (error: any) {
    console.error("Gagal menyimpan modul:", error);
    return { success: false, error: error.message };
  }
}

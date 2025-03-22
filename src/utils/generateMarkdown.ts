import fs from "fs";
import path from "path";

// TODO: add tags or category
interface Frontmatter {
  title: string;
  description?: string;
  pubDate: string;
  image?: string;
}

const frontmatterTemplate: Frontmatter = {
  title: "My New Post",
  pubDate: new Date().toISOString(),
};

// get file name
const args = process.argv.slice(2);
const fn = args[0];

if (!fn) {
  console.error("Please enter file name");
  process.exit(1);
}

const generateMarkdown = (frontmatterTemplate: Frontmatter): string => {
  const frontmatter = `---
title: ${frontmatterTemplate.title}
description: ""
pubDate: ${frontmatterTemplate.pubDate}
image: ""
---
  `;
  return frontmatter;
};

const safeDir = path.resolve(process.cwd(), "src/content/blog");
const sanitizeTitle = (title: string) =>
  title.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
const fileName = sanitizeTitle(fn) + ".md";

const filePath = path.join(safeDir, fileName);

const markdown = generateMarkdown(frontmatterTemplate);

if (fs.existsSync(filePath)) {
  console.error("Already exists");
  process.exit(1);
}

fs.writeFileSync(filePath, markdown);
console.log(`Markdown has been created`);

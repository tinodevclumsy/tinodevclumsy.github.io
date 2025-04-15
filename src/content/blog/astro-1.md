---
title: Creating a Markdown Generator Utility for Astro SSG Blog
description: ""
pubDate: 2025-03-29T18:47:59.452Z
image: ""
categories: ["Astro", "Project"]
---

I recently built a blog using Astro SSG (Static Site Generator). Since it's a static site, I manage content with markdown files, but creating files and writing frontmatter every time became tiresome. To solve this problem, I developed a simple utility function.

## Utility Function Implementation

```tsx
import fs from "fs";
import path from "path";
// Define blog post metadata type
interface Frontmatter {
  title: string;
  description?: string;
  pubDate: string;
  image?: string;
}
// Default template values
const frontmatterTemplate: Frontmatter = {
  title: "My New Post",
  pubDate: new Date().toISOString(),
};
// Get filename from command line arguments
const args = process.argv.slice(2);
const fileName = args[0];
if (!fileName) {
  console.error("Please enter file name");
  process.exit(1);
}
// Generate markdown + frontmatter
const generateMarkdown = (template: Frontmatter): string => {
  return `---
title: ${template.title}
description: ""
pubDate: ${template.pubDate}
image: ""
---
`;
};
// Blog content directory
const blogDir = path.resolve(process.cwd(), "src/content/blog");
// Clean filename by removing special characters
const cleanFileName = fileName.replace(/[^a-z0-9-]/gi, "-").toLowerCase() + ".md";
const fullPath = path.join(blogDir, cleanFileName);
// Check if same file already exists
if (fs.existsSync(fullPath)) {
  console.error("Already exists");
  process.exit(1);
}
// Create the actual file
const content = generateMarkdown(frontmatterTemplate);
fs.writeFileSync(fullPath, content);
console.log(`Markdown has been created`);
```

## Adding Command to package.json

I installed tsx to run TypeScript in Node environment and added an "md" command.

```json
"scripts": {
  // ...
  "md": "tsx src/utils/generateMarkdown.ts",
},
```

## Execution Results

The script handles these cases:
1. No filename provided - displays error message
```bash
$ tsx src/utils/generateMarkdown.ts
Please enter file name
```

2. File already exists - prevents duplicate creation
```bash
$ tsx src/utils/generateMarkdown.ts js-1
Already exists
```

3. Successful creation - shows confirmation message
```bash
$ tsx src/utils/generateMarkdown.ts sample
Markdown has been created
```

## Conclusion

Creating markdown files and pasting frontmatter each time was time-consuming and annoying. This utility helps me save time and reduce inconvenience.

While researching static website generation, I learned about MDX, which is a markdown superset that allows writing JSX in markdown files. Currently, my content consists mainly of text and images, so I don't feel the need for MDX yet, but I plan to adopt it if necessary in the future.
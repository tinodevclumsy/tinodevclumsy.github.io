---
title: Goodbye CRA.. Creating New Projects After React 19
description: ""
pubDate: 2025-02-28T23:07:50.634Z
image: "/images/blog/react.png"
---

## Limitations of Create React App (CRA)

While following a Udemy course, I attempted to start a project using the most basic method, create-react-app, but encountered a dependency conflict error:

```
npm error Found: react@19.0.0
npm error node_modules/react
npm error   react@"^19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^18.0.0" from @testing-library/react@13.4.0
npm error node_modules/@testing-library/react
npm error   @testing-library/react@"^13.0.0" from the root project
```

### Root Causes
* CLI attempting to install the latest React version (v19)
* Template's testing library requires React 18 version

Upon investigating the create-react-app GitHub repository, I discovered that the project has already been deprecated.

![Github Issue](/images/blog/post/img-cra-1.png)

![CRA Deprecation](/images/blog/post/img-cra-2.png)

## Alternative Project Creation Methods

### 1. Vite

```bash
# Using npm
npm create vite@latest

# Using yarn
yarn create vite
```

### 2. Framework-Specific CLI Tools

**Next.js** - Supports SSR/SSG
```bash
npx create-next-app@latest
```

**Remix** - Full-stack Web Framework
```bash
npx create-remix
```

**Gatsby** - Specialized in Static Site Generation
```bash
npx create-gatsby
```

**Expo** - React Native Development
```bash
npx create-expo-app
```

## Additional Context
- React CRA Project PR Link
- GitHub Issue Link

## Key Takeaways
- Create React App is deprecated
- Modern alternatives like Vite offer better performance and developer experience
- Framework-specific tools provide more specialized development environments
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   site: "https://tinodevclumsy.github.io", // GitHub Pages URL
   base: "/", // 레포 이름 추가
   output: "static", // GitHub Pages는 정적 사이트만 지원
 });
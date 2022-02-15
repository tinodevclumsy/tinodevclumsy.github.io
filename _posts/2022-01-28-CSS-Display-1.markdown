---
layout: posts
title: "[CSS] Display 정리"
date: 2022-01-28 23:44:17 -0700
categories: 
      - css
# tags: [css]

author_profile: true
sidebar:
  nav: "docs"
---

### Display: Block

1. 새로운 한줄씩마다 배치
2. 최대 너비

``` css
.display-block {
  position: relative;
  display: block;
  background: black;
  height: 300px;
}
```

<div class="display-block;" style="position: relative; display: block; background:black; height: 300px;">
  <span style="color: #fff; position: absolute; top: 50%; left: 0; width: 100%; text-align: center; transform: translateY(-50%);">Display: Block</span>
</div>

### Display: Inline-Block
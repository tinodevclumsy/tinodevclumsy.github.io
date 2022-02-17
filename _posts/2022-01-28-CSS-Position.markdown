---
layout: posts
title: "[CSS] Position 정리"
date: 2022-02-17 01:13:17 -0700
categories: 
      - css
# tags: [css]

author_profile: true
sidebar:
  nav: "docs"
---

말 그대로 position을 결정하는 CSS 속성이다. position을 다양하게 알맞는 상황에 사용한다면 다양하고 다이나믹한 디자인에 맞춰 작업할 수 있다.

### position: static

기본 position, 말 그대로 static이라 top, left, bottom, right 속성에 영향을 받지 않는다.

### position: relative 

자기 자신 위차에서 상대적인 위치로 포지션을 갖는다. top, left, bottom, right 속성에 영향을 받는다.
- 자식 element에 포지션 absolute 주고싶을때 사용한다.

### position: fixed

viewport 기준 위치로 포지션을 갖는다. viewport 기준으로 포지션을 가지기 때문에 다른 요소들과의 overlapping에 주의해야한다.

- sticky 헤더에 주로 사용하는 편이다.
- 다른 예로는 FAB에도 사용한다.

### postion: absolute

개인적으로 잘 사용하면 다양하게 스타일링 할 수 있다고 생각한디. 하지만 responsive까지 생각한다면 제일 주의해서 사용해야하는 포지션 속성이라고 생각한다. 
상위제일 가까운 position이 relative인 element 기준으로 포지션을 갖는다.
- position이 relative인 부모 요소가 height가 padding으로 잡혀있을때 자식 요소들을 센터에 맞추기 위해서 사용한다.
- Hover 하였을때 opacity background를 주고싶을때 사용한다.

``` css
.parent-relative-block {
  position: relative;
  display: block;
  background: #e1e1e1;
  height: 300px;
}

.overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .8);
  opacity: 0;
  transition: 0.3s ease-in-out all;
  -webkit-transition: 0.3s ease-in-out all;
}

.parent-relative-block:hover .overlay-bg {
  opacity: 1;
}
```
<style>
.parent-relative-block {
  position: relative;
  display: block;
  background: #e1e1e1;
  height: 300px;
}

.overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .8);
  opacity: 0;
  transition: 0.3s ease-in-out all;
  -webkit-transition: 0.3s ease-in-out all;
}

.parent-relative-block:hover .overlay-bg {
  opacity: 1;
}

.child-element-text {
  position: absolute;
  left: 0;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  color: #2f7d95;
  transform: translateY(-50%);
  font-weight: 600;
}

</style>

<div class="parent-relative-block">
  <div class="overlay-bg"></div>
  <span class="child-element-text">Display: Block</span>
</div>

### position: sticky

사실 sticky를 써볼려고 몇번 도전은 해봤지만 한번도 구현보지는 못했다. 브라우져 호환성이 문제인건지 내가 조건을 놓친건지 좀 더 공부가 필요하다. 현재는 그냥 자바스크립트로 sticky를 구현하고 있는중이다.
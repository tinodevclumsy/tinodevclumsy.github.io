---
layout: archive
permalink: personal
title: "Personal"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.html %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}
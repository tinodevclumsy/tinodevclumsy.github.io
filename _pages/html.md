---
layout: archive
permalink: html
title: "HTML"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.html %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}
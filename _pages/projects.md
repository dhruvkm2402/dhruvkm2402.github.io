---
layout: wide
title: "Projects"
lede: "Learned control, perception on the edge, SLAM, and the simulation behind them, on robots that had to work in front of someone. Each page covers what the problem was, what I actually built, and what the measurement came out to."
permalink: /projects/
hide_title: false
redirect_from:
  - /aprojects/
  - /portfolio/
---

<div class="card-grid card-grid--three" style="margin-top:2.2em">
  {% assign ordered = site.projects | sort: "order" %}
  {% for project in ordered %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>

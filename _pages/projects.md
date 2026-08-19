---
layout: wide
title: "Projects"
lede: "Robots that had to work outside the simulator. Each page covers what the problem was, what I actually built, and what the measurement came out to."
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

<p class="section__note" style="margin-top:2.5em">
  Co-authored projects name every contributor on their page. Where I wasn't the lead, it says so.
</p>

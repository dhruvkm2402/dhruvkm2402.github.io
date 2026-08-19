---
layout: wide
title: "Get in touch"
lede: "Hiring, collaborating, or stuck on a problem that won't behave — I'm happy to hear from you."
permalink: /contact/
narrow: true
---

I try to read every email. If you're writing about a role, a paper, or a project you think I'd find
interesting, say a sentence or two about what it actually is — that's usually enough for me to reply
properly rather than with a holding message.

<form class="contact-form" id="contact-form"
      {% if site.contact_form_endpoint %}action="{{ site.contact_form_endpoint }}" method="post"{% endif %}>
  <div class="field">
    <label for="cf-name">Your name</label>
    <input type="text" id="cf-name" name="name" autocomplete="name" required>
  </div>

  <div class="field">
    <label for="cf-email">Your email</label>
    <input type="email" id="cf-email" name="email" autocomplete="email" required>
    <span class="field__note">So I can reply.</span>
  </div>

  <div class="field">
    <label for="cf-subject">What's this about?</label>
    <input type="text" id="cf-subject" name="subject" placeholder="A role, a paper, a collaboration…">
  </div>

  <div class="field">
    <label for="cf-message">Message</label>
    <textarea id="cf-message" name="message" rows="7" required></textarea>
  </div>

  {% comment %}Honeypot: real people leave this empty, bots fill it.{% endcomment %}
  <div class="field field--trap" aria-hidden="true">
    <label for="cf-company">Company</label>
    <input type="text" id="cf-company" name="_gotcha" tabindex="-1" autocomplete="off">
  </div>

  <div class="btn-row" style="margin-top:1.4em;align-items:center">
    <button class="button button--primary" type="submit">Send message</button>
    <span class="form-status" id="contact-status" role="status" aria-live="polite"></span>
  </div>
</form>

<h2 class="section__title" style="margin:2.8em 0 0.8em;font-size:1.25em">Elsewhere</h2>

<div class="contact-grid">
  <a class="contact-card" href="https://www.linkedin.com/in/dhruvkm" rel="noopener">
    <i class="fab fa-linkedin" aria-hidden="true"></i>
    <span>
      <span class="contact-card__label">LinkedIn</span>
      <span class="contact-card__note">in/dhruvkm</span>
    </span>
  </a>

  <a class="contact-card" href="https://github.com/dhruvkm2402" rel="noopener">
    <i class="fab fa-github" aria-hidden="true"></i>
    <span>
      <span class="contact-card__label">GitHub</span>
      <span class="contact-card__note">Code for most of the projects here</span>
    </span>
  </a>

  <a class="contact-card" href="https://scholar.google.com/citations?user=gqUo1V4AAAAJ" rel="noopener">
    <i class="ai ai-google-scholar" aria-hidden="true"></i>
    <span>
      <span class="contact-card__label">Google Scholar</span>
      <span class="contact-card__note">Citations and full publication list</span>
    </span>
  </a>

  <a class="contact-card" href="https://www.researchgate.net/profile/Dhruv-Mehta-24" rel="noopener">
    <i class="ai ai-researchgate" aria-hidden="true"></i>
    <span>
      <span class="contact-card__label">ResearchGate</span>
      <span class="contact-card__note">Papers and preprints</span>
    </span>
  </a>
</div>

<p class="section__note">Based in Fishers, Indiana.</p>

## A few things I'm interested in talking about

- Reinforcement learning for real robots — ground vehicles, legged platforms, multi-robot coordination.
- Vision-language-action models and instruction-driven autonomy: OpenVLA, OpenPI, and what it takes to make them useful on an actual machine.
- Perception that has to run on the robot — vision transformers, depth and segmentation networks, and the latency budget of a Jetson.
- Simulation-first development: digital twins, scenario testing, and how much of a deployment you can genuinely de-risk before hardware.
- Teaching and explaining this work to people who don't already speak robotics.

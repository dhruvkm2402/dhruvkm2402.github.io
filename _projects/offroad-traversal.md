---
title: "Agile Off-Road Traversal of an Ackermann-Steered Platform"
order: 3
featured: true
badge: "IFAC 2025"
video: offroad-traversal
summary: "Goal-to-goal navigation learned end-to-end for a mid-scale off-road vehicle, with reward shaping tuned for stability rather than raw speed."
lede: "Give the vehicle a goal pose in rough terrain and let it work out how to get there, without a hand-designed motion plan in the middle."
period: "2023 – 2024"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Lead author. Environment authoring, reward design, training and evaluation."
authors: "D. Mehta, A. Salvi, V. Krovi"
venue: "IFAC-PapersOnLine, Vol. 59(3), pp. 79–84"
doi: "https://doi.org/10.1016/j.ifacol.2025.07.014"
doi_label: "Read the paper"
stack: ["Isaac Gym", "PyTorch", "Reinforcement learning"]
results:
  - value: "86%"
    label: "success rate reaching the desired goal pose"
---

## The problem

Point stabilization, meaning get to this position *and* this heading, is a well-understood problem on
flat ground and a nuisance off it. An Ackermann-steered vehicle can't turn in place, so the
approach has to be planned; add slopes and loose surfaces and the plan stops matching what the
vehicle can actually execute.

## What I built

A learning-based goal-to-goal navigation policy that treats motion planning and control as one
problem for a mid-scale off-road platform. The vehicle learns the approach behaviour directly
rather than tracking a separately planned trajectory.

Reward shaping was the real work here. It's easy to write a reward that produces a policy which
reaches the goal by driving in a way no one would sign off on, so the shaping deliberately
favoured stability over aggressive maneuvers, and I authored a custom off-road simulation
environment so robustness was trained rather than assumed.

{% include video.html src="offroad-traversal" caption="Learned goal-to-goal navigation on the off-road platform." %}

## Result

An **86% success rate** at reaching the desired goal across the evaluation set. Published in
IFAC-PapersOnLine, Vol. 59(3), pp. 79-84.

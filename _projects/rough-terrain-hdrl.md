---
title: "Rough-Terrain Path Tracking with Hybrid Deep Reinforcement Learning"
order: 2
featured: true
badge: "IEEE/ASME AIM 2024"
video: rough-terrain-sim
summary: "A model-based controller and a learned policy working together, so an Ackermann-steered vehicle tracks a path across terrain neither was tuned for."
lede: "Classical control is predictable but brittle on terrain it wasn't designed for. Learning is adaptable but hard to trust. This work puts them in the same loop."
period: "2022 – 2024"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Lead author. Framework design, terrain authoring, training and real-world validation."
authors: "D. Mehta, A. Salvi, V. Krovi"
venue: "IEEE/ASME AIM 2024, pp. 685–690"
stack: ["Isaac Gym", "PyTorch", "Blender", "OpenUSD", "ROS"]
code: "https://github.com/dhruvkm2402/Hybrid_Deep_Reinforcement_Learning_RoughTerrain"
paper: "/files/RoughTerrain_Ackerman_HybridDRL___Dhruv_Ameya_AIM2024_FinalV1.pdf"
doi: "https://ieeexplore.ieee.org/abstract/document/10636992"
doi_label: "IEEE Xplore"
results:
  - value: "98.5%"
    label: "path-tracking precision in real-world runs"
  - value: "Unseen tracks"
    label: "validated on multiple real tracks the policy never trained on"
---

## The problem

A path-tracking controller tuned on flat ground gets into trouble the moment the ground stops
cooperating. Slopes change the effective steering response, loose surfaces break the tire model,
and the vehicle ends up cutting corners or oversteering. Retuning per surface doesn't scale, and
handing the whole job to a learned policy trades one problem for another: you lose the structure
that made the classical controller predictable in the first place.

## What I built

A hybrid framework: a model-based controller keeps its role as the stable backbone, and a deep
reinforcement learning policy learns the corrections the model can't express. The learned part
handles what varies, whether that's terrain, traction or geometry, while the model-based part keeps behaviour
bounded and legible.

Choosing that split wasn't obvious, so I evaluated policy architectures across several deep
reinforcement learning frameworks rather than committing to one and hoping.

{% include video.html src="rough-terrain-sim" caption="Simulated run in Isaac Gym on a rough-terrain track authored for this study." %}

## Building terrain worth training on

The policy is only as good as the ground it learned on, so the terrain wasn't an afterthought. I
authored the 3D rough-terrain assets in Blender and exported them through OpenUSD into the
simulator, which meant I could define repeatable test protocols instead of eyeballing whether two
runs were comparable.

## The real-world test

The framework was validated on multiple unseen real-world tracks under that same repeatable
protocol, reaching **98.5% precision** in the real world. Below is one of those runs, with the vehicle
tracking its path across an actual grass slope, not a rendered one.

{% include video.html src="rough-terrain-real" portrait="true" caption="Real-world run on a grass slope. Same framework, same protocol, no simulator." %}

## Where it landed

Published at the 2024 IEEE/ASME International Conference on Advanced Intelligent Mechatronics
(pp. 685–690). The work also became the core of my dissertation, *Hybrid Learning for Rough Terrain
Navigation of Actively Articulated Wheeled Vehicles*.

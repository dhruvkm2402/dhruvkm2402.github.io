---
title: "Digital Twins and Edge Autonomy at Arrive AI"
order: 0
badge: "Current work"
summary: "Building a scaled digital twin in Isaac Sim, an autonomy architecture combining RL with vision-language models, and the inference stack that runs it on Jetson hardware."
lede: "What I'm working on now. Described at the level I'd put on a resume — the specifics belong to my employer."
period: "Sept 2025 – present"
where: "Arrive AI Inc., Fishers, Indiana"
role: "NVIDIA Robotics 3D Specialist"
stack: ["Isaac Sim", "WebRTC", "TensorRT", "Triton", "DeepStream", "Jetson Thor", "Docker", "k3s"]
---

## What I'm doing

I joined Arrive AI after finishing my PhD, and the work is a direct continuation of it: simulation
first, hardware second, with the gap between them as the actual engineering problem.

**Simulation at scale.** Building a digital twin environment in NVIDIA Isaac Sim so scenarios can be
tested before anything is deployed in the real world. This is the part of my research I most wanted
to keep doing — a simulator earns its keep when it catches a failure that would otherwise have
happened outdoors, in front of someone.

**Autonomy architecture.** Developing the autonomy stack for a mobile robot platform, integrating
reinforcement learning policies with vision-language models (VLM) and vision-language-action (VLA)
models so the robot can act on instructions rather than only on waypoints.

**Perception and inference.** Evaluating and optimizing vision transformers for real-time perception,
accelerating inference with NVIDIA Triton, the DeepStream SDK and TensorRT, and profiling Jetson
Orin Nano, Orin AGX and Thor (Blackwell) devices for the latency-throughput trade-offs that decide
what actually fits on the robot.

**Getting it to the fleet.** Architecting a containerized AI inference codebase with Docker and k3s
so deployment is repeatable rather than artisanal, plus building the web frontend for low-latency
WebRTC video streaming.

## Why no video here

Everything above is public in the sense that it's on my resume. The systems themselves aren't mine
to show, so this page has no footage and no product detail. If you want to talk about any of it in
more depth, [get in touch](/contact/).

---
title: "Simulation, Learning and Edge AI at Arrive AI"
order: 0
badge: "Current work"
summary: "Digital twin simulation, reinforcement learning, vision-language-action models, and the edge inference stack that has to run modern models fast enough to be useful."
lede: "What I'm working on now, described at the level I'd put on a resume. The specifics belong to my employer."
period: "Sept 2025 – present"
where: "Arrive AI Inc., Fishers, Indiana"
role: "Robotics 3D Specialist"
stack: ["Isaac Sim", "OpenVLA", "OpenPI", "TensorRT", "Triton", "DeepStream", "Jetson Thor", "Qualcomm IQ9075", "WebRTC", "Docker"]
---

## What I'm doing

I joined Arrive AI after finishing my PhD, and the work is a direct continuation of it: simulation
first, hardware second, with the gap between them as the actual engineering problem.

**Simulation at scale.** Building a digital twin environment in NVIDIA Isaac Sim so scenarios can be
tested before anything reaches the real world. This is the part of my research I most wanted to keep
doing. A simulator earns its keep when it catches a failure that would otherwise have happened in
front of someone.

**Reinforcement learning.** Continuing the policy-training work my PhD was built on, which remains
the thread I know best.

**Vision-language-action models.** A separate line of work, running in parallel rather than wired
into the reinforcement learning: getting open VLM and VLA models such as OpenVLA and OpenPI stood up
and evaluated, to understand where they hold up and where they don't.

**Perception and inference.** Evaluating and optimizing vision transformers for real-time perception,
accelerating inference with NVIDIA Triton, the DeepStream SDK and TensorRT.

**Choosing the silicon.** Profiling edge devices for the latency-throughput trade-offs that decide
what will actually run: Jetson Orin Nano, Orin AGX and Thor (Blackwell), and, beyond NVIDIA,
Qualcomm's IQ9075 and hardware from Infineon Technologies. Picking a compute platform is a decision
you live with for years, so it's worth measuring rather than assuming.

**Getting it deployed.** Architecting the containerized AI inference codebase with Docker so
deployment is repeatable rather than artisanal, working with the platform team on the k3s side. I
also build the web frontend for low-latency WebRTC video streaming.

## About Arrive AI

[Arrive AI](https://www.arriveai.com) connects people, robots and drones through the Arrive Point™
Network, built to scale the future of delivery. This page describes my work at the level it appears
on my resume. The systems themselves aren't mine to show, so there's no footage or product detail
here. If you'd like to talk about any of it in more depth, [get in touch](/contact/).

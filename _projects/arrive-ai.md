---
title: "Digital Twins and Edge Autonomy at Arrive AI"
order: 0
badge: "Current work"
summary: "An autonomy stack combining RL policies with vision-language-action models, the edge inference that runs it on Jetson hardware, and a digital twin to test it before deployment."
lede: "What I'm working on now. Described at the level I'd put on a resume — the specifics belong to my employer."
period: "Sept 2025 – present"
where: "Arrive AI Inc., Fishers, Indiana"
role: "Robotics 3D Specialist"
stack: ["Isaac Sim", "OpenVLA", "OpenPI", "TensorRT", "Triton", "DeepStream", "Jetson Thor", "Qualcomm IQ9075", "WebRTC", "Docker"]
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
models — including deploying open VLA models such as OpenVLA and OpenPI — so the robot can act on
an instruction rather than only on a waypoint list.

**Perception and inference.** Evaluating and optimizing vision transformers for real-time perception,
accelerating inference with NVIDIA Triton, the DeepStream SDK and TensorRT.

**Choosing the silicon.** Profiling edge devices for the latency-throughput trade-offs that decide
what actually fits on the robot — Jetson Orin Nano, Orin AGX and Thor (Blackwell), and, beyond
NVIDIA, Qualcomm's IQ9075 and hardware from Infineon Technologies. Picking a compute platform is a
decision you live with for years, so it's worth measuring rather than assuming.

**Getting it to the fleet.** Architecting the containerized AI inference codebase with Docker so
deployment is repeatable rather than artisanal, working with the platform team on the k3s side of
getting it out to the fleet. I also build the web frontend for low-latency WebRTC video streaming.

## About Arrive AI

[Arrive AI](https://www.arriveai.com) connects people, robots and drones through the Arrive Point™
Network, built to scale the future of delivery. This page describes my work at the level it appears
on my resume — the systems themselves aren't mine to show, so there's no footage or product detail
here. If you'd like to talk about any of it in more depth, [get in touch](/contact/).

---
title: "Real-Time 3D Scene Reconstruction with NVIDIA Isaac ROS Nvblox"
order: 4
badge: "NVIDIA collaboration"
video: nvblox-reconstruction
summary: "A deployment pipeline taking Nvblox from a simulated test arena to a TurtleBot3 Burger, producing live 3D reconstruction and 2D costmaps on a Jetson Orin Nano."
lede: "Getting a GPU-accelerated reconstruction stack running end to end — in simulation and on the robot — and then writing down how, so the next person doesn't have to rediscover it."
period: "2023"
where: "ARM Lab, Clemson University (CU-ICAR), with the NVIDIA Robotics team"
role: "Lead. Pipeline development, simulation arena, hardware bring-up and the public write-up."
authors: "Dhruv Mehta, Chinmay Samak, Tanmay Samak, Venkat Krovi"
stack: ["Isaac ROS", "Nvblox", "ROS 2", "Isaac Sim", "RealSense", "Jetson Orin Nano"]
code: "https://github.com/dhruvkm2402/NVIDIA-Isaac-ROS-Nvblox"
writeup: "/blog/isaac-ros-nvblox-3d-reconstruction/"
---

## The problem

Nvblox computes a live 3D reconstruction and the 2D costmap a navigation stack needs, on the GPU.
The capability is excellent; the distance between "the package exists" and "it runs on your robot"
is where most of the time goes — drivers, transforms, camera calibration, the mismatch between what
works in simulation and what the hardware does.

## What I built

A deployment pipeline covering both halves. In simulation, a test arena authored in Isaac Sim so
the reconstruction had something structured to build against. On hardware, a modified TurtleBot3
Burger carrying an Intel RealSense depth camera and a Jetson Orin Nano doing the GPU-accelerated
inference, with the whole stack driven through ROS 2 in Python.

{% include video.html src="nvblox-reconstruction" caption="Teleoperated run with live 3D scene reconstruction, in simulation and on the robot." %}

## Working with NVIDIA

This was a cross-organization collaboration with NVIDIA's robotics team on integration and hardware
bring-up. Working that way — where the person who wrote the package and the person deploying it
have to agree on what "working" means — taught me as much about communication as about the stack.

## The write-up

I published a complete step-by-step guide so the setup is reproducible by anyone with the same
hardware. It's the piece of this project that has been most useful to other people, which I think
says something about which parts of research work are actually worth the effort.

---
title: "DepthNet and SegNet on a Clearpath Husky"
order: 6
video: depthnet-segnet
summary: "Monocular depth and semantic segmentation running live on a Jetson AGX Orin aboard a Husky, tested against the real scene rather than a dataset."
lede: "Two perception networks, one edge device, and the question that only hardware answers: does it hold up at the frame rate the robot actually needs?"
period: "2023"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Co-author. Deployment and testing on the Husky platform."
authors: "Ameya Salvi, Harshal Varpe, Dhruv Mehta, Venkat Krovi"
stack: ["DepthNet", "SegNet", "Jetson AGX Orin", "ROS", "Clearpath Husky"]
---

## What this was

DepthNet and SegNet deployed on an NVIDIA Jetson AGX Orin aboard a Clearpath Husky and tested
in the lab environment. Monocular depth estimation and semantic segmentation running against a
live camera feed while the robot drove.

{% include video.html src="depthnet-segnet" caption="Live monocular depth inference on the Husky, robot view alongside the network output." %}

## Why bother, when the benchmarks already exist

Benchmark numbers are computed on curated frames. A robot sees motion blur, its own shadow,
overexposed windows and geometry the training set never contained, at whatever rate the edge device
can sustain while everything else is also running. Putting the networks on the vehicle is how you
find out which of those actually degrades the output, and it's the difference between a model that
scores well and a perception stack you'd let drive something.

## Credit

Group work in the ARM Lab led by Ameya Salvi and Harshal Varpe; I worked on the deployment and
testing on the Husky.

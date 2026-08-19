---
title: "Isaac Bi3D Freespace Segmentation on HPC and Hardware"
order: 5
video: bi3d-freespace
summary: "Scaling NVIDIA's Bi3D freespace segmentation across L40 GPUs on a university cluster, then deploying it on a Clearpath Husky in a custom off-road scenario."
lede: "Taking a freespace segmentation model from a single workstation to cluster-scale evaluation, and from a rendered off-road scene to an actual skid-steer robot."
period: "2023"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Co-author. Operationalized the pipeline on Palmetto HPC, authored the off-road scenario, ran the solver comparison."
authors: "Ameya Salvi, Dhruv Mehta, Harshal Varpe, John Coleman, Venkat Krovi"
stack: ["Isaac ROS", "Bi3D", "Isaac Sim", "Omniverse", "Palmetto HPC", "Clearpath Husky"]
---

## The problem

Freespace segmentation tells a robot where it can actually drive, which matters much more off-road
than on a paved surface where the answer is usually "the road." Evaluating it properly means many
runs across many scenarios, and that doesn't fit on one machine.

## What I did

Implemented NVIDIA's Isaac Bi3D freespace segmentation on Clemson's Palmetto HPC cluster, scaling
evaluation across L40 GPUs so the study could cover more scenarios than a single workstation
allows. The off-road simulation scenario was authored in Isaac Sim and visualized through the
Omniverse streaming client — which is what makes cluster-side rendering usable at all, since the
GPUs doing the work are nowhere near your desk.

{% include video.html src="bi3d-freespace" caption="Freespace segmentation running on the Husky platform in the custom off-road scenario." %}

## The physics detail worth knowing

Deploying to a Clearpath Husky with a stereo depth camera surfaced a simulation question that has
nothing to do with perception: skid-steer vehicles turn by deliberately violating the no-slip
assumption, so how the solver handles contact matters. I quantified the trade-offs between PhysX's
PGS and TGS solvers for skid-steer fidelity — a choice that silently decides whether your simulated
robot turns like the real one.

## Credit

This was a group effort in the ARM Lab; Ameya Salvi led the work and I contributed the HPC
deployment, the off-road scenario and the solver study.

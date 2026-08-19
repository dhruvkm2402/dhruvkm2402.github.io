---
title: "LiDAR-Inertial Odometry and Mapping on a Unitree Go1"
order: 7
video: lio-sam-go1
summary: "LIO-SAM brought up on a legged robot with a Velodyne VLP-16, then tuned for the one thing it wasn't written for: a gait that shakes the sensor every step."
lede: "SLAM algorithms are usually validated on wheels. A quadruped gives the same sensor a very different ride."
period: "2022 – 2023"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Sole contributor. Sensor integration, bring-up, tuning and evaluation."
stack: ["LIO-SAM", "ROS", "Velodyne VLP-16", "Unitree Go1"]
---

## The problem

LIO-SAM fuses LiDAR and IMU into odometry and a map, and it does it well, on platforms that move
smoothly. A quadruped doesn't. Every footfall is an impulse through the sensor mount, the IMU sees
gait periodicity that has nothing to do with the robot's actual trajectory, and the point cloud is
being swept by a sensor that is bobbing in three axes.

## What I did

Integrated a Velodyne VLP-16 on a Unitree Go1 and brought up the full stack: drivers, the transform
tree, and the launch pipeline that ties them together. Then the real work of tuning LIO-SAM's
parameters for a legged platform instead of the wheeled ones its defaults assume.

{% include video.html src="lio-sam-go1" caption="LIO-SAM running on the Go1: LiDAR-inertial odometry and live map construction during a walk." %}

## Evaluating it honestly

A map that looks good on screen can still be wrong. I evaluated the system on real-world runs
against the three things that actually matter: odometry drift over the run, whether loop closure
fired when the robot returned to somewhere it had already been, and whether the resulting map stayed
self-consistent instead of smearing surfaces into each other.

![Map produced by LIO-SAM during a Unitree Go1 run](/images/lio-sam-map.jpg)

This one sits outside my published work, but it's the project that taught me the most about how
much of SLAM performance is sensor mounting and parameter discipline rather than algorithm choice.

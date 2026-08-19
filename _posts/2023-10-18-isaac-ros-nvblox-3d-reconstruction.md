---
title: "Real-Time 3D Scene Reconstruction using NVIDIA Isaac ROS Nvblox in Simulation and Reality"
date: 2023-10-18
permalink: /blog/isaac-ros-nvblox-3d-reconstruction/
canonical_url: "https://medium.com/@dhruvm_64603/real-time-3d-scene-reconstruction-using-nvidia-isaac-ros-nvblox-in-simulation-and-reality-4386595339c3"
excerpt: "A complete walkthrough for running NVIDIA's hardware-accelerated 3D reconstruction stack twice over — on an NVIDIA Carter in Isaac Sim and on a TurtleBot3 Burger with a RealSense D435i and a Jetson Orin Nano — reconstructing the same VEX AI arena in both."
tags:
  - Isaac ROS
  - Nvblox
  - ROS 2
  - Isaac Sim
  - Jetson
---

<p class="canonical-note">
Originally published on <a href="https://medium.com/@dhruvm_64603/real-time-3d-scene-reconstruction-using-nvidia-isaac-ros-nvblox-in-simulation-and-reality-4386595339c3" rel="canonical noopener">Medium</a> in October 2023. Reproduced here in full.
</p>

**Authors:** [Dhruv Mehta](https://www.linkedin.com/in/dhruvkm/), PhD, [Chinmay Samak](https://www.linkedin.com/in/samakchinmay/) (PhD Student), [Tanmay Samak](https://www.linkedin.com/in/samaktanmay/) (PhD Student)

**Advisor:** [Dr. Venkat Krovi](https://www.linkedin.com/in/venkatnkrovi/) (Michelin Endowed SmartState Chair Professor of Vehicle Automation)

**Affiliation:** [ARMLab](https://cecas.clemson.edu/armlab-cuicar), Department of Automotive Engineering, Clemson University International Center for Automotive Research (CU-ICAR), Greenville, SC 29607, USA.

![Isaac ROS Nvblox overview](/images/blog/nvblox-overview.jpg)
*Source: [NVIDIA-ISAAC-ROS/isaac_ros_nvblox](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nvblox)*

Simulation and reality are two facets of the same coin, which aid in prototyping, simulating, validating, and deploying autonomous mobile robots. One of the critical challenges in robotics is perception and navigation, where robots need to understand and navigate the complex 3D world around them. This article will explore an exciting combination of contemporaneous technology — the NVIDIA Isaac ROS Nvblox hardware accelerated 3D scene reconstruction packages for the Nav2 stack with ROS 2.

We show that the scene reconstruction pipeline is agnostic to the robot platform using an NVIDIA Carter in simulation and a ROBOTIS TurtleBot3 in reality to perform 3D reconstruction of the same scene — the [VEX AI arena](https://www.vexrobotics.com/v5/competition/vex-ai).

![Article structure](/images/blog/nvblox-article-structure.jpg)

This article is organized as depicted in the figure above. In Part 1, we show a Carter robot autonomously operating in a scaled VEX AI arena while reconstructing its environment. Part 2 explains our hardware implementation using TurtleBot3 and Intel RealSense depth camera for manual as well as autonomous scene reconstruction. By combining Nvblox with the Nav2 stack using NVIDIA Isaac ROS Nvblox, we demonstrate that the robot can navigate an arena created using a VEX Robotics field while performing real-time 3D scene reconstruction as a vision-based motion planning solution to avoid obstacles.

## Part 1: Simulation in NVIDIA Isaac Sim

![VEX AI arena in Isaac Sim](/images/blog/nvblox-vex-arena-isaacsim.jpg)
*VEX AI arena in Isaac Sim*

Like any other robotic system, testing algorithms in simulation first before deploying them on hardware is more effortless. We test the simulation with our custom-created field from VEX AI.

**Requirements:**

1. OS: Ubuntu 22.04 LTS with [ROS 2](https://docs.ros.org/en/foxy/Installation.html) Humble.
2. [Isaac Sim installation](https://docs.omniverse.nvidia.com/isaacsim/latest/install_workstation.html) (minimum GeForce RTX 2070 required with 32 GB RAM).

**Steps:**

1. Install the Isaac ROS Nvblox package. The setup instructions can be found [here](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nvblox/blob/main/docs/tutorial-isaac-sim.md). Please ensure you follow all the steps, especially the quickstart guide.

2. Then launch the Docker container and Nvblox package using the following commands:

```bash
cd ~/workspaces/isaac_ros-dev/src/isaac_ros_common && \
  ./scripts/run_dev.sh
cd /workspaces/isaac_ros-dev && \
  colcon build --symlink-install && \
  source install/setup.bash
```

3. Start Isaac Sim with the Carter ROS warehouse scenario:

```bash
alias omni_python='~/.local/share/ov/pkg/isaac_sim-2022.2.1/python.sh'
omni_python ~/workspaces/isaac_ros-dev/src/isaac_ros_nvblox/nvblox_examples/nvblox_isaac_sim/omniverse_scripts/start_isaac_sim.py
```

4. Launch the pre-composed graph launch file:

```bash
ros2 launch nvblox_examples_bringup isaac_sim_example.launch.py
```

5. You can drag and drop the VEX AI arena from the USD file [here](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox).

6. Click on the 2D Goal Pose button in RViz to navigate the robot. We've scaled the arena in order to create a similar scenario with the TurtleBot implementation. You can keep the same scale as per the robot used in Isaac Sim.

**Results for simulation in Isaac Sim:**

<div class="vfig"><div class="vfig__frame" style="padding-top:56.25%;position:relative">
<iframe src="https://www.youtube.com/embed/alEGsvMiuCk" title="Nvblox scene reconstruction in Isaac Sim" style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe>
</div></div>

## Part 2: Experiments in the real world

We tested the Isaac ROS Nvblox packages (ROS 2 Humble) on a TurtleBot3 Burger (running ROS 2 Foxy) with an Intel RealSense depth camera. Following are the details.

![Hardware setup for running Isaac ROS Nvblox with TurtleBot3](/images/blog/nvblox-hardware-setup.jpg)
*Hardware setup for running Isaac ROS Nvblox with TurtleBot3*

**Requirements — robot:**

1. [TurtleBot3 Burger robot hardware](https://www.robotis.us/turtlebot-3-burger-us/) with [TurtleBot3 SBC image](https://emanual.robotis.com/docs/en/platform/turtlebot3/sbc_setup/) (tested with [ROS 2 Foxy Fitzroy](https://docs.ros.org/en/foxy/Installation/Alternatives/Ubuntu-Development-Setup.html)).
2. [TurtleBot3 packages](https://github.com/Tinker-Twins/TurtleBot3).

**Requirements — depth camera:**

1. [Intel RealSense D435i](https://www.intelrealsense.com/depth-camera-d435i/) or any other compatible version highlighted [here](https://github.com/NVIDIA-ISAAC-ROS/.github/blob/main/profile/realsense-setup.md#camera-compatibility).
2. [Intel RealSense firmware](https://dev.intelrealsense.com/docs/firmware-releases) (tested with release 5.13, FW version 5.13.0.50, SDK version 2.52.1).

**Requirements — Jetson Orin Nano:**

1. [Jetson Orin Nano Developer Kit](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit).
2. [NVIDIA JetPack SDK](https://developer.nvidia.com/embedded/jetpack) — tested with JetPack 5.1.2 using both the SD card image and the NVIDIA SDK Manager methods; the latter is smoother and reflashes the QSPI, which can help with boot issues.
3. A [PCIe SSD](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common/blob/main/docs/dev-env-setup_jetson.md) as optional storage.
4. [Isaac ROS development environment](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common/blob/main/docs/dev-env-setup.md).
5. [Isaac ROS Nvblox](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nvblox/blob/main/README.md#quickstart).
6. [Isaac ROS RealSense](https://github.com/NVIDIA-ISAAC-ROS/.github/blob/main/profile/realsense-setup.md) (compatible with selective devices — tested with the Intel RealSense D435i).
7. [Isaac ROS Visual SLAM](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam.git) and [Isaac ROS NITROS](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nitros) for hardware-accelerated [RealSense camera-based reconstruction](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nvblox/blob/main/docs/tutorial-realsense.md).
8. VNC server (tested with [x11vnc](https://wiki.archlinux.org/title/x11vnc)).

**Requirements — remote PC:**

1. [ROS 2 Foxy Fitzroy](https://docs.ros.org/en/foxy/Installation/Alternatives/Ubuntu-Development-Setup.html) on [Ubuntu 20.04 Focal Fossa](https://releases.ubuntu.com/focal/).
2. A VNC client (tested with [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/)).

### Setup instructions

1. Set up the TurtleBot3 robot by referring to the [official instructions](https://emanual.robotis.com/docs/en/platform/turtlebot3/quick-start/) (we tested with ROS 2 Foxy). The exact ROS 2 packages for TurtleBot3 that we used are available [here](https://github.com/Tinker-Twins/TurtleBot3/tree/ROS2-Foxy). Note that LIDAR is **not** required for this project, so any hardware or software setup pertaining to the LIDAR can be skipped. If you have a pre-assembled robot, you must dismantle the LIDAR unit (the USB2LDS interface board and related software packages may be left untouched, since their presence or absence will not affect this project). Verify that you can remote-SSH into the robot and teleoperate it from a remote PC.

2. Additional physical assembly includes mounting the Jetson Orin Nano Developer Kit (with PCIe SSD installed) and the RealSense D435i depth camera module (flashed with firmware 5.13.0.50) on the top "waffle plate" of the robot — connect the camera to the Jetson using a USB A-C cable. A battery pack rated 9–24 V capable of delivering 15 W continuously to the Orin Nano (we used an 11.1 V 5000 mAh LiPo) should be assembled between the first (base) and second waffle plates and hooked up to the input of a DC-DC buck converter (we used a 12 V 10 A adjustable CC-CV buck converter) mounted on the second waffle plate beside the TurtleBot3 SBC (a Raspberry Pi), to ensure stable power delivery. The buck converter output (9–20 V) connects to the female barrel DC jack on the Jetson Orin Nano.

3. Flash the Jetson Orin Nano Developer Kit's SD card using the [conventional image method](https://developer.nvidia.com/embedded/learn/get-started-jetson-orin-nano-devkit#write) or the [SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html). We were successful with the SD card method, so the remainder of this article follows that approach (also available [here](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/docs/tutorial-realsense.md)).

4. Once the board boots and functions properly, set up the SSD as optional storage as instructed [here](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Common/blob/main/docs/dev-env-setup_jetson.md).

5. Set up the Isaac ROS development environment as described [here](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common/blob/main/docs/dev-env-setup.md).

6. Install Isaac ROS Nvblox as instructed [here](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/README.md#quickstart).

7. Perform the Isaac ROS RealSense setup as indicated [here](https://github.com/NVIDIA-ISAAC-ROS/.github/blob/main/profile/realsense-setup.md).

8. Download and install [Isaac ROS Visual SLAM](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam.git) and [Isaac ROS NITROS](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_nitros), as mentioned [here](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/docs/tutorial-realsense.md#installing-the-dependencies).

### Manual teleoperation

![Manual scene reconstruction schematic](/images/blog/nvblox-manual-schematic.jpg)
*Manual scene reconstruction schematic*

1. Turn the TurtleBot3 on and boot the Jetson Orin Nano and remote PC.

2. Open a terminal on the remote PC, remote-SSH into the TurtleBot3 SBC, export the TurtleBot3 model as an environment variable and bring up the necessary nodes:

```bash
user@remotepc:~$ sudo ssh <username>@<ip.address.of.turtlebot3>
user@turtlebot:~$ export TURTLEBOT3_MODEL=burger
user@turtlebot:~$ ros2 launch turtlebot3_bringup robot.launch.py
```

3. Open another terminal, remote-SSH into the SBC and launch the teleoperation node (this terminal window must stay actively selected for teleoperation to work):

```bash
user@remotepc:~$ sudo ssh <username>@<ip.address.of.turtlebot3>
user@turtlebot:~$ ros2 run turtlebot3_teleop teleop_keyboard
```

4. Use a VNC client to connect to the VNC server running on the Jetson Orin Nano.

5. Launch the Docker container using the `run_dev.sh` script — the `ISAAC_ROS_WS` environment variable takes care of the correct path depending on the SD card or SSD setup. This step requires internet access to build and launch the container properly:

```bash
user@jetson:~$ cd ${ISAAC_ROS_WS}/src/isaac_ros_common && ./scripts/run_dev.sh ${ISAAC_ROS_WS}
```

6. Inside the container, build and source the workspace:

```bash
user@docker:~$ cd /workspaces/isaac_ros-dev && colcon build --symlink-install && source install/setup.bash
```

7. Launch `realsense_example` to begin real-time 3D scene reconstruction:

```bash
user@docker:~$ ros2 launch nvblox_examples_bringup realsense_example.launch.py
```

Teleoperate the robot to move around and reconstruct its surroundings. The following video shows an end-to-end demonstration of the robot performing real-time 3D scene reconstruction while being remotely teleoperated.

<div class="vfig"><div class="vfig__frame" style="padding-top:56.25%;position:relative">
<iframe src="https://www.youtube.com/embed/gJK9tjimwgc" title="Teleoperated 3D scene reconstruction on TurtleBot3" style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe>
</div></div>

### Autonomous navigation

![Autonomous scene reconstruction schematic](/images/blog/nvblox-autonomous-schematic.jpg)
*Autonomous scene reconstruction schematic*

1. Turn the TurtleBot3 on and boot the Jetson Orin Nano and remote PC.

2. Open a terminal on the remote PC, remote-SSH into the TurtleBot3 SBC, export the TurtleBot3 model and the ROS domain ID, and bring up the necessary nodes:

```bash
user@remotepc:~$ sudo ssh <username>@<ip.address.of.turtlebot3>
user@turtlebot:~$ export TURTLEBOT3_MODEL=burger
user@turtlebot:~$ export ROS_DOMAIN_ID=22
user@turtlebot:~$ ros2 launch turtlebot3_bringup robot.launch.py
```

3. Use a VNC client to connect to the VNC server running on the Jetson Orin Nano.

4. Launch the Docker container using the `run_dev.sh` script:

```bash
user@jetson:~$ cd ${ISAAC_ROS_WS}/src/isaac_ros_common && ./scripts/run_dev.sh ${ISAAC_ROS_WS}
```

5. Inside the container, add the following files to the appropriate paths (these may be merged into the official repositories in future, but meanwhile these links will help):

- [`nvblox_examples/nvblox_examples_bringup/launch/realsense_nav2_example.launch.py`](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/nvblox_examples/nvblox_examples_bringup/launch/realsense_nav2_example.launch.py)
- [`nvblox_examples/nvblox_examples_bringup/launch/nav2/nav2_realsense.launch.py`](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/nvblox_examples/nvblox_examples_bringup/launch/nav2/nav2_realsense.launch.py)
- [`nvblox_examples/nvblox_examples_bringup/config/nav2/nav2_realsense.yaml`](https://github.com/Tinker-Twins/NVIDIA-Isaac-ROS-Nvblox/blob/main/nvblox_examples/nvblox_examples_bringup/config/nav2/nav2_realsense.yaml)

6. Build and source the workspace, and export the ROS domain ID (use the same ID as the TurtleBot3):

```bash
user@docker:~$ cd /workspaces/isaac_ros-dev && colcon build --symlink-install && source install/setup.bash
user@docker:~$ export ROS_DOMAIN_ID=22
```

7. Launch `realsense_nav2_example` to begin real-time 3D scene reconstruction in autonomous mode:

```bash
user@docker:~$ ros2 launch nvblox_examples_bringup realsense_nav2_example.launch.py
```

8. Click the `2D Goal Pose` button in RViz, then click to command a target position and drag the green arrow to control target orientation in the reconstructed cost map. The robot navigates to the goal autonomously while continuing to reconstruct the scene live.

The following video shows an end-to-end demonstration of the robot performing real-time 3D scene reconstruction while autonomously navigating its environment.

<div class="vfig"><div class="vfig__frame" style="padding-top:56.25%;position:relative">
<iframe src="https://www.youtube.com/embed/EDQiwWbjnws" title="Autonomous navigation with live 3D scene reconstruction" style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe>
</div></div>

**Acknowledgement:** Thanks to [Aditya Krovi](https://www.linkedin.com/in/adikrovi/), [Anish Ghana](https://www.linkedin.com/in/anish-ghana-890024288/), [Jacob Likins](https://www.linkedin.com/in/jacob-likins-2b815224b/) and [Andrew Ko](https://www.linkedin.com/in/andrew-ko-4b491b224/) — undergraduate interns in ARMLab who helped set up the VEX AI arena both in Isaac Sim and in the real world.

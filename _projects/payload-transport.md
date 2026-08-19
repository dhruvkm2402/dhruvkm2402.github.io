---
title: "Coordinated Payload Transport with Biped-Wheeled Robots"
order: 1
featured: true
badge: "ICRA 2025"
video: payload-transport
summary: "One reinforcement learning agent driving two balancing robots to carry a shared payload — trained in Isaac Lab, transferred to hardware with no fine-tuning."
lede: "Two robots, one payload, and a single policy that has to keep both of them upright while the load couples their dynamics together."
period: "2023 – 2025"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Lead author. Formulation, training, deployment and hardware experiments."
authors: "D. Mehta, A. Joglekar, V. Krovi"
venue: "IEEE ICRA 2025, Atlanta"
stack: ["Isaac Lab", "PyTorch", "ROS", "ONNX", "OptiTrack"]
code: "https://github.com/dhruvkm2402/Deep_Reinforcement_Learning_Multi_Robot_Payload_Transport"
paper: "/files/DualDiablo_CoordinatedPayload_Transport_ICRA2025_Final.pdf"
results:
  - value: "0.5 m"
    label: "zero-shot sim-to-real error range, no hardware fine-tuning"
  - value: "2 robots"
    label: "controlled by a single policy rather than one controller each"
  - value: "Minutes"
    label: "training time after moving to massively parallel simulation, down from hours"
---

## The problem

Carrying something together is harder than carrying it alone. Two biped-wheeled robots holding one
payload are no longer independent systems: every correction one makes shows up as a disturbance at
the other, and both are balancing on two wheels while it happens. The usual answer is a controller
per robot plus a coordination layer on top, which means three things to tune and three places for
the assumptions to break.

## What I built

A single deep reinforcement learning agent that observes both robots and outputs commands for both,
so coordination is learned rather than imposed. Training runs in Isaac Lab with thousands of
environments in parallel, which is what made the experiment loop tractable — the same study that
used to take hours per iteration came down to minutes, so I could actually explore policy
architectures instead of babysitting one run.

Most of the effort went into the parts that don't demo well: comparing network architectures for
training stability and sample efficiency, then system identification and domain randomization to
make the simulator resemble the robots I actually had.

{% include video.html src="payload-transport" caption="Trained policy driving both robots along a path with the payload coupled between them." %}

## Getting it onto hardware

The trained policy was exported to ONNX and run inside a ROS stack, with an OptiTrack motion
capture system providing pose feedback. It transferred zero-shot — the policy that ran on the
robots is the policy that came out of simulation, with tracking error staying within a 0.5 m range
across terrains.

That number is the one I care about. It says the simulator was honest enough about friction,
actuation and payload coupling that the policy didn't need the real world to teach it anything new.

## Where it landed

Accepted at the 2025 IEEE International Conference on Robotics and Automation in Atlanta —
robotics' flagship venue — and published in the proceedings (pp. 14992–14998).

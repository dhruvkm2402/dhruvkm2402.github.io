---
title: "Kinematic Model Verification for a Unitree Go1"
order: 8
video: quadruped-kinematics
summary: "A Denavit-Hartenberg model of the Go1's legs, checked against hardware data instead of assumed correct, agreeing to the order of 10⁻²."
lede: "Every learned controller sits on top of a model of the robot. This is the unglamorous work of confirming that model matches the machine."
period: "2022"
where: "ARM Lab, Clemson University (CU-ICAR)"
role: "Sole contributor."
stack: ["Denavit-Hartenberg", "Unitree Go1", "Python", "MATLAB"]
code: "https://github.com/dhruvkm2402/Quadruped_Locomotion_Kinematic_ModelVerification-"
paper: "/files/KinematicModelVerification.pdf"
results:
  - value: "10⁻²"
    label: "order of agreement between analytical model and hardware data"
---

## Why do this at all

Analytical formulations get written once and trusted forever. But a kinematic model is a claim
about a physical object, and claims should be checked, especially when everything downstream, from
state estimation to a learned locomotion policy, inherits whatever error it contains.

## What I did

Derived a Denavit-Hartenberg parameter kinematic model for the Unitree Go1 quadruped, then verified
it against data recorded from the actual hardware rather than against a second simulation. Agreement
came out on the order of 10⁻², which was good enough to build on with confidence.

{% include video.html src="quadruped-kinematics" caption="Go1 locomotion runs used to collect the hardware data the model was checked against." %}

The write-up and the code are both linked above. It's a small piece of work, but it's the kind of
verification step that quietly prevents a much more confusing debugging session later.

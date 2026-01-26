---
layout: page
title: Interpretable Switching State-Space Models for Hippocampal Replay
description: Characterizing spatiotemporal structure of sharp-wave ripple replay with drift–diffusion dynamics
img:
importance: 1
category: PI
giscus_comments: false
---

**Lab:** Xue-Xin Wei Lab, Department of Neuroscience, The University of Texas at Austin<br>
**Theme:** Geometry & dynamics of population codes during hippocampal replay (SWRs)

## Overview
During hippocampal sharp-wave ripples (SWRs), neural activity can “replay” spatial trajectories. A major challenge is that replay structure is often **heterogeneous within an event** and hard to capture with single summary metrics or purely post-hoc analyses of decoded posteriors.

## What I’m building
A **switching hidden Markov model (HMM)** that infers (i) a latent 1D position trajectory and (ii) the **time-varying dynamics regime** within each SWR:
- **Dynamics regimes:** drift–diffusion, stationary, and uniform resampling
- **Interpretable parameters:** drift (replay speed) and diffusion (trajectory precision)
- **Observation model:** Poisson spiking driven by place fields (event-level decoding)

## Why it matters
This framework provides **event-level, probabilistic** characterization of replay beyond classic pipelines (decode then score), enabling:
- principled detection of within-event **switches** in dynamics,
- quantification of replay **speed** and **precision** across events and sessions,
- rigorous comparison of replay vs. preplay using multiple shuffle controls.

## Methods & validation
- Maximum-likelihood fitting via marginal likelihood (forward pass over joint dynamics × position chain)
- Posterior inference via forward–backward to obtain:
  - **position posterior** and **dynamics posterior**
- Model comparison with **AIC** to adjudicate among candidate dynamics models
- Extensive simulation-based recovery analyses to quantify parameter reliability at low spike counts

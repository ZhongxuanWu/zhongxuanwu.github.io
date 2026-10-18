---
page_id: hippocampal_replay
layout: page
title: Statistical Models of Hippocampal Replay
description: Characterizing how replayed spatial trajectories change within hippocampal sharp-wave ripple events
img:
importance: 1
category: PI
giscus_comments: false
---

**Lab:** Xue-Xin Wei Lab, Department of Neuroscience, The University of Texas at Austin<br>
**Theme:** Geometry and dynamics of neural population activity during hippocampal replay

## Overview
During hippocampal sharp-wave ripples (SWRs), neural activity can replay paths through space. The structure of this activity can **change within a single event**, making it difficult to describe with one summary measure. I study these changes using an interpretable statistical model that jointly estimates the represented position and how it evolves over time.

## Model
The **switching hidden Markov model (HMM)** estimates a one-dimensional position trajectory and the **type of dynamics at each time point** within an SWR:
- **Dynamics regimes:** drift–diffusion, a stationary position, and uniform resampling of position.
- **Interpretable parameters:** drift describes replay speed, while diffusion describes variability in the trajectory and is related to its precision.
- **Observation model:** a Poisson model of neural firing based on place fields, used to estimate the represented position from the recorded spikes.

## Scientific purpose
The framework characterizes replay **probabilistically within individual events**, rather than estimating position first and assessing its trajectory separately. It supports:
- identifying **switches between dynamics regimes** within an event;
- quantifying replay **speed** and **precision** across events and recording sessions;
- comparing replay and preplay using multiple shuffled-data controls.

## Methods and validation
- Estimate parameters by maximizing the marginal likelihood, evaluated with a forward pass over the joint dynamics–position state sequence.
- Use forward–backward inference to obtain **posterior probability distributions over position and dynamics** at each time point.
- Compare candidate dynamics models using the **Akaike information criterion (AIC)**.
- Use simulation-based parameter recovery to assess the reliability of estimates when few spikes are recorded.

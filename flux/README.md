# FLUX — a field you can disturb
A static browser experiment at `/flux/`. Serve this directory over HTTP; there is no build step. Canvas 2D renders a perspective projection. JavaScript modules have no package dependencies.

## Wave instrument
The default view solves a damped, linear 2D wave equation on a 61×61 or 81×81 grid. A fixed 1/120-second step with a 24-cell/second propagation speed keeps the update within the scheme's stability range. Edge samples reflect (zero normal derivative). Plucks have zero mean displacement to avoid accumulating a DC offset. Held sources prescribe a sinusoidal displacement over a small region. The display exaggerates height by 1.5×; brightness represents a visual combination of local velocity and slope, not a calibrated energy unit.

Tap the field to pluck; hold to drive. Enable two sources to explore interference, and tune frequency/damping. Select Orbit to rotate, scroll/pinch to zoom. The camera remains still after manipulation. Enter field minimizes surrounding text. Setup links preserve form, camera, tuning, source toggle and immersive mode, not exact simulation history.

The remaining views are mathematical sculptures: a precomputed Lorenz trajectory, a torus, and a double helix. They are not live physical models.

Canvas keyboard controls: arrows orbit, +/− zoom, R sends a ripple, Space pauses. Reduced motion starts paused; explicit ripple actions produce still previews. Paused, settled views do not continuously render. Short landscape windows scroll to preserve controls. PNG capture is local.

Run `node flux/wave.test.mjs` from the repository root to check propagation, damping, driven stability at slider extremes, and linear superposition. Browser checks cover pointer input, control state, setup restoration, mobile layout, paused previews and capture.

Fonts: DM Sans and Space Grotesk from Google Fonts, with system fallbacks.

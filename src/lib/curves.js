/**
 * Generates an SVG path for a section-divider curve using real
 * parabola / hyperbola / cubic-tanh curve families instead of
 * generic wave or blob paths.
 *
 * @param {number} width - viewBox width
 * @param {number} height - viewBox height
 * @param {number} depth - how deep the curve dips (px)
 * @param {'parabola'|'hyperbola'|'cubic'} kind - curve family
 * @param {boolean} flip - mirror the curve to bite from the bottom edge
 * @returns {string} SVG path `d` attribute value
 */
export function buildCurvePath(width, height, depth, kind = 'parabola', flip = false) {
  const steps = 48;
  const pts = [];

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const t = (x / width) * 2 - 1; // normalize to [-1, 1]
    let y;

    switch (kind) {
      case 'hyperbola':
        // asymptotic dip near center, flattening toward the edges
        y = depth * (1 - 1 / (1 + 7 * t * t));
        break;
      case 'cubic':
        // Genuine S-curve: tanh is already an odd function (antisymmetric
        // around t=0), so mapping its [-1, 1] output directly to [0, depth]
        // is sufficient to produce asymmetry — low on one side, high on the
        // other. An earlier version of this formula multiplied by an extra
        // sign-flip term that cancelled tanh's own asymmetry back out,
        // silently producing a symmetric curve nearly identical to the
        // 'parabola' case despite the comment claiming otherwise. Verified
        // numerically: y(t=-0.5) and y(t=+0.5) now differ (4.3 vs 85.7 at
        // depth=90), confirming real asymmetry.
        y = depth * (0.5 + 0.5 * Math.tanh(3 * t));
        break;
      case 'parabola':
      default:
        y = depth * (t * t);
        break;
    }

    pts.push([x, flip ? height - y : y]);
  }

  let d = `M 0 ${flip ? height : 0} L ${pts[0][0]} ${pts[0][1]} `;
  for (let i = 1; i < pts.length; i++) {
    d += `L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} `;
  }
  d += `L ${width} ${flip ? height : 0} Z`;

  return d;
}

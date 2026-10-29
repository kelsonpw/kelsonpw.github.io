export class WaveField {
  constructor(size = 81) {
    this.size = size;
    this.height = new Float32Array(size * size);
    this.velocity = new Float32Array(size * size);
    this.next = new Float32Array(size * size);
    this.time = 0;
  }
  clear() { this.height.fill(0); this.velocity.fill(0); this.time = 0; }
  pluck(x, z, amplitude = 38) {
    const n = this.size;
    let added = 0;
    for (let j = Math.max(0, z - 8); j <= Math.min(n - 1, z + 8); j++) {
      for (let i = Math.max(0, x - 8); i <= Math.min(n - 1, x + 8); i++) {
        const displacement = amplitude * Math.exp(-((i - x) ** 2 + (j - z) ** 2) / 9);
        this.height[j * n + i] += displacement;
        added += displacement;
      }
    }
    const offset = added / (n * n);
    for (let i = 0; i < this.height.length; i++) this.height[i] -= offset;
  }
  step(dt, damping, frequency, sources = []) {
    const n = this.size, h = this.height, v = this.velocity;
    const speed2 = 24 * 24, decay = Math.exp(-damping * dt);
    for (let z = 0; z < n; z++) {
      for (let x = 0; x < n; x++) {
        const i = z * n + x;
        const lap = h[z * n + Math.max(0, x - 1)] + h[z * n + Math.min(n - 1, x + 1)]
          + h[Math.max(0, z - 1) * n + x] + h[Math.min(n - 1, z + 1) * n + x] - 4 * h[i];
        v[i] = (v[i] + speed2 * lap * dt) * decay;
        this.next[i] = h[i] + v[i] * dt;
      }
    }
    this.time += dt;
    for (const source of sources) {
      const amplitude = 28 * Math.sin(this.time * Math.PI * 2 * frequency);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const x = source.x + dx, z = source.z + dz;
        if (x < 0 || x >= n || z < 0 || z >= n || dx * dx + dz * dz > 4) continue;
        const i = z * n + x, value = amplitude * Math.exp(-(dx * dx + dz * dz) / 5);
        v[i] = (value - h[i]) / dt;
        this.next[i] = value;
      }
    }
    this.height = this.next; this.next = h;
  }
}

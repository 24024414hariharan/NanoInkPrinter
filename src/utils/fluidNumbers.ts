export function calculateOhReWe(ink: any, nozzle: any) {
    const mu = ink.viscosity_mPas / 1000;
    const sigma = ink.surfaceTension_Npm;
    const rho = ink.density_kgpm3;
    const D = nozzle.diameter_um * 1e-6;
  
    const capillaryVelocity = Math.sqrt(sigma / (rho * D));
    const Re = (rho * capillaryVelocity * D) / mu;
    const We = (rho * D * Math.pow(capillaryVelocity, 2)) / sigma;
    const Oh = mu / Math.sqrt(rho * sigma * D);
  
    return {
      ohnesorge: Number(Oh.toFixed(2)),
      reynolds: Number(Re.toFixed(2)),
      weber: Number(We.toFixed(2)),
      warnings: [
        ...(Oh < 0.1 ? ['⚠️ Risk of satellite droplets (Oh < 0.1)'] : []),
        ...(Oh > 1 ? ['⚠️ Too viscous for stable droplets (Oh > 1)'] : []),
        ...(Re < 10 ? ['⚠️ Re < 10 → Weak inertia'] : [])
      ]
    };
  }
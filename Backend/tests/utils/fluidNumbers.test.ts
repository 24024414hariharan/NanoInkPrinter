import { calculateOhReWe } from '../../src/utils/fluidNumbers';

describe('calculateOhReWe', () => {
    it('should correctly calculate Oh, Re, We with no warnings', () => {
      const ink = {
        viscosity_mPas: 5,
        surfaceTension_Npm: 0.035,
        density_kgpm3: 1000
      };
  
      const nozzle = {
        diameter_um: 80
      };
  
      const result = calculateOhReWe(ink, nozzle);
  
      expect(result.ohnesorge).toBeLessThan(1);
      expect(result.ohnesorge).toBeGreaterThan(0.08);
      expect(result.reynolds).toBeGreaterThan(10);
      expect(result.weber).toBeGreaterThanOrEqual(1);
      expect(result.warnings).toEqual(["⚠️ Risk of satellite droplets (Oh < 0.1)"]);
    });
  
    it('should warn if Oh < 0.1', () => {
      const ink = {
        viscosity_mPas: 2,
        surfaceTension_Npm: 0.035,
        density_kgpm3: 1000
      };
  
      const nozzle = {
        diameter_um: 50
      };
  
      const result = calculateOhReWe(ink, nozzle);
  
      expect(result.ohnesorge).toBeLessThan(0.1);
      expect(result.warnings).toContain('⚠️ Risk of satellite droplets (Oh < 0.1)');
    });
  
    it('should warn if Oh > 1', () => {
      const ink = {
        viscosity_mPas: 150,
        surfaceTension_Npm: 0.02,
        density_kgpm3: 1000
      };
  
      const nozzle = {
        diameter_um: 10
      };
  
      const result = calculateOhReWe(ink, nozzle);
  
      expect(result.ohnesorge).toBeGreaterThan(1);
      expect(result.warnings).toContain('⚠️ Too viscous for stable droplets (Oh > 1)');
    });
  
    it('should warn if Re < 10', () => {
      const ink = {
        viscosity_mPas: 100,
        surfaceTension_Npm: 0.02,
        density_kgpm3: 1000
      };
  
      const nozzle = {
        diameter_um: 10
      };
  
      const result = calculateOhReWe(ink, nozzle);
  
      expect(result.reynolds).toBeLessThan(10);
      expect(result.warnings).toContain('⚠️ Re < 10 → Weak inertia');
    });
  
    it('should return multiple warnings if Oh > 1 and Re < 10', () => {
      const ink = {
        viscosity_mPas: 180,
        surfaceTension_Npm: 0.02,
        density_kgpm3: 1000
      };
  
      const nozzle = {
        diameter_um: 5
      };
  
      const result = calculateOhReWe(ink, nozzle);
  
      expect(result.ohnesorge).toBeGreaterThan(1);
      expect(result.reynolds).toBeLessThan(10);
      expect(result.warnings).toEqual(
        expect.arrayContaining([
          '⚠️ Too viscous for stable droplets (Oh > 1)',
          '⚠️ Re < 10 → Weak inertia'
        ])
      );
    });
  });
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Recommend.css';

const Recommend: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inkProperties: {
      viscosity_mPas: '',
      surfaceTension_Npm: '',
      density_kgpm3: '',
      suppressSatellite: false,
    },
    nozzle: {
      diameter_um: '',
      length_mm: '',
      temperature_C: '',
    },
    desiredDroplet: {
      size_um: '',
      velocity_mps: '',
      breakOffTime_us: '',
    },
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    group: keyof typeof form
  ) => {
    setForm({
      ...form,
      [group]: {
        ...form[group],
        [e.target.name]:
          e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.type === 'number'
              ? parseFloat(e.target.value)
              : e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/recommend`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Redirect to result page with data
      navigate('/recommend/result', {
        state: {
          result: res.data,
          inkProperties: form.inkProperties,
          nozzle: form.nozzle,
          desiredDroplet: form.desiredDroplet,
        }
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Recommendation failed.');
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    padding: '0rem !important'
  };

  return (
    <div className="recommend-background" style={backgroundStyle}>
      <div className="recommend-glass">
        <h2 className="recommend-title">Inkjet Recommendation</h2>
        <form onSubmit={handleSubmit} className="recommend-form">
          {/* Ink Properties */}
          <h4>Ink Properties</h4>
          <div className="recommend-row">
            <input
              className="recommend-input"
              name="viscosity_mPas"
              placeholder="Viscosity (mPa·s)"
              onChange={(e) => handleInputChange(e, 'inkProperties')}
            />
            <input
              className="recommend-input"
              name="surfaceTension_Npm"
              placeholder="Surface Tension (N/m)"
              onChange={(e) => handleInputChange(e, 'inkProperties')}
            />
            <input
              className="recommend-input"
              name="density_kgpm3"
              placeholder="Density (kg/m³)"
              onChange={(e) => handleInputChange(e, 'inkProperties')}
            />
          </div>
          <label style={{ color: '#fff', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              name="suppressSatellite"
              onChange={(e) => handleInputChange(e, 'inkProperties')}
            />{' '}
            Suppress Satellite
          </label>

          {/* Nozzle */}
          <h4>Nozzle</h4>
          <div className="recommend-row">
            <input
              className="recommend-input"
              name="diameter_um"
              placeholder="Diameter (µm)"
              onChange={(e) => handleInputChange(e, 'nozzle')}
            />
            <input
              className="recommend-input"
              name="length_mm"
              placeholder="Length (mm)"
              onChange={(e) => handleInputChange(e, 'nozzle')}
            />
            <input
              className="recommend-input"
              name="temperature_C"
              placeholder="Temperature (°C)"
              onChange={(e) => handleInputChange(e, 'nozzle')}
            />
          </div>

          {/* Desired Droplet */}
          <h4>Desired Droplet</h4>
          <div className="recommend-row">
            <input
              className="recommend-input"
              name="size_um"
              placeholder="Size (µm)"
              onChange={(e) => handleInputChange(e, 'desiredDroplet')}
            />
            <input
              className="recommend-input"
              name="velocity_mps"
              placeholder="Velocity (m/s)"
              onChange={(e) => handleInputChange(e, 'desiredDroplet')}
            />
            <input
              className="recommend-input"
              name="breakOffTime_us"
              placeholder="Break-off Time (µs)"
              onChange={(e) => handleInputChange(e, 'desiredDroplet')}
            />
          </div>

          {error && <p className="recommend-error">{error}</p>}
          <button type="submit">
            {loading ? 'Submitting...' : 'Generate Recommendation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recommend;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export const WaveformChart = ({ waveformParams }: { waveformParams: any }) => {
  const {
    riseTime_us = 5,
    dwellTime_us = 2.5,
    fallTime_us = 5,
    recoveryTime_us = 10,
    peakPressure_Pa = 70000,
    negativePeakPressure_Pa = -15000,
  } = waveformParams;

  const dataPoints = [
    { x: 0, y: 0 },
    { x: riseTime_us, y: peakPressure_Pa },
    { x: riseTime_us + dwellTime_us, y: peakPressure_Pa },
    { x: riseTime_us + dwellTime_us + fallTime_us, y: negativePeakPressure_Pa },
    { x: riseTime_us + dwellTime_us + fallTime_us + recoveryTime_us, y: 0 },
  ];

  const data = {
    labels: dataPoints.map((p) => p.x.toFixed(1)),
    datasets: [
      {
        label: "Pressure (Pa)",
        data: dataPoints.map((p) => p.y),
        fill: true,
        borderColor: "#1882f7",
        backgroundColor: "rgba(24,130,247,0.08)",
        tension: 0.4,
      },
    ],
  };

  return (
    console.log(waveformParams),
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
      <h4 style={{ textAlign: "center", color: "#0057b8" }}>Initial Waveform Shape</h4>
      <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

// frontend/src/components/dashboard/Charts.jsx

import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PieChart = ({ data }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2">
    <Pie data={data} />
  </div>
);

export const BarChart = ({ data }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2">
    <Bar data={data} />
  </div>
);

export const LineChart = ({ data }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2">
    <Line data={data} />
  </div>
);

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../api/api';

const Dashboard = () => {
  const [salesSummary, setSalesSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get('/dashboard/sales-summary');
        setSalesSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch sales summary', err);
      }
    }
    fetchSummary();
  }, []);

  if (!salesSummary) return <div>Loading...</div>;

  const data = {
    labels: ['Normal Sales', 'Exchange Sales'],
    datasets: [{
      data: [salesSummary.normalCount, salesSummary.exchangeCount],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales Summary</h1>
      <Pie data={data} />
      <p>Normal Sales: {salesSummary.normalCount}</p>
      <p>Exchange Sales: {salesSummary.exchangeCount}</p>
    </div>
  );
};

export default Dashboard;

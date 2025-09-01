import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const dashboardData = {
    totalAssets: 1250,
    totalArea: 15000,
    yardipAssets: 85,
    chartData: {
      labels: [
        "Korem 071",
        "Korem 072",
        "Korem 073",
        "Korem 074",
        "Kodim 0733/KS",
      ],
      datasets: [
        {
          label: "Jumlah Aset",
          data: [300, 280, 350, 250, 70],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribusi Aset per Korem/Kodim",
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Aset Kodam IV/Dip
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Total Aset Kodam IV/Dip</h3>
          <p className="text-3xl font-bold">
            {dashboardData.totalAssets.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Total Luas Aset (M²)</h3>
          <p className="text-3xl font-bold">
            {dashboardData.totalArea.toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">
            Aset Yayasan Rumpun Diponegoro
          </h3>
          <p className="text-3xl font-bold">{dashboardData.yardipAssets}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Bar data={dashboardData.chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;

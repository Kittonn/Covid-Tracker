import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "../../store/atkTestSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AtkTestChart = () => {
  const dispatch = useDispatch();
  const gettest = useSelector((state) => state.atktest.list);

  useEffect(() => {
    dispatch(getTest());
  }, [dispatch]);
  const data = {
    labels: gettest.map((item) => item.date),
    datasets: [
      {
        label: "จำนวนการตรวจเชื้อ",
        data: gettest.map((item) => item.tests),
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgb(75, 192, 192)"],
        borderWidth: 1,
      },
      {
        label: "Positive",
        data: gettest.map((item) => item.positive),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "กราฟแสดงจำนวนการตรวจหาเชื้อ Covid-19",
        font: {
          size: 22,
          family: "Kanit",
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Kanit",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 7,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="font-[Poppins] h-[300px] md:h-[400px] lg:h-[480px]">
      <Bar data={data} height={150} options={options} />
    </div>
  );
};

export default AtkTestChart;

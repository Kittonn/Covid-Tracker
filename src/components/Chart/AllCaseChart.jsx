import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
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
import { getAllDay } from "../../store/alldayCaseSlice";
import { options } from "./options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AllCaseChart = () => {
  const allDay = useSelector((state) => state.allday.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDay());
  }, [dispatch]);

  const data = {
    labels: allDay.map((item) => item.date),
    datasets: [
      {
        label: "ผู้ติดเชือใหม่",
        data: allDay.map((item) => item.NewConfirmed),
        backgroundColor: ["rgba(255,99,132,0.6)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="font-[Poppins]">
      <div className="w-[90%] lg:w-[80%] xl:w-[60%] mx-auto">
        <Line data={data} height={150} options={options} />
      </div>
    </div>
  );
};

export default AllCaseChart;

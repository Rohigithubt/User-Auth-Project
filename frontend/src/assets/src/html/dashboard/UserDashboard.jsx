import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

import { useAuthStore } from "../layouts/store/authStore";

const UserDashboard = () => {
  const { taskIndex } = useAuthStore();

  const [cards, setCards] = useState([
    { title: "Total Tasks", value: 0, color: "#4e73df" },
    { title: "Completed", value: 0, color: "#1cc88a" },
    { title: "Pending", value: 0, color: "#f6c23e" },
    { title: "Working", value: 0, color: "#36b9cc" },
    { title: "Holding", value: 0, color: "#e74a3b" },
  ]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const createdBy = localStorage.getItem("createdBy");
        const userId = localStorage.getItem("userId");

        const response = await taskIndex(createdBy);

        if (response?.status) {
          const tasks = response.data;
          const assignedTasks = tasks.filter(task => task.AssignedUserId === userId);

          const total = assignedTasks.length;
          let completed = 0, pending = 0, working = 0, holding = 0;

          assignedTasks.forEach(task => {
            if (task.workStatus === "Completed") completed++;
            else if (task.workStatus === "Pending") pending++;
            else if (task.workStatus === "Working") working++;
            else if (task.workStatus === "Hold") holding++;
          });

          const updatedCards = [
            { title: "Total Tasks", value: total, color: "#4e73df" },
            { title: "Completed", value: completed, color: "#1cc88a" },
            { title: "Pending", value: pending, color: "#f6c23e" },
            { title: "Working", value: working, color: "#36b9cc" },
            { title: "Holding", value: holding, color: "#e74a3b" },
          ];

          setCards(updatedCards);

          setChartData([
            { name: "Total", value: total },
            { name: "Completed", value: completed },
            { name: "Pending", value: pending },
            { name: "Working", value: working },
            { name: "Hold", value: holding },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [taskIndex]);

  const barColors = ["#4e73df", "#1cc88a", "#f6c23e", "#36b9cc", "#e74a3b"];

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-6 col-xl-2" key={index}>
              <div className="card" style={{ backgroundColor: card.color, color: "#fff" }}>
                <div className="card-body">
                  <h6 className="mb-2 f-w-400 text-light">{card.title}</h6>
                  <h4 className="mb-0">{card.value}</h4>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 mt-4">
            <div className="card">
              <div className="card-body">
                <h5>Task Status Overview</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuthStore } from "../layouts/store/authStore";

const Dashboard = () => {
  const { taskIndex, index } = useAuthStore();

  const cardColors = [
    "#4e73df", "#1cc88a", "#f6c23e", "#36b9cc",
    "#e74a3b", "#fd7e14", "#20c997", "#6f42c1"
  ];

  const pieColors = ["#4e73df", "#1cc88a", "#f6c23e"];
  const barColors = ["#4e73df", "#1cc88a", "#f6c23e", "#36b9cc", "#e74a3b"];

  const [cards, setCards] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userPieData, setUserPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await index(userId);
        const users = response.data.filter((user) => user.createdBy == userId);

        const totalUsers = users.length;
        const activeUsers = users.filter(user => user.userstatus === true).length;
        const inactiveUsers = totalUsers - activeUsers;

        const taskresponse = await taskIndex(userId);
        const tasks = taskresponse.data;

        const totalTasks = tasks.length;
        const completed = tasks.filter(task => task.workStatus === "Completed").length;
        const pending = tasks.filter(task => task.workStatus === "Pending").length;
        const working = tasks.filter(task => task.workStatus === "Working").length;
        const holding = tasks.filter(task => task.workStatus === "Hold").length;

        setCards([
          { title: "Total Users", value: totalUsers },
          { title: "Active Users", value: activeUsers },
          { title: "Inactive Users", value: inactiveUsers },
          { title: "Total Tasks", value: totalTasks },
          { title: "Total Completed Task", value: completed },
          { title: "Total Pending Task", value: pending },
          { title: "Total Working Task", value: working },
          { title: "Total Hold Task", value: holding },
        ]);

        setChartData([
          { name: "Total Task", value: totalTasks },
          { name: "Completed", value: completed },
          { name: "Pending", value: pending },
          { name: "Working", value: working },
          { name: "Hold", value: holding },
        ]);

        setUserPieData([
          { name: "Total Users", value: totalUsers },
          { name: "Active Users", value: activeUsers },
          { name: "Inactive Users", value: inactiveUsers },
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [taskIndex]);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-6 col-xl-4" key={index}>
              <div className="card" style={{ backgroundColor: cardColors[index % cardColors.length], color: "#fff" }}>
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
                <h5>Task & User Overview</h5>
                <div className="row">
                  <div className="col-md-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value">
                          {chartData.map((entry, index) => (
                            <Cell key={`bar-${index}`} fill={barColors[index % barColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="col-md-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={userPieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {userPieData.map((entry, index) => (
                            <Cell key={`pie-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Dashboard;

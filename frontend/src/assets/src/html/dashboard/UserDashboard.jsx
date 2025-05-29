import React, { useEffect, useState } from "react";
import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend, ResponsiveContainer,} from "recharts";

import { useAuthStore } from "../layouts/store/authStore";

const UserDashboard = () => {
  const { taskIndex } = useAuthStore();
  
  const [cards, setCards] = useState([
    { title: "Total Tasks", value: 0},
    { title: "Completed", value: 0 },
    { title: "Pending", value: 0 },
    { title: "Working", value: 0 },
    { title: "Holding", value: 0 },
  ]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("createdBy");
        console.log(userId,"uesrsss");
        
        const response = await taskIndex(userId);
        

        if (response?.status) {
          const tasks = response.data;

          const total = tasks.length;
          const completed = tasks.filter((t) => t.workStatus === "Completed").length;
          const pending = tasks.filter((t) => t.workStatus === "Pending").length;
          const working = tasks.filter((t) => t.workStatus === "Working").length;
          const holding = tasks.filter((t) => t.workStatus === "Hold").length;

          setCards([
            { title: "Total Tasks", value: total },
            { title: "Completed", value: completed },
            { title: "Pending", value: pending },
            { title: "Working", value: working },
            { title: "Holding", value: holding },
          ]);

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

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-2 f-w-400 text-muted">{card.title}</h6>
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
                    <Bar dataKey="value" fill="#5e72e4" />
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

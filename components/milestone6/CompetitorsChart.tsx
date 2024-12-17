"use client";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const competitorsData = [
  {
    name: "LifeBox",
    value: 35,
  },
  {
    name: "FitFood",
    value: 20,
  },
  {
    name: "Freshful by eMAG",
    value: 15,
  },
  {
    name: "Altele",
    value: 30,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CompetitorsPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Legend verticalAlign="top" />
        <Pie
          data={competitorsData}
          dataKey="value"
          nameKey="name"
          label
          fill="#8884d8"
        >
          {competitorsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CompetitorsPieChart;

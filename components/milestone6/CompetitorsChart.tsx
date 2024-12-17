"use client";

import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CompetitorData {
  name: string;
  value: number;
}

const competitorsData: CompetitorData[] = [
  { name: "LifeBox", value: 35 },
  { name: "FitFood", value: 20 },
  { name: "Freshful by eMAG", value: 15 },
  { name: "Altele", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CompetitorsPieChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Cota de piață a competitorilor</CardTitle>
        <CardDescription>
          Distribuția cotei de piață între principalii competitori
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={competitorsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {competitorsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  opacity={activeIndex === index ? 0.8 : 1}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span
                  style={{
                    color:
                      COLORS[
                        competitorsData.findIndex(
                          (item) => item.name === value,
                        ) % COLORS.length
                      ],
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CompetitorsPieChart;

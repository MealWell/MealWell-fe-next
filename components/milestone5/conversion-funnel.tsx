"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Intrare pagină", value: 89 },
  { name: "Trimitere formular", value: 21 },
];

const stats = [
  { name: "Intrări", value: 89 },
  { name: "Convertiți", value: 21 },
  { name: "Abandonați", value: 68 },
  { name: "Rată de conversie", value: "23.60%" },
  { name: "Timp median", value: "28s" },
];

export default function ConversionFunnelChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>
          De la intrarea în pagină la trimiterea formularului cu succes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Utilizatori",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" />
          </BarChart>
        </ChartContainer>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-muted p-2 rounded-md">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </p>
              <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

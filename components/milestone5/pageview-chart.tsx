"use client";

import { Line, LineChart, XAxis, YAxis, Legend } from "recharts";
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
  { date: "3-Dec-2024", whatsapp: 0, instagram: 0, google: 0, facebook: 0 },
  { date: "4-Dec-2024", whatsapp: 0, instagram: 0, google: 0, facebook: 0 },
  { date: "5-Dec-2024", whatsapp: 0, instagram: 0, google: 0, facebook: 0 },
  { date: "6-Dec-2024", whatsapp: 0, instagram: 0, google: 0, facebook: 0 },
  { date: "7-Dec-2024", whatsapp: 0, instagram: 0, google: 0, facebook: 0 },
  { date: "8-Dec-2024", whatsapp: 5, instagram: 5, google: 1, facebook: 2 },
  { date: "9-Dec-2024", whatsapp: 59, instagram: 17, google: 1, facebook: 0 },
  { date: "10-Dec-2024", whatsapp: 36, instagram: 15, google: 0, facebook: 0 },
];

const channels = [
  { key: "whatsapp", label: "WhatsApp" },
  { key: "instagram", label: "Instagram" },
  { key: "google", label: "Google" },
  { key: "facebook", label: "Facebook" },
];

export default function PageviewChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Vizualizări de pagină per canal</CardTitle>
        <CardDescription>
          Numărul de vizualizări de pagină pentru fiecare canal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            whatsapp: {
              label: "WhatsApp",
              color: "hsl(var(--chart-1))",
            },
            instagram: {
              label: "Instagram",
              color: "hsl(var(--chart-2))",
            },
            google: {
              label: "Google",
              color: "hsl(var(--chart-3))",
            },
            facebook: {
              label: "Facebook",
              color: "hsl(var(--chart-4))",
            },
          }}
        >
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {channels.map((channel) => (
              <Line
                key={channel.key}
                type="monotone"
                dataKey={channel.key}
                stroke={`var(--color-${channel.key})`}
                name={channel.label}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client";

import { Bar, BarChart, XAxis, YAxis, Legend, Cell } from "recharts";
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

const rawData = [
  { date: "3-Dec-2024", whatsapp: 0, instagram: 0, google: 0, other: 0 },
  { date: "4-Dec-2024", whatsapp: 0, instagram: 0, google: 0, other: 0 },
  { date: "5-Dec-2024", whatsapp: 0, instagram: 0, google: 0, other: 0 },
  { date: "6-Dec-2024", whatsapp: 0, instagram: 0, google: 0, other: 0 },
  { date: "7-Dec-2024", whatsapp: 0, instagram: 0, google: 0, other: 0 },
  { date: "8-Dec-2024", whatsapp: 1, instagram: 0, google: 0, other: 1 },
  { date: "9-Dec-2024", whatsapp: 11, instagram: 3, google: 1, other: 1 },
  { date: "10-Dec-2024", whatsapp: 3, instagram: 3, google: 0, other: 0 },
];

const totalSubscriptions = rawData.reduce(
  (acc, day) => {
    acc.whatsapp += day.whatsapp;
    acc.instagram += day.instagram;
    acc.google += day.google;
    acc.other += day.other;
    return acc;
  },
  { whatsapp: 0, instagram: 0, google: 0, other: 0 },
);

const data = [
  { name: "WhatsApp", subscriptions: totalSubscriptions.whatsapp },
  { name: "Instagram", subscriptions: totalSubscriptions.instagram },
  { name: "Google", subscriptions: totalSubscriptions.google },
  { name: "Altele", subscriptions: totalSubscriptions.other },
];

const channels = [
  { key: "WhatsApp", color: "hsl(var(--chart-1))" },
  { key: "Instagram", color: "hsl(var(--chart-2))" },
  { key: "Google", color: "hsl(var(--chart-3))" },
  { key: "Altele", color: "hsl(var(--chart-4))" },
];

export default function NewsletterSubscriptionsTotalChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Total Abonări la Newsletter per Canal</CardTitle>
        <CardDescription>
          Numărul total de abonări pentru fiecare canal în perioada 3-10
          decembrie 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(
            channels.map((channel) => [
              channel.key,
              { label: channel.key, color: channel.color },
            ]),
          )}
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="subscriptions" name="Abonări">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={channels[index].color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

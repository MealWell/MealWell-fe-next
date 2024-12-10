"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const analyticsData = [
  { title: "Visitors", value: "93" },
  { title: "Page views", value: "298" },
  { title: "Sessions", value: "128" },
  { title: "Session duration", value: "7m 29s" },
  { title: "Bounce rate", value: "39%" },
];

export default function AnalyticsCards() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Analiza metricilor cheie</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {analyticsData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

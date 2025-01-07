"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SkeletonDashboard() {
  return (
    <>
      <div className="mb-4">
        <Skeleton className="h-8 w-48" /> {/* Placeholder for title */}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" /> {/* Placeholder for title */}
              <Skeleton className="h-4 w-4" /> {/* Placeholder for icon */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-24" /> {/* Placeholder for stats */}
              <Skeleton className="h-4 w-full mt-2" />{" "}
              {/* Placeholder for progress bar */}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Tabs defaultValue="meals">
          <TabsList>
            <TabsTrigger value="meals">
              <Skeleton className="h-4 w-24" /> {/* Placeholder for tab */}
            </TabsTrigger>
            <TabsTrigger value="progress">
              <Skeleton className="h-4 w-24" /> {/* Placeholder for tab */}
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Skeleton className="h-4 w-24" /> {/* Placeholder for tab */}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="meals" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-32" />{" "}
                    {/* Placeholder for meal name */}
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="progress" className="mt-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-4 w-32" />{" "}
                {/* Placeholder for progress title */}
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full" />{" "}
                {/* Placeholder for graph */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-4 w-32" />{" "}
                {/* Placeholder for delivery title */}
              </CardHeader>
              <CardContent>
                {[...Array(3)].map((_, i) => (
                  <div
                    className="flex justify-between items-center mb-4"
                    key={i}
                  >
                    <div>
                      <Skeleton className="h-4 w-32" />{" "}
                      {/* Placeholder for date */}
                      <Skeleton className="h-4 w-24 mt-1" />{" "}
                      {/* Placeholder for details */}
                    </div>
                    <Skeleton className="h-8 w-24" />{" "}
                    {/* Placeholder for button */}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

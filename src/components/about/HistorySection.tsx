"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function HistorySection() {
  const data = [
    {
      title: "2015",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
            Started With 3000 sq. ft. warehouse for self storage.
          </p>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
            Added corporate services.
          </p>
        </div>
      ),
    },
    {
      title: "2017",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
            Crossed 100 Customers.
          </p>
        </div>
      ),
    },
    {
        title: "2018",
        content: (
          <div>
            <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
              Increased to 50,000 sq. ft.
            </p>
          </div>
        ),
      },
      {
        title: "2019",
        content: (
          <div>
            <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
                Increased to 200 customers and 75000 sq. ft.
            </p>
          </div>
        ),
      },
      {
        title: "2020",
        content: (
          <div>
            <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
                Scanned 10 million pages.
            </p>
          </div>
        ),
      },
  ];
  return (
    <div className="min-h-screen w-full bg-background">
        <Timeline 
            data={data} 
            title="Our History"
            subtitle="Tracing Our Journey of Growth and Innovation"
        />
    </div>
  );
}

import Layout from "@/components/Layout";
import MapboxMapComponent from "@/components/MapboxMapComponent";
import { Card } from "@/components/ui/card";
import React from "react";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-4">
        <MapboxMapComponent />
      </div>
    </Layout>
  );
}

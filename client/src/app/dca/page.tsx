"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UpBar from "@/components/layouts/upbar";

export default function PnlCalculator() {
  return (
    <>
      <UpBar title="Dollar Cost Averaging" back={true} />

      <div className="p-6 max-w-lg mx-auto space-y-6">
        <Card className="bg-sky-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-xl">DCA Simulation</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">Coming Soon</CardContent>
        </Card>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpBar from "@/components/layouts/upbar";

export default function DcaSimulation() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [growth, setGrowth] = useState("");

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    const yrs = parseInt(period);
    const g = parseFloat(growth);

    if (!amt || !yrs || !g || g < 0) return;

    // total money invested
    const totalInvested = amt * yrs;

    let coinAccumulated = 0;

    let price = 1; // start price (relative), does not affect ROI if consistent

    for (let i = 0; i < yrs; i++) {
      coinAccumulated += amt / price;
      price = price * (1 + g / 100); // grow by % each year
    }

    const currentValue = coinAccumulated * price;
    const pnl = currentValue - totalInvested;
    const roi = (pnl / totalInvested) * 100;

    setResult({
      totalInvested,
      currentValue,
      pnl,
      roi,
    });
  };

  return (
    <>
      <UpBar title="Dollar Cost Averaging" back={true} />

      <div className="p-6 max-w-lg mx-auto space-y-6">
        <Card className="bg-sky-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-xl">DCA Simulation</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Amount Per Period (IDR) */}
            <div className="space-y-1">
              <Label>Amount Per Period (IDR)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Rp. 0"
              />
            </div>

            {/* Number of period */}
            <div className="space-y-1">
              <Label>Number of period</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={period}
                min={1}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="0"
              />
            </div>

            {/* Annual Growth Percentage */}
            <div className="space-y-1">
              <Label>Increasing Percentage / Period (%)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={growth}
                onChange={(e) => {
                  if (parseFloat(e.target.value) >= 0) {
                    setGrowth(e.target.value);
                  }
                }}
                placeholder="0"
              />
              <p className="text-xs text-gray-400">Must be &gt; 0%</p>
            </div>

            {/* Calculate Button */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={calculate}
            >
              Simulate
            </Button>

            {/* Results */}
            {result && (
              <div className="space-y-2 pt-4 border-t border-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Invested</span>
                  <span>{result.totalInvested.toLocaleString()} IDR</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Current Value</span>
                  <span>{result.currentValue.toLocaleString()} IDR</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">PNL</span>
                  <span
                    className={
                      result.pnl >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {result.pnl.toLocaleString()} IDR
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">ROI</span>
                  <span
                    className={
                      result.roi >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {result.roi.toFixed(2)} %
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

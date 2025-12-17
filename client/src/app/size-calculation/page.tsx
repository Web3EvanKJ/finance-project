"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpBar from "@/components/layouts/upbar";
import InfoTooltip from "@/components/layouts/infoTooltip";

export default function PositionSizeCalculator() {
  const [capital, setCapital] = useState("");
  const [risk, setRisk] = useState("");
  const [entry, setEntry] = useState("");
  const [sl, setSl] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const c = parseFloat(capital);
    const r = parseFloat(risk);
    const e = parseFloat(entry);
    const s = parseFloat(sl);

    if (!c || !r || !e || !s) return;

    // === BASIC CALCULATIONS ===
    const maxRisk = c * (r / 100); // dollars
    const riskPerUnit = Math.abs(e - s); // dollars per unit
    const positionSize = maxRisk / riskPerUnit;
    const positionValue = positionSize * e;

    setResult({
      maxRisk,
      riskPerUnit,
      positionValue,
    });
  };

  return (
    <>
      <UpBar title="Position Size Calculator" back={true} />

      <div className="p-6 max-w-lg mx-auto space-y-6">
        <Card className="bg-sky-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-xl">
              Position Size Calculator (Spot)
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* CAPITAL */}
            <div className="space-y-1">
              <Label>Total Capital (USD)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                placeholder="10000"
              />
            </div>

            {/* RISK % */}
            <div className="space-y-1">
              <Label>Risk per Trade (%)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                placeholder="1"
              />
            </div>

            {/* ENTRY PRICE */}
            <div className="space-y-1">
              <Label>Entry Price (USD)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="1000"
              />
            </div>

            {/* STOP LOSS */}
            <div className="space-y-1">
              <Label>Stop Loss Price (USD)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={sl}
                onChange={(e) => setSl(e.target.value)}
                placeholder="950"
              />
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={calculate}
            >
              Calculate
            </Button>

            {/* RESULTS */}
            {result && (
              <div className="space-y-2 pt-4 border-t border-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center text-gray-400">
                    Maximum Risk
                    <InfoTooltip text="The maximum amount of money you are willing to lose on this trade, based on your risk percentage." />
                  </span>{" "}
                  <span>{result.maxRisk.toFixed(4)} USD</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center text-gray-400">
                    Risk per Unit of Asset
                    <InfoTooltip text="This represents how much you lose per unit of asset if the stop loss is hit." />
                  </span>{" "}
                  <span>{result.riskPerUnit.toFixed(4)} USD</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center text-gray-400">
                    Maximum Total Position Value
                    <InfoTooltip text="The maximum total position value of the position calculated based on your risk" />
                  </span>
                  <span>{result.positionValue.toFixed(4)} USD</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

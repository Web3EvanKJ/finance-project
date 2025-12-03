"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RiskAnalyzerPage() {
  const [entry, setEntry] = useState("");
  const [current, setCurrent] = useState("");
  const [leverage, setLeverage] = useState("");
  const [size, setSize] = useState(""); // position size in USD
  const [drop, setDrop] = useState("5");

  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const entryPrice = parseFloat(entry);
    const exitPrice = parseFloat(current);
    const leverages = parseFloat(leverage);
    const sizeUSD = parseFloat(size);
    const d = parseFloat(drop);

    if (!entryPrice || !exitPrice || !leverages || !sizeUSD) return;

    // PnL calculation
    const pnl = ((exitPrice - entryPrice) / entryPrice) * leverages * 100; // percentage
    const pnlUsd =
      (exitPrice - entryPrice) * ((sizeUSD * leverages) / entryPrice);

    // Liquidation price (simplified futures model)
    const liquidationPrice = entryPrice * (1 - 1 / leverages);

    // Scenario: if price drops X%
    const scenarioPrice = exitPrice * (1 - d / 100);
    const scenarioPnl =
      ((scenarioPrice - entryPrice) / entryPrice) * leverages * 100;

    // Risk score (simple: leverage * % to liquidation)
    const percentToLiq = ((exitPrice - liquidationPrice) / exitPrice) * 100;
    const riskScore = Math.min(100, leverages * 10 - percentToLiq);

    setResults({
      pnl,
      pnlUsd,
      liquidationPrice,
      scenarioPrice,
      scenarioPnl,
      percentToLiq,
      riskScore: Math.max(0, riskScore),
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Position Risk Analyzer</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ENTRY PRICE */}
          <div className="space-y-1">
            <Label>Entry Price</Label>
            <Input
              type="number"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="e.g. 2000"
            />
          </div>

          {/* CURRENT PRICE */}
          <div className="space-y-1">
            <Label>Current Price</Label>
            <Input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g. 2200"
            />
          </div>

          {/* LEVERAGE */}
          <div className="space-y-1">
            <Label>Leverage</Label>
            <Input
              type="number"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>

          {/* POSITION SIZE */}
          <div className="space-y-1">
            <Label>Position Size (USD)</Label>
            <Input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 100"
            />
          </div>

          {/* DROP SCENARIO */}
          <div className="space-y-1">
            <Label>Scenario Price Drop (%)</Label>
            <Input
              type="number"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="5"
            />
          </div>

          <Button className="w-full" onClick={calculate}>
            Calculate Risk
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div>
              <strong>PnL:</strong> {results.pnl.toFixed(2)}% (
              {results.pnlUsd.toFixed(2)} USD)
            </div>

            <div>
              <strong>Liquidation Price:</strong>{" "}
              {results.liquidationPrice.toFixed(4)}
            </div>

            <div>
              <strong>Scenario Price (Drop):</strong>{" "}
              {results.scenarioPrice.toFixed(4)}
            </div>

            <div>
              <strong>Scenario PnL:</strong> {results.scenarioPnl.toFixed(2)}%
            </div>

            <div>
              <strong>Percent to Liquidation:</strong>{" "}
              {results.percentToLiq.toFixed(2)}%
            </div>

            <div>
              <strong>Risk Score (0–100):</strong>{" "}
              {results.riskScore.toFixed(0)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

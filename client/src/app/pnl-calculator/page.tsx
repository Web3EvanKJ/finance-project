"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import SliderColor from "@/components/slider-04";
import UpBar from "@/components/layouts/upbar";

export default function PnlCalculator() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(20);
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [qty, setQty] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const e = parseFloat(entry);
    const x = parseFloat(exit);
    const q = parseFloat(qty);

    if (!e || !x || !q) return;

    // quantity = leveraged notional value
    const coins = q / e; // real asset amount
    const margin = q / leverage;

    // pnl logic
    const priceDiff = side === "long" ? x - e : e - x;
    const pnl = priceDiff * coins;

    // roe
    const roe = (pnl / margin) * 100;

    // ==== liquidation price ====
    let liq;
    if (side === "long") {
      liq = e * (1 - 1 / leverage);
    } else {
      liq = e * (1 + 1 / leverage);
    }

    // ==== distance from entry to liquidation (%)
    let percentToLiq;
    if (side === "long") {
      percentToLiq = ((e - liq) / e) * 100;
    } else {
      percentToLiq = ((liq - e) / e) * 100;
    }

    setResult({
      margin,
      pnl,
      roe,
      liq,
      percentToLiq,
    });
  };

  return (
    <>
      <UpBar title="PnL Calculator" back={true} />

      <div className="p-6 max-w-lg mx-auto space-y-6">
        <Card className="bg-sky-900 text-white border-none">
          <CardHeader>
            <CardTitle className="text-xl">PNL Calculator</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* LONG / SHORT */}
            <div className="flex w-full">
              <Button
                className={cn(
                  "flex-1 rounded-none rounded-l-md",
                  side === "long"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-900 hover:bg-green-800"
                )}
                onClick={() => setSide("long")}
              >
                Long
              </Button>

              <Button
                className={cn(
                  "flex-1 rounded-none rounded-r-md",
                  side === "short"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-900 hover:bg-red-800"
                )}
                onClick={() => setSide("short")}
              >
                Short
              </Button>
            </div>

            {/* LEVERAGE SLIDER */}
            <div className="space-y-2">
              <Label className="text-gray-300">Leverage: {leverage}x</Label>
              <SliderColor
                value={[leverage]}
                min={1}
                max={150}
                step={1}
                // @ts-ignore
                onValueChange={(v) => setLeverage(v[0])}
              />
            </div>

            {/* ENTRY PRICE */}
            <div className="space-y-1">
              <Label>Entry Price</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* EXIT PRICE */}
            <div className="space-y-1">
              <Label>Exit Price</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={exit}
                onChange={(e) => setExit(e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* QUANTITY */}
            <div className="space-y-1">
              <Label>Quantity After Leveraged (USD)</Label>
              <Input
                type="number"
                className="bg-white! border-gray-700 text-black"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <Button
              className={cn(
                "w-full",
                side === "long"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              )}
              onClick={calculate}
            >
              Calculate
            </Button>

            {/* RESULTS */}
            {result && (
              <div className="space-y-2 pt-4 border-t border-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Initial Margin</span>
                  <span>{result.margin.toFixed(4)} USD</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Liquidation Price (Approx)
                  </span>
                  <span>{result.liq.toFixed(4)} USD</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Entry Price to Liquidation (%)
                  </span>
                  <span>{result.percentToLiq.toFixed(2)} %</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">PNL</span>
                  <span
                    className={
                      result.pnl >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {result.pnl.toFixed(4)} USD
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">ROE</span>
                  <span
                    className={
                      result.roe >= 0 ? "text-green-400" : "text-red-400"
                    }
                  >
                    {result.roe.toFixed(2)} %
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

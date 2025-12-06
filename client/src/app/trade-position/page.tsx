"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpBar from "@/components/layouts/upbar";

export default function TradesPage() {
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("BUY");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const posRes = await api.get("/trades/positions", config);
      const histRes = await api.get("/trades", config);

      setPositions(posRes.data);
      setHistory(histRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTrade = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await api.post(
        "/trades",
        { symbol, type, quantity, price, note },
        config
      );

      setSymbol("");
      setQuantity("");
      setPrice("");
      setNote("");

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-4 text-white">Loading...</p>;

  return (
    <>
      <UpBar title="Trade Positions" back={true} />

      <div className="p-4 space-y-6 text-white">
        <h1 className="text-3xl font-bold">Your Positions</h1>

        <div className="grid gap-4">
          {positions.length === 0 && (
            <p className="text-gray-400">No open positions</p>
          )}

          {positions.map((p: any, i: number) => (
            <Card key={i} className="bg-[#1E1B2E] text-white">
              <CardHeader>
                <CardTitle>{p.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Quantity: {p.quantity}</p>
                <p>Avg Price: {p.avgPrice.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-6">Trade History</h2>
        <div className="grid gap-4">
          {history.map((h: any) => (
            <Card key={h.id} className="bg-[#221E36] text-white">
              <CardContent className="p-4 flex justify-between">
                <div>
                  <p className="font-bold">{h.symbol}</p>
                  <p className="text-sm text-gray-300">{h.type}</p>
                </div>
                <div className="text-right">
                  <p>{h.quantity}</p>
                  <p>@ {h.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-sky-700 text-white w-full mt-4">
              New Trade
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Create New Trade</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <div>
                <Label>Symbol</Label>
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>

              <div>
                <Label>Type</Label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>

              <div>
                <Label>Quantity</Label>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <Label>Note</Label>
                <Input value={note} onChange={(e) => setNote(e.target.value)} />
              </div>

              <Button className="w-full bg-sky-700" onClick={createTrade}>
                Save Trade
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

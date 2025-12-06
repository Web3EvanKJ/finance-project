import { prisma } from "../lib/prisma";
import Decimal from "decimal.js";

export const createTrade = async (
  userId: string,
  { symbol, type, quantity, price, note, linkedBuyId }: any
) => {
  if (!symbol || !type || !price)
    throw new Error("symbol, type, price are required");

  const qty = quantity ? new Decimal(quantity) : new Decimal(0);

  const totalValue = qty.mul(price);

  return prisma.trade.create({
    data: {
      userId,
      symbol,
      type,
      quantity: qty,
      price,
      totalValue,
      note,
      linkedBuyId,
    },
  });
};

export const getTrades = async (userId: string) => {
  return prisma.trade.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
};

export const getOpenPositions = async (userId: string) => {
  const trades = await prisma.trade.findMany({
    where: { userId },
  });

  const map: Record<string, { qty: number; totalCost: number }> = {};

  trades.forEach((t) => {
    const qty = Number(t.quantity ?? 0);
    const value = Number(t.totalValue ?? 0);

    if (!map[t.symbol]) {
      map[t.symbol] = { qty: 0, totalCost: 0 };
    }

    if (t.type === "BUY") {
      map[t.symbol].qty += qty;
      map[t.symbol].totalCost += value;
    } else {
      map[t.symbol].qty -= qty;
      map[t.symbol].totalCost -= value;
    }
  });

  return Object.entries(map)
    .filter(([_, pos]) => pos.qty > 0)
    .map(([symbol, pos]) => ({
      symbol,
      quantity: pos.qty,
      avgPrice: pos.totalCost / pos.qty,
    }));
};

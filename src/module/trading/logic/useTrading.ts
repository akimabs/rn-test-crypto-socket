import { useEffect, useState } from "react";
import mockDataChart from "../../../mock/ethbtc.json";
import mockDataOrder from "../../../mock/orderbook.json";
import mockDataTrade from "../../../mock/trade.json";

export type THistoryDataTrading = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}[];

export type THistoryDataOrder = {
  timestamp: string;
  ask: string[][]
  bid: string[][]
};

export type THistoryDataTrade = {
  id: number;
  qty: string
  side: string
  price: string
  timestamp: string
}[];

export const useTrading = () => {
  const [dataChart, setData] = useState<THistoryDataTrading>([]);
  
  useEffect(() => {
    const tmpData: THistoryDataTrading = [];
    mockDataChart.ETH.history.forEach((res) => {
      tmpData.push({
        timestamp: new Date(res.timestamp).getTime(),
        open: Number(res.open),
        high: Number(res.max),
        low: Number(res.min),
        close: Number(res.close),
      });
      setData(tmpData);
    });
  }, []);

  const dataOrderTmp: THistoryDataOrder = mockDataOrder

  // Extract ask and bid prices from the timestamp data
  const askPrices = dataOrderTmp.ask.map(ask => parseFloat(ask[0]));
  const bidPrices = dataOrderTmp.bid.map(bid => parseFloat(bid[0]));

  // Find matching records
  const matchingRecords: THistoryDataTrade = mockDataTrade.filter(record => {
    const price = parseFloat(record.price);
    return askPrices.includes(price) || bidPrices.includes(price);
  });

  return {
    dataChart,
    dataOrder: dataOrderTmp,
    matchTrade: matchingRecords
  };
};

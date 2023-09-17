import { useEffect, useState } from "react";
import mockData from "../../../mock/ethbtc.json";

type THistoryDataTrading = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}[];

export const useTrading = () => {
  const [dataChart, setData] = useState<THistoryDataTrading>([]);
  useEffect(() => {
    const tmpData: THistoryDataTrading = [];
    mockData.ETH.history.forEach((res) => {
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

  return {
    dataChart,
  };
};

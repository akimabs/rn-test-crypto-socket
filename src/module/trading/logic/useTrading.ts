import axios from "axios";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
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
  const ws: any = new WebSocket('wss://api.bequant.io/api/3/ws/public');
  const [dataChartTmp, setDataTmp] = useState<THistoryDataTrading>([]);
  const [dataChart, setData] = useState<THistoryDataTrading>([]);
  const [dataPriceRate, setDataPriceRate] = useState('-')

  const payloadPriceRate = {
    "method": "subscribe",
    "ch": "price/rate/3s",
    "params": {
      "currencies": ["ETH", "BTC"],
      "target_currency": "BTC"
    },
    "id": 123
  }

  const payloadCandle = {
    "method": "subscribe",
    "ch": "candles/M1",
    "params": {
      "symbols": ["ETHBTC"],
      "limit": 10
    },
    "id": 123
  }

  ws.onopen = () => {
    ws.send(JSON.stringify(payloadCandle));
    ws.send(JSON.stringify(payloadPriceRate));
  };

  const sendPriceRate = useCallback((data: any) => setDataPriceRate(data), [setDataPriceRate])
  const sendDataChart = useCallback((data: any) => setData(data), [setData])

  ws.onmessage = (event: any) => {
    const data = JSON.parse(event?.data);
    if (data?.ch === 'price/rate/3s') {
      sendPriceRate(data.data?.ETH?.r);
    }

    const dataCandle = data?.update?.ETHBTC[0];
    if (data?.ch === 'candles/M1' && dataCandle) {
      const payload = {
        timestamp: dataCandle.t,
        open: Number(dataCandle?.o),
        high: Number(dataCandle?.h),
        low: Number(dataCandle?.l),
        close: Number(dataCandle?.c),
      }
      if (dataChartTmp.length !== 0) {
        sendDataChart([...dataChartTmp, payload]);
      }
    }
  };


  const getCandles = async () => {
    return await axios.get('https://api.bequant.io/api/3/public/price/history', {
      params: {
        from: 'ETH',
        to: 'BTC',
        since: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
        limit: 50,
        until: new Date(),
        sort: 'ASC'
      }
    })
  }

  const getOrderBook = async () => {
    return await axios.get('https://api.bequant.io/api/3/public/orderbook/ETHBTC', {
      params: {
        volume: 200
      }
    })
  }

  const getTrade = async (timestamp: string) => {
    return await axios.get('https://api.bequant.io/api/3/public/trades/ETHBTC', {
      params: {
        by: timestamp,
        limit: 100
      }
    })
  }

  useQuery('getCandles', getCandles, {
    onSuccess: ({ data }) => {
      const tmpData: THistoryDataTrading = [];
      data.ETH.history.forEach((res: any) => {
        tmpData.push({
          timestamp: new Date(res.timestamp).getTime(),
          open: Number(res.open),
          high: Number(res.max),
          low: Number(res.min),
          close: Number(res.close),
        });
        setData(tmpData);
        setDataTmp(tmpData)
      });
    }
  })

  const { data: dataOrderBookApi } = useQuery('getOrderBook', getOrderBook)
  const { data: dataTradeApi } = useQuery('getTrade', () => getTrade(dataOrderBookApi?.data.timestamp), { enabled: !!dataOrderBookApi })

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
    dataPriceRate,
    dataChart,
    dataOrder: dataOrderTmp,
    matchTrade: matchingRecords
  };
};

import { memo, useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { THistoryDataOrder, THistoryDataTrade } from "../../logic/useTrading";

type Props = {
  data: THistoryDataOrder;
  matchesTrade: THistoryDataTrade;
};

const OrderBook = ({ data, matchesTrade }: Props) => {
  const totalPrecentTrade = Dimensions.get("window").width / 2;
  const [tmpDataBid, setTmpDataBid] = useState(data.bid);
  const [tmpDataAsk, setTmpDataAsk] = useState(data.ask);

  useEffect(() => {
    const dataY = data.bid.map((itemBid) => {
      const index = matchesTrade.findIndex(
        (res) => res.side === "buy" && Number(res.price) === Number(itemBid[0])
      );
      const dataPercent = Number(
        String(
          (Number(matchesTrade[index <= 0 ? 0 : index]?.qty) /
            Number(itemBid[1])) *
            100
        )
      );
      const calculatePrecent =
        dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent;

      // Push the calculated percentage into the itemBid array
      itemBid.push(String(calculatePrecent));
      return itemBid;
    });

    setTmpDataBid(
      dataY
        .sort((a, b) => {
          // Convert the third element of each sub-array to a number for comparison
          const numA = Number(a[2]);
          const numB = Number(b[2]);

          // Compare the numbers
          return numA - numB;
        })
        .slice(0, 13)
    );
    const dataX = data.ask.map((itemBid) => {
      const index = matchesTrade.findIndex(
        (res) => res.side === "sell" && Number(res.price) === Number(itemBid[0])
      );
      const dataPercent = Number(
        String(
          (Number(matchesTrade[index <= 0 ? 0 : index]?.qty) /
            Number(itemBid[1])) *
            100
        )
      );
      const calculatePrecent =
        dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent;

      // Push the calculated percentage into the itemBid array
      itemBid.push(String(calculatePrecent));
      return itemBid;
    });

    setTmpDataAsk(
      dataX
        .sort((a, b) => {
          // Convert the third element of each sub-array to a number for comparison
          const numA = Number(a[2]);
          const numB = Number(b[2]);

          // Compare the numbers
          return numA - numB;
        })
        .slice(0, 13)
    );
  }, [data, matchesTrade]);

  const renderBuyList = useCallback(() => {
    return (
      <View>
        <View style={styles.containerHeaderBuy}>
          <Text style={styles.textHeaderBuy}>Ask</Text>
        </View>
        <View style={styles.textBuy}>
          <Text style={styles.buyListText}>Amount</Text>
          <Text style={styles.buyListText}>Price(BTC)</Text>
        </View>
      </View>
    );
  }, []);

  const renderSellList = useCallback(() => {
    return (
      <View>
        <View style={styles.containerHeaderSell}>
          <Text style={styles.textHeaderBuy}>Bid</Text>
        </View>
        <View style={styles.textBuy}>
          <Text style={styles.buyListText}>Price(BTC)</Text>
          <Text style={styles.buyListText}>Amount</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.containerFooter}>
      <View style={styles.containerHeaderFooter}>
        <Text style={styles.textHeaderFooter}>Order Book</Text>
      </View>
      <View style={styles.containerBuyList}>
        <View>
          <FlatList
            ListHeaderComponent={renderBuyList}
            contentContainerStyle={{
              width: Dimensions.get("window").width / 2,
            }}
            data={tmpDataBid}
            renderItem={({ item }) => {
              const index = matchesTrade.findIndex(
                (res) =>
                  res.side === "buy" && Number(res.price) === Number(item[0])
              );
              const dataPercent = Number(
                String(
                  (Number(matchesTrade[index <= 0 ? 0 : index]?.qty) /
                    Number(item[1])) *
                    100
                )
              );
              const calculatePrecent =
                dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent;
              return (
                <View>
                  <View
                    style={[
                      { width: totalPrecentTrade * calculatePrecent },
                      styles.containerListBuy,
                    ]}
                  />
                  <View style={styles.containerTextListBuy}>
                    <Text style={styles.textBuy1}>{item[1]}</Text>
                    <Text style={styles.textBuy2}>{item[0]}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View>
          <FlatList
            ListHeaderComponent={renderSellList}
            contentContainerStyle={styles.containerList}
            data={tmpDataAsk}
            renderItem={({ item }) => {
              const index = matchesTrade.findIndex(
                (res) =>
                  res.side === "sell" && Number(res.price) === Number(item[0])
              );
              const dataPercent = Number(
                String(
                  (Number(matchesTrade[index <= 0 ? 0 : index]?.qty) /
                    Number(item[1])) *
                    100
                )
              );
              const calculatePrecent =
                dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent;
              return (
                <View>
                  <View
                    style={[
                      { width: totalPrecentTrade * calculatePrecent },
                      styles.containerListSell,
                    ]}
                  />
                  <View style={styles.containerTextListBuy}>
                    <Text style={styles.textSell1}>{item[0]}</Text>
                    <Text style={styles.textSell2}>{item[1]}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(OrderBook);

const styles = StyleSheet.create({
  containerFooter: { marginBottom: 80 },
  containerHeaderFooter: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
  textHeaderFooter: { fontSize: 20, fontWeight: "bold", padding: 10 },
  containerBuyList: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
  },
  containerHeaderBuy: {
    width: Dimensions.get("window").width / 2,
    backgroundColor: "#10b98120",
  },
  containerHeaderSell: {
    width: Dimensions.get("window").width / 2,
    backgroundColor: "#ef444420",
  },
  textHeaderBuy: { paddingHorizontal: 10 },
  textBuy: {
    width: Dimensions.get("window").width / 2,
    backgroundColor: "white",
    height: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  containerListBuy: {
    backgroundColor: "#10b98120",
    height: 30,
    position: "absolute",
    right: 0,
  },
  containerListSell: {
    backgroundColor: "#ef444420",
    height: 30,
    position: "absolute",
    left: 0,
  },
  containerTextListBuy: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 30,
    alignItems: "center",
    marginBottom: 1,
    justifyContent: "space-between",
  },
  textBuy1: { fontSize: 13 },
  textBuy2: { fontSize: 13, color: "#10b981" },
  textSell2: { fontSize: 13 },
  textSell1: { fontSize: 13, color: "#ef4444" },
  buyListText: { fontSize: 12, color: "grey" },
  containerList: {
    width: Dimensions.get("window").width / 2,
  },
});

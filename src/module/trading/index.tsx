import { useCallback, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Chart from "./components/chart";
import Footer from "./components/footer";
import Header from "./components/header";
import OrderBook from "./components/order-book";
import { useTrading } from "./logic/useTrading";

export default function Trading() {
  const { dataPriceRate, dataChart, dataOrder, matchTrade } = useTrading();
  const [enableScroll, setEnableScroll] = useState<boolean>(true);

  const handleData = useCallback(
    (data: boolean) => {
      setEnableScroll(data);
    },
    [setEnableScroll]
  );

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={enableScroll}
        nestedScrollEnabled
      >
        <Header dataPriceRate={dataPriceRate} />
        <View style={styles.containerChart}>
          <Chart data={dataChart} onScrollChart={(val) => handleData(val)} />
        </View>
        <OrderBook data={dataOrder} matchesTrade={matchTrade} />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  containerChart: { marginBottom: 30, backgroundColor: "white" },
});

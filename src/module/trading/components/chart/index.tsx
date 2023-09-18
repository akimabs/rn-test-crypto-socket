import { CandlestickChart } from "react-native-wagmi-charts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { THistoryDataTrading } from "../../logic/useTrading";

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

function groupData(inputData: THistoryDataTrading) {
  const result = [];
  for (let i = 0; i < inputData.length; i += 4) {
    const group: any = {
      data: [],
    };
    for (let j = i; j < i + 5 && j < inputData.length; j++) {
      group.data.push({
        timestamp: formatDate(inputData[j]?.timestamp),
        open: Number(inputData[j].open),
        high: Number(inputData[j].high),
        low: Number(inputData[j].low),
        close: Number(inputData[j].close),
      });
    }
    group.data.sort();
    result.push(group);
  }
  return result;
}

const DataChart = memo(({ data, indexScroll }: any) => {
  return (
    <View style={styles.containerChartData}>
      <FlatList
        data={new Array(24)}
        style={styles.containerListFirst}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => {
          return (
            <FlatList
              style={styles.containerListFirst}
              horizontal
              scrollEnabled={false}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              data={groupData(data)}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.containerItemFirst}>
                    <Text
                      style={[
                        index >= 1 && { marginLeft: -20 },
                        { fontSize: 10 },
                      ]}
                    >
                      {index <= 4 &&
                        item.data[Number(indexScroll <= 0 ? 0 : indexScroll)]
                          ?.timestamp}
                    </Text>
                  </View>
                );
              }}
            />
          );
        }}
        numColumns={6}
        renderItem={({ _, index }: any) => {
          return (
            <View
              style={{
                ...styles.containerListBottom,
                borderLeftWidth: [5, 11, 17, 23].includes(index) ? 0 : 0.4,
              }}
            >
              {[5].includes(index) && (
                <Text style={styles.textData}>
                  {groupData(data)
                    .map(
                      (res) =>
                        res.data[indexScroll <= 0 ? 0 : indexScroll]?.high
                    )
                    .slice(0, 1)}
                </Text>
              )}
              {[11].includes(index) && (
                <Text style={styles.textData}>
                  {groupData(data)
                    .map(
                      (res) =>
                        res.data[indexScroll <= 0 ? 0 : indexScroll]?.open
                    )
                    .slice(0, 1)}
                </Text>
              )}
              {[17].includes(index) && (
                <Text style={styles.textData}>
                  {groupData(data)
                    .map(
                      (res) =>
                        res.data[indexScroll <= 0 ? 0 : indexScroll]?.close
                    )
                    .slice(0, 1)}
                </Text>
              )}
              {[23].includes(index) && (
                <Text style={styles.textData}>
                  {groupData(data)
                    .map(
                      (res) => res.data[indexScroll <= 0 ? 0 : indexScroll]?.low
                    )
                    .slice(0, 1)}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
});

const Chart = ({
  onScrollChart,
  data,
}: {
  onScrollChart: (val: boolean) => void;
  data: THistoryDataTrading;
}) => {
  const [showData, setDataShow] = useState<boolean>(true);
  const [indexScroll, setIndexScroll] = useState<string>("0");
  const [scrollX, setScrollX] = useState<number>(0);
  const ref: any = useRef();

  useEffect(() => {
    ref?.current?.scrollToEnd();
  }, []);

  const handleData = useCallback((data: boolean) => {
    setDataShow(data);
    onScrollChart(data);
  }, []);

  const handlescroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const positionx = event.nativeEvent.contentOffset.x;
    setScrollX(event.nativeEvent.contentOffset.x);
    setIndexScroll(
      Number(
        Number((positionx / 10) * 0.1)
          .toString()
          .slice(0)
      ).toFixed()
    );
  };

  const format = ({ value }: any) => {
    "worklet";
    return `${value}`.slice(0, 8);
  };

  return (
    <CandlestickChart.Provider data={data}>
      <DataChart data={data} indexScroll={indexScroll} />
      <View style={styles.containerChart}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          ref={ref}
          horizontal
          bounces={false}
          scrollEnabled={showData}
          onScroll={handlescroll}
          scrollEventThrottle={16}
        >
          <GestureHandlerRootView style={styles.containerChartInner}>
            <CandlestickChart
              height={Dimensions.get("window").height * 0.4}
              width={Number((Dimensions.get("window").width / 5.5) * 10)}
            >
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair
                scrollX={scrollX}
                onActivated={() => handleData(false)}
                onEnded={() => handleData(true)}
              >
                <CandlestickChart.PriceText
                  style={styles.textPrice}
                  precision={10}
                  format={format}
                />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
          </GestureHandlerRootView>
        </ScrollView>
      </View>
    </CandlestickChart.Provider>
  );
};

export default memo(Chart);

const styles = StyleSheet.create({
  containerChartData: { position: "absolute", top: -40, left: 0 },
  containerListFirst: {
    zIndex: -99,
  },
  containerItemFirst: {
    width: Dimensions.get("window").width / 6,
    height: 200,
  },
  containerListBottom: {
    width: Dimensions.get("window").width / 6,
    height: (Dimensions.get("window").height * 0.45) / 4,
    borderBottomWidth: 0.4,
    borderTopWidth: 0.4,
    borderColor: "lightgrey",
    justifyContent: "flex-end",
  },
  textData: { fontSize: 10 },
  containerChart: {
    width: Dimensions.get("window").width * 0.83,
  },
  containerChartInner: { width: (Dimensions.get("window").width / 5.5) * 10 },
  textPrice: {
    fontSize: 11,
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
});

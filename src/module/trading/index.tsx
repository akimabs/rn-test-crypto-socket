import { useCallback, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Chart from "./components/chart";

export default function Trading() {
  const [enableScroll, setEnableScroll] = useState<boolean>(true);

  const handleData = useCallback((data: boolean) => {
    setEnableScroll(data);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={enableScroll}
    >
      <View style={{ height: Dimensions.get("window").height * 1 }}>
        <Chart onScrollChart={(val) => handleData(val)} />
      </View>
      <View
        style={{
          height: 500,
          width: 1000,
          backgroundColor: "red",
        }}
      >
        <Text>asd</Text>
      </View>
    </ScrollView>
  );
}

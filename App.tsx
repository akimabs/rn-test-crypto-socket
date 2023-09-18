import Trading from "./src/module/trading";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  return (
    <QueryClientProvider client={queryClient}>
      <Trading />
    </QueryClientProvider>
  );
}

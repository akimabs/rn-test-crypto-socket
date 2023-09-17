import Trading from "./src/module/trading";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Trading />
    </QueryClientProvider>
  )
}

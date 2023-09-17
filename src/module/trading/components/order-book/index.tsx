import { memo, useEffect, useState } from "react"
import { Dimensions, FlatList, Text, View } from "react-native"
import { THistoryDataOrder, THistoryDataTrade } from "../../logic/useTrading"


type Props = {
    data: THistoryDataOrder
    matchesTrade: THistoryDataTrade
}


const OrderBook = ({ data, matchesTrade }: Props) => {
    const totalPrecentTrade = Dimensions.get('window').width / 2
    const [tmpDataBid, setTmpDataBid] = useState(data.bid)
    const [tmpDataAsk, setTmpDataAsk] = useState(data.ask)

    useEffect(() => {
        const dataY = data.bid.map(itemBid => {
            const index = matchesTrade.findIndex((res) => res.side === 'buy' && Number(res.price) === Number(itemBid[0]))
            const dataPercent = Number(String(Number(matchesTrade[index <= 0 ? 0 : index]?.qty) / Number(itemBid[1]) * 100))
            const calculatePrecent = dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent

            // Push the calculated percentage into the itemBid array
            itemBid.push(String(calculatePrecent));
            return itemBid;
        })

        setTmpDataBid(dataY.sort((a, b) => {
            // Convert the third element of each sub-array to a number for comparison
            const numA = Number(a[2]);
            const numB = Number(b[2]);

            // Compare the numbers
            return numA - numB;
        }).slice(0, 13))
        const dataX = data.ask.map(itemBid => {
            const index = matchesTrade.findIndex((res) => res.side === 'sell' && Number(res.price) === Number(itemBid[0]))
            const dataPercent = Number(String(Number(matchesTrade[index <= 0 ? 0 : index]?.qty) / Number(itemBid[1]) * 100))
            const calculatePrecent = dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent

            // Push the calculated percentage into the itemBid array
            itemBid.push(String(calculatePrecent));
            return itemBid;
        })

        setTmpDataAsk(dataX.sort((a, b) => {
            // Convert the third element of each sub-array to a number for comparison
            const numA = Number(a[2]);
            const numB = Number(b[2]);

            // Compare the numbers
            return numA - numB;
        }).slice(0, 13))
    }, [])

    return (
        <View style={{ marginBottom: 80 }}>
            <View style={{ width: Dimensions.get('window').width, backgroundColor: 'whitesmoke' }} >
                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Order Book</Text>
            </View>
            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.9 }}>
                <View>
                    <FlatList
                        ListHeaderComponent={() => {
                            return (
                                <View>
                                    <View style={{ width: Dimensions.get('window').width / 2, backgroundColor: '#10b98120' }}>
                                        <Text style={{ paddingHorizontal: 10 }}>Ask</Text>
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width / 2, backgroundColor: 'whitesmoke', height: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Amount</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Price(BTC)</Text>
                                    </View>
                                </View>
                            )
                        }}
                        contentContainerStyle={{ width: Dimensions.get('window').width / 2 }}
                        data={tmpDataBid}
                        renderItem={({ item }) => {
                            const index = matchesTrade.findIndex((res) => res.side === 'buy' && Number(res.price) === Number(item[0]))
                            const dataPercent = Number(String(Number(matchesTrade[index <= 0 ? 0 : index]?.qty) / Number(item[1]) * 100))
                            const calculatePrecent = dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent
                            return (
                                <View>
                                    <View style={{ backgroundColor: '#10b98120', width: totalPrecentTrade * calculatePrecent, height: 30, position: 'absolute', right: 0 }} />
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 30, alignItems: 'center', marginBottom: 1, justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: 13 }}>{item[1]}</Text>
                                        <Text style={{ fontSize: 13, color: '#10b981' }}>{item[0]}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                <View>
                    <FlatList
                        ListHeaderComponent={() => {
                            return (
                                <View>
                                    <View style={{ width: Dimensions.get('window').width / 2, backgroundColor: '#ef444420' }}>
                                        <Text style={{ paddingHorizontal: 10 }}>Bid</Text>
                                    </View>
                                    <View style={{ width: Dimensions.get('window').width / 2, backgroundColor: 'whitesmoke', height: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Price(BTC)</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>Amount</Text>
                                    </View>
                                </View>
                            )
                        }}
                        contentContainerStyle={{ width: Dimensions.get('window').width / 2 }}
                        data={tmpDataAsk}
                        renderItem={({ item }) => {
                            const index = matchesTrade.findIndex((res) => res.side === 'sell' && Number(res.price) === Number(item[0]))
                            const dataPercent = Number(String(Number(matchesTrade[index <= 0 ? 0 : index]?.qty) / Number(item[1]) * 100))
                            const calculatePrecent = dataPercent >= 100 ? 100 : dataPercent <= 0 ? 0 : dataPercent
                            return (
                                <View>
                                    <View style={{ backgroundColor: '#ef444420', width: totalPrecentTrade * calculatePrecent, height: 30, position: 'absolute', left: 0 }} />
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 30, alignItems: 'center', marginBottom: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 13, color: '#ef4444' }}>{item[0]}</Text>
                                        <Text style={{ fontSize: 13 }}>{item[1]}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default memo(OrderBook)
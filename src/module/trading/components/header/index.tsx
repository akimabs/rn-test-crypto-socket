import { memo } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

type Props = {
    dataPriceRate: string
}

const Header = ({ dataPriceRate }: Props) => {
    return (
        <View style={styles.containerHeader}>
            <View>
                <Text style={styles.text}>Etherium/Bitcoin</Text>
                <Text style={styles.boldText}>{dataPriceRate}BTC</Text>
            </View>
            <Image
                source={{
                    uri: 'https://logowik.com/content/uploads/images/ethereum3649.jpg',
                }}
                style={styles.image}
            />
        </View>
    );
};

export default memo(Header);


export const styles = StyleSheet.create({
    containerHeader: {
        height: 160,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        zIndex: 999,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        paddingTop: 50,
    },
    text: {
        fontSize: 20,
    },
    boldText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        height: 70,
        transform: [{ rotate: '30deg' }],
        width: 70,
    },
});

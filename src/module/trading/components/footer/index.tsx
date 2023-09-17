import { memo } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const Footer = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.buttonContainer, styles.buyButton]}
            >
                <Text style={styles.buttonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.buttonContainer, styles.sellButton]}
            >
                <Text style={styles.buttonText}>Sell</Text>
            </TouchableOpacity>
        </View>
    );
};

export default memo(Footer);

export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: 'white',
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 2,
        alignContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: Dimensions.get('window').width / 2.5,
        height: 40,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buyButton: {
        backgroundColor: '#10b981',
    },
    sellButton: {
        backgroundColor: '#ef4444',
    },
    buttonText: {
        color: 'white',
    },
});

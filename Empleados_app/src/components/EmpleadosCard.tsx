import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParams } from "../navigator/EmpleadosNavigator";
import { CreateEmpleadoDto } from "../interfaces/empleadosInterface";

interface Props {
    empleado: CreateEmpleadoDto;
}

const PRIMARY_COLOR = '#2C3E50';
const SECONDARY_COLOR = '#FFFFFF';
const ACCENT_COLOR = '#FF6700';

export const EmpleadosCard = ({ empleado }: Props) => {
    const widthDimension = Dimensions.get('window').width;

    const [isPressed, setIsPressed] = useState(false);

    type EmpleadosCardNavigationProp = StackNavigationProp<RootStackParams, 'Reportes'>;
    const navigation = useNavigation<EmpleadosCardNavigationProp>();

    const cardDynamicStyle = {
        transform: [{ scale: isPressed ? 0.98 : 1 }],
        backgroundColor: isPressed ? '#FFF0E6' : SECONDARY_COLOR,
        shadowOpacity: isPressed ? 0.1 : 0.25,
        shadowRadius: isPressed ? 4 : 10,
        elevation: isPressed ? 4 : 10,
        borderBottomColor: isPressed ? PRIMARY_COLOR : ACCENT_COLOR,
    };

    return (
        <View style={style.cardOuterContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Reportes", { empleado })}
                activeOpacity={1}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <View
                    style={[
                        style.cardContainer,
                        cardDynamicStyle,
                        { width: widthDimension * 0.44 }
                    ]}
                >
                    <View style={style.contentWrapper}>

                        <View style={style.nameWrapper}>
                            <Text style={style.nombre}>
                                {empleado.nombre}
                            </Text>
                            <Text style={style.apellido}>
                                {empleado.apellido_p}
                            </Text>
                        </View>

                        <View style={style.puestoWrapper}>
                            <Text style={style.puestoLabel}>ÁREA</Text>
                            <Text style={style.puesto}>
                                {empleado.area}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    cardOuterContainer: {
        marginHorizontal: 8,
        marginBottom: 25,
    },
    cardContainer: {
        height: 180,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: SECONDARY_COLOR,

        borderBottomWidth: 4,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    nameWrapper: {
        alignItems: 'center',
        marginTop: 10,
    },
    nombre: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    },
    apellido: {
        color: "#555555",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 4,
        textAlign: 'center',
    },
    puestoWrapper: {
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#FFE6CC',
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        width: '90%',
        marginBottom: 10,
    },
    puestoLabel: {
        color: PRIMARY_COLOR,
        fontSize: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    puesto: {
        color: '#333333',
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        textTransform: "capitalize",
    }
});


import React, { useContext, useState, useEffect } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";
import * as Network from 'expo-network';
import { ApiConfigContext } from "../context/ApiConfigContext";
import { useEmpleadosPorArea } from "../hooks/useReportes";
import { PieChart } from "react-native-chart-kit";

export const ConfigureIpApi = ({ navigation }: any) => {
    const { apiIP, setApiIP } = useContext(ApiConfigContext);
    const [ip, setIp] = useState(apiIP);
    const [mode, setMode] = useState<'auto' | 'manual'>('manual');
    const { data: empleadosData, isLoading: empleadosLoading, loadData: loadEmpleados } = useEmpleadosPorArea();

    const screenWidth = Dimensions.get("window").width;

    const handleSave = () => {
        if (!ip.trim()) {
            Alert.alert("Error", "Por favor ingresa una IP");
            return;
        }
        setApiIP(ip);
        Alert.alert("Éxito", "IP configurada");
        navigation.goBack();
    };

    useEffect(() => {
        if (apiIP) {
            loadEmpleados();
        }
    }, [apiIP]);

    const detectIp = async () => {
        try {
            const ipAddress = await Network.getIpAddressAsync();
            setIp(`http://${ipAddress}:3000`);
        } catch (error) {
            Alert.alert("Error", "No se pudo detectar la IP");
        }
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 103, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForLabels: {
            fontSize: 10,
        },
    };

    
    const empleadosPorAreaData = empleadosData?.statsByArea ? Object.entries(empleadosData.statsByArea).map(([area, stats]: [string, any]) => ({
        name: area,
        population: stats.empleados,
        color: area === 'PRODUCCION' ? '#FF6700' : area === 'OFICINA' ? '#3B82F6' : '#10B981',
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
    })) : [];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>CONFIGURACIÓN DE API</Text>
                <Text style={styles.subtitle}>
                    Define la dirección que la aplicación usará para conectarse a tu servicio.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.currentIpLabel}>IP/URL ACTUAL</Text>
                <Text style={styles.currentIpValue}>{apiIP || 'NO CONFIGURADA'}</Text>

                <View style={styles.modeButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.modeButton, mode === 'auto' && styles.modeButtonSelected]}
                        onPress={() => {
                            setMode('auto');
                            detectIp();
                        }}
                    >
                        <Text style={[styles.modeButtonText, mode === 'auto' && styles.modeButtonTextSelected]}>DETECTAR IP AUTOMÁTICA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeButton, mode === 'manual' && styles.modeButtonSelected]}
                        onPress={() => setMode('manual')}
                    >
                        <Text style={[styles.modeButtonText, mode === 'manual' && styles.modeButtonTextSelected]}>INGRESO MANUAL</Text>
                    </TouchableOpacity>
                </View>

                {mode === 'auto' ? (
                    <View style={styles.autoIpContainer}>
                        <Text style={styles.autoIpLabel}>IP Detectada:</Text>
                        <Text style={styles.autoIpValue}>{ip}</Text>
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="ej: http://192.168.1.100:3000"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={ip}
                            onChangeText={setIp}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="url"
                        />
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>
            </View>

            {apiIP && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Empleados por Área</Text>
                    {empleadosPorAreaData.length > 0 ? (
                        <PieChart
                            data={empleadosPorAreaData}
                            width={screenWidth - 50}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            style={styles.chart}
                        />
                    ) : (
                        <Text style={styles.noDataText}>No hay datos de empleados disponibles</Text>
                    )}
                </View>
            )}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6700', 
        paddingHorizontal: 25,
        paddingTop: 80,
    },
    headerTextContainer: {
        marginBottom: 60, 
    },
    title: {
        fontSize: 26,
        fontWeight: "900",
        color: '#FFFFFF', 
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)', 
        lineHeight: 22,
        maxWidth: '85%', 
        textAlign: 'left',
    },
    
    
    card: {
        backgroundColor: '#F9FAFB', 
        borderRadius: 15,
        padding: 25,
        
        alignSelf: 'center',
        width: '100%',
        marginTop: 0, 
        
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
    },
    currentIpLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF6700', 
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    currentIpValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FF6700', 
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 15,
        color: '#FFFFFF', 
        fontWeight: '600',
        
        
        shadowColor: "#FF6700",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    
    
    button: {
        backgroundColor: '#CC5200', 
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        
        shadowColor: '#CC5200',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "800",
        letterSpacing: 1,
    },

    
    chartContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        alignSelf: 'center',
        width: '100%',
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF6700',
        textAlign: 'center',
        marginBottom: 15,
    },
    chart: {
        borderRadius: 8,
    },
    noDataText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        padding: 20,
    },
    modeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modeButton: {
        backgroundColor: '#E5E7EB',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    modeButtonSelected: {
        backgroundColor: '#FF6700',
    },
    modeButtonText: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '600',
    },
    modeButtonTextSelected: {
        color: '#FFFFFF',
    },
    autoIpContainer: {
        marginBottom: 30,
    },
    autoIpLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6700',
        marginBottom: 5,
    },
    autoIpValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 10,
    },
});

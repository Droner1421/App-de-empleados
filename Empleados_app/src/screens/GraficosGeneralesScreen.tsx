import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../navigator/EmpleadosNavigator';
import { useEstadisticasGenerales } from '../hooks/useReportes';
import {
   
    BarChart,
    PieChart,

} from "react-native-chart-kit";

type Props = DrawerScreenProps<RootDrawerParams, 'GraficosGeneralesScreen'>;

export const GraficosGeneralesScreen = ({ navigation }: Props) => {
    const { data, isLoading, loadData } = useEstadisticasGenerales();
    const [fecha, setFecha] = useState("2025-01-01");
    const [mockData, setMockData] = useState<{area: string, produccion: number, asistencia: number}[]>([]);

    const screenWidth = Dimensions.get("window").width;

    const generateMockData = () => {
        const areas = ['PRODUCCION', 'OFICINA', 'INVENTARIO'];
        return areas.map(area => ({
            area,
            produccion: Math.floor(Math.random() * 100) + 20,
            asistencia: Math.floor(Math.random() * 10) + 5,
        }));
    };

    const handleLoadData = () => {
        loadData(fecha, fecha); 
        
        setMockData(generateMockData());
    };

    useEffect(() => {
        
        setMockData(generateMockData());
        handleLoadData();
    }, []);

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
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    
    const empleadosPorAreaData = data?.statsByArea ? Object.entries(data.statsByArea).map(([area, stats]: [string, any]) => ({
        name: area,
        population: stats.empleados,
        color: area === 'PRODUCCION' ? '#FF6700' : area === 'OFICINA' ? '#3B82F6' : '#10B981',
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
    })) : [];

    
    const produccionPorAreaChartData = {
        labels: mockData.map(item => item.area),
        datasets: [{
            data: mockData.map(item => item.produccion),
        }],
    };

    console.log("Datos gráfica producción (ficticios):", produccionPorAreaChartData);

    
    const asistenciaPorAreaChartData = {
        labels: mockData.map(item => item.area),
        datasets: [{
            data: mockData.map(item => item.asistencia),
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            strokeWidth: 2,
        }],
    };

    console.log("Datos gráfica asistencia (ficticios):", asistenciaPorAreaChartData);

    
    const resumenGeneralData = [
        {
            name: "Empleados Activos",
            population: data?.totalEmpleados || 0,
            color: "#FF6700",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12,
        },
        {
            name: "Total Producción",
            population: data?.totalProduccion || 0,
            color: "#10B981",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12,
        },
        {
            name: "Días de Asistencia",
            population: data?.totalAsistencia || 0,
            color: "#3B82F6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12,
        },
    ];

    if (isLoading && !data) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size="large" color={'#FF6700'} />
                <Text style={style.loadingText}>Cargando estadísticas generales...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={style.root}>

            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Filtro de Fecha</Text>
                <View style={style.actionInputGroup}>
                    <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData} disabled={isLoading}>
                        <Text style={style.btnBuscarText}>
                            {isLoading ? '...' : 'Buscar'}
                        </Text>
                    </TouchableOpacity>
                    <View style={style.inputGroup}>
                        <TextInput
                            style={style.input}
                            placeholder="Fecha (DD/MM/AAAA)"
                            placeholderTextColor={'#6B7280'}
                            value={fecha}
                            onChangeText={setFecha}
                            keyboardType="numbers-and-punctuation"
                        />
                    </View>
                </View>
            </View>

            {data && (
                <View style={style.summaryContainer}>
                    <Text style={style.summaryTitle}>Resumen General</Text>
                    <View style={style.summaryGrid}>
                        <View style={style.summaryCard}>
                            <Text style={style.summaryNumber}>{data.totalEmpleados || 0}</Text>
                            <Text style={style.summaryLabel}>Empleados</Text>
                        </View>
                        <View style={style.summaryCard}>
                            <Text style={style.summaryNumber}>{data.totalProduccion?.toLocaleString() || 0}</Text>
                            <Text style={style.summaryLabel}>Unidades</Text>
                        </View>
                        <View style={style.summaryCard}>
                            <Text style={style.summaryNumber}>{data.totalAsistencia || 0}</Text>
                            <Text style={style.summaryLabel}>Días Trabajo</Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>Empleados por Área</Text>
                {empleadosPorAreaData.length > 0 ? (
                    <PieChart
                        data={empleadosPorAreaData}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        style={style.chart}
                    />
                ) : (
                    <Text style={style.noDataText}>No hay datos de empleados disponibles</Text>
                )}
            </View>

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>Producción por Área</Text>
                <BarChart
                    data={produccionPorAreaChartData}
                    width={screenWidth - 32}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    showBarTops={true}
                    fromZero={true}
                    style={style.chart}
                />
            </View>

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>Asistencia por Área</Text>
                <BarChart
                    data={asistenciaPorAreaChartData}
                    width={screenWidth - 32}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={{
                        ...chartConfig,
                        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                    }}
                    showBarTops={true}
                    fromZero={true}
                    style={style.chart}
                />
            </View>

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>Resumen de Métricas</Text>
                <PieChart
                    data={resumenGeneralData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    style={style.chart}
                />
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6B7280',
    },

    filterContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3,
        borderLeftColor: '#FF6700',
        marginHorizontal: 16,
    },
    filterTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    actionInputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputGroup: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#1F2937',
        fontSize: 13,
        height: 40,
    },
    btnBuscar: {
        backgroundColor: '#FF6700',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
        height: 40,
    },
    btnBuscarText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.3,
    },
    summaryContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#CC5200',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryCard: {
        alignItems: 'center',
        flex: 1,
    },
    summaryNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FF6700',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        textAlign: 'center',
    },
    chartContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#CC5200',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
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
});


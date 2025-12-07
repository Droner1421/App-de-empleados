import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useNomina } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'NominaScreen'>;

export const NominaScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useNomina();
    const [fechaInicio, setFechaInicio] = useState("2025-01-01");
    const [fechaFin, setFechaFin] = useState("2025-01-02");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    if (isLoading && !data) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size="large" color={'#FF6700'} />
                <Text style={style.loadingText}>Calculando nómina...</Text>
            </View>
        );
    }

    const renderHeader = () => (
        <>
            <View style={style.designHeaderContainer}>
                <View style={style.diagonalShape} />
                <View style={style.titleContent}>
                    <Text style={style.headerTitle}>RESUMEN DE NÓMINA</Text>
                    <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
                </View>
            </View>

            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Periodo de Pago</Text>
                <View style={style.actionInputGroup}>
                    <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData} disabled={isLoading}>
                        <Text style={style.btnBuscarText}>
                            {isLoading ? '...' : 'Buscar'}
                        </Text>
                    </TouchableOpacity>
                    <View style={style.inputGroup}>
                        <TextInput
                            style={style.input}
                            placeholder="Inicio (DD/MM/AAAA)"
                            placeholderTextColor={'#6B7280'}
                            value={fechaInicio}
                            onChangeText={setFechaInicio}
                            keyboardType="numbers-and-punctuation"
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Fin (DD/MM/AAAA)"
                            placeholderTextColor={'#6B7280'}
                            value={fechaFin}
                            onChangeText={setFechaFin}
                            keyboardType="numbers-and-punctuation"
                        />
                    </View>
                </View>
            </View>
        </>
    );

    return (
        <View style={style.root}>
            <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false}>
                
                {renderHeader()}

                {}
                {data ? (
                    <View style={style.dataContainer}>
                        <Text style={style.reportTitle}>Cálculo del Periodo</Text>
                        
                        <View style={style.card}>
                            <View style={style.row}>
                                <Text style={style.label}>Días Trabajados:</Text>
                                <Text style={style.value}>{data.diasTrabajados}</Text>
                            </View>
                            <View style={style.row}>
                                <Text style={style.label}>Registros de Asistencia:</Text>
                                <Text style={style.value}>{data.asistencias?.length || 0}</Text>
                            </View>
                            
                            <View style={[style.row, style.rowTotal]}>
                                <Text style={style.labelTotal}>TOTAL NETO A PAGAR</Text>
                                <Text style={style.valueTotal}>${data.total?.toFixed(2) || '0.00'}</Text>
                            </View>
                        </View>
                        
                        {data.detalles && (
                            <View style={style.detailsWrapper}>
                                <Text style={style.detailsTitle}>Detalles (Percepciones/Deducciones)</Text>
                                <View style={style.detailRow}>
                                    <Text style={style.detailLabel}>Salario Base:</Text>
                                    <Text style={style.detailValue}>$1,200.00</Text>
                                </View>
                            </View>
                        )}
                        
                    </View>
                ) : (
                    <View style={style.emptyMessage}>
                        <Text style={style.emptyText}>Utilice el filtro superior para calcular la nómina del empleado en un periodo específico.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
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
    content: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 40,
    },
    
    
    designHeaderContainer: {
        height: 100,
        marginBottom: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        marginHorizontal: -16, 
        marginTop: -12, 
    },
    diagonalShape: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FF6700', 
        transform: [
            { rotateZ: '-5deg' },
            { translateY: -60 }
        ],
        transformOrigin: 'top left',
        height: 180,
        shadowColor: '#FF6700',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    titleContent: {
        position: 'absolute',
        top: 35,
        left: 25,
        right: 20,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 2,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 22,
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
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
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
    
    
    reportTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    dataContainer: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#FF6700', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#CC5200', 
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowTotal: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        marginTop: 5,
        borderBottomWidth: 0,
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: "600",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: '#1F2937',
        flex: 1,
        textAlign: "right",
    },
    labelTotal: {
        fontSize: 16,
        color: '#CC5200', 
        fontWeight: "800",
        flex: 1,
    },
    valueTotal: {
        fontSize: 22,
        fontWeight: "800",
        color: '#FF6700', 
        flex: 1,
        textAlign: "right",
    },
    emptyMessage: {
        padding: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3, 
        borderLeftColor: '#FF6700',
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    detailsWrapper: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderLeftWidth: 3, 
        borderLeftColor: '#FF6700',
    },
    detailsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingBottom: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 13,
        color: '#1F2937',
    }
});


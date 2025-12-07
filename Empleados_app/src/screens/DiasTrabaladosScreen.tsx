import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ReportesDrawerParams } from '../navigator/ReportesNavigator';
import { useDiasTrabajados } from '../hooks/useReportes';

type Props = DrawerScreenProps<ReportesDrawerParams, 'DiasTrabaladosScreen'>;


interface DiaTrabajado {
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
}

export const DiasTrabaladosScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useDiasTrabajados();
    const [fechaInicio, setFechaInicio] = useState("2025-01-01");
    const [fechaFin, setFechaFin] = useState("2025-01-02");

    const formatDate = (dateString: string) => {
        
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return dateString; 
    };

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    const renderHeader = () => (
        <>
            {}
            <View style={style.designHeaderContainer}>
                <View style={style.diagonalShape} />
                <View style={style.titleContent}>
                    <Text style={style.headerTitle}>DÍAS TRABAJADOS</Text>
                    <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
                </View>
            </View>
            
            {}
            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Filtro de Fechas</Text>
                
                <View style={style.actionInputGroup}>
                    {}
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

            {data && data.length > 0 && (
                <Text style={style.listTitle}>Registros encontrados: {data.length}</Text>
            )}
            
           
            {!isLoading && (!data || data.length === 0) && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de días trabajados en el periodo seleccionado.</Text>
                </View>
            )}
        </>
    );

    const renderItem = ({ item }: { item: DiaTrabajado }) => (
        <View style={style.card}>
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.valueDate}>{formatDate(item.a_fecha)}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Entrada:</Text>
                <Text style={style.valueTime}>{item.a_horaEntrada}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.label}>Hora de Salida:</Text>
                <Text style={style.valueTime}>{item.a_horaSalida}</Text>
            </View>
        </View>
    );

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={data || []}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={isLoading ? (
                    <ActivityIndicator style={{ padding: 20 }} size="large" color={'#FF6700'} />
                ) : null}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    listContent: {
        paddingHorizontal: 16,
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
    
    
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6700', 
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowLast: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: "600",
        flex: 1,
    },
    valueDate: {
        fontSize: 14,
        fontWeight: "700",
        color: '#CC5200', 
        flex: 1,
        textAlign: "right",
    },
    valueTime: {
        fontSize: 14,
        fontWeight: "600",
        color: '#1F2937',
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
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
});


import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

interface Props {
    empleado: CreateEmpleadoDto;
    navigation?: any;
}

export const EmpleadosDetail = ({ empleado, navigation }: Props) => {
    const goHome = () => {
        if (navigation) {
            navigation.navigate('HomeEmpleados');
        }
    };
    return (
        <ScrollView style={styles.contenedor}>

            <View style={styles.designHeaderContainer}>
                <View style={styles.diagonalShape} />

                <View style={styles.titleContent}>
                    <Text style={styles.employeeArea}>
                        {empleado.area.toUpperCase()}
                    </Text>
                    <Text style={styles.employeeName}>
                        {empleado.nombre}
                    </Text>
                </View>
            </View>

            <View style={styles.infoWrapper}>

                <View style={styles.seccionFull}>
                    <Text style={styles.tituloSeccion}>Identificación</Text>
                    <View style={styles.datosWrapper}>
                        <View style={styles.fila}>
                            <Text style={styles.etiqueta}>ID Empleado:</Text>
                            <Text style={styles.valor}>{empleado.id_empleado}</Text>
                        </View>
                        <View style={[styles.fila, styles.filaLast]}>
                            <Text style={styles.etiqueta}>Nombre Completo:</Text>
                            <Text style={styles.valor}>{empleado.nombre} {empleado.apellido_p || empleado.apellido} {empleado.apellido_m}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.gridContainer}>

                    <View style={[styles.seccionHalf, styles.cardAccent]}>
                        <Text style={styles.tituloSeccion}>Salario Diario</Text>
                        <View style={styles.datosWrapperGrid}>
                            <Text style={styles.valorLarge}>
                                ${empleado.salarioDiario}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.seccionHalf}>
                        <Text style={styles.tituloSeccion}>Estado</Text>
                        <View style={styles.datosWrapperGrid}>
                            <Text style={[styles.valorLarge, {
                                color: empleado.activo ? '#10B981' : '#EF4444'
                            }]}>
                                {empleado.activo ? 'ACTIVO' : 'INACTIVO'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.seccionFull}>
                    <Text style={styles.tituloSeccion}>Detalles Laborales</Text>
                    <View style={styles.datosWrapper}>
                        <View style={styles.fila}>
                            <Text style={styles.etiqueta}>Área / Puesto:</Text>
                            <Text style={styles.valor}>{empleado.area}</Text>
                        </View>
                        <View style={[styles.fila, styles.filaLast]}>
                            <Text style={styles.etiqueta}>Turno:</Text>
                            <Text style={styles.valor}>{empleado.turno}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.bottomSpace} />

            <TouchableOpacity style={styles.btnHomeFab} onPress={goHome} activeOpacity={0.8}>
                <Text style={styles.btnHomeText}>←</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    designHeaderContainer: {
        height: 100,
        marginBottom: 25,
        overflow: 'hidden',
        justifyContent: 'center',
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
    employeeArea: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 2,
        letterSpacing: 1,
    },
    employeeName: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 22,
    },
    employeeLastName: {
        fontSize: 0,
        height: 0,
    },

    infoWrapper: {
        paddingHorizontal: 16,
    },
    seccionFull: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: -5,
    },
    seccionHalf: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        paddingBottom: 10,
    },
    cardAccent: {
        borderBottomWidth: 4,
        borderBottomColor: '#FF6700',
    },
    tituloSeccion: {
        fontSize: 12,
        fontWeight: '700',
        color: '#333333',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 5,
    },

    datosWrapper: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    datosWrapperGrid: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 12,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    filaLast: {
        borderBottomWidth: 0,
        marginBottom: 0,
    },
    etiqueta: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        flex: 1,
    },
    valor: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    valorBold: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '700',
        flex: 1,
        textAlign: 'right',
    },
    valorLarge: {
        fontSize: 18,
        fontWeight: '800',
        color: '#333333',
        textAlign: 'center',
    },

    bottomSpace: {
        height: 60,
    },
    btnHomeFab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        
        backgroundColor: '#FF6700',
        borderRadius: 30,
        width: 50,
        height: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,

        shadowColor: '#FF6700',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 15,
    },
    btnHomeText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 4,
    },
});


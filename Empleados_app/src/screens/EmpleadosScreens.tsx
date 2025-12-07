import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ReportesDrawerParams } from '../navigator/ReportesNavigator';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { EmpleadosDetail } from '../components/EmpleadosDetail';
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

type Props = DrawerScreenProps<ReportesDrawerParams, 'EmpleadosScreens'>;

export const EmpleadosScreens = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: CreateEmpleadoDto };

    if (!empleado) {
        return (
            <View style={styles.loadingContainer}>
               
                <ActivityIndicator color="#FF6700" size={60} /> 
            </View>
        );
    }

    return(
        <View style={styles.container}>
            
            <EmpleadosDetail empleado={empleado} navigation={navigation} />
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        backgroundColor: '#F9FAFB', 
    },
    loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F9FAFB',
    }
});


import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EmpleadosScreens } from '../screens/EmpleadosScreens';
import { ReporteAsistenciaScreen } from '../screens/ReporteAsistenciaScreen';
import { AsistenciaEmpleadoScreen } from '../screens/AsistenciaEmpleadoScreen';
import { NominaScreen } from '../screens/NominaScreen';
import { DiasTrabaladosScreen } from '../screens/DiasTrabaladosScreen';
import { ReporteProduccionScreen } from '../screens/ReporteProduccionScreen';
import { HorasTrabajadasScreen } from '../screens/HorasTrabajadasScreen';
import { UnidadesProducidasScreen } from '../screens/UnidadesProducidasScreen';

import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

export type ReportesDrawerParams = {
    EmpleadosScreens: { empleado: CreateEmpleadoDto };
    ReporteAsistenciaScreen: { empleado: CreateEmpleadoDto };
    AsistenciaEmpleadoScreen: { empleado: CreateEmpleadoDto };
    NominaScreen: { empleado: CreateEmpleadoDto };
    DiasTrabaladosScreen: { empleado: CreateEmpleadoDto };
    ReporteProduccionScreen: { empleado: CreateEmpleadoDto };
    HorasTrabajadasScreen: { empleado: CreateEmpleadoDto };
    UnidadesProducidasScreen: { empleado: CreateEmpleadoDto };
    GraficosScreen: { empleado: CreateEmpleadoDto };
};

const Drawer = createDrawerNavigator<ReportesDrawerParams>();

export const ReportesNavigator = ({ empleado }: { empleado: CreateEmpleadoDto }) => {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FF6700',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 16,
                    letterSpacing: 0.3,
                },
                headerLeft: () => (
                    <TouchableOpacity 
                        style={{ paddingHorizontal: 12 }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: '600' }}>☰</Text>
                    </TouchableOpacity>
                ),
                drawerActiveTintColor: '#3B82F6',
                drawerInactiveTintColor: '#9CA3AF',
                drawerLabelStyle: {
                    fontSize: 13,
                    fontWeight: '600',
                },
                drawerStyle: {
                    backgroundColor: '#F8F9FB',
                },
                drawerItemStyle: {
                    borderRadius: 8,
                    marginHorizontal: 8,
                },
            })}
        >
            <Drawer.Screen
                name="EmpleadosScreens"
                component={EmpleadosScreens}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Detalles Empleado',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="ReporteAsistenciaScreen"
                component={ReporteAsistenciaScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Reporte Asistencia',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="AsistenciaEmpleadoScreen"
                component={AsistenciaEmpleadoScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Asistencia Detallada',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="NominaScreen"
                component={NominaScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Nómina',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="DiasTrabaladosScreen"
                component={DiasTrabaladosScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Días Trabajados',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="ReporteProduccionScreen"
                component={ReporteProduccionScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Reporte Producción',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="HorasTrabajadasScreen"
                component={HorasTrabajadasScreen}
                initialParams={{ empleado }}
                options={{ 
                    drawerLabel: 'Horas Trabajadas',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
            <Drawer.Screen
                name="UnidadesProducidasScreen"
                component={UnidadesProducidasScreen}
                initialParams={{ empleado }}
                options={{
                    drawerLabel: 'Unidades Producidas',
                    title: `Reportes - ${empleado.nombre}`,
                }}
            />
           
        </Drawer.Navigator>
    );
};


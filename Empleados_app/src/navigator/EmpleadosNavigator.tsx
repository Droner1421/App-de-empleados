import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text } from "react-native";
import { HomeEmpleados } from "../screens/HomeEmpleados";
import { ReportesNavigator } from "./ReportesNavigator";
import { ConfigureIpApi } from "../screens/ConfigureIpApi";
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';
import { GraficosGeneralesScreen } from "../screens/GraficosGeneralesScreen";

export type RootStackParams = {
    HomeEmpleados: undefined;
    Reportes: { empleado: CreateEmpleadoDto };
    ConfigureIpApi: undefined;
}

export type RootDrawerParams = {
    HomeStack: undefined;
    ConfigureIpApi: undefined;
    GraficosGeneralesScreen: undefined;
}

const HomeStack = () => {
    const Stack = createStackNavigator<RootStackParams>();
    
    return (
        <Stack.Navigator
            initialRouteName="HomeEmpleados"
            screenOptions={{
                headerMode: "float",
                headerShown: false, 
            }}
        >
            <Stack.Screen name="HomeEmpleados" component={ HomeEmpleados } />
            <Stack.Screen 
                name="Reportes" 
                component={({ route }: any) => <ReportesNavigator empleado={route.params.empleado} />}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export const EmpleadosNavigator = () => {
    const Drawer = createDrawerNavigator<RootDrawerParams>();

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
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: "Empleados",
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="ConfigureIpApi"
                component={ConfigureIpApi}
                options={{
                    title: "Configurar IP del API",
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="GraficosGeneralesScreen"
                component={GraficosGeneralesScreen}
                options={{
                    title: "Estadísticas Generales",
                }}
            />
        </Drawer.Navigator>
    );
}


import React from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEmpleados } from "../hooks/useEmpleados";
import { EmpleadosCard } from "../components/EmpleadosCard";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeEmpleadosNavigationProp = DrawerNavigationProp<any, 'HomeStack'>;

interface HomeEmpleadosProps {
    navigation: HomeEmpleadosNavigationProp;
}

export const HomeEmpleados = ({ navigation }: HomeEmpleadosProps) => {
    const { empleados, isLoading, LoadEmpleados } = useEmpleados();

    const ListHeader = () => (
        <View style={style.headerContainer}>

            <View style={style.headerTopBar}>
                <TouchableOpacity
                    style={style.menuButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Text style={style.menuButtonText}>☰</Text>
                </TouchableOpacity>

                <View style={style.titleWrapper}>
                    <Text style={style.titulo}>
                        Directorio de Personal
                    </Text>
                    <Text style={style.subTitulo}>
                        Información y Reportes
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={ style.root }>
            <FlatList
                data={ empleados }
                keyExtractor={ (empleado, index) => `${empleado.id_empleado}${index}` }

                ListHeaderComponent={ ListHeader }

                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={style.columnWrapper}

                renderItem={ ({item}) => (
                    <EmpleadosCard empleado={item} />
                )}

                onEndReached={ LoadEmpleados }
                onEndReachedThreshold={ 0.2 }

                ListFooterComponent={(
                    isLoading && (
                        <ActivityIndicator
                            style={style.loadingIndicator}
                            size={ 50 }
                            color={'#FF6700'}
                        />
                    )
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: '#F9FAFB',
    },
    headerContainer: {
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: '#FF6700', 
        marginBottom: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 8,
    },
    headerTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleWrapper: {
        flex: 1,
        paddingHorizontal: 15,
    },
    titulo: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'left',
        marginBottom: 2,
    },
    subTitulo: {
        fontSize: 12, 
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'left',
    },
    menuButton: {
        padding: 5,
    },
    menuButtonText: {
        fontSize: 28,
        color: '#FFFFFF',
        lineHeight: 28,
        height: 28,
    },
    columnWrapper: {
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
    },
    loadingIndicator: {
        height: 100,
        marginTop: 20,
    }
});


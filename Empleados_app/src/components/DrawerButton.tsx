import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Props {
    drawerNavigation: DrawerNavigationProp<any>;
    menuType?: 'empleados' | 'reportes';
}

export const DrawerButton = ({ drawerNavigation, menuType = 'reportes' }: Props) => {
    
    const handlePress = () => {
        try {
            
            console.log('DrawerButton presionado, menuType:', menuType);
            console.log('Navigation state:', drawerNavigation.getState?.());
            drawerNavigation.openDrawer();
        } catch (error) {
            console.error('Error al abrir drawer:', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>☰ Menú de {menuType === 'reportes' ? 'Reportes' : 'Empleados'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});


import { empleadosApi } from "../api/empleadosApi";
import { useEffect, useState, useRef, useContext } from "react";
import { Empleados, CreateEmpleadoDto } from "../interfaces/empleadosInterface";
import { ApiConfigContext } from "../context/ApiConfigContext";

interface UseEmpleados {
    isLoading: boolean;
    empleados: CreateEmpleadoDto[];
    LoadEmpleados: () => void;
}

export const useEmpleados = (): UseEmpleados => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [empleados, setEmpleados] = useState<CreateEmpleadoDto[]>([]);
    const { apiIP } = useContext(ApiConfigContext);
    const nextPageUrl = useRef("");

    const LoadEmpleados = async() => {
        if (isLoading) return;
        
        
        if (!nextPageUrl.current) {
            nextPageUrl.current = `${apiIP}/api/dsm44/empleados`;
        }
        
        setIsLoading(true);
        
        try {
            const respuesta = await empleadosApi.get<Empleados>(nextPageUrl.current);
            nextPageUrl.current = respuesta.data.next || nextPageUrl.current;
            setEmpleados((prevList) => [...prevList, ...respuesta.data.data as unknown as CreateEmpleadoDto[]]);
        } catch (error) {
            console.error("Error cargando empleados:", error);
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        
        nextPageUrl.current = `${apiIP}/api/dsm44/empleados`;
        setEmpleados([]);
        LoadEmpleados();
    }, [apiIP]);

    return {
        isLoading,
        empleados,
        LoadEmpleados    
    }
}


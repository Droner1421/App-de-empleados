import { useState, useContext } from "react";
import { empleadosApi } from "../api/empleadosApi";
import { ApiConfigContext } from "../context/ApiConfigContext";
import {
    ReporteAsistencia,
    AsistenciaEmpleado,
    Nomina,
    DiasTrabajados,
    ReporteProduccion,
    HorasTrabajadas,
    UnidadesProducidas,
} from "../interfaces/empleadosInterface";

export const useReporteAsistencia = () => {
    const [data, setData] = useState<ReporteAsistencia | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<ReporteAsistencia>(
            `${BASE_URL}/reporte-asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useAsistenciaEmpleado = () => {
    const [data, setData] = useState<AsistenciaEmpleado | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<AsistenciaEmpleado>(
            `${BASE_URL}/asistencia-empleado?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useNomina = () => {
    const [data, setData] = useState<Nomina | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<Nomina>(
            `${BASE_URL}/nomina?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useDiasTrabajados = () => {
    const [data, setData] = useState<DiasTrabajados[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<DiasTrabajados[]>(
            `${BASE_URL}/dias-trabajados?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useReporteProduccion = () => {
    const [data, setData] = useState<ReporteProduccion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<ReporteProduccion[]>(
            `${BASE_URL}/reporte-produccion?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useHorasTrabajadas = () => {
    const [data, setData] = useState<HorasTrabajadas[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<HorasTrabajadas[]>(
            `${BASE_URL}/horas-trabajadas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useUnidadesProducidas = () => {
    const [data, setData] = useState<UnidadesProducidas | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (id_empleado: number, fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;
        const response = await empleadosApi.get<UnidadesProducidas>(
            `${BASE_URL}/unidades-producidas?id_empleado=${id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        setData(response.data);
        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useEmpleadosPorArea = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async () => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;

        try {
            
            const empleadosResponse = await empleadosApi.get(`${BASE_URL}?limit=1000`);
            const empleados = empleadosResponse.data.data || [];

            
            const statsByArea = empleados.reduce((acc: any, emp: any) => {
                if (!acc[emp.area]) {
                    acc[emp.area] = {
                        empleados: 0
                    };
                }
                acc[emp.area].empleados += 1;
                return acc;
            }, {});

            setData({
                empleados,
                statsByArea,
                totalEmpleados: empleados.length
            });

        } catch (error) {
            console.error("Error cargando empleados:", error);
            setData(null);
        }

        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};

export const useEstadisticasGenerales = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { apiIP } = useContext(ApiConfigContext);

    const loadData = async (fechaInicio: string, fechaFin: string) => {
        setIsLoading(true);
        const BASE_URL = `${apiIP}/api/dsm44/empleados`;

        try {
            
            const empleadosResponse = await empleadosApi.get(`${BASE_URL}?limit=1000`);
            const empleados = empleadosResponse.data.data || [];

            
            const produccionPromises = empleados.map((emp: any) =>
                empleadosApi.get(`${BASE_URL}/reporte-produccion?id_empleado=${emp.id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            );

            const produccionResults = await Promise.all(produccionPromises);
            const produccionData = produccionResults.flatMap(result => result.data || []);

            
            const asistenciaPromises = empleados.map((emp: any) =>
                empleadosApi.get(`${BASE_URL}/dias-trabajados?id_empleado=${emp.id_empleado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            );

            const asistenciaResults = await Promise.all(asistenciaPromises);
            const asistenciaData = asistenciaResults.flatMap(result => result.data || []);

            
            const statsByArea = empleados.reduce((acc: any, emp: any) => {
                if (!acc[emp.area]) {
                    acc[emp.area] = {
                        empleados: 0,
                        produccion: 0,
                        asistencia: 0
                    };
                }
                acc[emp.area].empleados += 1;
                return acc;
            }, {});

            
            produccionData.forEach((prod: any) => {
                const empleado = empleados.find((emp: any) => emp.id_empleado === prod.e_id_empleado);
                if (empleado && statsByArea[empleado.area]) {
                    statsByArea[empleado.area].produccion += prod.p_unidadesProducidas;
                }
            });

            
            asistenciaData.forEach((asis: any) => {
                const empleado = empleados.find((emp: any) => emp.id_empleado === asis.e_id_empleado);
                if (empleado && statsByArea[empleado.area]) {
                    statsByArea[empleado.area].asistencia += 1;
                }
            });

            const finalData = {
                empleados,
                produccionData,
                asistenciaData,
                statsByArea,
                totalEmpleados: empleados.length,
                totalProduccion: produccionData.reduce((sum: number, prod: any) => sum + prod.p_unidadesProducidas, 0),
                totalAsistencia: asistenciaData.length
            };

            setData(finalData);

        } catch (error) {
            console.error("Error cargando estadísticas generales:", error);
            setData(null);
        }

        setIsLoading(false);
    };

    return { data, isLoading, loadData };
};


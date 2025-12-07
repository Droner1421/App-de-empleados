import requests
import random
import time
from datetime import datetime, timedelta

API_BASE = "http://localhost:3000/api/dsm44"
TOTAL_EMPLEADOS = 80
YEAR = 2025
EMPLEADOS = []

AREAS = ["OFICINA", "PRODUCCION", "INVENTARIO"]
TURNOS = ["MATUTINO", "VESPERTINO", "NOCTURNO", "MIXTO"]
STATUS_ASISTENCIA = ["EN_TURNO", "FINALIZADO"]

NOMBRES = [
    "Juan","Carlos","Luis","Miguel","Jose","Jorge","Felipe","Hector",
    "Marco","Ricardo","Fernando","Pablo","Rafael","Alberto","Andres",
    "Roberto","Eduardo","Cristian","Mario","Diego","Omar","Sergio",
    "Francisco","Adrian","Hernan","Erick","Kevin","Oscar","Manuel",
    "Víctor","Alan","Emilio","Ramiro","Leonardo","Esteban","Bruno",
    "Mauricio","Gustavo","Elías","Tomás",
]

APELLIDOS = [
    "Hernandez","Martinez","Gomez","Perez","Lopez","Garcia",
    "Rodriguez","Sanchez","Ramirez","Cruz","Torres","Rivera",
    "Gonzalez","Flores","Vargas","Castillo","Ortega","Ruiz",
    "Aguilar","Chavez","Dominguez","Silva","Navarro","Salazar",
    "Mendoza","Ponce","Morales","Soto","Camacho","Cortés",
    "Arias","Palacios","Estrada","Valdez","Montoya","Ramos"
]


def random_item(arr):
    return random.choice(arr)


def generar_nombre_completo():
    return {
        "nombre": random_item(NOMBRES),
        "apellido_p": random_item(APELLIDOS),
        "apellido_m": random_item(APELLIDOS)
    }


def generar_fechas_2025():
    fechas = []
    start = datetime(YEAR, 1, 1)
    for i in range(365):
        fecha = start + timedelta(days=i)
        fechas.append(fecha.strftime("%Y-%m-%d"))
    return fechas


FECHAS_2025 = generar_fechas_2025()


def make_iso(fecha, hour, minute):
    y, m, d = map(int, fecha.split("-"))
    return datetime(y, m, d, hour, minute).isoformat()


def safe_post(url, body, max_intentos=10, delay=1):
    for intento in range(1, max_intentos + 1):
        try:
            return requests.post(url, json=body)
        except Exception as e:
            print(f"Error Intento {intento}/{max_intentos} -> {url}. Reintentando...")
            time.sleep(delay)

    print(f"❌ ERROR FINAL: {url}")
    return None


def registerA_P(fecha, empleado):
    entradaISO = make_iso(fecha, 8, 0)
    salidaISO = make_iso(fecha, 17, 0)

    hora_entrada = datetime.fromisoformat(entradaISO)
    hora_salida = datetime.fromisoformat(salidaISO)
    diferencia_horas = (hora_salida - hora_entrada).total_seconds() / 3600

    registro_asistencia = safe_post(
        f"{API_BASE}/empleados/create-asistencia",
        {
            "fecha": fecha,
            "horaEntrada": entradaISO,
            "horaSalida": salidaISO,
            "entrada": entradaISO,
            "salida": salidaISO,
            "status": random_item(STATUS_ASISTENCIA),
            "empleado": empleado,
            "horasTrabajadas": diferencia_horas
        }
    )

    registro_produccion = safe_post(
        f"{API_BASE}/empleados/create-produccion",
        {
            "fecha": fecha,
            "turno": random_item(TURNOS),
            "unidadesProducidas": random.randint(0, 3000),
            "empleado": empleado
        }
    )

    return registro_asistencia, registro_produccion


# MAIN
def main():
    print("\n--- REGISTRANDO EMPLEADOS ---\n")

    for i in range(1, TOTAL_EMPLEADOS + 1):
        data_nombre = generar_nombre_completo()

        empleado_payload = {
            "nombre": data_nombre["nombre"],
            "apellido_p": data_nombre["apellido_p"],
            "apellido_m": data_nombre["apellido_m"],
            "area": random_item(AREAS),
            "turno": random_item(TURNOS),
            "salarioDiario": 200 + random.random() * 350,
            "activo": True
        }

        r = safe_post(f"{API_BASE}/empleados", empleado_payload)
        if not r:
            continue

        data = r.json()
        EMPLEADOS.append(data["id_empleado"])

        print(f"Empleado registrado: {data['id_empleado']} - {data['nombre']} {data['apellido_p']} {data['apellido_m']}")

    if not EMPLEADOS:
        print("❌ No se generaron empleados")
        return

    print("\n--- REGISTRANDO ASISTENCIAS & PRODUCCIÓN ---\n")

    for fecha in FECHAS_2025:
        for empleado in EMPLEADOS:
            asistencia, produccion = registerA_P(fecha, empleado)

            if asistencia and produccion:
                a = asistencia.json()
                p = produccion.json()

                print(f"Asistencia {a['id_reg_a']} -> {empleado} {a['fecha']} {a['horaEntrada']}")
                print(f"Producción {p['id_reg_p']} -> {empleado} {p['fecha']} {p['unidadesProducidas']}")


main()

/*
  Schema de Base de Datos para Sistema de Citas Médicas

  Propósito:
  - Define la estructura de datos para el sistema de citas médicas
  - Utiliza AWS Amplify para el modelado y autorización
  - Maneja información de médicos, pacientes y citas

  Estructura Principal:
  - Modelo SistemaCitasMedicas con llaves PK/SK para particionamiento
  - Atributos organizados por entidad (médico, paciente, cita)
  - Sistema de autorización basado en propietario

  Atributos por Entidad:

  Comunes:
  - Nombre, Teléfono, Email, Cédula: Información básica de contacto

  Médico:
  - Especialidad: Área de práctica médica
  - HorarioDisponible: Horarios de atención
  - CuposDiarios: Límite de pacientes por día

  Paciente:
  - Fecha_Nacimiento: Para cálculo de edad
  - Género: Información demográfica
  - Dirección: Ubicación del paciente

  Cita:
  - Fecha y Hora: Programación temporal
  - Estado: Control del ciclo de vida de la cita
  - MedicoID: Referencia al médico asignado
  - Duración: Tiempo asignado para la consulta

  Diagnóstico:
  - Descripción: Detalles del diagnóstico médico

  Seguridad:
  - Autorización por usuario (userPool)
  - API Key con expiración de 30 días
*/

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
const schema = a.schema({
  SistemaCitasMedicas: a
    .model({
      PK: a.string(),
      SK: a.string(),
      Tipo: a.string(),

      // Atributos comunes
      Nombre: a.string(),
      Telefono: a.string(),
      Email: a.string(),
      Cedula: a.string(),

      // Médico
      Especialidad: a.string(),
      HorarioDisponible: a.string(),
      CuposDiarios: a.integer(),

      // Paciente
      Fecha_Nacimiento: a.string(),
      Genero: a.string(),
      Direccion: a.string(),

      // Cita
      Fecha: a.string(),
      Hora: a.string(),
      // Motivo: a.string(),
      Estado: a.string(),
      MedicoID: a.string(),
      Duracion: a.integer(),

      // Diagnóstico
      Descripcion: a.string(),
    }).authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

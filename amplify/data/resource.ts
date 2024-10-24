import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
La sección a continuación crea una tabla de base de datos para el sistema de citas médicas.
=========================================================================*/
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
      Motivo: a.string(),
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

/*== STEP 2 ===============================================================
Ve a tu código fuente del frontend. Desde tu código del lado del cliente, genera un
cliente de datos para hacer solicitudes CRUDL a tu tabla.
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // usa este cliente de datos para solicitudes CRUDL
*/

/*== STEP 3 ===============================================================
Obtén registros de la base de datos y úsalos en tus componentes frontend.
=========================================================================*/

// const { data: citas } = await client.models.SistemaCitasMedicas.list()

// return <ul>{citas.map(cita => <li key={cita.PK}>{cita.Nombre}</li>)}</ul>

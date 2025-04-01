
export type Maybe<T> = T | undefined | null;

// send methods ------------------------------------
export enum SendMethod {
  sms = "sms",
  email = "email",
  whatsapp = "whatsapp",
}

export const sendMethodSteps: Record<SendMethod, number> = {
  [SendMethod.sms]: 3,
  [SendMethod.email]: 4,
  [SendMethod.whatsapp]: 5,
};


export const sendMethodOptions = {
  [SendMethod.sms]: {
    label: "Sms",
    description: "Envía un mensaje de texto",

  },
  [SendMethod.email]: {
    label: "Correo electrónico",
    description: "Envía un correo con los detalles",
  },
  [SendMethod.whatsapp]: {
    label: "WhatsApp",
    description: "Envía un mensaje por WhatsApp",
  },
}
export type SendMethodKey = keyof typeof sendMethodOptions;



//templates ----------------------------------

export enum TemplateLabel {
  plantilla_invitacion = "Plantilla Invitación",
  plantilla_recordatorio = "Plantilla Recordatorio",
  plantilla_personalizado = "Plantilla Personalizada",
}

export const templateOptions = {
  plantilla_invitacion: {
    label: TemplateLabel.plantilla_invitacion,
    sms: {
      message:
        "Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!",
    },
    whatsapp: {
      message:
        "Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!",
    },
    email: {
      subject: "Invitación al proceso de [nombre del proceso]",
      message:
        "Estimado/a [Nombre],\n\nEsperamos que te encuentres bien. A través de este medio, queremos invitarte a participar en el proceso de [nombre del proceso], que se llevará a cabo el [fecha] a las [hora]. El lugar del encuentro será [dirección/sala virtual].\n\nTu participación es muy importante para nosotros. Agradeceríamos que confirmes tu asistencia respondiendo a este correo.\n\nQuedamos atentos a cualquier consulta que puedas tener.\n\nCordialmente, [Nombre del remitente] [Puesto] [Empresa/Organización]",
    },
  },
  plantilla_recordatorio: {
    label: TemplateLabel.plantilla_recordatorio,
    sms: {
      message:
        "Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!",
    },
    whatsapp: {
      message:
        "Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!",
    },
    email: {
      subject: "Recordatorio del proceso de [nombre del proceso]",
      message:
        "Estimado/a [Nombre],\n\nQueremos recordarte que el proceso de [nombre del proceso], al que amablemente confirmaste tu asistencia, se realizará el [fecha] a las [hora].\n\nEl evento tendrá lugar en [dirección/sala virtual]. Si tienes alguna duda o necesitas asistencia previa, no dudes en contactarnos.\n\nTe esperamos puntual.\n\nSaludos cordiales, [Nombre del remitente] [Puesto] [Empresa/Organización]",
    },
  },
  plantilla_personalizado: {
    label: TemplateLabel.plantilla_personalizado,
    sms: { message: "" },
    whatsapp: { message: "" },
    email: { subject: "", message: "" },
  },
};

export type TemplateKey = keyof typeof templateOptions;

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

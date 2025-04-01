import { SendMethod } from "./send_methods";

export type Messages = {
  // export interface Messages  {
  sms: string;
  emailSubject: string;
  emailMessage: string;
  whatsapp: string;
};

export type MessagesKey = keyof Messages;


export const messageFieldsConfig: Record<MessagesKey, {
  label: string;
  defaultValue: string;
  elementType: "textarea" | "input";
  sendMethod: SendMethod;
}> = {
  sms: {
    label: "Mensaje SMS",
    defaultValue: "",
    elementType: "textarea",
    sendMethod: SendMethod.sms,
  },
  emailSubject: {
    label: "Asunto del correo",
    defaultValue: "",
    elementType: "input",
    sendMethod: SendMethod.email,
  },
  emailMessage: {
    label: "Mensaje del correo",
    defaultValue: "",
    elementType: "textarea",
    sendMethod: SendMethod.email,
  },
  whatsapp: {
    label: "Mensaje WhatsApp",
    defaultValue: "",
    elementType: "textarea",
    sendMethod: SendMethod.whatsapp,
  },
};

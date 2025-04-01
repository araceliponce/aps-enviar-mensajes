
/* 
https://www.youtube.com/watch?v=kK_Wqx3RnHk

you can use switch case, ifs

const ACTIONS, for not fixed strings
*/

import { Maybe, TemplateKey, State } from "./types";
import { messageFieldsConfig, MessagesKey } from "./messages";  // Make sure the path is correct
import { SendMethod } from "./send_methods";

// const ACTIONS = {
//   TOGGLE_PERSON: 'toggle person',
// }



export enum ActionType {
  TOGGLE_PERSON = "TOGGLE_PERSON",
  SET_STEP = "SET_STEP",
  SET_TEMPLATE = "SET_TEMPLATE",
  TOGGLE_SEND_METHOD = "TOGGLE_SEND_METHOD",
  SET_MESSAGE = "SET_MESSAGE",
}
//each action has: type and payload (can be any names, but its the convention)
// type is basically the name of the action. in the reducer will perform some actions
// payload is the extra information that the action needs to modify the state
type Action =
  | { type: ActionType.TOGGLE_PERSON; payload: string }
  | { type: ActionType.SET_STEP; payload: number }
  | { type: ActionType.SET_TEMPLATE; payload: Maybe<TemplateKey> }
  | { type: ActionType.TOGGLE_SEND_METHOD; payload: SendMethod }
  | { type: ActionType.SET_MESSAGE; payload: { key: MessagesKey; value: string } };



export const initialState: State = {
  selectedPeople: [],
  step: 1,
  selectedTemplate: null,
  sendMethods: [],
  messages: {
    sms: messageFieldsConfig.sms.defaultValue,
    emailSubject: messageFieldsConfig.emailSubject.defaultValue,
    emailMessage: messageFieldsConfig.emailMessage.defaultValue,
    whatsapp: messageFieldsConfig.whatsapp.defaultValue,
  },
};


// reducer takes :state and action -> to return new state
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.TOGGLE_PERSON:
      return {
        ...state,
        selectedPeople: state.selectedPeople.includes(action.payload)
          ? state.selectedPeople.filter((p) => p !== action.payload)
          : [...state.selectedPeople, action.payload],
      };
    case ActionType.SET_STEP:
      return { ...state, step: action.payload };
    case ActionType.SET_TEMPLATE:
      return { ...state, selectedTemplate: action.payload };
    case ActionType.TOGGLE_SEND_METHOD:
      return {
        ...state,
        sendMethods: state.sendMethods
          .includes(action.payload)
          ? state.sendMethods.filter((method) => method !== action.payload)
          : [...state.sendMethods, action.payload],
      };
    case ActionType.SET_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.key]: action.payload.value
        },
      };
    default:
      return state;
  }
};

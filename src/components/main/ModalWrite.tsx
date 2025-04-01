import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogFooter } from "./DialogFooter";
import { messageFieldsConfig, MessagesKey } from "@/utils/messages";
import { ActionType } from "@/utils/reducer";
import { SendMethod } from "@/utils/send_methods";
import { State } from "@/utils/types";


type ModalToWriteProps = {
  step: number;
  state: State;
  dispatch: React.Dispatch<any>;
  dialogFooterProps: any; // 
};

const stepToSendMethod: Record<number, SendMethod> = {
  3: SendMethod.sms,
  4: SendMethod.email,
  5: SendMethod.whatsapp,
};

export const ModalToWrite: React.FC<ModalToWriteProps> = ({ step, state, dispatch, dialogFooterProps }) => {
  const sendMethod = stepToSendMethod[step];

  if (!sendMethod || !state.sendMethods.includes(sendMethod)) return null;

  const fields = Object.keys(messageFieldsConfig).filter(
    (key) => messageFieldsConfig[key as MessagesKey].sendMethod === sendMethod
  );

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {step === 3 ? "Mensaje SMS" : step === 4 ? "Correo Electrónico" : "Mensaje WhatsApp"}
        </DialogTitle>
      </DialogHeader>

      <div className="dialog__content gap-2">
        {fields.map((key) => {
          const field = messageFieldsConfig[key as MessagesKey];

          return (
            // react fragment since we need key but not another div as child of .dialog_content (to keep grid style)
            <React.Fragment key={key}>
              <label className="text-xs">{field.label}</label>
              {field.elementType === "textarea" ? (
                <textarea
                  value={state.messages[key as MessagesKey]}
                  onChange={(e) =>
                    dispatch({
                      type: ActionType.SET_MESSAGE,
                      payload: { key: key as MessagesKey, value: e.target.value },
                    })
                  }
                />
              ) : (
                <input
                  type="text"
                  value={state.messages[key as MessagesKey]}
                  onChange={(e) =>
                    dispatch({
                      type: ActionType.SET_MESSAGE,
                      payload: { key: key as MessagesKey, value: e.target.value },
                    })
                  }
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <DialogFooter {...dialogFooterProps} />
    </div>
  );
};

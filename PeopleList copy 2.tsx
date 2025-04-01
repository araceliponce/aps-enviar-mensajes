import { ModalChooseTemplate } from "@/components/main/ModalChooseTemplate";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import peopleData from "@/data/people.json";
import { downloadJSON, getMessageKeys, getNextStep, getPrevStep } from "@/utils/functions";
import { ActionType, initialState, reducer } from "@/utils/reducer";
import { Send } from "lucide-react";
import React, { useEffect, useReducer, useRef } from "react";
import { DialogFooter } from "./DialogFooter";
import { sendMethodOptions, SendMethodKey, SendMethod } from "@/utils/send_methods";
import { templateOptions, StateForStorage } from "@/utils/types";

export const PeopleList: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, initialState)


  const localStorageRef = useRef<any>(null); //useref since it doesnt need to cause re render





  useEffect(() => {
    if (state.selectedTemplate) {
      const template = templateOptions[state.selectedTemplate];
      if (template) {
        dispatch({ type: ActionType.SET_MESSAGE, payload: { key: "sms", value: template.sms.message } });
        dispatch({ type: ActionType.SET_MESSAGE, payload: { key: "whatsapp", value: template.whatsapp.message } });
        dispatch({ type: ActionType.SET_MESSAGE, payload: { key: "emailSubject", value: template.email.subject } });
        dispatch({ type: ActionType.SET_MESSAGE, payload: { key: "emailMessage", value: template.email.message } });
      }
    }

  }, [state.selectedTemplate]);


  const toggleSelection = (correo: string) => {
    dispatch({
      type: ActionType.TOGGLE_PERSON, payload: correo
    })
  };


  const goBack = () => {

    dispatch({ type: ActionType.SET_STEP, payload: getPrevStep(state.step, state.sendMethods) })
  }

  // 1. save into local storage
  // 2. go next
  const handleNext = () => {

    // 1.
    const formData: StateForStorage = {
      selectedPeople: state.selectedPeople,
      selectedTemplate: state.selectedTemplate,
      sendMethods: state.sendMethods,
      messages: state.messages
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorageRef.current = formData;


    // 2.
    const nextStep = getNextStep(state.step, state.sendMethods);

    if (nextStep) {
      // setStep(nextStep);
      dispatch({ type: ActionType.SET_STEP, payload: nextStep })
    } else {
      handleSubmit(); // if no next step, submit
    }
  };

  // 1.save into local storage
  // 2. save json
  // 3. console shows in table and in log
  const handleSubmit = () => {

    // console.log('this is form data: ', localStorage['formData'])
    // localStorageRef.current = localStorage['formData']; x
    localStorageRef.current = JSON.parse(localStorage.getItem("formData") || "{}");

    if (localStorageRef.current && Object.keys(localStorageRef.current).length > 0) {
      console.log("will download");
      downloadJSON(localStorageRef.current, "aps.json");
    } else {
      // console.log("no local storage ref current");
    }



    console.table(state);
    console.log(state);
  };


  const dialogFooterProps = {
    step: state.step,
    sendMethods: state.sendMethods,
    onBack: goBack,
    onNext: handleNext,
    onSubmit: handleSubmit,
    isNextDisabled: !state.selectedTemplate,
  };


  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Seleccionar Personas</h1>
      <div className="pb-6">
        {peopleData.map((person, index) => (
          <label key={person.correo} className="people__label" id={`person-${index}`}>
            <div className="grid place-content-center">
              <input
                type="checkbox"
                checked={state.selectedPeople.includes(person.correo)}
                onChange={() => toggleSelection(person.correo)}
              />
            </div>
            <div className="grid sm:flex flex-wrap justify-between">
              <span>{person.nombre} {person.apellido}</span>
              <span className="email">{person.correo}</span>
            </div>
          </label>
        ))}
      </div>




      <p>holaaaaaaaa</p>





      <Dialog>
        <div className="ms-auto w-fit">
          <DialogTrigger asChild disabled={state.selectedPeople.length === 0}>
            <button >
              <span>Enviar Mensajes</span>
              <Send />
            </button>
          </DialogTrigger>
          <div className="btn__feedback">
            {state.selectedPeople.length > 0 ? `Seleccionados ${state.selectedPeople.length}` : `Selecciona al menos 1`}

          </div>
        </div>
        <DialogContent>
          {state.step === 1 && (
            <div>
              <DialogHeader>
                <DialogTitle>Selección de Plantilla</DialogTitle>
              </DialogHeader>

              <ModalChooseTemplate
                selectedTemplate={state.selectedTemplate}
                setSelectedTemplate={(template) =>
                  dispatch({ type: ActionType.SET_TEMPLATE, payload: template })
                }
              />

              <DialogFooter {...dialogFooterProps} />
            </div>
          )}

          {state.step === 2 && (
            <div>
              <DialogHeader>
                <DialogTitle>Seleccionar de Canales</DialogTitle>
              </DialogHeader>
              <div className="dialog__content">
                {Object.entries(sendMethodOptions).map(([key, { label }]) => {
                  const method = key as SendMethodKey;
                  const inputId = `send-method-${method}`;

                  return (
                    <label key={method} htmlFor={inputId} className="people__label">
                      <input
                        type="checkbox"
                        id={inputId}
                        checked={state.sendMethods.includes(method)}
                        onChange={() =>
                          dispatch({ type: ActionType.TOGGLE_SEND_METHOD, payload: method })
                        }
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
              <DialogFooter {...dialogFooterProps} />
            </div>
          )}

          {state.selectedTemplate && (
            <>
              {state.step === 3 && state.sendMethods.includes(SendMethod.sms) && (
                <div>
                  <DialogHeader>
                    <DialogTitle>Mensaje SMS</DialogTitle>
                  </DialogHeader>
                  <div className="dialog__content">
                    <textarea
                      value={state.messages.sms}
                      onChange={(e) =>
                        dispatch({ type: ActionType.SET_MESSAGE, payload: { key: "sms", value: e.target.value } })
                      }
                    />
                  </div>
                  <DialogFooter {...dialogFooterProps} />
                </div>
              )}

              {state.step === 4 && state.sendMethods.includes(SendMethod.email) && (
                <div>
                  <DialogHeader>
                    <DialogTitle>Correo Electrónico</DialogTitle>
                  </DialogHeader>
                  <div className="dialog__content gap-2">

                    <input
                      type="text"
                      value={state.messages.emailSubject}
                      onChange={(e) =>
                        dispatch({
                          type: ActionType.SET_MESSAGE,
                          payload: { key: "emailSubject", value: e.target.value },
                        })
                      }
                    />
                    <textarea
                      value={state.messages.emailMessage}
                      onChange={(e) =>
                        dispatch({
                          type: ActionType.SET_MESSAGE,
                          payload: { key: "emailMessage", value: e.target.value },
                        })
                      }

                    />
                  </div>
                  <DialogFooter {...dialogFooterProps} />
                </div>
              )}

              {state.step === 5 && state.sendMethods.includes(SendMethod.whatsapp) && (
                <div>
                  <DialogHeader>
                    <DialogTitle>Mensaje WhatsApp</DialogTitle>
                  </DialogHeader>
                  <div className="dialog__content">
                    {getMessageKeys(SendMethod.whatsapp).map((key) => (
                      <textarea
                        key={key}
                        value={state.messages[key]}
                        onChange={(e) =>
                          dispatch({
                            type: ActionType.SET_MESSAGE,
                            payload: { key, value: e.target.value },
                          })
                        }
                      />
                    ))}

                  </div>
                  <DialogFooter {...dialogFooterProps} />
                </div>
              )}

            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

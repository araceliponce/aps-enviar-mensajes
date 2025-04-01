import { DialogFooter } from "@/components/main/DialogFooter";
import { ModalChooseTemplate } from "@/components/main/ModalChooseTemplate";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import peopleData from "@/data/people.json";
import { downloadJSON, getNextStep, getPrevStep } from "@/utils/functions";
import { Maybe, SendMethod, SendMethodKey, sendMethodOptions, TemplateKey, templateOptions } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";

export const PeopleList: React.FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Maybe<TemplateKey>>(null);

  const [sendMethods, setSendMethods] = useState<SendMethod[]>([]);
  const [messages, setMessages] = useState({
    sms: "",
    emailSubject: "",
    emailMessage: "",
    whatsapp: "",
  });

  const localStorageRef = useRef<any>(null); //useref since it doesnt need to cause re render




  useEffect(() => {
    if (selectedTemplate) {
      const template = templateOptions[selectedTemplate];
      if (template) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          sms: template.sms.message,
          whatsapp: template.whatsapp.message,
          emailSubject: template.email.subject,
          emailMessage: template.email.message,
        }));
      }
    }
  }, [selectedTemplate]);

  const toggleSelection = (correo: string) => {
    setSelectedPeople((prev) =>
      prev.includes(correo) ? prev.filter((c) => c !== correo) : [...prev, correo]
    );
  };



  const goBack = () => {
    const previousStep = getPrevStep(step, sendMethods);
    setStep(previousStep);
  }

  // 1. save into local storage
  // 2. go next
  const handleNext = () => {

    // 1.
    const formData = { selectedPeople, selectedTemplate, sendMethods, messages };
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorageRef.current = formData;


    // 2.
    const nextStep = getNextStep(step, sendMethods);

    if (nextStep) {
      setStep(nextStep);
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



    console.table({
      selectedPeople,
      selectedTemplate,
      sendMethods,
      messages,
    });
    console.log({
      selectedPeople,
      selectedTemplate,
      sendMethods,
      messages,
    });
  };



  return (
    <div className="grid gap-4">
      <h1 className="">Seleccionar Personas</h1>
      <div className="pb-6">
        {peopleData.map((person, index) => (
          <label key={person.correo} className="people__label" id={`person-${index}`}>
            <div className="grid place-content-center">
              <input
                type="checkbox"
                checked={selectedPeople.includes(person.correo)}
                onChange={() => toggleSelection(person.correo)}
              />
            </div>
            <span>{person.nombre} {person.apellido} - {person.correo}</span>
          </label>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild disabled={selectedPeople.length === 0}>
          <button className="">Enviar Mensajes</button>
        </DialogTrigger>
        <DialogContent>
          {step === 1 && (
            <div>
              <DialogHeader>
                <DialogTitle>Selección de Plantilla</DialogTitle>
              </DialogHeader>

              <ModalChooseTemplate selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />

              <DialogFooter
                step={step}
                sendMethods={sendMethods}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isNextDisabled={!selectedTemplate}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <DialogHeader>
                <DialogTitle>Seleccionar de Canales</DialogTitle>
              </DialogHeader>
              <div className="dialog__content">
                {Object.entries(sendMethodOptions).map(([key, { label }]) => {
                  const method = key as SendMethodKey;
                  const inputId = `send-method-${method}`;

                  return (
                    <label key={method} htmlFor={inputId} className="people__label cursor-pointer">
                      <input
                        type="checkbox"
                        id={inputId}
                        checked={sendMethods.includes(method)}
                        onChange={() =>
                          setSendMethods((prev) =>
                            prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
                          )
                        }
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
              <DialogFooter
                step={step}
                sendMethods={sendMethods}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isNextDisabled={!selectedTemplate}
              />
            </div>
          )}

          {step === 3 && sendMethods.includes(SendMethod.sms) && selectedTemplate && (
            <div>
              <DialogHeader>
                <DialogTitle>Mensaje SMS</DialogTitle>
              </DialogHeader>
              <div className="dialog__content">
                <textarea
                  value={messages.sms}
                  onChange={(e) => setMessages({ ...messages, sms: e.target.value })}
                />
              </div>
              <DialogFooter
                step={step}
                sendMethods={sendMethods}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isNextDisabled={!selectedTemplate}
              />
            </div>
          )}

          {step === 4 && sendMethods.includes(SendMethod.email) && selectedTemplate && (
            <div>
              <DialogHeader>
                <DialogTitle>Correo Electrónico</DialogTitle>
              </DialogHeader>
              <div className="dialog__content gap-2">

                <input
                  type="text"
                  value={messages.emailSubject}
                  onChange={(e) => setMessages({ ...messages, emailSubject: e.target.value })}
                  placeholder={templateOptions[selectedTemplate as TemplateKey].email.subject}
                />
                <textarea
                  value={messages.emailMessage}
                  onChange={(e) => setMessages({ ...messages, emailMessage: e.target.value })}
                  placeholder={templateOptions[selectedTemplate as TemplateKey].email.message}
                />
              </div>
              <DialogFooter
                step={step}
                sendMethods={sendMethods}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isNextDisabled={!selectedTemplate}
              />
            </div>
          )}

          {step === 5 && sendMethods.includes(SendMethod.whatsapp) && selectedTemplate && (
            <div>
              <DialogHeader>
                <DialogTitle>Mensaje WhatsApp</DialogTitle>
              </DialogHeader>
              <div className="dialog__content">
                <textarea
                  value={messages.whatsapp}
                  onChange={(e) => setMessages({ ...messages, whatsapp: e.target.value })}
                  placeholder={templateOptions[selectedTemplate as TemplateKey].whatsapp.message}
                />
              </div>
              <DialogFooter
                step={step}
                sendMethods={sendMethods}
                onBack={goBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isNextDisabled={!selectedTemplate}
              />
            </div>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
};

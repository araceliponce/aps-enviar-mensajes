import React from "react";
import { SendMethod, sendMethodSteps } from "../../utils/types";
import { DialogClose } from "@radix-ui/react-dialog";

interface DialogFooterProps {
  step: number;
  sendMethods: SendMethod[];
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  // onCancel: () => void; // for 1st modal
  isNextDisabled?: boolean;

}

export const DialogFooter: React.FC<DialogFooterProps> = ({ step, sendMethods, onBack, onNext, onSubmit, isNextDisabled, }) => {

  // the last step will be the last selectmethod's modal
  const lastStep = Math.max(...sendMethods.map(method => sendMethodSteps[method]), 3); //last number = si sendMethods es [] o si todos los valores de sendMethods.map(...) son menores a n, el valor final de lastStep nunca será menor a n.
  // 3 is a fixed number, will change later


  const isLastStep = step === lastStep;


  const shouldShowContinuar = step !== lastStep;

  console.log({ shouldShowContinuar }, { sendMethods }, { step }, { lastStep }, { isLastStep })



  const handleSubmit = () => {

    onSubmit();

    // onCloseModal();
    // console.log('should close')

  };

  return (
    <div className="dialog__footer">

      {step === 1 ? (
        <DialogClose>Cancelar</DialogClose> //from shadcn but its just a normal btn with the close-functionality
      ) :
        <button onClick={onBack}>Atrás</button>
      }


      {shouldShowContinuar ? (

        <button onClick={onNext} disabled={isNextDisabled}>Continuar</button>
      ) : (
        <DialogClose
          // onClick={onSubmit}
          onClick={handleSubmit}
        >Finalizar</DialogClose>
      )}
    </div>
  );
};

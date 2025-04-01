import { SendMethod, sendMethodSteps } from "./send_methods";

export const getNextStep = (currentStep: number, methods: SendMethod[]) => {

  if (currentStep === 1) return 2; // go from 1st to 2nd, (even in methods were selected)

  // normal go next (when no methods selected)
  if (methods.length === 0) return currentStep + 1;


  // each method has a asigned step number
  // we got the (selected) methods. map them to get the numbers. then order (ex. if was 5,3 sorted is 3,5 )
  const selectedMethodsSteps = methods
    .map((method) => sendMethodSteps[method])
    .sort();

  // next step = the FIRST one that is larger than the current
  const nextStep = selectedMethodsSteps.find((step) => step > currentStep) || null;


  return nextStep
};

export const getPrevStep = (currentStep: number, methods: SendMethod[]): number => {

  console.log({ currentStep });

  let prevStep: number = 1;
  if (currentStep === 2) {
    prevStep = 1; // from 2nd to 1st always
  } else {


    const selectedMethodsSteps = methods
      .map((method) => sendMethodSteps[method])
      .sort((a, b) => a - b);

    //  find the previous step if we are on modal 3,4,5...
    if (currentStep >= selectedMethodsSteps[0]) {

      prevStep = selectedMethodsSteps.reverse().find((step) => step < currentStep) ?? 2; // fallback to modal 2 if no valid prev step is found (also bc .find() can return undefined and it show error because prevstep has to be number)
    }
  }

  console.log({ prevStep });
  return prevStep;
};


export const downloadJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

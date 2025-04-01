import { SendMethod, sendMethodSteps } from "./types";

export const getNextStep = (currentStep: number, methods: SendMethod[]) => {

  // for all the posibles modals before selecting methods (just modal 1 for now)
  if (methods.length === 0) {
    // const nextStep = currentStep < 2 ? 2 : null;
    const nextStep = currentStep + 1;

    // we are in modal 1, we move to modal 2
    // console.log('no methods', { nextStep })
    return nextStep
  }





  // each method has a asigned step number
  // we got the (selected) methods. map them to get the numbers. then order (ex. if was 5,3 sorted is 3,5 )
  const selectedSteps = methods
    .map((method) => sendMethodSteps[method])
    .sort();

  // next step = the FIRST one that is larger than the current
  const nextStep = selectedSteps.find((step) => step > currentStep) || null;
  // console.log({ selectedSteps }, { nextStep })


  return nextStep
};


export const getPrevStep = (currentStep: number, methods: SendMethod[]) => {
  if (methods.length === 0) {
    return Math.max(1, currentStep - 1);
  }

  // Get all selected method steps sorted
  const selectedSteps = methods.map((method) => sendMethodSteps[method]).sort((a, b) => a - b);

  // Find the previous step (largest step that is smaller than currentStep)
  const previousStep = [...selectedSteps].reverse().find((step) => step < currentStep);

  return previousStep ?? Math.max(1, currentStep - 1);
};


export const downloadJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
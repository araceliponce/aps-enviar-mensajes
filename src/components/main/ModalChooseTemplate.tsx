import React from "react";
import { Maybe, TemplateKey, templateOptions } from "../../utils/types";


interface ModalChooseTemplateProps {
  selectedTemplate: Maybe<TemplateKey>;
  setSelectedTemplate: (template: Maybe<TemplateKey>) => void;
}


export const ModalChooseTemplate: React.FC<ModalChooseTemplateProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {


  return (
    <div className="dialog__content">

      {Object.entries(templateOptions).map(([key, { label }]) => {
        const inputId = `template-${key}`;
        const templateKey = key as TemplateKey; //tipado
        return (
          <label key={key} className="people__label" htmlFor={inputId}>
            <input
              type="radio"
              id={inputId}
              value={key}
              checked={selectedTemplate === key}
              onChange={() => setSelectedTemplate(templateKey)}
            />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
};



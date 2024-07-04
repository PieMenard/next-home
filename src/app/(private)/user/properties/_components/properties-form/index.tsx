'use client';

import { Steps } from 'antd';
import { useState } from 'react';
import Basic from './basic';
import Location from './location';
import Amenities from './amenities';
import Media from './media';
import Contact from './contact';

export type PropertiesFormStepProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  finalValues: any;
  setFinalValues: (finalVallues: any) => void;
};

const PropertiesForm = () => {
  const [finalValues, setFinalValues] = useState({
    basic: {},
    location: {},
    amenities: {},
    media: {},
    content: {},
  });
  const [currentStep, setCurrentStep] = useState(0);

  const commonPropsForSteps: any = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
  };

  const steps = [
    {
      title: 'Basic',
      content: <Basic {...commonPropsForSteps} />,
    },
    {
      title: 'Location',
      content: <Location {...commonPropsForSteps} />,
    },
    {
      title: 'Amenities',
      content: <Amenities {...commonPropsForSteps} />,
    },
    {
      title: 'Media',
      content: <Media {...commonPropsForSteps} />,
    },
    {
      title: 'Contact',
      content: <Contact {...commonPropsForSteps} />,
    },
  ];

  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className="mt-8">{steps[currentStep].content}</div>
    </div>
  );
};

export default PropertiesForm;

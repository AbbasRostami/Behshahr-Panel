import { useRef, useState } from "react";
import Wizard from "@components/wizard";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const WizardVertical = ({ getCreate }) => {
  const ref = useRef(null);

  const [allData, setAllData] = useState({});

  const [cID, setCID] = useState(null);

  console.log("All Data: ", allData);

  const handleData = (data) => {
    setAllData({ ...allData, ...data });
  };

  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات دوره مرحله اول",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: (
        <StepOne
          handleData={handleData}
          stepper={stepper}
          type="wizard-vertical"
        />
      ),
    },
    {
      id: "personal-info",
      title: "اطلاعات دوره مرحله دوم",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: (
        <StepTwo
          handleData={handleData}
          getCreate={getCreate}
          stepper={stepper}
          type="wizard-vertical"
        />
      ),
    },
    {
      id: "step-address",
      title: "اطلاعات دوره مرحله سوم",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: (
        <StepThree
          handleData={handleData}
          stepper={stepper}
          type="wizard-vertical"
        />
      ),
    },
    {
      id: "step-image",
      title: "اطلاعات دوره مرحله چهارم",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: (
        <StepFour
          handleData={handleData}
          allData={allData}
          stepper={stepper}
          cidHander={{ cID, setCID }}
          type="wizard-vertical"
        />
      ),
    },
    {
      id: "social-links",
      title: "افزدون تکنولوژی",
      subtitle: "اطلاعات تکنولوژی را وارد کنید.",
      content: (
        <StepFive
          handleData={handleData}
          stepper={stepper}
          cidHander={{ cID, setCID }}
          getCreate={getCreate}
          type="wizard-vertical"
        />
      ),
    },
  ];

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardVertical;

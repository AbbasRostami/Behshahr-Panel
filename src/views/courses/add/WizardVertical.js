import { useRef, useState } from "react";
import Wizard from "@components/wizard";
import Address from "./StepThree";
import SocialLinks from "./StepFour";
import PersonalInfo from "./StepTwo";
import AccountDetails from "./StepOne";

const WizardVertical = ({getCreate }) => {
  const ref = useRef(null);

  const [allData, setAllData] = useState({});

  console.log("All Data: ",allData);

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
        <AccountDetails
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
        <PersonalInfo
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
        <Address
          handleData={handleData}
          allData={allData}
          stepper={stepper}
          type="wizard-vertical"
        />
      ),
    },
    {
      id: "social-links",
      title: "افزدون تکنولوژی",
      subtitle: "اطلاعات تکنولوژی را وارد کنید.",
      content: (
        <SocialLinks
          handleData={handleData}
          stepper={stepper}
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

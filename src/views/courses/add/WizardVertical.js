import { useRef, useState } from "react";
import Wizard from "@components/wizard";
import Address from "./steps/StepThree";
import SocialLinks from "./steps/StepFour";
import PersonalInfo from "./steps/StepTwo";
import AccountDetails from "./steps/StepOne";

const WizardVertical = () => {
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات دوره مرحله اول",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: <AccountDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "personal-info",
      title: "اطلاعات دوره مرحله دوم",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: <PersonalInfo stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "step-address",
      title: "اطلاعات دوره مرحله سوم",
      subtitle: "اطلاعات دوره را وارد کنید.",
      content: <Address stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "social-links",
      title: "افزدون تکنولوژی",
      subtitle: "اطلاعات تکنولوژی را وارد کنید.",
      content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
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

// ** Logo
import logo from "./../../../../src/assets/images/logo/h1copy.svg";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <img className="fallback-logo img-fluid" src={logo} alt="logo" />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SendOtpForm from "components/templates/SendOtpForm";
import CheckOtpForm from "components/templates/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState<number>(2);
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");

  return (
    <div>
      <h1>پروژه دیوار</h1>
      {step === 1 && (
        <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && <CheckOtpForm code={code} setCode={setCode} mobile={mobile} setStep={setStep} />}
    </div>
  );
}

export default AuthPage;

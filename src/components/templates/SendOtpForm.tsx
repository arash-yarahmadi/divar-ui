import React from "react";

type SendOtpFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
};

function SendOtpForm({ setStep, mobile, setMobile }: SendOtpFormProps) {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <form onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد بکنید. کد
        تایید به این شماره پیامک خواهد شد
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد بکنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMobile(e.target.value)
        }
      />
      <button type="submit">ارسال</button>
    </form>
  );
}

export default SendOtpForm;

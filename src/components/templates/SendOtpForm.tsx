/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { sendOtp } from "services/auth";
import toast from "react-hot-toast";
import styles from "./SendOtpForm.module.css";

type SendOtpFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
};

function SendOtpForm({ setStep, mobile, setMobile }: SendOtpFormProps) {

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(mobile.length !== 11) return;
    
     try {
      const { response, error } = await sendOtp(mobile);

      if (response) {
        setStep(2);
        toast.success(response.message);
      }

      if (error) {
        const message =
          error.response?.data?.message || "خطایی رخ داده است، دوباره تلاش کنید.";
        toast.error(message);
      }
    } catch (err: any) {
      
      const message =
        err.response?.data?.message || "مشکلی در ارسال درخواست وجود دارد.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
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
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;

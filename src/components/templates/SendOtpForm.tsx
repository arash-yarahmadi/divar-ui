/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { sendOtp } from "services/auth";
import toast from "react-hot-toast";

type SendOtpFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
};

function SendOtpForm({ setStep, mobile, setMobile }: SendOtpFormProps) {
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mobile.length !== 11) return;

    try {
      const { response, error } = await sendOtp(mobile);
      if (response) {
        const otpCode = response?.code?.otp?.code;
        setStep(2);
        toast.success(`کد تایید: ${otpCode}`, { duration: 10000 });
      }

      if (error) {
        const message =
          error.response?.data?.message ||
          "خطایی رخ داده است، دوباره تلاش کنید.";
        toast.error(message);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || "مشکلی در ارسال درخواست وجود دارد.";
      toast.error(message);
    }
  };

  return (
    <form
      className="max-w-md mx-auto flex flex-col mt-24 border border-gray-300 rounded-md p-8"
      onSubmit={submitHandler}
    >
      <p className="text-lg font-normal mb-5">ورود به حساب کاربری</p>
      <span className="text-gray-500 text-sm mb-5 leading-6">
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد بکنید. کد
        تایید به این شماره پیامک خواهد شد
      </span>
      <label className="mb-2 text-sm font-medium text-gray-700" htmlFor="input">
        شماره موبایل خود را وارد بکنید
      </label>
      <input
        className="my-2 mb-5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMobile(e.target.value)
        }
      />
      <button
        className="w-[120px] px-3 py-1.5 bg-[#a62626] text-white rounded-md hover:bg-[#8f1f1f] transition-colors duration-200"
        type="submit"
      >
        ارسال کد تایید
      </button>
    </form>
  );
}

export default SendOtpForm;

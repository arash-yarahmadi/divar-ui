/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { checkOtp } from "services/auth";
import toast from "react-hot-toast";
import { SetCookie } from "utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import styles from "./CheckOtpForm.module.css";

type CheckOtpFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  mobile: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

function CheckOtpForm({ setStep, mobile, code, setCode }: CheckOtpFormProps) {
  const navigate = useNavigate();
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.length !== 5) return;

    try {
      const { response, error } = await checkOtp(mobile, code);

      if (response) {
        SetCookie(response);
        navigate("/");
        refetch();
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
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد ارسال شده</p>
      <span>کد ارسال شده به شماره موبایل {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;

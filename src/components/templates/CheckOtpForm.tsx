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
    <form
      onSubmit={submitHandler}
      className="max-w-md mx-auto flex flex-col mt-[100px] border border-gray-400 rounded p-[30px]"
    >
      <p className="text-[1.1rem] font-normal mb-5">تایید کد ارسال شده</p>
      <span className="text-gray-500 text-xs mb-5">
        کد ارسال شده به شماره موبایل {mobile} را وارد کنید
      </span>
      <label className="text-sm" htmlFor="input">
        کد تایید را وارد کنید
      </label>
      <input
        className="my-2 mb-5 p-1.5 border border-gray-400 rounded"
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="flex">
        <button
          className="bg-[#a62626] py-1.5 px-3 text-white border border-[#a62626] w-[110px] mt-[30px] rounded hover:bg-[#8f1f1f] transition"
          type="submit"
        >
          ورود
        </button>
        <button
          className="bg-white py-1.5 px-3 text-[#a26266] border border-[#a62626] w-[150px] mt-[30px] mr-[30px] rounded hover:bg-[#f8eaea] transition"
          onClick={() => setStep(1)}
        >
          تغییر شماره موبایل
        </button>
      </div>
    </form>
  );
}

export default CheckOtpForm;

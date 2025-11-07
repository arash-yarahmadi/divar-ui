import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { getCategory } from "services/admin";
import { getCookie } from "utils/cookie";

interface PostData {
  name: string;
  _id: string;
  icon: string;
  slug?: string;
  parents?: [];
}

interface FormState {
  title: string;
  content: string;
  city: string;
  category: string;
  amount: string | null;
  images: File | null;
}

function AddPost() {
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    city: "",
    category: "",
    amount: null,
    images: null,
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const addHandler = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      const field = key as keyof FormState;
      const value = form[field];
      console.log("form before submit:", form);
      if (value !== null) {
        formData.append(field, value);
      }
    }

    const token = getCookie("accessToken");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch(() => toast.error("مشکلی پیش آمده است."));
  };

  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target;

    if (!target.name) return;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [target.name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  return (
    <form className="border border-gray-400 p-6 w-[400px] bg-cyan-400 rounded-2xl">
      <h3 className="mb-7 border-b-4 border-[#a62626] w-fit pb-1 text-lg font-semibold">
        افزودن آگهی
      </h3>

      <label className="block text-sm mb-2" htmlFor="title">
        عنوان
      </label>
      <input
        onChange={changeHandler}
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="text"
        name="title"
        id="title"
      />

      <label className="block text-sm mb-2" htmlFor="content">
        توضیحات
      </label>
      <textarea
        onChange={changeHandler}
        className="block w-[300px] h-[100px] p-1 border border-gray-400 mb-7 rounded"
        name="content"
        id="content"
      />

      <label className="block text-sm mb-2" htmlFor="amount">
        قیمت
      </label>
      <input
        onChange={changeHandler}
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="number"
        name="amount"
        id="amount"
      />

      <label className="block text-sm mb-2" htmlFor="city">
        شهر
      </label>
      <input
        onChange={changeHandler}
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="text"
        name="city"
        id="city"
      />

      <label className="block text-sm mb-2" htmlFor="category">
        دسته‌بندی
      </label>
      <select
        onChange={changeHandler}
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        name="category"
        id="category"
      >
        {data?.data.map((item: PostData) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <label className="block text-sm mb-2" htmlFor="images">
        عکس
      </label>
      <input
        onChange={changeHandler}
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="file"
        name="images"
        id="images"
      />

      <button
        className="bg-[#a62626] text-white border-none py-2 px-6 text-sm cursor-pointer rounded hover:bg-[#8f1f1f] transition"
        onClick={addHandler}
      >
        ارسال
      </button>
    </form>
  );
}

export default AddPost;

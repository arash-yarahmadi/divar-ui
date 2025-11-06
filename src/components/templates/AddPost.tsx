import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "services/admin";

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
  image: File | null;
}

function AddPost() {
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    city: "",
    category: "",
    amount: null,
    image: null,
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const addHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(form);
  };

  const changeHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    if (!target.name) return;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [target.name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  return (
    <form
      onChange={changeHandler}
      className="border border-gray-400 p-6 w-[400px] bg-cyan-400 rounded-2xl"
    >
      <h3 className="mb-7 border-b-4 border-[#a62626] w-fit pb-1 text-lg font-semibold">
        افزودن آگهی
      </h3>

      <label className="block text-sm mb-2" htmlFor="title">
        عنوان
      </label>
      <input
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="text"
        name="title"
        id="title"
      />

      <label className="block text-sm mb-2" htmlFor="content">
        توضیحات
      </label>
      <textarea
        className="block w-[300px] h-[100px] p-1 border border-gray-400 mb-7 rounded"
        name="content"
        id="content"
      />

      <label className="block text-sm mb-2" htmlFor="amount">
        قیمت
      </label>
      <input
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="text"
        name="amount"
        id="amount"
      />

      <label className="block text-sm mb-2" htmlFor="city">
        شهر
      </label>
      <input
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="text"
        name="city"
        id="city"
      />

      <label className="block text-sm mb-2" htmlFor="category">
        دسته‌بندی
      </label>
      <select
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

      <label className="block text-sm mb-2" htmlFor="image">
        عکس
      </label>
      <input
        className="block w-[300px] p-1 border border-gray-400 mb-7 rounded"
        type="file"
        name="image"
        id="image"
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

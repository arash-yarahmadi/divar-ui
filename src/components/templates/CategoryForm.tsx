import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "src/services/admin";

interface formCategory {
  name: string;
  slug?: string;
  icon: string;
}

function CategoryForm() {
  const [form, setForm] = useState<formCategory>({
    name: "",
    slug: "",
    icon: "",
  });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory,
  });

  const queryClient = useQueryClient();

  const changeHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      },
    });
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className="border border-gray-400 p-6 w-[400px] bg-cyan-400 rounded-2xl"
    >
      <h3 className="mb-7 border-b-4 border-[#a62626] w-fit pb-1 text-lg font-semibold">
        دسته بندی جدید
      </h3>
      {!!error && (
        <p className="bg-[#a62626] text-center mb-5 text-white p-1.5 rounded">
          خطا
        </p>
      )}
      {data?.status === 201 && (
        <p className="bg-[#a62626] text-center mb-5 text-white p-1.5 rounded">
          دسته بندی با موفقیت اضافه شد.
        </p>
      )}
      <label className="block text-sm mb-2" htmlFor="name">
        اسم دسته بندی
      </label>
      <input
        className="flex w-[300px] p-1.5 border border-gray-400 mb-7 rounded"
        type="text"
        name="name"
        id="name"
      />
      <label className="block text-sm mb-2" htmlFor="slug">
        اسلاگ
      </label>
      <input
        className="flex w-[300px] p-1.5 border border-gray-400 mb-7 rounded"
        type="text"
        name="slug"
        id="slug"
      />
      <label className="block text-sm mb-2" htmlFor="icon">
        آیکون
      </label>
      <input
        className="flex w-[300px] p-1.5 border border-gray-400 mb-7 rounded"
        type="text"
        name="icon"
        id="icon"
      />
      <button
        className="bg-[#a62626] text-white py-2 px-6 text-sm rounded cursor-pointer disabled:opacity-50 hover:bg-[#8f1f1f] transition"
        type="submit"
        disabled={isPending}
      >
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;

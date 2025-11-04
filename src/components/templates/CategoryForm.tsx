import { useState } from "react";
import styles from "./CategoryForm.module.css";
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
    setForm({ ...form, [event.target.name]: event.target.value });
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
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p>خطا</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد.</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;

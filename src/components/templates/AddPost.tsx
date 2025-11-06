import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "services/admin";
import styles from "./AddPost.module.css";

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
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>

      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />

      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />

      <label htmlFor="amount">قیمت</label>
      <input type="text" name="amount" id="amount" />

      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />

      <label htmlFor="category">دسته‌بندی</label>
      <select name="category" id="category">
        {data?.data.map((item: PostData) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <label htmlFor="image">عکس</label>
      <input type="file" name="image" id="image" />

      <button onClick={addHandler}>ارسال</button>
    </form>
  );
}

export default AddPost;

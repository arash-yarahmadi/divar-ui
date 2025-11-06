import { useQuery } from "@tanstack/react-query";
import { getCategory } from "services/admin";
import Loader from "../modules/Loader";

function CategoryList() {
  const { data, isPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  return (
    <div className="my-[50px] mb-[70px]">
      {isPending ? (
        <Loader />
      ) : (
        data?.data.map((i: any) => (
          <div
            key={i._id}
            className="flex my-5 p-4 border-2 border-[#eaeaea] rounded"
          >
            <img src={`${i.icon}.svg`} alt={i.name} />
            <h5 className="mr-2.5 text-sm w-[120px]">{i.name}</h5>
            <p className="w-full text-left text-[#a62626]">slug: {i.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/numbers";

function PostList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, isPending } = useQuery({
    queryKey: ["get-post-list"],
    queryFn: getPosts,
  });
  console.log(data, isPending);
  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3 className="mt-16 mb-8 border-b-4 border-[#a62626] w-fit pb-1 text-lg font-semibold">
            آگهی های شما
          </h3>
          {data?.data.posts.map((post: any) => (
            <div
              className="flex items-center border-2 border-gray-200 p-2.5 my-2.5 rounded-md"
              key={post._id}
            >
              <img
                className="w-[100px] h-[70px] ml-7 rounded-sm object-cover"
                src={`${baseURL}${post.images[0]}`}
              />
              <div className="flex-1">
                <p className="text-[0.9rem] font-medium">
                  {post.options.title}
                </p>
                <span className="text-[0.8rem] text-gray-500">
                  {post.options.content}
                </span>
              </div>
              <div className="w-[150px] text-center">
                <p className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                </p>
                <span className="text-gray-700 text-[0.8rem]">
                  {sp(post.amount)} تومان
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;

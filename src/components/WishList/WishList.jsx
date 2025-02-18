import { toast, Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishListContextProvider";
import { FadeLoader } from "react-spinners";

export default function WishList() {
  let { getUserWish, deleteUserWish } = useContext(WishContext);
  let [WishData, setWishData] = useState([]); 
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishData();
  }, []);

  function getWishData() {
    setLoading(true);
    getUserWish()
      .then((res) => {
        console.log("API Response:", res.data);
        setWishData(res.data.data || []); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setWishData([]); 
        setLoading(false);
      });
  }

  function removeItem(id) {
    deleteUserWish(id)
      .then(() => {
        setWishData((prevWishData) => prevWishData.filter(item => item._id !== id));
        toast.success("Product Deleted");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        toast.error("Failed to delete product");
      });
  }

  if (loading) {
    return (
      <div className="bg-slate-300 flex justify-center items-center h-screen">
        <FadeLoader/>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="w-10/12 mx-auto my-5">
        <div className="bg-gray-200 p-5 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Wish List</h1>

          {WishData.length > 0 ? (
            <div className="divide-y-2 divide-gray-300">
              {WishData.map((item) => (
                <div key={item._id} className="flex items-center py-4">
                  <div className="w-10/12 flex">
                    <div className="w-1/12">
                      <img
                        src={item.imageCover}
                        className="w-full rounded-md shadow"
                        alt={item.title}
                      />
                    </div>
                    <div className="w-11/12 pl-4">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <h2 className="text-main my-2">
                        Price:{" "}
                        {item.priceAfterDiscount
                          ? `${item.priceAfterDiscount} EGP (Discounted)`
                          : `${item.price} EGP`}
                      </h2>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="border border-red-500 px-4 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 text-gray-500">
              No products in wishlist.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

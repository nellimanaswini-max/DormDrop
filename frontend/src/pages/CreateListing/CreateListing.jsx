import { useState } from "react";
import ImageUploader from "../../components/create-listing/ImageUploader";
import ListingForm from "../../components/create-listing/ListingForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateListing({ addListing }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [residenceHall, setResidenceHall] = useState("");
  const [description, setDescription] = useState("");

  const handlePublish = () => {
    if (
        !title ||
        !price ||
        !category ||
        !condition ||
        !description
        ) {
        toast.error("Please fill in all required fields.");
        return;
        }
  const newListing = {
    id: crypto.randomUUID(),

    userId: "current-user",

    title,
    price,
    category,
    condition,
    description,

    campus: "NIAT",

    image: image || "https://placehold.co/600x600/F5F5F4/444?text=DormDrop",

    seller: {
        name: "You",
        avatar: "",
        verified: true,
        rating: 5,
    },

    createdAt: "Just now",

    isDonation: false,
    };

  addListing(newListing);
  toast.success("Listing published successfully!");
  navigate("/", { replace: true });
  console.log(newListing);

  // Reset the form
  setTitle("");
  setPrice("");
  setCategory("");
  setCondition("");
  setResidenceHall("");
  setDescription("");
};

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black text-stone-900">
        📦 Create Listing
      </h1>

      <p className="mt-3 text-stone-500">
        Sell something another student might need.
      </p>

      <ImageUploader
        image={image}
        setImage={setImage}
        />

      <ListingForm
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        condition={condition}
        setCondition={setCondition}
        residenceHall={residenceHall}
        setResidenceHall={setResidenceHall}
        description={description}
        setDescription={setDescription}
        handlePublish={handlePublish}
      />
    </section>
  );
}
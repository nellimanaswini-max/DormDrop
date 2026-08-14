import { useEffect, useState } from "react";
import ImageUploader from "../../components/create-listing/ImageUploader";
import ListingForm from "../../components/create-listing/ListingForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CreateListing({ addListing }) {
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  const [campus, setCampus] = useState("");
  const [residenceHall, setResidenceHall] = useState("");

  const navigate = useNavigate();

  // --------------------------------
  // GET LOGGED-IN USER
  // --------------------------------

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");

        const user = response.data.user;

        setCampus(user.campus || "");
        setResidenceHall(user.residenceHall || "");

      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error
        );

        toast.error(
          "Unable to load your account details."
        );
      }
    };

    fetchCurrentUser();
  }, []);

  // --------------------------------
  // PUBLISH LISTING
  // --------------------------------

  const handlePublish = async () => {
    if (
      !title ||
      !price ||
      !category ||
      !condition ||
      !description
    ) {
      toast.error(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      const response = await api.post("/listings", {
        title: title.trim(),
        price: Number(price),
        category,
        condition,
        description: description.trim(),

        image:
          image ||
          "https://placehold.co/600x600/F5F5F4/444?text=DormDrop",

        isDonation: false,
      });

      console.log(
        "Created listing:",
        response.data
      );

      const createdListing =
        response.data.listing;

      const normalizedListing = {
        ...createdListing,
        id: createdListing._id,
      };

      if (addListing) {
        addListing(normalizedListing);
      }

      toast.success(
        "Listing published successfully!"
      );

      navigate("/home", {
        replace: true,
      });

      // Reset form

      setTitle("");
      setPrice("");
      setCategory("");
      setCondition("");
      setDescription("");
      setImage(null);

    } catch (error) {
      console.error(
        "Failed to create listing:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Failed to publish listing. Please try again.";

      toast.error(message);
    }
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

        description={description}
        setDescription={setDescription}

        campus={campus}
        residenceHall={residenceHall}

        handlePublish={handlePublish}
      />

    </section>
  );
}
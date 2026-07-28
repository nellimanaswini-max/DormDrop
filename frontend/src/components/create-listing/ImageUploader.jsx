import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageUploader({
  image,
  setImage,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
        }
    if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5 MB.");
        return;
        }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
  };

  return (
    <div className="mt-12">
      <label className="block text-lg font-bold mb-4">
        Upload Photos
      </label>

      <label className="border-2 border-dashed border-stone-300 rounded-3xl h-72 flex flex-col items-center justify-center hover:border-stone-500 transition cursor-pointer overflow-hidden">

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {image ? (
            <div className="relative w-full h-full">

                <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
                />

                <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImage(null);
                }}
                className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-red-700 transition"
                >
                Remove
                </button>

            </div>
            ) : (
          <>
            <UploadCloud
              size={54}
              className="text-stone-400"
            />

            <p className="mt-5 font-semibold text-stone-700">
              Click to upload photos
            </p>

            <span className="mt-2 text-sm text-stone-400">
                    JPG, PNG • 1 Image • Max 5 MB
            </span>
          </>
        )}

      </label>
    </div>
  );
}
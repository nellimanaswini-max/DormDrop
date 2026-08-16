import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageUploader({
  image,
  setImage,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageSource = reader.result;

      const img = new Image();

      img.onload = () => {
        const MAX_SIZE = 1200;

        let width = img.width;
        let height = img.height;

        // Resize large images
        if (
          width > MAX_SIZE ||
          height > MAX_SIZE
        ) {
          if (width > height) {
            height = Math.round(
              (height * MAX_SIZE) / width
            );

            width = MAX_SIZE;
          } else {
            width = Math.round(
              (width * MAX_SIZE) / height
            );

            height = MAX_SIZE;
          }
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          toast.error(
            "Could not process image."
          );
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        // IMPORTANT:
        // Store a permanent Base64 data URL,
        // NOT a blob URL.
        const compressedImage =
          canvas.toDataURL(
            "image/jpeg",
            0.8
          );

        setImage(compressedImage);

        console.log(
          "Image converted to permanent data URL:",
          compressedImage.substring(0, 40)
        );
      };

      img.onerror = () => {
        toast.error(
          "Could not process this image."
        );
      };

      img.src = imageSource;
    };

    reader.onerror = () => {
      toast.error(
        "Could not read the image."
      );
    };

    reader.readAsDataURL(file);

    // Allow selecting the same file again
    e.target.value = "";
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
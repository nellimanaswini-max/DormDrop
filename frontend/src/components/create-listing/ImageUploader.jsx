import { UploadCloud } from "lucide-react";

export default function ImageUploader() {
  return (
    <div className="mt-12">
      <label className="block text-lg font-bold mb-4">
        Upload Photos
      </label>

      <div className="border-2 border-dashed border-stone-300 rounded-3xl h-72 flex flex-col items-center justify-center hover:border-stone-500 transition cursor-pointer">

        <UploadCloud
          size={54}
          className="text-stone-400"
        />

        <p className="mt-5 font-semibold text-stone-700">
          Click to upload photos
        </p>

        <span className="mt-2 text-sm text-stone-400">
          JPG, PNG • Max 5 Images
        </span>

      </div>
    </div>
  );
}
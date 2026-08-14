export default function ListingForm({
  title,
  setTitle,
  price,
  setPrice,
  category,
  setCategory,
  condition,
  setCondition,
  description,
  setDescription,
  campus,
  residenceHall,
  handlePublish,
}) {
  return (
    <>
      {/* Title */}

      <div className="mt-10">
        <label className="block text-lg font-bold mb-3">
          Title
        </label>

        <input
          type="text"
          placeholder="e.g. Dell Inspiron Laptop"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>

      {/* Price */}

      <div className="mt-8">
        <label className="block text-lg font-bold mb-3">
          Price
        </label>

        <input
          type="number"
          min="0"
          placeholder="e.g. 18000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>

      {/* Category + Condition */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div>
          <label className="block text-lg font-bold mb-3">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-stone-300 rounded-2xl px-5 py-4"
          >
            <option value="">Select Category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Clothing</option>
            <option>Cycles</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-bold mb-3">
            Condition
          </label>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border border-stone-300 rounded-2xl px-5 py-4"
          >
            <option value="">Select Condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </div>

      </div>

      {/* Account Location */}

      <div className="mt-8">

        <label className="block text-lg font-bold mb-3">
          Listing Location
        </label>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-stone-500">
                Campus
              </p>

              <p className="font-bold text-stone-900">
                📍 {campus || "Loading campus..."}
              </p>
            </div>

            <div className="hidden sm:block h-10 w-px bg-stone-200" />

            <div>
              <p className="text-sm text-stone-500">
                Residence Hall
              </p>

              <p className="font-bold text-stone-900">
                🏠 {residenceHall || "Loading residence hall..."}
              </p>
            </div>

          </div>

          <p className="mt-3 text-xs text-stone-400">
            This comes from your registered account and cannot be changed here.
          </p>

        </div>

      </div>

      {/* Description */}

      <div className="mt-8">

        <label className="block text-lg font-bold mb-3">
          Description
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item..."
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 resize-none"
        />

      </div>

      {/* Publish */}

      <button
        onClick={handlePublish}
        className="mt-10 w-full bg-stone-900 text-white py-4 rounded-2xl text-lg font-bold hover:bg-stone-800 transition"
      >
        🚀 Publish Listing
      </button>
    </>
  );
}
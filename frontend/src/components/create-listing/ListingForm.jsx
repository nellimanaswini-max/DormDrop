export default function ListingForm({
  title,
  setTitle,
  price,
  setPrice,
  category,
  setCategory,
  condition,
  setCondition,
  residenceHall,
  setResidenceHall,
  description,
  setDescription,
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
          type="text"
          placeholder="e.g. ₹18,000"
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

      {/* Residence Hall */}

      <div className="mt-8">
        <label className="block text-lg font-bold mb-3">
          Residence Hall
        </label>

        <input
          type="text"
          placeholder="e.g. Hostel 12"
          value={residenceHall}
          onChange={(e) => setResidenceHall(e.target.value)}
          className="w-full border border-stone-300 rounded-2xl px-5 py-4"
        />
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
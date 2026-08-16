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
  handlePublish,
}) {
  return (
    <>
      <div className="mt-8">
        <label className="mb-3 block text-lg font-bold text-stone-900">Title</label>
        <input
          type="text"
          placeholder="e.g. Dell Inspiron Laptop"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
        />
      </div>

      <div className="mt-7">
        <label className="mb-3 block text-lg font-bold text-stone-900">Price</label>
        <input
          type="text"
          placeholder="e.g. ₹18,000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
        />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-3 block text-lg font-bold text-stone-900">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-stone-900 outline-none focus:ring-2 focus:ring-stone-200"
          >
            <option value="">Select Category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Clothing</option>
            <option>Cycles</option>
            <option>Gaming</option>
            <option>Phones</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-lg font-bold text-stone-900">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-stone-900 outline-none focus:ring-2 focus:ring-stone-200"
          >
            <option value="">Select Condition</option>
            <option>Brand New</option>
            <option>Like New</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </div>
      </div>

      <div className="mt-7">
        <label className="mb-3 block text-lg font-bold text-stone-900">Description</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item..."
          className="w-full resize-none rounded-2xl border border-stone-300 bg-white px-5 py-4 text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
        />
      </div>

      <button
        type="button"
        onClick={handlePublish}
        className="mt-9 w-full rounded-2xl bg-stone-900 py-4 text-lg font-bold text-white transition hover:bg-stone-800"
      >
        🚀 Publish Listing
      </button>
    </>
  );
}
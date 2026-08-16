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
  publishing,
}) {
  return (
    <>
      {/* =====================================
          TITLE
      ====================================== */}

      <div className="mt-10">
        <label className="block text-lg font-bold mb-3">
          Title
        </label>

        <input
          type="text"
          placeholder="e.g. Dell Inspiron Laptop"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>


      {/* =====================================
          PRICE
      ====================================== */}

      <div className="mt-8">
        <label className="block text-lg font-bold mb-3">
          Price
        </label>

        <input
          type="number"
          min="0"
          placeholder="e.g. 18000"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>


      {/* =====================================
          CATEGORY + CONDITION
      ====================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Category */}

        <div>
          <label className="block text-lg font-bold mb-3">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border border-stone-300 rounded-2xl px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="">
              Select Category
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Cycles">
              Cycles
            </option>

            <option value="Others">
              Others
            </option>
          </select>
        </div>


        {/* Condition */}

        <div>
          <label className="block text-lg font-bold mb-3">
            Condition
          </label>

          <select
            value={condition}
            onChange={(e) =>
              setCondition(e.target.value)
            }
            className="w-full border border-stone-300 rounded-2xl px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="">
              Select Condition
            </option>

            <option value="New">
              New
            </option>

            <option value="Like New">
              Like New
            </option>

            <option value="Good">
              Good
            </option>

            <option value="Fair">
              Fair
            </option>
          </select>
        </div>

      </div>


      {/* =====================================
          RESIDENCE HALL
      ====================================== */}

      <div className="mt-8">

        <label className="block text-lg font-bold mb-3">
          Residence Hall
        </label>

        <input
          type="text"
          placeholder="e.g. Hostel 12"
          value={residenceHall}
          onChange={(e) =>
            setResidenceHall(
              e.target.value
            )
          }
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-stone-900"
        />

        <p className="mt-2 text-xs text-stone-400">
          This is the residence location for this listing.
        </p>

      </div>


      {/* =====================================
          DESCRIPTION
      ====================================== */}

      <div className="mt-8">

        <label className="block text-lg font-bold mb-3">
          Description
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Describe your item..."
          className="w-full border border-stone-300 rounded-2xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-stone-900"
        />

      </div>


      {/* =====================================
          PUBLISH BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={handlePublish}
        disabled={publishing}
        className="mt-10 w-full bg-stone-900 text-white py-4 rounded-2xl text-lg font-bold hover:bg-stone-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {publishing
          ? "Publishing..."
          : "🚀 Publish Listing"}
      </button>

    </>
  );
}
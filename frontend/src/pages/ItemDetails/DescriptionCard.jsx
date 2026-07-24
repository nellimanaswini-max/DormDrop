export default function DescriptionCard({ description }) {
  return (
    <div className="mt-12 rounded-3xl border border-stone-200 bg-white shadow-sm p-8">

      <h2 className="text-2xl font-bold text-stone-900">
        Description
      </h2>

      <p className="mt-5 text-stone-600 leading-8">
        {description}
      </p>

    </div>
  );
}
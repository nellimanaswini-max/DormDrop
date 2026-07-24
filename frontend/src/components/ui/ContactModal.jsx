import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({
  isOpen,
  onClose,
  seller,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-[420px] shadow-2xl"
          >
            <h2 className="text-2xl font-black mb-6">
              Contact Seller
            </h2>

            <div className="flex items-center gap-4">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">
                  {seller.name}
                </h3>

                <p className="text-stone-500">
                  ⭐ {seller.rating}
                </p>

                {seller.verified && (
                  <p className="text-green-600 font-semibold">
                    ✔ Verified Seller
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="p-4 rounded-xl bg-stone-100">
                📧 seller@email.com
              </div>

              <div className="p-4 rounded-xl bg-stone-100">
                📱 +91 XXXXX XXXXX
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React from "react";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-200/60 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white font-black text-sm">
              DD
            </div>

            <span className="text-lg font-bold tracking-tight text-stone-900">
              DormDrop
            </span>
          </div>

          <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
            A trusted marketplace for buying, selling, swapping, and donating
            items within your campus community.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-sm font-medium text-stone-600">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Verified Student Marketplace</span>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-3">

          {/* Footer Links */}
          <div className="flex items-center gap-4 text-sm font-medium text-stone-500">
            <button className="hover:text-stone-900 transition-colors">
              Privacy
            </button>

            <span className="text-stone-300">•</span>

            <button className="hover:text-stone-900 transition-colors">
              Terms
            </button>

            <span className="text-stone-300">•</span>

            <button className="hover:text-stone-900 transition-colors">
              Contact
            </button>
          </div>

          {/* Copyright */}
          <p className="text-xs text-stone-400 text-center md:text-right">
            © {currentYear} DormDrop • Built for students, by students.
          </p>
        </div>

      </div>
    </footer>
  );
}
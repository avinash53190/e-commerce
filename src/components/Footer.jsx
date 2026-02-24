import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg text-white">NexMart</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your premium multi-vendor marketplace for quality products across
              all categories.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?sort=featured"
                  className="hover:text-white transition-colors"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition-colors"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Help Center
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2024 NexMart. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((m) => (
              <span
                key={m}
                className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto border-neutral-100">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-base font-semibold mb-4 tracking-tight">Renelle Skin</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Premium Canadian skincare delivered monthly to your door.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/subscriptions" className="hover:text-neutral-900 transition-colors">
                  Subscription Kits
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-neutral-900 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/account" className="hover:text-neutral-900 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-sm text-neutral-500 text-center border-neutral-100">
          © 2026 Renelle Skin. Made in Canada.
        </div>
      </div>
    </footer>
  );
}
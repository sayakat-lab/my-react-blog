import { Link } from "react-router";

function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-900 text-white font-bold px-4 py-6">
      <Link to="/">Blog</Link>
      <Link to="/contact">お問い合わせ</Link>
    </header>
  );
}

export default Header;

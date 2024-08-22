import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div>
        <Link href="/">
          <a className="text-lg font-bold">Home</a>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <a className="text-lg">Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

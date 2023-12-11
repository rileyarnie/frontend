import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mb-5 grid place-items-center px-4 py-2 shadow-lg">
      <Link href="/">
        <Image src="/assets/isarLogo.png" height={250} width={250} alt="logo" />
      </Link>
    </nav>
  );
};

export default Navbar;

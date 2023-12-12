import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mb-5 grid grid-cols-3 place-items-center px-4 py-2 shadow-lg">
      <Link href="/">
        <Image
          className="object-contain"
          src="/assets/isarLogo.png"
          height={250}
          width={250}
          alt="logo"
        />
      </Link>
      <div className=" col-span-2 flex w-full justify-evenly ">
        <Link className="text-xs md:text-sm" href="/question-one">
          Question 1
        </Link>
        <Link className="text-xs md:text-sm" href="/question-two">
          Question 2
        </Link>
        <Link className="text-xs md:text-sm" href="/question-three">
          Question 3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  path: string;
};

const LinkButton = ({ name, path }: Props) => {
  return (
    <Link
      href={path}
      className="rounded-md border-[1px] border-gray-500 px-10 py-4 duration-300 ease-in-out hover:scale-105"
    >
      <p>{name}</p>
    </Link>
  );
};

export default LinkButton;

import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

const Button = ({ title }: Props) => {
  const router = useRouter();

  return (
    <button className="rounded-3xl bg-[#095EDD] px-4 py-2 text-xs font-medium uppercase text-white ">
      {title}
    </button>
  );
};

export default Button;

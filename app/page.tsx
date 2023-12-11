import LinkButton from "@/components/LinkButton";

const Links = [
  {
    id: 1,
    name: "Question 1",
    path: "/question-one",
  },
  {
    id: 2,
    name: "Question 2",
    path: "/question-two",
  },
  {
    id: 3,
    name: "Question 3",
    path: "/question-three",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
      {Links.map((link) => (
        <LinkButton key={link.id} name={link.name} path={link.path} />
      ))}
    </main>
  );
}

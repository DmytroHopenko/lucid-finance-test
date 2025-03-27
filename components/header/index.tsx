import { headerNavlist } from "@/constants";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-lucid-main h-20">
      <div className="wrapper flex items-center justify-between">
        <span className="text-white font-bold text-3xl">Lucid Finance</span>
        <nav>
          <ul className="flex gap-5 text-white font-semibold">
            {headerNavlist.map(({ link, name, id }) => (
              <li key={id}>
                <Link href={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

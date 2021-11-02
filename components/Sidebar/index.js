import { FiHome, FiBookmark, FiCompass } from "react-icons/fi";
import { RiMovie2Line } from "react-icons/ri";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

const sidebarData = [
  {
    href: "/",
    label: "Home",
    icon: FiHome,
  },
  {
    href: "/discover",
    label: "Dicover",
    icon: FiCompass,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: FiBookmark,
  },
];

function Sidebar() {
  return (
    <div className="sticky z-50 top-0 flex-none h-screen py-12 w-60 bg-dark-800 border-r border-gray-800">
      <Link href={`/`}>
        <h1 className="flex items-center space-x-2 ml-6 text-gray-100 cursor-pointer">
          <span>
            <RiMovie2Line className="h-6 w-6 " />
          </span>

          <span className="text-xl font-semibold">Moviegenix</span>
        </h1>
      </Link>
      <div className="my-20">
        {sidebarData.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

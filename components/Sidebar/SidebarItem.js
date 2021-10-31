import Link from "next/link";

function SidebarItem({ item }) {
    const { label, href, icon:Icon } = item;
  return (
    <Link href={href}>
      <div className="flex items-center space-x-3 w-full py-4 px-5 text-gray-300 hover:bg-dark-700 hover:border-l-4 hover:border-gray-100 hover:transition-all hover:duration-75 cursor-pointer">
        <Icon className='w-6 h-6 '/>
        <span className="relative  top-[1px] font-medium">{label}</span>
      </div>
    </Link>
  ); 
}

export default SidebarItem;

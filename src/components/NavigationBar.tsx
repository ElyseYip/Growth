import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const menuItems: Record<string, string>[] = [
  { name: "Home", url: "/" },
  { name: "Goal Setting", url: "/goals" },
  { name: "Financial Planning", url: "/financial-planning" },
  { name: "Daily Diary", url: "diary" },
];

const NavigationBar: React.FC = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  const displayMenu = menuItems.map((item) => {
    return (
      <li
        className={!nav ? "p-4" : "p-4 border-b border-gray-600"}
        key={item.name}
      >
        <NavLink to={item.url}>{item.name}</NavLink>
      </li>
    );
  });

  return (
    <div className="flex justify-between items-center h-24 px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">Growth.</h1>
      <ul className="hidden md:flex whitespace-nowrap ">{displayMenu}</ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "bg-[#000300] fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 ease-in-out duration-500 md:hidden"
            : "fixed left-[-100%] md:hidden"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          Growth.
        </h1>
        <ul className="uppercase p-4">{displayMenu}</ul>
      </div>
    </div>
  );
};

export default NavigationBar;

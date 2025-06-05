import { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import SideBarContent from "./SideBarContent";

interface Props {
  children?: React.ReactNode;
}

const RightSideBar: React.FC<Props> = ({ children }) => {
  const [calendarClick, setCalendarClick] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setCalendarClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarClick]);

  const handleCalendarClick = () => {
    setCalendarClick((prev) => !prev);
  };

  return (
    <div className="flex pr-8 ">
      <main className="flex-1">{children}</main>
      {calendarClick ? (
        <div
          ref={sidebarRef}
          className="flex-col items-end fixed bg-white min-w-[30%] h-full right-0 z-10"
        >
          <div className="flex justify-end pr-4" onClick={handleCalendarClick}>
            <AiOutlineClose size={30} />
          </div>
          <SideBarContent />
        </div>
      ) : (
        <div onClick={handleCalendarClick}>
          <FaRegCalendarAlt size={30} color="black" />
        </div>
      )}
    </div>
  );
};

export default RightSideBar;

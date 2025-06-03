import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import SideBarContent from "./SideBarContent";

interface Props {
  children?: React.ReactNode;
}

const RightSideBar: React.FC<Props> = ({ children }) => {
  const [calendarClick, setCalendarClick] = useState(false);

  const handleCalendarClick = () => {
    setCalendarClick((prev) => !prev);
  };

  return (
    <div className="flex justify-between">
      <main>{children}</main>
      {calendarClick ? (
        <div className="flex-col items-end fixed bg-white min-w-[30%] h-full right-0">
          <div className="flex justify-end" onClick={handleCalendarClick}>
            <AiOutlineClose size={30} />
          </div>
          <SideBarContent />
        </div>
      ) : (
        <div onClick={handleCalendarClick}>
          <FaRegCalendarAlt size={30} color="white" />
        </div>
      )}
    </div>
  );
};

export default RightSideBar;

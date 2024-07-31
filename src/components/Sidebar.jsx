import { BiMessageDetail, BiSolidError } from "react-icons/bi";
import { FaCalendarAlt, FaRegEdit } from "react-icons/fa";
import { FaElementor, FaGgCircle, FaList, FaRegChartBar } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { ImTable2 } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { IoCartSharp, IoDocumentTextOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { MdEmail, MdLocationPin, MdNotificationAdd, MdOutlineWidgets } from "react-icons/md";
import { RiStickyNote2Line, RiUserSharedFill } from "react-icons/ri";
// import useTheme from "../hooks/useTheme";


const Sidebar = ({sideCollaps}) => {
    // const {theme} = useTheme()
    const links = [
        {
            title: "Overview",
            path: "/",
            icon: <IoMdHome/>
        },
        {
            title: "Widgets",
            path: "/",
            icon: <MdOutlineWidgets />
        },
        {
            title: "Ui Elements",
            path: "/",
            icon: <FaElementor />
        },
        {
            title: "Advance UI",
            path: "/",
            icon: <GiNetworkBars />
        },
        {
            title: "Form Elements",
            path: "/",
            icon: <FaList />
        },
        {
            title: "Editors",
            path: "/",
            icon: <FaRegEdit />
        },
        {
            title: "Charts",
            path: "/",
            icon:<FaRegChartBar />
        },
        {
            title: "Tables",
            path: "/",
            icon:<ImTable2 />
        },
        {
            title: "Popups",
            path: "/",
            icon:<BiMessageDetail />
        },
        {
            title: "Notifications",
            path: "/",
            icon:<MdNotificationAdd />
        },
        {
            title: "Icons",
            path: "/",
            icon:<FaGgCircle />
        },
        {
            title: "Maps",
            path: "/",
            icon:<MdLocationPin />
        },
        {
            title: "User Pages",
            path: "/",
            icon:<RiUserSharedFill />
        },
        {
            title: "Error Pages",
            path: "/",
            icon:<BiSolidError />
        },
        {
            title: "E-Commerce",
            path: "/",
            icon:<IoCartSharp />
        },
        {
            title: "E-mail",
            path: "/",
            icon:<MdEmail />
        },
        {
            title: "Calendar",
            path: "/",
            icon:<FaCalendarAlt />
        },
        {
            title: "Todo list",
            path: "/",
            icon:<LuListTodo />
        },
        {
            title: "Gallery",
            path: "/",
            icon:<GrGallery />
        },
        {
            title: "Documentation",
            path: "/",
            icon:<IoDocumentTextOutline />
        },

    ]
    return (
        <aside className={`  shadow-lg ${ sideCollaps ? 'w-16 md:w-64' : 'w-16'}`}>
        <div className="p-2 bg-[#E6498C] text-white">
          <div className={`  ${sideCollaps ? 'hidden md:flex justify-center items-center gap-2' : 'hidden'}`}>
                <div className=" rounded-full bg-orange-400 p-4 text-center"><RiStickyNote2Line className="w-full"/></div>
        <h2 className="text-xl  font-semibold">Dashboard</h2></div>
        </div>
        <nav className="mt-12">
          <ul>
            
            {links.map((link, idx)=> (
                <li key={idx} className="p-2">
                <a href="#" className={`hover:bg-gray-200 hover:text-green-500 active:text-green-600 rounded-lg  p-2 flex items-center gap-2 `}>
                  <span className={`text-center ${sideCollaps ? 'text-xl ' : 'text-xl md:text-2xl '} `}>{link.icon}</span>
                  <span className={`font-semibold ${sideCollaps ? 'hidden md:block ' : 'hidden'}`}>{link.title}</span>
                </a>
              </li>
            ))}


           
            
          </ul>
        </nav>
      </aside>
    );
};

export default Sidebar;
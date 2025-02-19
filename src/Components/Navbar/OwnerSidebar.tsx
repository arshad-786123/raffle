import { useEffect, useState } from "react";
import control from '../../assets/control.png'
import liveRaffles from '../../assets/owner_menu/liveRaffles.png'
import myAccount from '../../assets/owner_menu/myaccount.png'
import balance from '../../assets/owner_menu/balance.png'
import trophy from '../../assets/owner_menu/trophy.png'
import help from '../../assets/owner_menu/help.png'
import { useNavigate } from "react-router-dom";

const OwnerSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [Menus, setMenus] = useState([
    {
      title: "Raffles",
      src: liveRaffles,
      gap: false,
      isActive: true,
      link: "/owner",
    },
    {
      title: "Business Profile",
      src: myAccount,
      gap: false,
      isActive: false,
      link: "/owner/account",
    },
    {
      title: "Winners",
      src: trophy,
      gap: false,
      isActive: false,
      link: "/owner/prizes",
    },
    {
      title: "Support",
      src: help,
      gap: false,
      isActive: false,
      link: "/owner/support",
    },
  ]);

  const handleMenuClick = (index: number) => {
    const updatedMenus = Menus.map((menu, i) => {
      if (i === index) {
        return { ...menu, isActive: true };
      } else {
        return { ...menu, isActive: false };
      }
    });

    setMenus(updatedMenus);
  };

  const handleNavigate = (menu: any) => {
    navigate(menu.link);
  };

  useEffect(() => {
    if (window.location.pathname == "/owner") {
      setMenus([
        {
          title: "Raffles",
          src: liveRaffles,
          gap: false,
          isActive: true,
          link: "/owner",
        },
        {
          title: "Business Profile",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/owner/account",
        },
        // {
        //   title: "Revenue ",
        //   src: balance,
        //   gap: false,
        //   isActive: false,
        //   link: "/owner/balance",
        // },
        {
          title: "Winners",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/owner/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/owner/support",
        },
      ]);
    } else if (window.location.pathname == "/owner/account") {
      setMenus([
        {
          title: "Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/owner",
        },
        {
          title: "Business Profile",
          src: myAccount,
          gap: false,
          isActive: true,
          link: "/owner/account",
        },
        // {
        //   title: "Revenue ",
        //   src: balance,
        //   gap: false,
        //   isActive: false,
        //   link: "/owner/balance",
        // },
        {
          title: "Winners",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/owner/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/owner/support",
        },
      ]);
    } else if (window.location.pathname == "/owner/prizes") {
      setMenus([
        {
          title: "Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/owner",
        },
        {
          title: "Business Profile",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/owner/account",
        },
        // {
        //   title: "Revenue ",
        //   src: balance,
        //   gap: false,
        //   isActive: false,
        //   link: "/owner/balance",
        // },
        {
          title: "Winners",
          src: trophy,
          gap: false,
          isActive: true,
          link: "/owner/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false, // Fixed: was incorrectly set to true
          link: "/owner/support",
        },
      ]);
    } else if (window.location.pathname == "/owner/balance") {
      setMenus([
        {
          title: "Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/owner",
        },
        {
          title: "Business Profile",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/owner/account",
        },
        // {
        //   title: "Revenue ",
        //   src: balance,
        //   gap: false,
        //   isActive: true,
        //   link: "/owner/balance",
        // },
        {
          title: "Winners",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/owner/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/owner/support",
        },
      ]);
    } else if (window.location.pathname == "/owner/support") {
      // Added support route
      setMenus([
        {
          title: "Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/owner",
        },
        {
          title: "Business Profile",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/owner/account",
        },
        // {
        //   title: "Revenue ",
        //   src: balance,
        //   gap: false,
        //   isActive: false,
        //   link: "/owner/balance",
        // },
        {
          title: "Winners",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/owner/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: true, // Set active for support route
          link: "/owner/support",
        },
      ]);
    }
  }, [window.location.pathname]); // Added pathname as dependency

  return (
    <div className={`relative ${open ? "w-72" : "w-20 "} z-40`}>
      <div
        className={` ${open ? "w-72" : "w-20 "
          } fixed  left-0 top-20 bg-[#20124C] bg-dark-purple h-screen   pt-8  duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center"></div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`hover:bg-[#4D3B87]  px-5 py-3  ${Menu.isActive ? "bg-[#4D3B87]" : "bg-transparent"
                } flex   p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white "
                } `}
              onClick={() => {
                handleMenuClick(index);
                handleNavigate(Menu);
              }}
            >
              <img src={Menu.src} />
              <span
                className={`${!open && "hidden"
                  } text-white origin-left duration-200 text-md font-meduim  font-modernEraBold`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OwnerSidebar;

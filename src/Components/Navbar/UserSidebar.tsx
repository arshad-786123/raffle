import { useEffect, useState } from "react";
import control from '../../assets/control.png'
import liveRaffles from '../../assets/owner_menu/liveRaffles.png'
import myAccount from '../../assets/owner_menu/myaccount.png'
import balance from '../../assets/owner_menu/balance.png'
import trophy from '../../assets/owner_menu/trophy.png'
import help from '../../assets/owner_menu/help.png'
import entries from '../../assets/admin_menu/entries.png'
import { useNavigate, useParams } from "react-router-dom";

const UserSidebar = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const [Menus, setMenus] = useState([
    {
      title: "My Raffles",
      src: liveRaffles,
      gap: false,
      isActive: true,
      link: "/user",
    },
    {
      title: "My Account",
      src: myAccount,
      gap: false,
      isActive: false,
      link: "/user/account",
    },
    // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
    {
      title: "Orders",
      src: entries,
      gap: false,
      isActive: false,
      link: "/user/orders",
    },
    {
      title: "My Prizes",
      src: trophy,
      gap: false,
      isActive: false,
      link: "/user/prizes",
    },
    {
      title: "Support",
      src: help,
      gap: false,
      isActive: false,
      link: "/user/support",
    },
  ]);

  useEffect(() => {
    if (window.location.pathname == "/user") {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: true,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
        {
          title: "Orders",
          src: entries,
          gap: false,
          isActive: false,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    } else if (window.location.pathname == "/user/account") {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: true,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
        {
          title: "Orders",
          src: entries,
          gap: false,
          isActive: false,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    }
    else if (window.location.pathname == "/user/balance") {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: true, link: "/user/balance" },
        {
          title: "Orders",
          src: entries,
          gap: false,
          isActive: false,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    } else if (window.location.pathname == "/user/orders") {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
        {
          title: "Orders",
          src: entries,
          gap: false,
          isActive: true,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    } else if (window.location.pathname == "/user/orders/detail/" + id) {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
        {
          title: "Orders",
          src: entries,
          gap: false,
          isActive: true,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: false,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    }
    else if (window.location.pathname == "/user/prizes") {
      setMenus([
        {
          title: "My Raffles",
          src: liveRaffles,
          gap: false,
          isActive: false,
          link: "/user",
        },
        {
          title: "My Account",
          src: myAccount,
          gap: false,
          isActive: false,
          link: "/user/account",
        },
        // { title: "Balance", src: balance, gap: false, isActive: false, link: "/user/balance" },
        {
          title: "Orders",
          src: balance,
          gap: false,
          isActive: false,
          link: "/user/orders",
        },
        {
          title: "My Prizes",
          src: trophy,
          gap: false,
          isActive: true,
          link: "/user/prizes",
        },
        {
          title: "Support",
          src: help,
          gap: false,
          isActive: false,
          link: "/user/support",
        },
      ]);
    }
  }, [])


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
    navigate(menu.link)
  }

  return (
    <div className={`relative ${open ? "w-72" : "w-20 "} z-40`} >
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
        <div className="flex gap-x-4 items-center">
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`hover:bg-[#4D3B87]  px-5 py-3  ${Menu.isActive ? "bg-[#4D3B87]" : "bg-transparent"} flex   p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white "
                } `}
              onClick={() => { handleMenuClick(index); handleNavigate(Menu) }}
            >
              <img src={Menu.src} />
              <span className={`${!open && "hidden"} text-white origin-left duration-200 text-md font-meduim`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default UserSidebar;

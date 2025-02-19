import { useEffect, useState } from "react";
import control from '../../assets/control.png'
import reports from '../../assets/admin_menu/reports.png'
import users from '../../assets/admin_menu/users.png'
import merchants from '../../assets/admin_menu/merchants.png'
import raffles from '../../assets/admin_menu/raffles.png'
import winners from '../../assets/admin_menu/winners.png'
import entries from '../../assets/admin_menu/entries.png'
import admin from '../../assets/admin_menu/admin.png'
import sponsor from '../../assets/admin_menu/sponsor.png'
import { useNavigate, useParams } from "react-router-dom";
import { RiMenuSearchLine } from "react-icons/ri";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(true);
    const [Menus, setMenus] = useState([
        { title: "Reports", src: reports, gap: false, isActive: true, link: "/admin/reports" },
        { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
        // { title: "Accounts", src: "User", gap: true },
        { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
        { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
        { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
        { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
        { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
        { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
        { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
        { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
        { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
        { title: "Orders", src: admin, gap: false, isActive: false, link: "/admin/orders" },
        { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
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
        navigate(menu.link)
    }


    useEffect(() => {
        if (window.location.pathname == "/admin/reports") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: true, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        } else if (window.location.pathname == "/admin/users") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: true, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/user/transactions/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: true, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/merchants") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: true, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/merchants/detail/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: true, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/merchants/raffles/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: true, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/merchants/raffles/salse/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: true, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/raffles") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: true, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/orders") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: true, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/orders/detail/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: true, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/edit/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: true, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/winners") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: true, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },
            ])
        }
        else if (window.location.pathname == "/admin/entries") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: true, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/settings") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: true, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/sponsor") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: true, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/categories") {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: true, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/user/reset-password/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: true, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        else if (window.location.pathname == "/admin/coupon" || window.location.pathname == "/admin/coupon/create" || window.location.pathname == "/admin/coupon/" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: true, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

            ])
        }
        // else if (window.location.pathname == "/admin/coupon/create") {
        //     setMenus([
        //         { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
        //         { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
        //         { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
        //         { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
        //         { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
        //         { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
        //         { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
        //         { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
        //         { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
        //         { title: "Coupon", src: admin, gap: false, isActive: true, link: "/admin/coupon" },
        //         { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

        //     ])
        // }
        // else if (window.location.pathname == "/admin/coupon/create") {
        //     setMenus([
        //         { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
        //         { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
        //         { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
        //         { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
        //         { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
        //         { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
        //         { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
        //         { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
        //         { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
        //         { title: "Coupon", src: admin, gap: false, isActive: true, link: "/admin/coupon" },
        //         { title: "Setting", src: entries, gap: false, isActive: false, link: "/admin/terms-condition" },

        //     ])
        // }
        else if (window.location.pathname == "/admin/terms-condition" || window.location.pathname == "/admin/terms-condition/create" || window.location.pathname == "/admin/terms-condition" + id) {
            setMenus([
                { title: "Reports", src: reports, gap: false, isActive: false, link: "/admin/reports" },
                { title: "Customers", src: users, gap: false, isActive: false, link: "/admin/users" },
                { title: "Merchants ", src: merchants, gap: false, isActive: false, link: "/admin/merchants" },
                { title: "Raffles", src: raffles, gap: false, isActive: false, link: "/admin/raffles" },
                { title: "Orders", src: entries, gap: false, isActive: false, link: "/admin/orders" },
                { title: "Winners", src: winners, gap: false, isActive: false, link: "/admin/winners" },
                { title: "Entries", src: entries, gap: false, isActive: false, link: "/admin/entries" },
                { title: "ContactUs ", src: merchants, gap: false, isActive: false, link: "/admin/contact-us" },
                { title: "Sponsor raffles", src: entries, gap: false, isActive: false, link: "#" },
                { title: "Admin", src: admin, gap: false, isActive: false, link: "/admin/settings" },
                { title: "Category", src: admin, gap: false, isActive: false, link: "/admin/categories" },
                { title: "Coupon", src: admin, gap: false, isActive: false, link: "/admin/coupon" },
                { title: "Setting", src: entries, gap: false, isActive: true, link: "/admin/terms-condition" },

            ])
        }
    }, [])

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
                            {Menu.title == "Category" ? <RiMenuSearchLine size={20} /> : <img src={Menu.src} />}
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
export default AdminSidebar;

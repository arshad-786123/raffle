import { useEffect, useRef, useState } from "react";
import mainLogo from "../../assets/second_logo.png";
import whitelogo from "../../assets/main_logo.png";
import { useNavigate } from "react-router-dom";
import { AuthResult } from "../../Services/Authentication/login";
import { useDispatch, useSelector } from "react-redux";
import { checkType } from "../../Services/Authentication/checkType";
import { Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import { storeGuestUser, storeUser } from "../../Redux/User/userSlice";
import { CONSTANT_DATA } from "../../constants";
import { clearCart } from "../../Redux/Cart/cartSlice";
import noimage from "../../assets/no-image-user.png";
import {
  getOwnerNotification,
  ownerNotificationStatusUpdate,
} from "../../Services/Owner/getRaffle";

interface AuthenticationModalState {
  isSignUpOpen: boolean;
  isSignInOpen: boolean;
  isSignUp1Step: boolean;
  isBusinessSignUp1Step: boolean;
  isSignUp2Step: boolean;
  isForgotPassOpen: boolean;
}

interface OwnerNavbarProps {
  selectedImageForNavbar: string | null;
  setAuthenticationModal: React.Dispatch<
    React.SetStateAction<AuthenticationModalState>
  >;
  authenticationModal: AuthenticationModalState;
}
const OwnerNavbar: React.FC<OwnerNavbarProps> = ({
  selectedImageForNavbar,
  setAuthenticationModal,
  authenticationModal,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/");
  };
  const userDetails = useSelector((state: any) => state.reducer.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerRef = useRef<HTMLDivElement>(null); // Specify the type of drawerRef

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if drawerRef.current is not null and contains the event target
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    getNotificationData();
  }, []);

  const redirection = () => {
    navigate("/owner");
  };

  const viewAllNotification = () => {
    navigate("/owner/notification-nav", { state: notifications });
  };

  const getNotificationData = async () => {
    try {
      const res = await getOwnerNotification();
      setNotifications(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedMenu, setselectedMenu] = useState(
    <div className=" bg-[#20124C] cursor-pointer text-white flex items-center gap-2 font-medium">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.62844 7.87252H1.71282C1.68607 7.87252 1.66593 7.86242 1.65343 7.85042C1.64736 7.8446 1.64478 7.83989 1.64397 7.83804C1.64352 7.83704 1.64353 7.83691 1.64355 7.8367C1.64355 7.83666 1.64355 7.83661 1.64355 7.83656V1.5489C1.64355 1.54884 1.64355 1.54879 1.64355 1.54875C1.64353 1.54855 1.64352 1.54842 1.64397 1.54741C1.64478 1.54556 1.64736 1.54086 1.65343 1.53503C1.66593 1.52304 1.68607 1.51294 1.71282 1.51294H6.62844C6.6552 1.51294 6.67533 1.52304 6.68784 1.53503C6.69391 1.54086 6.69648 1.54556 6.6973 1.54741C6.69775 1.54842 6.69774 1.54855 6.69772 1.54875C6.69772 1.54879 6.69771 1.54884 6.69771 1.5489V7.83656C6.69771 7.83672 6.69774 7.83679 6.69771 7.83695C6.69768 7.83712 6.69758 7.83741 6.6973 7.83804C6.69648 7.83989 6.69391 7.8446 6.68784 7.85042C6.67533 7.86242 6.6552 7.87252 6.62844 7.87252ZM6.62844 14.1602H1.71282C1.68607 14.1602 1.66593 14.1501 1.65343 14.1381C1.64736 14.1323 1.64478 14.1276 1.64397 14.1257C1.64352 14.1247 1.64353 14.1246 1.64355 14.1244C1.64355 14.1243 1.64355 14.1243 1.64355 14.1242V10.9804C1.64355 10.9803 1.64355 10.9803 1.64355 10.9802C1.64353 10.98 1.64352 10.9799 1.64397 10.9789C1.64478 10.9771 1.64736 10.9723 1.65343 10.9665C1.66593 10.9545 1.68607 10.9444 1.71282 10.9444H6.62844C6.6552 10.9444 6.67533 10.9545 6.68784 10.9665C6.69391 10.9723 6.69648 10.9771 6.6973 10.9789C6.69784 10.9801 6.69771 10.9801 6.69771 10.9804V14.1242C6.69771 14.1245 6.69784 14.1245 6.6973 14.1257C6.69648 14.1276 6.69391 14.1323 6.68784 14.1381C6.67533 14.1501 6.6552 14.1602 6.62844 14.1602ZM14.8211 14.1602H9.90552C9.87877 14.1602 9.85863 14.1501 9.84613 14.1381C9.84005 14.1323 9.83748 14.1276 9.83666 14.1257C9.83622 14.1247 9.83623 14.1246 9.83624 14.1244C9.83625 14.1243 9.83625 14.1243 9.83625 14.1242V7.83656C9.83625 7.8365 9.83625 7.83646 9.83624 7.83641C9.83623 7.83621 9.83622 7.83608 9.83666 7.83507C9.83748 7.83322 9.84005 7.82852 9.84613 7.82269C9.85863 7.8107 9.87877 7.8006 9.90552 7.8006H14.8211C14.8479 7.8006 14.868 7.8107 14.8805 7.82269C14.8866 7.82852 14.8892 7.83322 14.89 7.83507C14.8904 7.83608 14.8904 7.83621 14.8904 7.83641C14.8904 7.83646 14.8904 7.8365 14.8904 7.83656V14.1242C14.8904 14.1243 14.8904 14.1243 14.8904 14.1244C14.8904 14.1246 14.8904 14.1247 14.89 14.1257C14.8892 14.1276 14.8866 14.1323 14.8805 14.1381C14.868 14.1501 14.8479 14.1602 14.8211 14.1602ZM9.83625 4.69273V1.5489C9.83625 1.54856 9.83613 1.54863 9.83666 1.54741C9.83748 1.54556 9.84005 1.54086 9.84613 1.53503C9.85863 1.52304 9.87877 1.51294 9.90552 1.51294H14.8211C14.8479 1.51294 14.868 1.52304 14.8805 1.53503C14.8866 1.54086 14.8892 1.54556 14.89 1.54741C14.8905 1.54863 14.8904 1.54856 14.8904 1.5489V4.69273C14.8904 4.69306 14.8905 4.693 14.89 4.69421C14.8892 4.69606 14.8866 4.70077 14.8805 4.70659C14.868 4.71859 14.8479 4.72868 14.8211 4.72868H9.90552C9.87877 4.72868 9.85863 4.71859 9.84613 4.70659C9.84005 4.70077 9.83748 4.69606 9.83666 4.69421C9.83622 4.69321 9.83623 4.69308 9.83624 4.69287C9.83625 4.69283 9.83625 4.69278 9.83625 4.69273Z"
          fill="white"
          stroke="white"
          stroke-width="1.5"
        />
      </svg>
      <p>Raffles</p>
    </div>
  );

  const handleSelectMenu = (menu: Number) => {
    switch (menu) {
      case 1:
        setselectedMenu(
          <div className="text-white flex items-center gap-2 font-medium">
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.62844 7.87252H1.71282C1.68607 7.87252 1.66593 7.86242 1.65343 7.85042C1.64736 7.8446 1.64478 7.83989 1.64397 7.83804C1.64352 7.83704 1.64353 7.83691 1.64355 7.8367C1.64355 7.83666 1.64355 7.83661 1.64355 7.83656V1.5489C1.64355 1.54884 1.64355 1.54879 1.64355 1.54875C1.64353 1.54855 1.64352 1.54842 1.64397 1.54741C1.64478 1.54556 1.64736 1.54086 1.65343 1.53503C1.66593 1.52304 1.68607 1.51294 1.71282 1.51294H6.62844C6.6552 1.51294 6.67533 1.52304 6.68784 1.53503C6.69391 1.54086 6.69648 1.54556 6.6973 1.54741C6.69775 1.54842 6.69774 1.54855 6.69772 1.54875C6.69772 1.54879 6.69771 1.54884 6.69771 1.5489V7.83656C6.69771 7.83672 6.69774 7.83679 6.69771 7.83695C6.69768 7.83712 6.69758 7.83741 6.6973 7.83804C6.69648 7.83989 6.69391 7.8446 6.68784 7.85042C6.67533 7.86242 6.6552 7.87252 6.62844 7.87252ZM6.62844 14.1602H1.71282C1.68607 14.1602 1.66593 14.1501 1.65343 14.1381C1.64736 14.1323 1.64478 14.1276 1.64397 14.1257C1.64352 14.1247 1.64353 14.1246 1.64355 14.1244C1.64355 14.1243 1.64355 14.1243 1.64355 14.1242V10.9804C1.64355 10.9803 1.64355 10.9803 1.64355 10.9802C1.64353 10.98 1.64352 10.9799 1.64397 10.9789C1.64478 10.9771 1.64736 10.9723 1.65343 10.9665C1.66593 10.9545 1.68607 10.9444 1.71282 10.9444H6.62844C6.6552 10.9444 6.67533 10.9545 6.68784 10.9665C6.69391 10.9723 6.69648 10.9771 6.6973 10.9789C6.69784 10.9801 6.69771 10.9801 6.69771 10.9804V14.1242C6.69771 14.1245 6.69784 14.1245 6.6973 14.1257C6.69648 14.1276 6.69391 14.1323 6.68784 14.1381C6.67533 14.1501 6.6552 14.1602 6.62844 14.1602ZM14.8211 14.1602H9.90552C9.87877 14.1602 9.85863 14.1501 9.84613 14.1381C9.84005 14.1323 9.83748 14.1276 9.83666 14.1257C9.83622 14.1247 9.83623 14.1246 9.83624 14.1244C9.83625 14.1243 9.83625 14.1243 9.83625 14.1242V7.83656C9.83625 7.8365 9.83625 7.83646 9.83624 7.83641C9.83623 7.83621 9.83622 7.83608 9.83666 7.83507C9.83748 7.83322 9.84005 7.82852 9.84613 7.82269C9.85863 7.8107 9.87877 7.8006 9.90552 7.8006H14.8211C14.8479 7.8006 14.868 7.8107 14.8805 7.82269C14.8866 7.82852 14.8892 7.83322 14.89 7.83507C14.8904 7.83608 14.8904 7.83621 14.8904 7.83641C14.8904 7.83646 14.8904 7.8365 14.8904 7.83656V14.1242C14.8904 14.1243 14.8904 14.1243 14.8904 14.1244C14.8904 14.1246 14.8904 14.1247 14.89 14.1257C14.8892 14.1276 14.8866 14.1323 14.8805 14.1381C14.868 14.1501 14.8479 14.1602 14.8211 14.1602ZM9.83625 4.69273V1.5489C9.83625 1.54856 9.83613 1.54863 9.83666 1.54741C9.83748 1.54556 9.84005 1.54086 9.84613 1.53503C9.85863 1.52304 9.87877 1.51294 9.90552 1.51294H14.8211C14.8479 1.51294 14.868 1.52304 14.8805 1.53503C14.8866 1.54086 14.8892 1.54556 14.89 1.54741C14.8905 1.54863 14.8904 1.54856 14.8904 1.5489V4.69273C14.8904 4.69306 14.8905 4.693 14.89 4.69421C14.8892 4.69606 14.8866 4.70077 14.8805 4.70659C14.868 4.71859 14.8479 4.72868 14.8211 4.72868H9.90552C9.87877 4.72868 9.85863 4.71859 9.84613 4.70659C9.84005 4.70077 9.83748 4.69606 9.83666 4.69421C9.83622 4.69321 9.83623 4.69308 9.83624 4.69287C9.83625 4.69283 9.83625 4.69278 9.83625 4.69273Z"
                fill="white"
                stroke="white"
                stroke-width="1.5"
              />
            </svg>
            <p>Raffles</p>
          </div>
        );
        navigate("/owner");
        break;
      case 2:
        setselectedMenu(
          <div className="  cursor-pointer text-white flex items-center gap-2 font-medium">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_206_3063)">
                <path
                  d="M7.79391 7.34468C8.7204 7.34468 9.52266 6.98866 10.1782 6.28622C10.8337 5.5839 11.166 4.72457 11.166 3.7318C11.166 2.73937 10.8337 1.87992 10.1781 1.17737C9.52245 0.475165 8.72029 0.119141 7.79391 0.119141C6.86732 0.119141 6.06528 0.475165 5.40977 1.17749C4.75427 1.87981 4.42188 2.73926 4.42188 3.7318C4.42188 4.72457 4.75427 5.58402 5.40988 6.28634C6.06549 6.98854 6.86765 7.34468 7.79391 7.34468Z"
                  fill="white"
                />
                <path
                  d="M13.694 11.6534C13.675 11.3611 13.6368 11.0423 13.5805 10.7056C13.5237 10.3664 13.4505 10.0457 13.3629 9.75266C13.2725 9.44974 13.1494 9.15059 12.9973 8.86392C12.8395 8.56637 12.654 8.30728 12.446 8.09408C12.2284 7.87103 11.962 7.6917 11.654 7.5609C11.347 7.43078 11.0068 7.36486 10.6429 7.36486C10.5 7.36486 10.3618 7.42769 10.0948 7.61388C9.93056 7.72867 9.7384 7.86142 9.52393 8.00824C9.34053 8.13344 9.09209 8.25074 8.78522 8.35694C8.48582 8.46074 8.18184 8.51339 7.88181 8.51339C7.58177 8.51339 7.27789 8.46074 6.97818 8.35694C6.67163 8.25086 6.42319 8.13356 6.24001 8.00836C6.02756 7.86291 5.8353 7.73015 5.66856 7.61377C5.40196 7.42757 5.26364 7.36475 5.12073 7.36475C4.75671 7.36475 4.41663 7.43078 4.10976 7.56101C3.80193 7.69159 3.53543 7.87092 3.31764 8.09419C3.10968 8.30751 2.92415 8.56649 2.76649 8.86392C2.6145 9.15059 2.49146 9.44962 2.40088 9.75278C2.3134 10.0459 2.24023 10.3664 2.18341 10.7056C2.12712 11.0418 2.08888 11.3608 2.06998 11.6537C2.05139 11.9408 2.04199 12.2387 2.04199 12.5395C2.04199 13.3225 2.27431 13.9564 2.73242 14.4239C3.18488 14.8852 3.78355 15.1192 4.51158 15.1192H11.2527C11.9807 15.1192 12.5792 14.8853 13.0317 14.4239C13.4899 13.9567 13.7223 13.3227 13.7223 12.5394C13.7222 12.2372 13.7126 11.939 13.694 11.6534Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_206_3063">
                  <rect
                    width="14"
                    height="15"
                    fill="white"
                    transform="translate(0.893555 0.119141)"
                  />
                </clipPath>
              </defs>
            </svg>
            {/* <p>My Account</p> */}
            <p>Business Profile</p>
          </div>
        );
        navigate("/owner/account");
        break;
      case 3:
        // setselectedMenu(
        //   <div className="  cursor-pointer text-white flex items-center gap-2 font-medium">
        //     <svg
        //       width="14"
        //       height="16"
        //       viewBox="0 0 14 16"
        //       fill="none"
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <path
        //         d="M1.78992 5.81943C2.59766 6.13818 3.60937 6.34414 4.70312 6.41797C5.57375 4.52832 7.39101 3.22461 9.48828 3.22461C10.0461 3.22426 10.6005 3.31799 11.1311 3.50234C10.967 3.04678 10.512 2.52529 9.42101 2.09609C8.39453 1.68975 7.04047 1.4668 5.60547 1.4668C4.17047 1.4668 2.81641 1.68975 1.78992 2.09463C0.310625 2.67852 0 3.42969 0 3.95703C0 4.48438 0.310625 5.23555 1.78992 5.81943Z"
        //         fill="white"
        //       />
        //       <path
        //         d="M1.78992 9.48193C2.48637 9.75674 3.33457 9.94775 4.2566 10.0421C4.08773 9.12192 4.13252 8.17139 4.38703 7.27412C3.31434 7.18008 2.3193 6.96563 1.50637 6.64453C0.880742 6.39756 0.376523 6.09609 0 5.74219V7.61953C0 8.14688 0.310625 8.89805 1.78992 9.48193Z"
        //         fill="white"
        //       />
        //       <path
        //         d="M4.49641 10.9453C3.38215 10.8574 2.34691 10.6386 1.50637 10.3066C0.880742 10.0597 0.376523 9.7582 0 9.4043V11.2816C0 11.809 0.310625 12.5602 1.78992 13.144C2.81641 13.5489 4.17047 13.7719 5.60547 13.7719C5.94125 13.7719 6.27266 13.7596 6.59668 13.7355C5.63663 13.0694 4.90067 12.0917 4.49641 10.9453Z"
        //         fill="white"
        //       />
        //       <path
        //         d="M9.48828 4.10352C7 4.10352 4.97656 6.27148 4.97656 8.9375C4.97656 11.6035 7 13.7715 9.48828 13.7715C11.9766 13.7715 14 11.6035 14 8.9375C14 6.27148 11.9766 4.10352 9.48828 4.10352ZM9.15469 8.49805H9.82188C10.1647 8.50232 10.4927 8.64851 10.7372 8.90601C10.9817 9.16351 11.1238 9.51237 11.1337 9.87956C11.1436 10.2467 11.0205 10.6038 10.7903 10.876C10.56 11.1482 10.2405 11.3144 9.89844 11.3398V11.5742C9.89844 11.6908 9.85522 11.8025 9.77831 11.885C9.70139 11.9674 9.59706 12.0137 9.48828 12.0137C9.3795 12.0137 9.27518 11.9674 9.19826 11.885C9.12134 11.8025 9.07812 11.6908 9.07812 11.5742V11.3434H8.23703C8.12825 11.3434 8.02393 11.2971 7.94701 11.2146C7.87009 11.1322 7.82687 11.0205 7.82687 10.9039C7.82687 10.7874 7.87009 10.6756 7.94701 10.5932C8.02393 10.5108 8.12825 10.4645 8.23703 10.4645H9.82297C9.95757 10.4645 10.0867 10.4072 10.1818 10.3052C10.277 10.2032 10.3305 10.0649 10.3305 9.9207C10.3305 9.77649 10.277 9.63819 10.1818 9.53621C10.0867 9.43424 9.95757 9.37695 9.82297 9.37695H9.15469C8.81186 9.37268 8.48386 9.22649 8.23935 8.96899C7.99484 8.71149 7.85276 8.36263 7.84287 7.99544C7.83298 7.62825 7.95603 7.2712 8.18627 6.99901C8.41651 6.72682 8.7361 6.56061 9.07812 6.53516V6.30078C9.07812 6.18423 9.12134 6.07245 9.19826 5.99004C9.27518 5.90763 9.3795 5.86133 9.48828 5.86133C9.59706 5.86133 9.70139 5.90763 9.77831 5.99004C9.85522 6.07245 9.89844 6.18423 9.89844 6.30078V6.53164H10.7395C10.8483 6.53164 10.9526 6.57794 11.0296 6.66035C11.1065 6.74277 11.1497 6.85454 11.1497 6.97109C11.1497 7.08764 11.1065 7.19942 11.0296 7.28183C10.9526 7.36425 10.8483 7.41055 10.7395 7.41055H9.15359C9.019 7.41055 8.88991 7.46783 8.79474 7.56981C8.69956 7.67178 8.64609 7.81009 8.64609 7.9543C8.64609 8.09851 8.69956 8.23681 8.79474 8.33879C8.88991 8.44076 9.019 8.49805 9.15359 8.49805H9.15469Z"
        //         fill="white"
        //       />
        //     </svg>

        //     <p>Revenue</p>
        //   </div>
        // );
        navigate("/owner/balance");
        break;
      case 4:
        setselectedMenu(
          <div className=" cursor-pointer text-white flex items-center gap-2 font-medium">
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5281 0.75H13.1281V0H3.52813V0.75H1.12813C0.648125 0.75 0.328125 1.05 0.328125 1.5V3.3C0.328125 5.025 1.68813 6.45 3.52813 6.675V6.75C3.52813 8.925 5.12813 10.725 7.28813 11.175L6.72813 12.75H4.88812C4.56812 12.75 4.24812 12.975 4.16812 13.275L3.52813 15H13.1281L12.4881 13.275C12.4081 12.975 12.0881 12.75 11.7681 12.75H9.92813L9.36812 11.175C11.5281 10.725 13.1281 8.925 13.1281 6.75V6.675C14.9681 6.45 16.3281 5.025 16.3281 3.3V1.5C16.3281 1.05 16.0081 0.75 15.5281 0.75ZM3.52813 5.175C2.64813 4.95 1.92813 4.2 1.92813 3.3V2.25H3.52813V5.175ZM9.92813 7.5L8.32812 6.675L6.72813 7.5L7.12813 6L5.92812 4.5H7.60813L8.32812 3L9.04813 4.5H10.7281L9.52812 6L9.92813 7.5ZM14.7281 3.3C14.7281 4.2 14.0081 5.025 13.1281 5.175V2.25H14.7281V3.3Z"
                fill="white"
              />
            </svg>
            {/* <p>Prizes</p> */}
            <p>Winners</p>
          </div>
        );
        navigate("/owner/prizes");
        break;
      case 5:
        setselectedMenu(
          <div className=" cursor-pointer text-white flex items-center gap-2 font-medium">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_206_3068)">
                <path
                  d="M14.3281 10.9395C14.3281 8.75306 12.9531 6.84281 11.0142 6.26717C10.8923 3.22385 8.54375 0.788086 5.67383 0.788086C2.72615 0.788086 0.328125 3.3574 0.328125 6.51562C0.328125 7.54491 0.583832 8.54707 1.0694 9.42689L0.347778 12.222L2.95665 11.4489C3.71149 11.9272 4.56299 12.1966 5.44183 12.2372C5.97899 14.3148 7.76199 15.7881 9.80273 15.7881C10.6173 15.7881 11.4094 15.5557 12.1054 15.114L14.3084 15.7669L13.699 13.4066C14.1112 12.6609 14.3281 11.8122 14.3281 10.9395ZM3.08611 10.4986L1.52431 10.9615L1.95636 9.28819L1.85788 9.12316C1.39378 8.34519 1.14844 7.44351 1.14844 6.51562C1.14844 3.84206 3.1785 1.66699 5.67383 1.66699C8.16916 1.66699 10.1992 3.84206 10.1992 6.51562C10.1992 9.18919 8.16916 11.3643 5.67383 11.3643C4.8078 11.3643 3.96634 11.1014 3.24013 10.6041L3.08611 10.4986ZM13.1319 14.5065L11.973 14.1629L11.8183 14.2708C11.2183 14.6884 10.5213 14.9092 9.80273 14.9092C8.19885 14.9092 6.78947 13.7981 6.29013 12.2048C8.74615 11.9014 10.7006 9.8074 10.9839 7.17583C12.4708 7.71096 13.5078 9.22101 13.5078 10.9395C13.5078 11.7093 13.3018 12.4561 12.912 13.099L12.8113 13.2648L13.1319 14.5065Z"
                  fill="white"
                />
                <path
                  d="M5.26367 8.72754H6.08398V9.60645H5.26367V8.72754Z"
                  fill="white"
                />
                <path
                  d="M6.49414 5.18262C6.49414 5.43221 6.39929 5.66258 6.22711 5.83138L5.26367 6.77621V7.84863H6.08398V7.16325L6.78093 6.4798C7.11995 6.14735 7.31445 5.6746 7.31445 5.18262C7.31445 4.2133 6.57852 3.4248 5.67383 3.4248C4.76913 3.4248 4.0332 4.2133 4.0332 5.18262H4.85352C4.85352 4.69796 5.22148 4.30371 5.67383 4.30371C6.12617 4.30371 6.49414 4.69796 6.49414 5.18262Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_206_3068">
                  <rect
                    width="14"
                    height="15"
                    fill="white"
                    transform="translate(0.328125 0.788086)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p>Support</p>
          </div>
        );
        navigate("/owner/support");
        break;
      default:
        break;
    }
    setIsExpanded(false);
  };

  useEffect(() => {
    // Get the initial value from localStorage
    const persistedData = localStorage.getItem("persist:root");
    if (persistedData) {
      const parsedData = JSON.parse(persistedData);
      const user = JSON.parse(parsedData.user);
      setUserData(user);
      setProfileImage(user?.user?.image);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedPersistedData = localStorage.getItem("persist:root");
      if (updatedPersistedData) {
        const updatedParsedData = JSON.parse(updatedPersistedData);
        const updatedUser = JSON.parse(updatedParsedData.user);
        setUserData(updatedUser);
        setProfileImage(updatedUser?.user?.image);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("selectedImage");
    localStorage.removeItem("userdetails");
    localStorage.removeItem("persist:root");

    dispatch(storeUser(""));
    dispatch(storeGuestUser(""));

    dispatch(clearCart());
    navigate("/");
  };
  const isReadStatus = async (id: any) => {
    try {
      const res = await ownerNotificationStatusUpdate(id, true);
      if (res.success) {
        console.log("success", notifications);

        // Optionally, update your notifications state to reflect the change immediately
        // setNotifications((prevNotifications: any) =>
        //     prevNotifications?.map((notification: any) =>
        //         notification?._id === id ? { ...notification, isRead: true } : notification
        //     )
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Filter to get only unread notification IDs
      const unreadNotificationIds = notifications
        ?.filter((notification: any) => !notification?.isRead)
        ?.map((notification: any) => notification?._id);

      // Update each unread notification to read
      for (const id of unreadNotificationIds) {
        await isReadStatus(id);
      }

      // Optionally, update the state to reflect changes in the UI
      setNotifications((prevNotifications: any) =>
        prevNotifications?.map((notification: any) =>
          unreadNotificationIds?.includes(notification?._id)
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderProfileImage = () => {
    const imageSrc = profileImage
      ? profileImage.startsWith("blob")
        ? profileImage
        : `${CONSTANT_DATA.IMAGE_BASE_URL}${profileImage}`
      : localStorage.getItem("selectedImage") || null;

    return imageSrc ? (
      <img
        src={imageSrc}
        alt="User"
        className="w-12 h-12 rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = noimage;
        }}
      />
    ) : (
      <svg
        width="46"
        height="44"
        viewBox="0 0 46 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="23.1136"
          cy="21.5474"
          rx="22.3402"
          ry="21.5"
          fill="#F2DAE9"
        />
        <g clipPath="url(#clip0_160_72)">
          <path
            d="M22.9635 21.3854C23.9561 21.3854 24.8157 21.0532 25.518 20.3975C26.2204 19.742 26.5764 18.94 26.5764 18.0134C26.5764 17.0871 26.2204 16.285 25.5179 15.6293C24.8155 14.9739 23.956 14.6416 22.9635 14.6416C21.9707 14.6416 21.1114 14.9739 20.4091 15.6294C19.7067 16.2849 19.3506 17.087 19.3506 18.0134C19.3506 18.94 19.7067 19.7422 20.4092 20.3977C21.1116 21.0532 21.9709 21.3854 22.9635 21.3854Z"
            fill="#C2C2C2"
          />
          <path
            d="M30.0395 25.4271C30.0088 25.0676 29.9433 24.6571 29.8439 24.2096C29.7428 23.7574 29.6058 23.3406 29.4369 22.9653C29.2617 22.5665 29.0033 22.173 28.6784 21.8157C28.3418 21.4487 27.944 21.1462 27.498 20.9166C27.0536 20.6878 26.568 20.5737 26.0466 20.5737C25.8048 20.5737 25.5723 20.661 25.1983 20.8862C24.9727 21.0183 24.707 21.1766 24.4114 21.3546C24.1867 21.4893 23.878 21.616 23.4775 21.7223C23.0927 21.8223 22.7036 21.8696 22.3144 21.8696C21.9252 21.8696 21.5365 21.8223 21.1517 21.7223C20.7514 21.6161 20.4428 21.4895 20.2182 21.3547C19.8428 21.1288 19.6097 21.0404 19.3678 21.0404C18.8468 21.0404 18.3614 21.1545 17.9173 21.3833C17.4715 21.6129 17.0717 21.9157 16.7325 22.2834C16.408 22.6407 16.1497 23.0342 15.9745 23.4328C15.8055 23.8081 15.6685 24.2248 15.5674 24.677C15.468 25.1245 15.4024 25.535 15.3717 25.8945C15.3426 26.2226 15.3287 26.5652 15.3287 26.9118C15.3287 27.8877 15.623 28.659 16.1828 29.169C16.7354 29.6717 17.4987 29.919 18.4282 29.919H27.2007C28.1303 29.919 28.8932 29.672 29.4458 29.169C30.006 28.6585 30.3007 27.887 30.3007 26.9118C30.3007 26.5609 30.2861 26.222 30.2566 25.9052L30.0395 25.4271Z"
            fill="#C2C2C2"
          />
        </g>
        <defs>
          <clipPath id="clip0_160_72">
            <rect
              width="16.004"
              height="14.9385"
              fill="white"
              transform="translate(15.9448 14.6416)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

  if (notifications.length) {
    var unreadNotificationsCount = notifications?.filter(
      (notification: any) => !notification?.isRead
    )?.length;
  }

  return (
    <div className="sticky top-0 w-full z-50" style={{ fontFamily: "poppins, sans-serif" }}>
      <div className="bg-[white] w-full hidden xl:block shadow-lg shadow-white-900">
        <div className=" w-[94%] m-auto flex items-center justify-between h-20">
          <div className="flex items-center gap-32">
            {/* <a href="/"> */}
            <img
              className="w-36"
              src={mainLogo}
              alt="raffly"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            />
            {/* </a> */}
          </div>
          <div className="flex items-center gap-6">
            <Dropdown
              inline
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div style={{ position: "relative" }}>
                  <svg
                    width="21"
                    height="25"
                    viewBox="0 0 21 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d="M10.7584 24.8595C9.73404 24.8595 8.75162 24.4526 8.02727 23.7282C7.30293 23.0039 6.896 22.0215 6.896 20.9971C6.896 20.7922 6.97738 20.5957 7.12225 20.4509C7.26712 20.306 7.4636 20.2246 7.66848 20.2246C7.87336 20.2246 8.06984 20.306 8.21471 20.4509C8.35958 20.5957 8.44096 20.7922 8.44096 20.9971C8.44096 21.6117 8.68512 22.2012 9.11973 22.6358C9.55434 23.0704 10.1438 23.3145 10.7584 23.3145C11.373 23.3145 11.9625 23.0704 12.3971 22.6358C12.8317 22.2012 13.0759 21.6117 13.0759 20.9971C13.0759 20.7922 13.1573 20.5957 13.3021 20.4509C13.447 20.306 13.6435 20.2246 13.8484 20.2246C14.0532 20.2246 14.2497 20.306 14.3946 20.4509C14.5394 20.5957 14.6208 20.7922 14.6208 20.9971C14.6208 22.0215 14.2139 23.0039 13.4896 23.7282C12.7652 24.4526 11.7828 24.8595 10.7584 24.8595Z"
                      fill="#232463"
                    />
                    <path
                      d="M19.5568 16.6636C19.2261 16.4432 18.955 16.1446 18.7677 15.7942C18.5804 15.4438 18.4826 15.0525 18.483 14.6551V10.9549C18.4823 9.45251 18.0434 7.98294 17.2202 6.72616C16.3969 5.46937 15.2251 4.47992 13.8481 3.87896V3.23007C13.8481 2.41057 13.5226 1.62463 12.9431 1.04516C12.3636 0.465683 11.5777 0.140137 10.7582 0.140137C9.93869 0.140137 9.15275 0.465683 8.57328 1.04516C7.9938 1.62463 7.66826 2.41057 7.66826 3.23007V3.87896C7.03462 4.15562 6.43991 4.51401 5.89927 4.94499C5.73947 5.07713 5.6387 5.26734 5.61915 5.47378C5.59959 5.68022 5.66284 5.88597 5.79498 6.04578C5.92713 6.20558 6.11734 6.30634 6.32378 6.3259C6.53022 6.34546 6.73597 6.28221 6.89577 6.15006C7.80336 5.4234 8.89753 4.9675 10.0526 4.83475C11.2076 4.70199 12.3767 4.89776 13.4255 5.39956C14.4743 5.90136 15.3602 6.68884 15.9816 7.67154C16.6029 8.65423 16.9344 9.79227 16.9381 10.9549V14.6551C16.9375 15.3074 17.0979 15.9498 17.4052 16.5252C17.7124 17.1006 18.157 17.5912 18.6993 17.9536C18.9233 18.0997 19.0938 18.3145 19.1853 18.5657C19.2769 18.8169 19.2845 19.091 19.207 19.3469C19.1295 19.6028 18.9712 19.8267 18.7557 19.985C18.5402 20.1432 18.2792 20.2274 18.0118 20.2247H3.50457C3.23926 20.2235 2.98128 20.1375 2.76833 19.9792C2.55539 19.821 2.39863 19.5988 2.32097 19.3451C2.24331 19.0914 2.24881 18.8195 2.33667 18.5692C2.42454 18.3188 2.59016 18.1031 2.80933 17.9536C3.35411 17.5931 3.80089 17.103 4.10964 16.5274C4.41838 15.9517 4.57942 15.3084 4.57832 14.6551C4.57832 10.9549 4.40838 9.84253 5.21948 8.20487C5.26412 8.11205 5.29004 8.01134 5.29575 7.90851C5.30147 7.80567 5.28687 7.70271 5.2528 7.60552C5.21873 7.50832 5.16585 7.41879 5.09717 7.34203C5.0285 7.26527 4.94538 7.20279 4.85255 7.15815C4.75973 7.11352 4.65903 7.0876 4.55619 7.08188C4.45336 7.07617 4.3504 7.09076 4.2532 7.12484C4.15601 7.15891 4.06647 7.21179 3.98971 7.28047C3.91296 7.34914 3.85047 7.43226 3.80584 7.52508C2.80161 9.53354 3.03336 10.8931 3.03336 14.6551C3.03434 15.0534 2.93597 15.4457 2.74713 15.7964C2.55829 16.1471 2.28495 16.4451 1.95188 16.6636C1.4553 16.9959 1.07861 17.479 0.877329 18.0417C0.676045 18.6043 0.660807 19.2167 0.833861 19.7886C1.00691 20.3606 1.35911 20.8618 1.83854 21.2185C2.31798 21.5751 2.8993 21.7684 3.49685 21.7697H18.0118C18.6094 21.7684 19.1907 21.5751 19.6701 21.2185C20.1496 20.8618 20.5017 20.3606 20.6748 19.7886C20.8479 19.2167 20.8326 18.6043 20.6313 18.0417C20.43 17.479 20.0534 16.9959 19.5568 16.6636ZM9.21323 3.39229V3.23007C9.23371 2.82032 9.41613 2.43549 9.72036 2.16024C9.871 2.02395 10.047 1.91866 10.2383 1.85039C10.4297 1.78212 10.6326 1.75221 10.8354 1.76235C11.0383 1.7725 11.2372 1.8225 11.4208 1.90952C11.6044 1.99653 11.769 2.11885 11.9053 2.26949C12.0416 2.42012 12.1468 2.59613 12.2151 2.78746C12.2834 2.97878 12.3133 3.18168 12.3032 3.38457C11.2836 3.17446 10.2317 3.17709 9.21323 3.39229Z"
                      fill="#232463"
                    />
                    <circle
                      cx="16.3888"
                      cy="6.70813"
                      r="2.60999"
                      fill="#F66E6A"
                    />
                  </svg>
                  {unreadNotificationsCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-7px",
                        background: "red",
                        borderRadius: "50%",
                        color: "white",
                        padding: "0.2em 0.4em",
                        fontSize: "12px",
                        lineHeight: "1",
                        textAlign: "center",
                      }}
                    >
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
              )}
            >
              <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                {notifications.length > 0 &&
                  notifications
                    ?.filter((notification: any) => !notification?.isRead)
                    ?.map((notification: any) => (
                      <Dropdown.Item
                        key={notification?._id}
                        style={{
                          width: "400px",
                          textAlign: "start",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span onClick={redirection}>{notification?.title}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-x"
                          onClick={() => isReadStatus(notification?._id)}
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Dropdown.Item>
                    ))}

                {notifications.length > 0 &&
                  notifications?.filter(
                    (notification: any) => !notification?.isRead
                  ).length > 0 && (
                    <>
                      <hr />
                      <Dropdown.Item
                        style={{
                          width: "400px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={markAllAsRead}
                      >
                        <span>Mark All As Read</span>
                      </Dropdown.Item>
                    </>
                  )}

                <hr />
                <Dropdown.Item
                  onClick={viewAllNotification}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>View All Notifications</span>
                </Dropdown.Item>
              </div>
            </Dropdown>
            <Dropdown
              inline
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div className="flex items-center justify-between w-56 border-2 border-[#F2DAE9] py-1 px-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    {renderProfileImage()}
                    <p className="text-md font-medium ">
                      {userDetails?.user?.businessName}
                    </p>
                  </div>
                  <svg
                    width="15"
                    height="10"
                    viewBox="0 0 15 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.45749 0.573173L0.0102536 2.01595L7.15712 9.14941L14.304 2.01595L12.8567 0.573173L7.15712 6.2594L1.45749 0.573173Z"
                      fill="black"
                    />
                  </svg>
                </div>
              )}
            >
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="bg-[white] w-full block xl:hidden">
        <div className="w-[94%] m-auto flex items-center justify-between h-20">
          {/* <div onClick={toggleDrawer} className="cursor-pointer">
            <svg
              width="38"
              height="26"
              viewBox="0 0 38 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.981445"
                y="0.253906"
                width="36.3931"
                height="3.83081"
                rx="1.91541"
                fill="black"
              />
              <rect
                x="0.981445"
                y="11.0847"
                width="36.3931"
                height="3.83081"
                rx="1.91541"
                fill="black"
              />
              <rect
                x="0.981445"
                y="21.9155"
                width="36.3931"
                height="3.83081"
                rx="1.91541"
                fill="black"
              />
            </svg>
          </div> */}
          <div className="flex items-center gap-32">
            <div>
              <img
                className="w-36"
                src={mainLogo}
                alt="raffly"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Dropdown
              inline
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div style={{ position: "relative" }}>
                  <svg
                    width="21"
                    height="25"
                    viewBox="0 0 21 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d="M10.7584 24.8595C9.73404 24.8595 8.75162 24.4526 8.02727 23.7282C7.30293 23.0039 6.896 22.0215 6.896 20.9971C6.896 20.7922 6.97738 20.5957 7.12225 20.4509C7.26712 20.306 7.4636 20.2246 7.66848 20.2246C7.87336 20.2246 8.06984 20.306 8.21471 20.4509C8.35958 20.5957 8.44096 20.7922 8.44096 20.9971C8.44096 21.6117 8.68512 22.2012 9.11973 22.6358C9.55434 23.0704 10.1438 23.3145 10.7584 23.3145C11.373 23.3145 11.9625 23.0704 12.3971 22.6358C12.8317 22.2012 13.0759 21.6117 13.0759 20.9971C13.0759 20.7922 13.1573 20.5957 13.3021 20.4509C13.447 20.306 13.6435 20.2246 13.8484 20.2246C14.0532 20.2246 14.2497 20.306 14.3946 20.4509C14.5394 20.5957 14.6208 20.7922 14.6208 20.9971C14.6208 22.0215 14.2139 23.0039 13.4896 23.7282C12.7652 24.4526 11.7828 24.8595 10.7584 24.8595Z"
                      fill="#232463"
                    />
                    <path
                      d="M19.5568 16.6636C19.2261 16.4432 18.955 16.1446 18.7677 15.7942C18.5804 15.4438 18.4826 15.0525 18.483 14.6551V10.9549C18.4823 9.45251 18.0434 7.98294 17.2202 6.72616C16.3969 5.46937 15.2251 4.47992 13.8481 3.87896V3.23007C13.8481 2.41057 13.5226 1.62463 12.9431 1.04516C12.3636 0.465683 11.5777 0.140137 10.7582 0.140137C9.93869 0.140137 9.15275 0.465683 8.57328 1.04516C7.9938 1.62463 7.66826 2.41057 7.66826 3.23007V3.87896C7.03462 4.15562 6.43991 4.51401 5.89927 4.94499C5.73947 5.07713 5.6387 5.26734 5.61915 5.47378C5.59959 5.68022 5.66284 5.88597 5.79498 6.04578C5.92713 6.20558 6.11734 6.30634 6.32378 6.3259C6.53022 6.34546 6.73597 6.28221 6.89577 6.15006C7.80336 5.4234 8.89753 4.9675 10.0526 4.83475C11.2076 4.70199 12.3767 4.89776 13.4255 5.39956C14.4743 5.90136 15.3602 6.68884 15.9816 7.67154C16.6029 8.65423 16.9344 9.79227 16.9381 10.9549V14.6551C16.9375 15.3074 17.0979 15.9498 17.4052 16.5252C17.7124 17.1006 18.157 17.5912 18.6993 17.9536C18.9233 18.0997 19.0938 18.3145 19.1853 18.5657C19.2769 18.8169 19.2845 19.091 19.207 19.3469C19.1295 19.6028 18.9712 19.8267 18.7557 19.985C18.5402 20.1432 18.2792 20.2274 18.0118 20.2247H3.50457C3.23926 20.2235 2.98128 20.1375 2.76833 19.9792C2.55539 19.821 2.39863 19.5988 2.32097 19.3451C2.24331 19.0914 2.24881 18.8195 2.33667 18.5692C2.42454 18.3188 2.59016 18.1031 2.80933 17.9536C3.35411 17.5931 3.80089 17.103 4.10964 16.5274C4.41838 15.9517 4.57942 15.3084 4.57832 14.6551C4.57832 10.9549 4.40838 9.84253 5.21948 8.20487C5.26412 8.11205 5.29004 8.01134 5.29575 7.90851C5.30147 7.80567 5.28687 7.70271 5.2528 7.60552C5.21873 7.50832 5.16585 7.41879 5.09717 7.34203C5.0285 7.26527 4.94538 7.20279 4.85255 7.15815C4.75973 7.11352 4.65903 7.0876 4.55619 7.08188C4.45336 7.07617 4.3504 7.09076 4.2532 7.12484C4.15601 7.15891 4.06647 7.21179 3.98971 7.28047C3.91296 7.34914 3.85047 7.43226 3.80584 7.52508C2.80161 9.53354 3.03336 10.8931 3.03336 14.6551C3.03434 15.0534 2.93597 15.4457 2.74713 15.7964C2.55829 16.1471 2.28495 16.4451 1.95188 16.6636C1.4553 16.9959 1.07861 17.479 0.877329 18.0417C0.676045 18.6043 0.660807 19.2167 0.833861 19.7886C1.00691 20.3606 1.35911 20.8618 1.83854 21.2185C2.31798 21.5751 2.8993 21.7684 3.49685 21.7697H18.0118C18.6094 21.7684 19.1907 21.5751 19.6701 21.2185C20.1496 20.8618 20.5017 20.3606 20.6748 19.7886C20.8479 19.2167 20.8326 18.6043 20.6313 18.0417C20.43 17.479 20.0534 16.9959 19.5568 16.6636ZM9.21323 3.39229V3.23007C9.23371 2.82032 9.41613 2.43549 9.72036 2.16024C9.871 2.02395 10.047 1.91866 10.2383 1.85039C10.4297 1.78212 10.6326 1.75221 10.8354 1.76235C11.0383 1.7725 11.2372 1.8225 11.4208 1.90952C11.6044 1.99653 11.769 2.11885 11.9053 2.26949C12.0416 2.42012 12.1468 2.59613 12.2151 2.78746C12.2834 2.97878 12.3133 3.18168 12.3032 3.38457C11.2836 3.17446 10.2317 3.17709 9.21323 3.39229Z"
                      fill="#232463"
                    />
                    <circle
                      cx="16.3888"
                      cy="6.70813"
                      r="2.60999"
                      fill="#F66E6A"
                    />
                  </svg>
                  {unreadNotificationsCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-7px",
                        background: "red",
                        borderRadius: "50%",
                        color: "white",
                        padding: "0.2em 0.4em",
                        fontSize: "12px",
                        lineHeight: "1",
                        textAlign: "center",
                      }}
                    >
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
              )}
            >
              <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                {notifications.length > 0 &&
                  notifications
                    ?.filter((notification: any) => !notification?.isRead)
                    ?.map((notification: any) => (
                      <Dropdown.Item
                        key={notification?._id}
                        style={{
                          width: "400px",
                          textAlign: "start",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span onClick={redirection}>{notification?.title}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-x"
                          onClick={() => isReadStatus(notification?._id)}
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Dropdown.Item>
                    ))}

                {notifications.length > 0 &&
                  notifications?.filter(
                    (notification: any) => !notification?.isRead
                  ).length > 0 && (
                    <>
                      <hr />
                      <Dropdown.Item
                        style={{
                          width: "400px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={markAllAsRead}
                      >
                        <span>Mark All As Read</span>
                      </Dropdown.Item>
                    </>
                  )}

                <hr />
                <Dropdown.Item
                  onClick={viewAllNotification}
                  style={{
                    width: "400px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>View All Notifications</span>
                </Dropdown.Item>
              </div>
            </Dropdown>
            <Dropdown
              inline
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    {renderProfileImage()}
                    {/* <p className='text-md font-medium '>{userDetails?.user?.businessName}</p> */}
                  </div>
                  {/* <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.45749 0.573173L0.0102536 2.01595L7.15712 9.14941L14.304 2.01595L12.8567 0.573173L7.15712 6.2594L1.45749 0.573173Z" fill="black" />
                                </svg> */}
                </div>
              )}
            >
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      <main
        className={
          "fixed hiddenSidebar  z-50 bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out " +
          (isDrawerOpen
            ? "transition-opacity opacity-100 duration-500 translate-x-0"
            : "transition-all opacity-0 duration-500 -translate-x-full")
        }
      >
        <section
          className={
            "w-screen hiddenSidebar overflow-hidden max-w-lg left-0 absolute bg-[#20124C] h-full shadow-xl duration-500 ease-in-out transform " +
            (isDrawerOpen ? "translate-x-0" : "-translate-x-full")
          }
          style={{ width: "50%" }}
        >
          <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <div className="mx-auto pt-4">
              <img
                className="w-36"
                src={whitelogo}
                alt="raffly"
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="text-white flex flex-col items-start w-[80%] m-auto gap-10 font-normal text-md">
              <h4>Charity</h4>
              <h4>Raffly coin</h4>
              <h4>Winners</h4>
              <h4>Local Raffles</h4>
              <h4>Holidays</h4>
              <h4>Hotels</h4>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        ></section>
      </main>

      <div className=" block lg:hidden mx-auto bg-[#20124C] shadow-md transform ease-in-out">
        {/* <div
          onClick={toggleCollapse}
          className="p-4 w-[90%] m-auto cursor-pointer flex items-center justify-between "
        >
          {selectedMenu}
          <svg
            className={`${isExpanded ? "rotate-180" : "rotate-0"
              } duration-500 `}
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.94187 0.0380172L0.494629 1.48079L7.6415 8.61426L14.7884 1.48079L13.3411 0.0380167L7.6415 5.72424L1.94187 0.0380172Z"
              fill="white"
            />
          </svg>
        </div> */}
        <div
          className={`grid grid-cols-1 gap-2   overflow-hidden transition-all  ${isExpanded ? "max-h-full duration-500" : "max-h-0 duration-500"
            }`}
          style={{ maxHeight: isExpanded ? "1000px" : "0" }}
        >
          <div
            onClick={() => handleSelectMenu(1)}
            className="p-4 bg-[#20124C] hover:bg-indigo-900 bg-opacity-10 cursor-pointer text-white flex items-center gap-2 font-medium"
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.62844 7.87252H1.71282C1.68607 7.87252 1.66593 7.86242 1.65343 7.85042C1.64736 7.8446 1.64478 7.83989 1.64397 7.83804C1.64352 7.83704 1.64353 7.83691 1.64355 7.8367C1.64355 7.83666 1.64355 7.83661 1.64355 7.83656V1.5489C1.64355 1.54884 1.64355 1.54879 1.64355 1.54875C1.64353 1.54855 1.64352 1.54842 1.64397 1.54741C1.64478 1.54556 1.64736 1.54086 1.65343 1.53503C1.66593 1.52304 1.68607 1.51294 1.71282 1.51294H6.62844C6.6552 1.51294 6.67533 1.52304 6.68784 1.53503C6.69391 1.54086 6.69648 1.54556 6.6973 1.54741C6.69775 1.54842 6.69774 1.54855 6.69772 1.54875C6.69772 1.54879 6.69771 1.54884 6.69771 1.5489V7.83656C6.69771 7.83672 6.69774 7.83679 6.69771 7.83695C6.69768 7.83712 6.69758 7.83741 6.6973 7.83804C6.69648 7.83989 6.69391 7.8446 6.68784 7.85042C6.67533 7.86242 6.6552 7.87252 6.62844 7.87252ZM6.62844 14.1602H1.71282C1.68607 14.1602 1.66593 14.1501 1.65343 14.1381C1.64736 14.1323 1.64478 14.1276 1.64397 14.1257C1.64352 14.1247 1.64353 14.1246 1.64355 14.1244C1.64355 14.1243 1.64355 14.1243 1.64355 14.1242V10.9804C1.64355 10.9803 1.64355 10.9803 1.64355 10.9802C1.64353 10.98 1.64352 10.9799 1.64397 10.9789C1.64478 10.9771 1.64736 10.9723 1.65343 10.9665C1.66593 10.9545 1.68607 10.9444 1.71282 10.9444H6.62844C6.6552 10.9444 6.67533 10.9545 6.68784 10.9665C6.69391 10.9723 6.69648 10.9771 6.6973 10.9789C6.69784 10.9801 6.69771 10.9801 6.69771 10.9804V14.1242C6.69771 14.1245 6.69784 14.1245 6.6973 14.1257C6.69648 14.1276 6.69391 14.1323 6.68784 14.1381C6.67533 14.1501 6.6552 14.1602 6.62844 14.1602ZM14.8211 14.1602H9.90552C9.87877 14.1602 9.85863 14.1501 9.84613 14.1381C9.84005 14.1323 9.83748 14.1276 9.83666 14.1257C9.83622 14.1247 9.83623 14.1246 9.83624 14.1244C9.83625 14.1243 9.83625 14.1243 9.83625 14.1242V7.83656C9.83625 7.8365 9.83625 7.83646 9.83624 7.83641C9.83623 7.83621 9.83622 7.83608 9.83666 7.83507C9.83748 7.83322 9.84005 7.82852 9.84613 7.82269C9.85863 7.8107 9.87877 7.8006 9.90552 7.8006H14.8211C14.8479 7.8006 14.868 7.8107 14.8805 7.82269C14.8866 7.82852 14.8892 7.83322 14.89 7.83507C14.8904 7.83608 14.8904 7.83621 14.8904 7.83641C14.8904 7.83646 14.8904 7.8365 14.8904 7.83656V14.1242C14.8904 14.1243 14.8904 14.1243 14.8904 14.1244C14.8904 14.1246 14.8904 14.1247 14.89 14.1257C14.8892 14.1276 14.8866 14.1323 14.8805 14.1381C14.868 14.1501 14.8479 14.1602 14.8211 14.1602ZM9.83625 4.69273V1.5489C9.83625 1.54856 9.83613 1.54863 9.83666 1.54741C9.83748 1.54556 9.84005 1.54086 9.84613 1.53503C9.85863 1.52304 9.87877 1.51294 9.90552 1.51294H14.8211C14.8479 1.51294 14.868 1.52304 14.8805 1.53503C14.8866 1.54086 14.8892 1.54556 14.89 1.54741C14.8905 1.54863 14.8904 1.54856 14.8904 1.5489V4.69273C14.8904 4.69306 14.8905 4.693 14.89 4.69421C14.8892 4.69606 14.8866 4.70077 14.8805 4.70659C14.868 4.71859 14.8479 4.72868 14.8211 4.72868H9.90552C9.87877 4.72868 9.85863 4.71859 9.84613 4.70659C9.84005 4.70077 9.83748 4.69606 9.83666 4.69421C9.83622 4.69321 9.83623 4.69308 9.83624 4.69287C9.83625 4.69283 9.83625 4.69278 9.83625 4.69273Z"
                fill="white"
                stroke="white"
                stroke-width="1.5"
              />
            </svg>
            <p>Raffles</p>
          </div>
          <div
            onClick={() => handleSelectMenu(2)}
            className="p-4 bg-[#20124C] hover:bg-indigo-900 bg-opacity-10 cursor-pointer text-white flex items-center gap-2 font-medium"
          >
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_206_3063)">
                <path
                  d="M7.79391 7.34468C8.7204 7.34468 9.52266 6.98866 10.1782 6.28622C10.8337 5.5839 11.166 4.72457 11.166 3.7318C11.166 2.73937 10.8337 1.87992 10.1781 1.17737C9.52245 0.475165 8.72029 0.119141 7.79391 0.119141C6.86732 0.119141 6.06528 0.475165 5.40977 1.17749C4.75427 1.87981 4.42188 2.73926 4.42188 3.7318C4.42188 4.72457 4.75427 5.58402 5.40988 6.28634C6.06549 6.98854 6.86765 7.34468 7.79391 7.34468Z"
                  fill="white"
                />
                <path
                  d="M13.694 11.6534C13.675 11.3611 13.6368 11.0423 13.5805 10.7056C13.5237 10.3664 13.4505 10.0457 13.3629 9.75266C13.2725 9.44974 13.1494 9.15059 12.9973 8.86392C12.8395 8.56637 12.654 8.30728 12.446 8.09408C12.2284 7.87103 11.962 7.6917 11.654 7.5609C11.347 7.43078 11.0068 7.36486 10.6429 7.36486C10.5 7.36486 10.3618 7.42769 10.0948 7.61388C9.93056 7.72867 9.7384 7.86142 9.52393 8.00824C9.34053 8.13344 9.09209 8.25074 8.78522 8.35694C8.48582 8.46074 8.18184 8.51339 7.88181 8.51339C7.58177 8.51339 7.27789 8.46074 6.97818 8.35694C6.67163 8.25086 6.42319 8.13356 6.24001 8.00836C6.02756 7.86291 5.8353 7.73015 5.66856 7.61377C5.40196 7.42757 5.26364 7.36475 5.12073 7.36475C4.75671 7.36475 4.41663 7.43078 4.10976 7.56101C3.80193 7.69159 3.53543 7.87092 3.31764 8.09419C3.10968 8.30751 2.92415 8.56649 2.76649 8.86392C2.6145 9.15059 2.49146 9.44962 2.40088 9.75278C2.3134 10.0459 2.24023 10.3664 2.18341 10.7056C2.12712 11.0418 2.08888 11.3608 2.06998 11.6537C2.05139 11.9408 2.04199 12.2387 2.04199 12.5395C2.04199 13.3225 2.27431 13.9564 2.73242 14.4239C3.18488 14.8852 3.78355 15.1192 4.51158 15.1192H11.2527C11.9807 15.1192 12.5792 14.8853 13.0317 14.4239C13.4899 13.9567 13.7223 13.3227 13.7223 12.5394C13.7222 12.2372 13.7126 11.939 13.694 11.6534Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_206_3063">
                  <rect
                    width="14"
                    height="15"
                    fill="white"
                    transform="translate(0.893555 0.119141)"
                  />
                </clipPath>
              </defs>
            </svg>
            {/* <p>My Account</p> */}
            <p>Business Profile</p>
          </div>
          {/* <div
            onClick={() => handleSelectMenu(3)}
            className="p-4 bg-[#20124C] hover:bg-indigo-900 bg-opacity-10 cursor-pointer text-white flex items-center gap-2 font-medium"
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.78992 5.81943C2.59766 6.13818 3.60937 6.34414 4.70312 6.41797C5.57375 4.52832 7.39101 3.22461 9.48828 3.22461C10.0461 3.22426 10.6005 3.31799 11.1311 3.50234C10.967 3.04678 10.512 2.52529 9.42101 2.09609C8.39453 1.68975 7.04047 1.4668 5.60547 1.4668C4.17047 1.4668 2.81641 1.68975 1.78992 2.09463C0.310625 2.67852 0 3.42969 0 3.95703C0 4.48438 0.310625 5.23555 1.78992 5.81943Z"
                fill="white"
              />
              <path
                d="M1.78992 9.48193C2.48637 9.75674 3.33457 9.94775 4.2566 10.0421C4.08773 9.12192 4.13252 8.17139 4.38703 7.27412C3.31434 7.18008 2.3193 6.96563 1.50637 6.64453C0.880742 6.39756 0.376523 6.09609 0 5.74219V7.61953C0 8.14688 0.310625 8.89805 1.78992 9.48193Z"
                fill="white"
              />
              <path
                d="M4.49641 10.9453C3.38215 10.8574 2.34691 10.6386 1.50637 10.3066C0.880742 10.0597 0.376523 9.7582 0 9.4043V11.2816C0 11.809 0.310625 12.5602 1.78992 13.144C2.81641 13.5489 4.17047 13.7719 5.60547 13.7719C5.94125 13.7719 6.27266 13.7596 6.59668 13.7355C5.63663 13.0694 4.90067 12.0917 4.49641 10.9453Z"
                fill="white"
              />
              <path
                d="M9.48828 4.10352C7 4.10352 4.97656 6.27148 4.97656 8.9375C4.97656 11.6035 7 13.7715 9.48828 13.7715C11.9766 13.7715 14 11.6035 14 8.9375C14 6.27148 11.9766 4.10352 9.48828 4.10352ZM9.15469 8.49805H9.82188C10.1647 8.50232 10.4927 8.64851 10.7372 8.90601C10.9817 9.16351 11.1238 9.51237 11.1337 9.87956C11.1436 10.2467 11.0205 10.6038 10.7903 10.876C10.56 11.1482 10.2405 11.3144 9.89844 11.3398V11.5742C9.89844 11.6908 9.85522 11.8025 9.77831 11.885C9.70139 11.9674 9.59706 12.0137 9.48828 12.0137C9.3795 12.0137 9.27518 11.9674 9.19826 11.885C9.12134 11.8025 9.07812 11.6908 9.07812 11.5742V11.3434H8.23703C8.12825 11.3434 8.02393 11.2971 7.94701 11.2146C7.87009 11.1322 7.82687 11.0205 7.82687 10.9039C7.82687 10.7874 7.87009 10.6756 7.94701 10.5932C8.02393 10.5108 8.12825 10.4645 8.23703 10.4645H9.82297C9.95757 10.4645 10.0867 10.4072 10.1818 10.3052C10.277 10.2032 10.3305 10.0649 10.3305 9.9207C10.3305 9.77649 10.277 9.63819 10.1818 9.53621C10.0867 9.43424 9.95757 9.37695 9.82297 9.37695H9.15469C8.81186 9.37268 8.48386 9.22649 8.23935 8.96899C7.99484 8.71149 7.85276 8.36263 7.84287 7.99544C7.83298 7.62825 7.95603 7.2712 8.18627 6.99901C8.41651 6.72682 8.7361 6.56061 9.07812 6.53516V6.30078C9.07812 6.18423 9.12134 6.07245 9.19826 5.99004C9.27518 5.90763 9.3795 5.86133 9.48828 5.86133C9.59706 5.86133 9.70139 5.90763 9.77831 5.99004C9.85522 6.07245 9.89844 6.18423 9.89844 6.30078V6.53164H10.7395C10.8483 6.53164 10.9526 6.57794 11.0296 6.66035C11.1065 6.74277 11.1497 6.85454 11.1497 6.97109C11.1497 7.08764 11.1065 7.19942 11.0296 7.28183C10.9526 7.36425 10.8483 7.41055 10.7395 7.41055H9.15359C9.019 7.41055 8.88991 7.46783 8.79474 7.56981C8.69956 7.67178 8.64609 7.81009 8.64609 7.9543C8.64609 8.09851 8.69956 8.23681 8.79474 8.33879C8.88991 8.44076 9.019 8.49805 9.15359 8.49805H9.15469Z"
                fill="white"
              />
            </svg>
            
            <p>Revenue</p>
          </div> */}

          <div
            onClick={() => handleSelectMenu(4)}
            className="p-4 bg-[#20124C] hover:bg-indigo-900 bg-opacity-10 cursor-pointer text-white flex items-center gap-2 font-medium"
          >
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5281 0.75H13.1281V0H3.52813V0.75H1.12813C0.648125 0.75 0.328125 1.05 0.328125 1.5V3.3C0.328125 5.025 1.68813 6.45 3.52813 6.675V6.75C3.52813 8.925 5.12813 10.725 7.28813 11.175L6.72813 12.75H4.88812C4.56812 12.75 4.24812 12.975 4.16812 13.275L3.52813 15H13.1281L12.4881 13.275C12.4081 12.975 12.0881 12.75 11.7681 12.75H9.92813L9.36812 11.175C11.5281 10.725 13.1281 8.925 13.1281 6.75V6.675C14.9681 6.45 16.3281 5.025 16.3281 3.3V1.5C16.3281 1.05 16.0081 0.75 15.5281 0.75ZM3.52813 5.175C2.64813 4.95 1.92813 4.2 1.92813 3.3V2.25H3.52813V5.175ZM9.92813 7.5L8.32812 6.675L6.72813 7.5L7.12813 6L5.92812 4.5H7.60813L8.32812 3L9.04813 4.5H10.7281L9.52812 6L9.92813 7.5ZM14.7281 3.3C14.7281 4.2 14.0081 5.025 13.1281 5.175V2.25H14.7281V3.3Z"
                fill="white"
              />
            </svg>
            {/* <p>Prizes</p> */}
            <p>Winners</p>
          </div>
          <div
            onClick={() => handleSelectMenu(5)}
            className="p-4 bg-[#20124C] hover:bg-indigo-900 bg-opacity-10 cursor-pointer text-white flex items-center gap-2 font-medium"
          >
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_206_3068)">
                <path
                  d="M14.3281 10.9395C14.3281 8.75306 12.9531 6.84281 11.0142 6.26717C10.8923 3.22385 8.54375 0.788086 5.67383 0.788086C2.72615 0.788086 0.328125 3.3574 0.328125 6.51562C0.328125 7.54491 0.583832 8.54707 1.0694 9.42689L0.347778 12.222L2.95665 11.4489C3.71149 11.9272 4.56299 12.1966 5.44183 12.2372C5.97899 14.3148 7.76199 15.7881 9.80273 15.7881C10.6173 15.7881 11.4094 15.5557 12.1054 15.114L14.3084 15.7669L13.699 13.4066C14.1112 12.6609 14.3281 11.8122 14.3281 10.9395ZM3.08611 10.4986L1.52431 10.9615L1.95636 9.28819L1.85788 9.12316C1.39378 8.34519 1.14844 7.44351 1.14844 6.51562C1.14844 3.84206 3.1785 1.66699 5.67383 1.66699C8.16916 1.66699 10.1992 3.84206 10.1992 6.51562C10.1992 9.18919 8.16916 11.3643 5.67383 11.3643C4.8078 11.3643 3.96634 11.1014 3.24013 10.6041L3.08611 10.4986ZM13.1319 14.5065L11.973 14.1629L11.8183 14.2708C11.2183 14.6884 10.5213 14.9092 9.80273 14.9092C8.19885 14.9092 6.78947 13.7981 6.29013 12.2048C8.74615 11.9014 10.7006 9.8074 10.9839 7.17583C12.4708 7.71096 13.5078 9.22101 13.5078 10.9395C13.5078 11.7093 13.3018 12.4561 12.912 13.099L12.8113 13.2648L13.1319 14.5065Z"
                  fill="white"
                />
                <path
                  d="M5.26367 8.72754H6.08398V9.60645H5.26367V8.72754Z"
                  fill="white"
                />
                <path
                  d="M6.49414 5.18262C6.49414 5.43221 6.39929 5.66258 6.22711 5.83138L5.26367 6.77621V7.84863H6.08398V7.16325L6.78093 6.4798C7.11995 6.14735 7.31445 5.6746 7.31445 5.18262C7.31445 4.2133 6.57852 3.4248 5.67383 3.4248C4.76913 3.4248 4.0332 4.2133 4.0332 5.18262H4.85352C4.85352 4.69796 5.22148 4.30371 5.67383 4.30371C6.12617 4.30371 6.49414 4.69796 6.49414 5.18262Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_206_3068">
                  <rect
                    width="14"
                    height="15"
                    fill="white"
                    transform="translate(0.328125 0.788086)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerNavbar;

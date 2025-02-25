
type Environment = "local" | "staging" | "production";

// Ensure env is treated as one of the possible values
const env = "local" as Environment; // Change to "staging" or "production" as needed

// Use an object to map each environment to its corresponding configuration
const ENV_CONFIG: { [key in Environment]: {IMAGE_BASE_URL: string; BASE_URL: string; WEB_URL: string; CLIENT_ID: string } } = {
    local: {
        BASE_URL: "http://localhost:5000",
        WEB_URL: "https://raffily.com",
        CLIENT_ID: "",
        IMAGE_BASE_URL:"https://raffstaging.makeitlive.info/services/"

    },
    staging: {
        // BASE_URL: "https://raffstaging.makeitlive.info/services",
        BASE_URL: "https://rafflebackend-production.up.railway.app/",
        WEB_URL: "https://raffstaging.makeitlive.info",
        // CLIENT_ID: "AfkKzKj5lcbqb2amgSOdyKqov4Ws1yFwFIkGI_kYQl8cR1eAooyJjmBsGZiQ4s-fhdjAU6P8n11iepTC"
        CLIENT_ID: "AfIvyc7kn0rwBpCVnXY2DBDvF093TRL38QjrtXoGEo1D31XfJHlI34qvDmyGDlXxlKsh1dCqZaJnFqnn",
        IMAGE_BASE_URL:"https://raffstaging.makeitlive.info/services/"
    },
    production: {
        // BASE_URL: "https://raffily.com/services",
        BASE_URL: "https://rafflebackend-production.up.railway.app/",
        WEB_URL: "https://raffily.com",
        CLIENT_ID: "AfIvyc7kn0rwBpCVnXY2DBDvF093TRL38QjrtXoGEo1D31XfJHlI34qvDmyGDlXxlKsh1dCqZaJnFqnn",
        IMAGE_BASE_URL:"https://raffstaging.makeitlive.info/services/"
    },
};

// Export the configuration for the current environment
export const CONSTANT_DATA = ENV_CONFIG[env];




export const API_ENDPOINTS = {
    //general routes
    COUNTRIES_DATA: "/general/countries",

    //FEATURED_RAFFLES
    FEATURED_RAFFLES: "/raffle/raffles/raffles-by-type/featured",
    EXCLUSIVE_RAFFLES: "/raffle/raffles/raffles-by-type/exclusive",

    GET_WINNERS_LIST: "/owner/get/winners",
    GET_WINNERS_USER_LIST: "/owner/get/winners-detail",

    // contactus
    CONTACT_US_CREATE: "/contact-us/create",

    //authentication routes
    USER_REGISTER: "/auth/register",
    GUEST_REGISTER: "/auth/guest_register",
    DELETE_USER: "/auth/user/delete/:id",
    USER_REGISTER_WITH_GOOGLE: "/auth/google_login",
    CSFORM_REGISTER: "/auth/comming_soon",
    USER_LOGIN: "/auth/login",
    SOCIAL_LOGIN: "/auth/social_login",
    CHECK_TYPE: "/auth/check_user_type",
    VERIFY_USER: "auth/verify_user",
    SEND_OTP: "auth/send_otp",
    RESEND_OTP: "auth/resend_otp",
    FORGOT_PASSWORD: "auth/change_new_password",
    FETCH_ACCESSTOKEN: "/auth/generate_access_from_refresh",
    SET_FAQ_VALUE: "/auth/set_faq_value",
    GET_USER_DATA: "/auth/u_dat",
    UPDATE_USER: "/auth/up_user",
    UPDATE_USER_CARD: "/auth/up_card_user",
    DELETE_USER_CARD: "/auth/de_card_user",

    //raffle routes
    CATEGORY: "/raffle/categories",
    ENDING_SOON: "/raffle/ending_soon",
    EXPIRE: "/raffle/expired-raffles",
    LIST_RAFFLE: "/raffle/raffles",
    APPROVED_PAID: "/raffle/approved-paid",
    LIST_CATEGORY_WISE_RAFFLE: "/raffle/categories_wise_raffles",
    SPECIFIC_RAFFLE: "/raffle/specific_raffle",
    SOLDOUT_RAFFLE: "/raffle/sold_raffle_tickets/",

    PURCHASE_RAFFLE: "auth/purchase_raff",
    CREATE_ORDER: "auth/create_order",
    CONFIRM_ORDER: "auth/confirm",
    CAPTURE_ORDER: "payment/paypal/capture",
    USER_PURCHASED_RAFFLE: "auth/user_purchased_raff",
    USER_PRIZES: "auth/user_prizes",

    // payment routes
    THANK_YOU: "payment/order/",

    //owner routes
    OWNER_NOTIFICATION: "/owner/notification",
    OWNER_NOTIFICATION_LISTING: "/owner/owner-notification",
    NOTIFICATION_STATUS_UPDATE: "/owner/update-notification",
    CREATE_RAFFLE: "/owner/create-raffle",
    EDIT_RAFFLE: "/owner/edit-raffle",
    GET_RAFFLE: "/owner/get-raffle",
    GET_WALLET: "/owner/get-wallet",
    GET_TRANSACTION: "/owner/get-transaction",
    GET_WINNERS: "/owner/winners",
    // GET_WINNERS:"/owner/get-winners",

    // GET_SPECIFIC_RAFFLE:"/owner/get-raffle/:id"

    //Admins
    GET_NOTIFICATION: "/admin/notification",
    ADMIN_NOTIFICATION_LISTING: "/admin/admin-notification",
    ADMIN_NOTIFICATION_STATUS_UPDATE: "/admin/update-notification",
    CREATE_ADMIN: "/auth/register_admin",
    CREATE_COUPON: "/admin/create-coupon",
    VALIDATE_COUPON: "/admin/validate-coupon",
    DELETE_COUPON: "/admin/delete-coupon",
    UPDATE_COUPON: "/admin/edit-coupon",
    UPDATE_USER_DATA: "/auth/u_dat/update",
    GET_DASHBORAD_DATA: "/admin/dashborad_data",
    GET_DATA_LIST: "/admin/list_data",
    GET_DATA_WINNERS: "/admin/winner-listing",
    GET_DATA_ORDERS: "/raffle/order_listing",
    GET_CONTACT_LIST: "/contact-us/view-all",
    DELETE_CONTACT_LIST: "/contact-us/delete/:id",
    BULK_DELETE_CONTACT_LIST: "/contact-us/bulk-delete",
    ORDERS_DETAILS: "/raffle/order",
    GET_DATA_ENTRIES: "/admin/entries-listing",
    GET_COUPON_LIST: "/admin/coupon-list",
    UPDATE_TERMS_CONDITIONS: "/admin/terms-conditions",
    GET_TERMS_CONDITIONS: "/admin/terms-conditions",
    GET_RAFFLE_LIST: "/admin/raffles/:raffle_status?",
    GET_DATA_DETAIL: "/admin/list_data",
    ADMIN_EDIT_RAFFLE: "/admin/edit-raffle",
    // EDIT_RAFFLE: "/owner/edit-raffle",
    // GET_RAFFLE:"/owner/get-raffle",
    // GET_WALLET:"/owner/get-wallet",
    SUSPEND_USER: "/admin/users/suspend",
    UNSUSPEND_USER: "/admin/users/unsuspend",
    UPDATE_PASSWORD: "/admin/users/updatePassword",
    MERCHANT_RAFFLES: "/admin/raffles/owner",
    VIEW_TRANSACTIONS: "/admin/transaction",
    VIEW_SALSE: "/admin/sales",
    UPDATE_RAFFLE_STATUS: "/admin/raffle/update-status"
}
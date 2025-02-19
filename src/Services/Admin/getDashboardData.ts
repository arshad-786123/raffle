import { API_INSTANCE } from "../../API/Instance";
import { errorToast } from "../../Utils/Toast/error.toast";
import { successToast } from "../../Utils/Toast/success.toast";
import { API_ENDPOINTS } from "../../constants";
import { fetchAccessToken } from "../Middleware/fetchAccessToken";


export const getDashboardReport = async () => {
    try {
        const response = await API_INSTANCE.get(API_ENDPOINTS.GET_DASHBORAD_DATA);
        return response.data
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken()
            errorToast("Something went wrong! Please try again")
        }
        return error
    }
}
export const getAdminNotification = async () => {
    try {
        const response = await API_INSTANCE.get(API_ENDPOINTS.GET_NOTIFICATION);
        return response.data
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken()
            errorToast("Something went wrong! Please try again")
        }
        return error
    }
}

// export const adminNotificationListing = async (ID: any, currentPage: number = 1, limit: number = 10) => {
//     try {
//         const params: any = { currentPage, limit };
//         const response = await API_INSTANCE.get(API_ENDPOINTS.ADMIN_NOTIFICATION_LISTING + "/" + ID, { params });
//         return response.data;
//     } catch (error: any) {
//         if (error.response.data === "Unauthorized") {
//             fetchAccessToken();
//             errorToast("Something went wrong! Please try again");
//         }
//         return error;
//     }
// };

export const adminNotificationListing = async (ID: any, currentPage = 1, limit = 10) => {
    try {
        const params = { page: currentPage, limit };
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.ADMIN_NOTIFICATION_LISTING}/${ID}`, { params });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};

export const adminNotificationStatusUpdate = async (ID: any, isRead: any) => {
    try {
        const response = await API_INSTANCE.put(
            `${API_ENDPOINTS.ADMIN_NOTIFICATION_STATUS_UPDATE}/${ID}`,
            { isRead }
        );
        return response.data;
    } catch (error: any) {
        if (error.response?.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};

export const getDBData = async (type: string, page: number = 1, limit: number = 10, search?: string, isSuspended: boolean = false, isDownload: boolean = false) => {
    try {
        const params: any = { page, limit, isSuspended, isDownload };
        if (search) {
            params.search = search;
        }

        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_LIST}/${type}`, {
            params
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};
export const getWinnersListingData = async (role: any, page: number = 1, limit: number = 10, search?: string) => {
    try {
        const params: any = { role, page, limit };
        if (search) {
            params.search = search;
        }

        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_ORDERS}`, {
            params
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};
export const getOrdersListingData = async (role: any, userId: any, page: number = 1, limit: number = 10, filters: {
    isDownload?: string; status?: string; startDate?: string;
    endDate?: string; customerName?: string
} = {}) => {
    try {
        const params: any = { role, userId, page, limit, ...filters };
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_ORDERS}`, {
            params
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};
export const getEntriesListingData = async (page: number = 1, limit: number = 10, search?: string) => {
    try {
        const params: any = { page, limit };
        if (search) {
            params.search = search;
        }

        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_ENTRIES}`, {
            params
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};

export const getContactListData = async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    isDownload: boolean = false,
    startDate?: string,
    endDate?: string,
) => {
    try {
        const params: any = { page, limit, isDownload, startDate, endDate, };
        if (search) {
            params.name = search; // Assuming 'name' is the search parameter
        }

        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_CONTACT_LIST}`, {
            params,
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.message === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again.");
        }
        return error;
    }
};

export const deleteContact = async (contactId: string) => {
    try {
        const deleteUserResponse = await API_INSTANCE.delete(
            API_ENDPOINTS.DELETE_CONTACT_LIST.replace(':id', contactId) // Replace :id with actual user ID
        );

        return deleteUserResponse.data;
    } catch (error) {
        throw error;
    }
};

export const deleteContactsByIds = async (ids: string[]) => {
    try {
        const deleteUserResponse = await API_INSTANCE.post(
            API_ENDPOINTS.BULK_DELETE_CONTACT_LIST,
            { ids } // Send the contactIds array as an object
        );

        return deleteUserResponse.data;
    } catch (error) {
        throw error;
    }
};



export const getRaffleDBDataList = async (raffle_status: number, search?: string, start_date?: string, end_date?: string) => {
    try {
        const params: any = {};

        if (search) {
            params.search = search;
        }
        if (start_date) {
            params.start_date = start_date;
        }
        if (end_date) {
            params.end_date = end_date;
        }

        const response = await API_INSTANCE.get(API_ENDPOINTS.GET_RAFFLE_LIST, {
            params: { ...params, raffle_status }
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        throw error; // Throw error to handle it in the component
    }
};
export const getRaffleDBData = async (type: string, search?: string) => {
    try {
        // const params: any = { page, limit };
        // if (search) {
        //     params.search = search;
        // }

        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_LIST}/${type}`);
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
};

export const getDBDetailData = async (type: string, id: string) => {
    try {
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_DATA_LIST}/${type}/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
}
export const getCouponListingData = async (page: number, search: string) => {
    try {
        const params = {
            page,
            limit: 10,  // You can adjust this value as needed
            search
        }
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.GET_COUPON_LIST}`, { params });
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
}
export const deleteCouponList = async (id: any) => {
    try {

        const response = await API_INSTANCE.delete(`${API_ENDPOINTS.DELETE_COUPON}/${id}`,);
        return response.data;
    } catch (error: any) {
        if (error.response.data === "Unauthorized") {
            fetchAccessToken();
            errorToast("Something went wrong! Please try again");
        }
        return error;
    }
}

export const updateSuspendUser = async (userId: string) => {
    try {

        const response = await API_INSTANCE.put(`${API_ENDPOINTS.SUSPEND_USER}/${userId}`);
        return response.data;
        // Optionally update local state or trigger a data refresh
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};

export const updateUnSuspendUser = async (userId: string) => {
    try {

        const response = await API_INSTANCE.put(`${API_ENDPOINTS.UNSUSPEND_USER}/${userId}`);
        return response.data;
        // Optionally update local state or trigger a data refresh
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};

export const updateUserPassword = async (id: any, newPassword: string) => {
    try {
        console.log("API call to update password:", `${API_ENDPOINTS.UPDATE_PASSWORD}/${id}`);
        const response = await API_INSTANCE.put(
            `${API_ENDPOINTS.UPDATE_PASSWORD}/${id}`,
            { newPassword } // Ensure newPassword is in the request body
        );
        successToast("Password updated successfully");
        return response.data;
    } catch (error) {
        console.error("Error updating password:", error);
        errorToast("Something went wrong! Please try again");
    }
};

export const getMerchantRaffles = async (ownerId: any) => {
    try {
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.MERCHANT_RAFFLES}/${ownerId}`);
        return response.data;
        // Optionally update local state or trigger a data refresh
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};
export const getOrderById = async (orderId: any, page: number, limit: number = 10) => {
    try {
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.ORDERS_DETAILS}/${orderId}?page=${page}&limit=${limit}`);
        return response.data;
        // Optionally update local state or trigger a data refresh
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};
export const getTransactionsList = async (userId: string, page: number = 1, limit: number = 10, search?: string, startDate?: string, endDate?: string) => {
    try {
        const params: any = { page, limit };
        if (search) {
            params.search = search;
        }
        if (startDate) {
            params.startDate = startDate;
        }
        if (endDate) {
            params.endDate = endDate;
        }
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.VIEW_TRANSACTIONS}/${userId}`, {
            params
        });
        return response.data;
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};
export const getSalseList = async (ownerId: string, page: number = 1, limit: number = 10, search?: string, startDate?: string, endDate?: string) => {
    try {
        const params: any = { page, limit };
        if (search) {
            params.search = search;
        }
        if (startDate) {
            params.startDate = startDate;
        }
        if (endDate) {
            params.endDate = endDate;
        }
        const response = await API_INSTANCE.get(`${API_ENDPOINTS.VIEW_SALSE}/${ownerId}`, {
            params
        });
        return response.data;
    } catch (error) {
        errorToast("Something went wrong! Please try again");
        // Handle error, show error toast, etc.
    }
};

export const updateRaffleStatus = async (_id: string, raffle_status: number) => {
    try {
        const response = await API_INSTANCE.put(`${API_ENDPOINTS.UPDATE_RAFFLE_STATUS}/${_id}`, { raffle_status });
        // successToast("Raffle status updated successfully");
        return response.data;
    } catch (error) {
        // if (error.response.data === "Unauthorized") {
        //     fetchAccessToken();
        // }
        errorToast("Something went wrong! Please try again");
        return error;
    }
};
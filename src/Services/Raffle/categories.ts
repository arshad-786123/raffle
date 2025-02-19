import { API_INSTANCE } from "../../API/Instance"
import { API_ENDPOINTS } from "../../constants"


export interface ICategory {
    category_name: string;
    type: any;
    isActive: Boolean;
    image: String,
    _id?: string;
}
// Assuming you have an API_INSTANCE and API_ENDPOINTS setup for making HTTP requests
// Here's how you can define and use a function to fetch countries and handle the response

// Define a function to fetch countries data
export const getCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await API_INSTANCE.get(API_ENDPOINTS.CATEGORY);
        const category: ICategory[] = response.data.result;
        return category;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error; // Propagate the error for handling upstream
    }
};

export const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
    try {
        const response = await API_INSTANCE.post(API_ENDPOINTS.CATEGORY, categoryData);
        const newCategory: ICategory = response.data.result;
        return newCategory;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; // Propagate the error for handling upstream
    }
};

export const editCategory = async (categoryId: string, categoryData: ICategory): Promise<ICategory> => {
    try {
        const response = await API_INSTANCE.put(`${API_ENDPOINTS.CATEGORY}/${categoryId}`, categoryData);
        const updatedCategory: ICategory = response.data.result;
        return updatedCategory;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error; // Propagate the error for handling upstream
    }
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
    try {
        await API_INSTANCE.delete(`${API_ENDPOINTS.CATEGORY}/${categoryId}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error; // Propagate the error for handling upstream
    }
};

export const getRaffleOfEndingSoon = async () => {
    try {
        const response = await API_INSTANCE.get(API_ENDPOINTS.ENDING_SOON);
        return response;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error; // Propagate the error for handling upstream
    }
};

export const getExpireRaffle = async (page: number, limit: number) => {
    try {
        const response = await API_INSTANCE.get(API_ENDPOINTS.EXPIRE, {
            params: { page, limit },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching expire raffles:', error);
        throw error; // Propagate the error for handling upstream
    }
};


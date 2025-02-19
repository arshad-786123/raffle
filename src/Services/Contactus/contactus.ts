import { API_INSTANCE } from "../../API/Instance";
import { API_ENDPOINTS } from "../../constants";

// Define the interface for contact form data
export interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  image?: File | string;
}

// Define the response interface
export interface ContactUsResponse {
  success: boolean;
  result: any; 
  message: string | null;
}

// Define the axios data interface
export interface AxiosData {
  data: ContactUsResponse;
}

// Contact Us API service function
export const submitContactForm = async (contactData: IContactForm) => {
  try {
    const formData = new FormData();
    formData.append('firstName', contactData.firstName);
    formData.append('lastName', contactData.lastName);
    formData.append('email', contactData.email);
    formData.append('subject', contactData.subject);
    formData.append('message', contactData.message);

    // Append image if provided
    if (contactData.image) {
      if (contactData.image instanceof File) {
        formData.append('image', contactData.image);
      } else if (typeof contactData.image === 'string') {
        // If it's a string (URL), you might want to handle this differently
        formData.append('imageUrl', contactData.image);
      }
    }

    // Make the API call
    const response: AxiosData = await API_INSTANCE.post(
      API_ENDPOINTS.CONTACT_US_CREATE, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Return the result from the response
    return response?.data;
  } catch (error: any) {
    console.error('Error submitting contact form:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};
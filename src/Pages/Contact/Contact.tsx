import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Info, Upload } from "lucide-react";

import FollowUs from "./components/FollowUs";
import {
  IContactForm,
  submitContactForm,
} from "@/Services/Contactus/contactus";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "@/Utils/Toast/warning.toast";

const Contact = () => {
  const [formData, setFormData] = useState<IContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));
  };



  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.firstName.trim()) {
      setError("First Name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last Name is required");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Valid Email is required");
      return false;
    }
    if (formData.message.length > 500) {
      setError("Message exceeds 500 character limit");
      return false;
    }
    return true;
  };

  // const handleBannerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;

  //   if (files && files.length > 0) {
  //     const file = files[0]; // Since we're only uploading one banner image
  //     const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
  //     const allowedFileTypes = /(\.jpeg|\.jpg|\.png|\.pdf)$/i;

  //     if (file.size <= MAX_FILE_SIZE) {
  //       if (allowedFileTypes.test(file.name)) {
  //         // If file is an image, create a URL for it
  //         const fileUrl = URL.createObjectURL(file);
  //         setFormData((prevData: any) => ({
  //           ...prevData,
  //           image: file, // Store the file URL for preview
  //         }));
  //       } else {
  //         errorToast(`File ${file.name} is not a valid image. Only jpeg, jpg, and png are allowed.`);
  //       }
  //     } else {
  //       errorToast(`${file.name} exceeds the 50MB size limit.`);
  //     }
  //   }
  // };

  const handleBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
      const allowedFileTypes = /(\.jpeg|\.jpg|\.png|\.pdf)$/i; // Only allow certain file types

      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds the 50MB size limit.`);
        return;
      }
      if (!allowedFileTypes.test(file.name)) {
        setError(
          `${file.name} is not a valid file type. Only JPEG, PNG, and PDF files are allowed.`
        );
        return;
      }

      setImageFile(file);
      setError(null); // Clear any previous errors
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setSuccess(false); // Reset success state
    setLoading(true); // Indicate loading state

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Prepare form data with optional image
      const contactFormData: IContactForm = {
        ...formData,
        ...(imageFile && { image: imageFile }),
      };

      // Submit form using the API service
      const response = await submitContactForm(contactFormData);
      console.log("response", response);

      // Adjust success condition based on the actual response
      if (response.success || response.message === "Contact created successfully.") {
        // Reset form fields and states
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "General Enquiry",
          message: "",
        });
        setImageFile(null);
        setSuccess(true); // Display success message
      } else {
        setError(response.message || "Failed to submit form");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  const subjectOptions = [
    "General Enquiry",
    "Sales Enquiry",
    "Support",
    "Feedback",
    "Other",
  ]; const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/entrant-faqs"); // Replace with the path you want to navigate to
  };

  return (
    <>
      <section className="w-full">
        <div className="bg-gradient-to-tr from-purple-900 to-raffles-blue">
          <div className="mx-auto max-w-[640px] text-center lg:px-6 px-4 lg:pt-24 pt-8 lg:pb-80 pb-72">
            <h4 className="text-white font-bold font-modernBold sm:text-[64px] text-[32px] sm:leading-[67.2px] leading-[33.6px] text-center mb-4">
              Get in{" "}
              <span className="bg-gradient-to-b from-[#FF7385] via-[#FD98E8] to-[#AD6FFF] bg-clip-text text-transparent">
                touch
              </span>
            </h4>
            <p className="text-white sm:text-[16px] text-[12px] sm:leading-[22.4px] leading-[16.8px] text-center sm:mb-14 mb-8">
              At Raffily, we are here for you. Whether you have a question, need
              support, or want to give us some feedback, you have our full
              attention!
            </p>
            <div className="flex items-center justify-center sm:space-x-4 space-x-5 mb-16">
              {/* TikTok Icon */}

              <div className="p-3 rounded-full bg-[#45356b] size-11">
                <a href="https://www.tiktok.com/@raffilyuk?_t=8qBknJtBDzk&_r=1" target="_blank">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4074 4.74074V7.7037C15.4074 7.86087 15.345 8.0116 15.2338 8.12273C15.1227 8.23386 14.972 8.2963 14.8148 8.2963C13.5769 8.29917 12.3568 8.00151 11.2593 7.42889V10.3704C11.2593 11.8634 10.6661 13.2954 9.61038 14.3511C8.55462 15.4069 7.1227 16 5.62963 16C4.13656 16 2.70464 15.4069 1.64888 14.3511C0.59312 13.2954 0 11.8634 0 10.3704C0 7.63704 1.99333 5.22074 4.63704 4.74963C4.72232 4.73447 4.8099 4.73819 4.89359 4.76054C4.97728 4.78288 5.05506 4.8233 5.12144 4.87895C5.18782 4.93459 5.2412 5.00412 5.27781 5.08263C5.31442 5.16113 5.33337 5.24671 5.33333 5.33333V8.49556C5.33337 8.60771 5.30158 8.71757 5.24166 8.81237C5.18173 8.90718 5.09614 8.98303 4.99481 9.03111C4.75529 9.14471 4.55063 9.32049 4.40218 9.54013C4.25374 9.75978 4.16695 10.0152 4.15088 10.2798C4.1348 10.5444 4.19002 10.8085 4.31077 11.0445C4.43153 11.2805 4.6134 11.4798 4.83741 11.6216C5.06142 11.7633 5.31937 11.8424 5.58434 11.8505C5.84932 11.8586 6.11161 11.7954 6.34387 11.6676C6.57613 11.5398 6.76983 11.352 6.90478 11.1239C7.03974 10.8957 7.11099 10.6355 7.11111 10.3704V0.592593C7.11111 0.435427 7.17354 0.284699 7.28468 0.173566C7.39581 0.0624337 7.54654 0 7.7037 0H10.6667C10.8238 0 10.9746 0.0624337 11.0857 0.173566C11.1968 0.284699 11.2593 0.435427 11.2593 0.592593C11.2602 1.53528 11.6352 2.43908 12.3017 3.10567C12.9683 3.77225 13.8721 4.14717 14.8148 4.14815C14.972 4.14815 15.1227 4.21058 15.2338 4.32171C15.345 4.43285 15.4074 4.58358 15.4074 4.74074Z"
                      fill="white"
                    />
                  </svg></a>
              </div>

              {/* Instagram Icon */}
              <div className="p-3 rounded-full bg-[#45356b] size-11">
                <a href="https://www.instagram.com/raffilyuk/" target="_blank">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.375 1.6875H5.625C4.58105 1.68862 3.58018 2.10382 2.842 2.842C2.10382 3.58018 1.68862 4.58105 1.6875 5.625V12.375C1.68862 13.4189 2.10382 14.4198 2.842 15.158C3.58018 15.8962 4.58105 16.3114 5.625 16.3125H12.375C13.4189 16.3114 14.4198 15.8962 15.158 15.158C15.8962 14.4198 16.3114 13.4189 16.3125 12.375V5.625C16.3114 4.58105 15.8962 3.58018 15.158 2.842C14.4198 2.10382 13.4189 1.68862 12.375 1.6875ZM9 12.375C8.33249 12.375 7.67997 12.1771 7.12495 11.8062C6.56993 11.4354 6.13735 10.9083 5.88191 10.2916C5.62646 9.67486 5.55962 8.99626 5.68985 8.34157C5.82008 7.68688 6.14151 7.08552 6.61351 6.61351C7.08552 6.14151 7.68688 5.82008 8.34157 5.68985C8.99626 5.55962 9.67486 5.62646 10.2916 5.88191C10.9083 6.13735 11.4354 6.56993 11.8062 7.12495C12.1771 7.67997 12.375 8.33249 12.375 9C12.3741 9.89482 12.0182 10.7527 11.3855 11.3855C10.7527 12.0182 9.89482 12.3741 9 12.375ZM13.2188 5.625C13.0519 5.625 12.8887 5.57552 12.75 5.4828C12.6112 5.39009 12.5031 5.25831 12.4392 5.10414C12.3754 4.94996 12.3587 4.78031 12.3912 4.61664C12.4238 4.45297 12.5041 4.30263 12.6221 4.18463C12.7401 4.06663 12.8905 3.98627 13.0541 3.95371C13.2178 3.92116 13.3875 3.93787 13.5416 4.00173C13.6958 4.06559 13.8276 4.17373 13.9203 4.31249C14.013 4.45124 14.0625 4.61437 14.0625 4.78125C14.0625 5.00503 13.9736 5.21964 13.8154 5.37787C13.6571 5.53611 13.4425 5.625 13.2188 5.625ZM11.25 9C11.25 9.44501 11.118 9.88002 10.8708 10.25C10.6236 10.62 10.2722 10.9084 9.86104 11.0787C9.4499 11.249 8.9975 11.2936 8.56105 11.2068C8.12459 11.12 7.72368 10.9057 7.40901 10.591C7.09434 10.2763 6.88005 9.87541 6.79323 9.43895C6.70642 9.0025 6.75097 8.5501 6.92127 8.13896C7.09157 7.72783 7.37996 7.37643 7.74997 7.12919C8.11998 6.88196 8.55499 6.75 9 6.75C9.59674 6.75 10.169 6.98705 10.591 7.40901C11.0129 7.83097 11.25 8.40326 11.25 9Z"
                      fill="white"
                    />
                  </svg></a>
              </div>

              {/* LinkedIn Icon */}
              <div className="p-3 rounded-full bg-[#45356b] size-11">
                <a href="https://www.linkedin.com/company/raffily/" target="_blank">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_41_3125)">
                      <path
                        d="M2.31125 0.8125C1.21133 0.8125 0.492188 1.53476 0.492188 2.48407C0.492188 3.41241 1.18991 4.15527 2.26904 4.15527H2.28992C3.41135 4.15527 4.10925 3.41241 4.10925 2.48407C4.08829 1.53476 3.41135 0.8125 2.31125 0.8125Z"
                        fill="white"
                      />
                      <path
                        d="M2.31125 0.8125C1.21133 0.8125 0.492188 1.53476 0.492188 2.48407C0.492188 3.41241 1.18991 4.15527 2.26904 4.15527H2.28992C3.41135 4.15527 4.10925 3.41241 4.10925 2.48407C4.08829 1.53476 3.41135 0.8125 2.31125 0.8125Z"
                        fill="white"
                      />
                      <path
                        d="M0.683594 5.47559H3.89911V15.1496H0.683594V5.47559Z"
                        fill="white"
                      />
                      <path
                        d="M0.683594 5.47559H3.89911V15.1496H0.683594V5.47559Z"
                        fill="white"
                      />
                      <path
                        d="M11.7892 5.24902C10.0546 5.24902 8.89139 6.87903 8.89139 6.87903V5.47607H5.67578V15.1501H8.8912V9.74774C8.8912 9.45853 8.91217 9.16977 8.99713 8.96295C9.22958 8.38544 9.75858 7.78714 10.6469 7.78714C11.8105 7.78714 12.2758 8.67429 12.2758 9.97479V15.1501H15.4911V9.60318C15.4911 6.63174 13.9046 5.24902 11.7892 5.24902Z"
                        fill="white"
                      />
                      <path
                        d="M11.7892 5.24902C10.0546 5.24902 8.89139 6.87903 8.89139 6.87903V5.47607H5.67578V15.1501H8.8912V9.74774C8.8912 9.45853 8.91217 9.16977 8.99713 8.96295C9.22958 8.38544 9.75858 7.78714 10.6469 7.78714C11.8105 7.78714 12.2758 8.67429 12.2758 9.97479V15.1501H15.4911V9.60318C15.4911 6.63174 13.9046 5.24902 11.7892 5.24902Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_41_3125">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg></a>
              </div>

              {/* Facebook Icon */}
              <div className="p-3 rounded-full bg-[#45356b] size-11">
                <a href="https://www.facebook.com/profile.php?id=61556451772407" target="_blank">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9375 10.9999C19.9347 13.1843 19.1332 15.2923 17.6841 16.9267C16.235 18.5612 14.2382 19.6094 12.0699 19.8739C12.0216 19.8793 11.9727 19.8745 11.9264 19.8597C11.8802 19.8449 11.8375 19.8204 11.8014 19.7879C11.7653 19.7555 11.7364 19.7157 11.7168 19.6712C11.6971 19.6268 11.6872 19.5787 11.6875 19.5301V13.0624H13.75C13.8442 13.0627 13.9375 13.0435 14.024 13.0061C14.1105 12.9688 14.1885 12.914 14.2529 12.8453C14.3174 12.7765 14.3671 12.6952 14.3988 12.6065C14.4305 12.5178 14.4437 12.4234 14.4375 12.3294C14.4223 12.1526 14.3407 11.9881 14.2092 11.869C14.0776 11.7499 13.9059 11.6851 13.7285 11.6874H11.6875V9.62495C11.6875 9.26027 11.8323 8.91054 12.0902 8.65268C12.3481 8.39481 12.6978 8.24995 13.0625 8.24995H14.4375C14.5317 8.25015 14.625 8.23098 14.7115 8.19362C14.798 8.15626 14.876 8.1015 14.9404 8.03276C15.0049 7.96401 15.0546 7.88274 15.0863 7.794C15.118 7.70526 15.1312 7.61094 15.125 7.5169C15.1098 7.33981 15.028 7.17508 14.8961 7.05594C14.7642 6.9368 14.592 6.87212 14.4143 6.87495H13.0625C12.3331 6.87495 11.6336 7.16468 11.1179 7.6804C10.6022 8.19613 10.3125 8.8956 10.3125 9.62495V11.6874H8.24996C8.15571 11.6872 8.06243 11.7064 7.9759 11.7438C7.88938 11.7811 7.81146 11.8359 7.74699 11.9046C7.68251 11.9734 7.63286 12.0546 7.60112 12.1434C7.56938 12.2321 7.55622 12.3265 7.56246 12.4205C7.57767 12.5976 7.65947 12.7623 7.79137 12.8815C7.92327 13.0006 8.09545 13.0653 8.27316 13.0624H10.3125V19.5318C10.3128 19.5803 10.3028 19.6283 10.2832 19.6727C10.2636 19.7171 10.2348 19.7568 10.1988 19.7893C10.1628 19.8218 10.1203 19.8462 10.0741 19.8611C10.0279 19.876 9.97911 19.8809 9.9309 19.8756C7.70456 19.6044 5.66115 18.5074 4.20512 16.8015C2.74909 15.0956 1.98656 12.9052 2.06848 10.6639C2.24035 6.02331 5.99926 2.25065 10.6433 2.07018C11.8457 2.02361 13.045 2.22001 14.1697 2.64765C15.2944 3.07529 16.3213 3.72537 17.189 4.55901C18.0566 5.39266 18.7472 6.39274 19.2195 7.49943C19.6917 8.60613 19.9359 9.7967 19.9375 10.9999Z"
                      fill="white"
                    />
                  </svg></a>
              </div>

              {/* X (formerly Twitter) Icon */}
              <div className="p-3 rounded-full bg-[#45356b] size-11">
                <a href="https://x.com/RaffilyUK" target="_blank">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.7967 15.1758C14.7429 15.2738 14.6637 15.3556 14.5676 15.4126C14.4714 15.4696 14.3616 15.4998 14.2498 15.5H10.4998C10.3946 15.5 10.2911 15.4734 10.199 15.4227C10.1068 15.3721 10.0289 15.2989 9.97247 15.2102L6.80919 10.2391L2.21232 15.2953C2.10026 15.4157 1.94526 15.487 1.78095 15.4939C1.61663 15.5008 1.45622 15.4426 1.33451 15.332C1.2128 15.2214 1.13959 15.0673 1.13076 14.903C1.12192 14.7388 1.17817 14.5777 1.28732 14.4547L6.1131 9.14219L1.22247 1.46094C1.16224 1.36644 1.12852 1.25749 1.12485 1.14548C1.12117 1.03348 1.14768 0.922555 1.20159 0.824314C1.25551 0.726073 1.33484 0.644135 1.43129 0.587078C1.52774 0.530021 1.63775 0.499946 1.74982 0.5H5.49982C5.605 0.500033 5.70848 0.526613 5.80067 0.57728C5.89285 0.627946 5.97075 0.701058 6.02716 0.789844L9.19044 5.76094L13.7873 0.704687C13.8994 0.584312 14.0544 0.512956 14.2187 0.50609C14.383 0.499225 14.5434 0.557404 14.6651 0.668012C14.7868 0.778621 14.86 0.932746 14.8689 1.09697C14.8777 1.2612 14.8215 1.42228 14.7123 1.54531L9.88653 6.85391L14.7772 14.5398C14.8371 14.6344 14.8705 14.7433 14.8739 14.8551C14.8773 14.967 14.8507 15.0777 14.7967 15.1758Z"
                      fill="white"
                    />
                  </svg></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-[-24rem] max-w-[1280px] px-4 lg:px-6 py-16 sm:py-24">
          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-16 lg:mb-5 grid max-w-[768px] grid-cols-1 gap-4 sm:grid-cols-2 rounded-[18px] border p-10 bg-[#F6F6F8]"
          >

            {success && (
              <div
                className="col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Thank you! Your message has been submitted.
              </div>
            )}
            {error && (
              <div
                className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="sm:col-span-1 col-span-2">
              <Label
                htmlFor="firstName"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                First Name
              </Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="sm:col-span-1 col-span-2">
              <Label
                htmlFor="lastName"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                Last Name
              </Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="sm:col-span-1 col-span-2">
              <Label
                htmlFor="email"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="sm:col-span-1 col-span-2">
              <Label
                htmlFor="subject"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                Subject
              </Label>
              <Select
                value={formData.subject}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="General Enquiry"
                    className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
                  />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-[span_2/span_2]">
              <Label
                htmlFor="message"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                Your message
              </Label>
              <Textarea
                placeholder="How can we help you"
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground flex gap-2 items-center mt-2">
                <span>
                  <Info className="size-4" />
                </span>{" "}
                Max. limit 500 characters
              </p>
            </div>

            <div className="col-[span_2/span_2]">
              <Label
                htmlFor="image"
                className="text-[14px] leading-[19.6px] font-medium font-modernMedium text-raffles-blue"
              >
                Attach any supporting documents or screenshots{" "}
                <span className="ml-4 opacity-[60%]">(Optional)</span>
              </Label>
            </div>

            <div className="col-[span_2/span_2] mt-4">
              <Button
                type="button"
                variant="outline"
                className="border-raffles-blue text-[16px] leading-[16px] font-bold font-modernBold text-raffles-blue w-full"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <Upload className="mr-2" /> Upload
              </Button>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleBannerImageChange}
              />
              {imageFile && (
                <p className="text-sm mt-2">Selected file: {imageFile.name}</p>
              )}
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="col-[span_2/span_2]">
              <Button
                type="submit"
                className="bg-raffles-blue text-white text-[16px] leading-[16px] font-bold font-modernBold w-full hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
      <FollowUs />
      <div className="w-full lg:px-24 sm:px-10 px-4 lg:h-[107px] flex lg:flex-row flex-col items-center justify-between mb-8 lg:gap-8 gap-2">
        <div className="flex flex-col lg:flex-row items-center lg:gap-8 gap-2 lg:mb-0 mb-8 w-3/4">
          <div className="max-w-fit min-w-fit w-fit">
            <h2 className="text-[22px] font-modernBold leading-[30.8px] text-raffles-light-blue lg:text-start text-center w-full -tracking-2">
              Find Quick Answers in our FAQ section
            </h2>
          </div>
          <div className="lg:w-px w-full bg-[#1100441A] lg:h-16 h-px"></div>
          <p className="text-[14px] lg:text-[16px] lg:leading-[22.4px] leading-[19.6px] text-raffles-blue flex-grow lg:text-start text-center lg:px-0 px-12 font-modernRegular -tracking-2">
            Visit our FAQ Page for answers to common questions about how Raffily
            works, raffle entries, and prize claims.
          </p>
        </div>
        <div className="w/14">
          <Button className="bg-raffles-blue text-white font-bold font-modernBold leading-[16px] text-[16px] lg:w-[141px] h-[45px] w-full hover:bg-purple-700" onClick={handleNavigate}>
            FAQs
          </Button>
        </div>
      </div>
    </>
  );
};

export default Contact;

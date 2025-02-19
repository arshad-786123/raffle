import Swal from "sweetalert2";
import successImage from '../../assets/sucess/success_7518748.png';

interface ToastOptions {
  title?: string;
  message?: string;
  imagePath?: string;
  buttonText?: string;
  buttonColor?: string;
}

export const paymentSuccessToast = ({
  title = 'Payment Successful!',
  message = 'Get 1 more free ticket by simply sharing this link!',
  imagePath = successImage,
  buttonText = "Share",
  buttonColor = "#FF6A78"
}: ToastOptions = {}) => {
  Swal.fire({
    title: title,
    text: message,
    imageUrl: imagePath,
    imageWidth: 83,
    imageHeight: 82,
    imageAlt: "Custom image",
    confirmButtonText: buttonText,
    confirmButtonColor: buttonColor,
    showCloseButton: true,
    customClass: {
      popup: 'font-montserrat flex flex-col items-center relative',
      image: 'mt-8 mb-4 w-[83px] h-[82px] aspect-square',
      title: 'text-[20px] font-bold leading-[27.6px] text-center mb-2',
      htmlContainer: 'text-[14px] font-bold leading-[19.32px] text-center mb-4',
      confirmButton: 'w-[281px] h-[50px] px-[31px] py-[12px] rounded-lg text-white font-bold flex items-center justify-center',
      closeButton: 'absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200',
    },
  });
};
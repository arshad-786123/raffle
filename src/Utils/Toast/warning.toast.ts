import toast from "react-hot-toast";
export const errorToast = (msg:string) => {
  return toast.error(msg);
};

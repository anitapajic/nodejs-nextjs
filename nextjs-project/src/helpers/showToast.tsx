import { toast } from "react-toastify";


interface CustomToastProps {
    message: string;
  }
  
  export const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
    return (
        <div className="bg-indigo-500 text-black p-16 rounded-lg border-solid border-gray-100 w-full text-center font-semibold font-sans">
            {message}
        </div>
    )};

  export const showToast = (message: string) => {
    toast(<CustomToast message={message} />, {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
};

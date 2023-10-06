import toast from "react-hot-toast";

export class MessageToast {
  static error = (text: string): void => {
    toast.error(text, {
      style: {
        background: "#FF6961",
        color: "#EFEFEF",
        padding: "1rem",
      },
    });
  };
  static success = (text: string): void => {
    toast.success(text, {
      icon: "👏",
      style: {
        background: "#90EE90",
        color: "#333333",
        padding: "1rem",
      },
    });
  };
}

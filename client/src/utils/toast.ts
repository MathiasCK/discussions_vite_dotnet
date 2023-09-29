import { actions } from "../state";
import { ToastTypes } from "../types";

export class MessageToast {
  static error = (text: string): void => {
    actions.messageToast(text, ToastTypes.danger);
  };
  static success = (text: string): void => {
    actions.messageToast(text, ToastTypes.success);
  };
  static show = (text: string): void => {
    actions.messageToast(text, ToastTypes.primary);
  };
}

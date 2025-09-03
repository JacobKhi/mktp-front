import { createContext } from "react";

export type NotificationType = "success" | "error" | "info";

export interface NotificationState {
  message: string;
  type: NotificationType;
  isVisible: boolean;
}

export interface NotificationContextType {
  notification: NotificationState | null;
  showNotification: (message: string, type?: NotificationType) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

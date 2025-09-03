import { useState, useCallback, type ReactNode } from "react";
import {
  NotificationContext,
  type NotificationState,
  type NotificationType,
} from "./notificationContext";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );
  const [timerId, setTimerId] = useState<number | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info") => {
      if (timerId) {
        clearTimeout(timerId);
      }

      setNotification({ message, type, isVisible: true });

      const newTimerId = setTimeout(() => {
        setNotification((prev) =>
          prev ? { ...prev, isVisible: false } : null
        );
      }, 3000);

      setTimerId(newTimerId);
    },
    [timerId]
  );

  const value = { notification, showNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

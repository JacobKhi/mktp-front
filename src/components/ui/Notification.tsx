import { useContext, useEffect, useState } from "react";
import {
  NotificationContext,
  type NotificationContextType,
} from "../../context/notificationContext";

export const Notification = () => {
  const { notification } = useContext(
    NotificationContext
  ) as NotificationContextType;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification?.isVisible) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 300);
    }
  }, [notification]);

  if (!show) {
    return null;
  }

  const baseClasses =
    "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white transition-transform duration-300";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const animationClass = notification?.isVisible
    ? "translate-x-0"
    : "translate-x-[120%]";

  return (
    <div
      className={`${baseClasses} ${
        typeClasses[notification?.type || "info"]
      } ${animationClass}`}
    >
      {notification?.message}
    </div>
  );
};

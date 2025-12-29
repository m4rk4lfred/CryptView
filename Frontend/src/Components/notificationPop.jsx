import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function notificationPop({ notificationVisibility, notificationType,notificationHeader, notificationMessage }) {
  const [isVisible, setVisible] = useState(notificationVisibility);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="notification"
          initial={{ x: 900, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 900, opacity: 0 }}        
          transition={{ duration: 1 }}
          className={`fixed flex justify-end items-center right-0 top-0 w-65 h-15 my-4 z-30 rounded-l-2xl
            ${notificationType === "error" ? "bg-red-300" : "bg-branding"}
          `}
        >
          <div className="bg-white w-full ml-2 rounded-l-2xl px-3 py-2 h-full">
            <h1 className={`mb-1 font-semibold text-branding text-[1em] ${notificationType === "error" ? "text-red-300" : "text-branding"}`}>{notificationHeader}</h1>
            <p className="text-[0.70em] text-primary-text">{notificationMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default notificationPop;
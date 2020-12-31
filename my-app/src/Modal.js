import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from "react";
// Created portal to allow rendering children into outer DOM node
import { createPortal } from "react-dom";
import "./modal.css";

const modalElement = document.getElementById("modal-root");

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  // Checking if modal is open or not
  const [isOpen, setIsOpen] = useState(defaultOpened);
  const close = useCallback(() => setIsOpen(false), []);

  // Passes methods to parent
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  // Create event listener only if modal isOpen
  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    // Conditionally render modal relying on isOpen state
    isOpen ? (
      <div className={`modal ${fade ? "modal-fade" : ""}`}>
        <div className="modal-overlay" onClick={close} />
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);

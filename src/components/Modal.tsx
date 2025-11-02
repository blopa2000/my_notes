import { useEffect, useRef, type ReactNode } from "react";

import { X } from "lucide-react";
import "@/styles/modal.css";

type TypeModal = {
  toggleshowModalDelete: () => void;
  children: ReactNode;
};

const Modal = ({ children, toggleshowModalDelete }: TypeModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleshowModalDelete();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [toggleshowModalDelete]);

  return (
    <div className="modal-container">
      <div className="modal-card" ref={modalRef}>
        <div className="btn-content">
          <button className="btn-X" onClick={() => toggleshowModalDelete()}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

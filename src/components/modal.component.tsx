import React from "react";
import { ModalData } from "./modalData.component";
import "./modal.styles.scss";
interface ModalProps {
  modalData:
    | {
        id: number;
        name: string;
        year: number;
        color: string;
        pantone_value: string;
      }
    | undefined;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          name: string;
          year: number;
          color: string;
          pantone_value: string;
        }
      | undefined
    >
  >;
}

export const Modal: React.FC<ModalProps> = ({
  modalData,
  setModalOpen,
  setModalData,
}) => {
  const handleModalClose = () => {
    setModalOpen(false);
    setModalData(undefined);
  };
  return (
    <div>
      <div className="modal-overlay" onClick={handleModalClose}></div>
      {modalData && (
        <ModalData
          id={modalData.id}
          name={modalData.name}
          year={modalData.year}
          color={modalData.color}
          pantone_value={modalData.pantone_value}
        />
      )}
    </div>
  );
};

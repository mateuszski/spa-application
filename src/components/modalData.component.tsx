import React from "react";
import "./modalData.styles.scss";
interface ModalDataProps {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
export const ModalData: React.FC<ModalDataProps> = ({
  id,
  name,
  year,
  color,
  pantone_value,
}) => {
  return (
    <div className="modal-data">
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Year: {year}</p>
      <p>Color: {color}</p>
      <p>Pantone_value: {pantone_value}</p>
    </div>
  );
};

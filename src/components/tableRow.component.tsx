import React from "react";
import "./tableRow.styles.scss";
interface TableRowProps {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export const TableRow: React.FC<TableRowProps> = ({
  id,
  name,
  year,
  color,
  pantone_value,
  setIsModalOpen,
  setModalData,
}) => {
  const style = {
    backgroundColor: color,
  };
  const handleRowClick = () => {
    setIsModalOpen(true);
    setModalData({ id, name, year, color, pantone_value });
  };
  return (
    <tr className="table-row-style" style={style} onClick={handleRowClick}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{year}</td>
    </tr>
  );
};

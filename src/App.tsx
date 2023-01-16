import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableRow } from "./components/tableRow.component";
import { Pagination } from "./components/pagination.component";
import axios from "axios";
import { InputForm } from "./components/inputForm.component";
import { Modal } from "./components/modal.component";
import { InputFormValues } from "./components/inputForm.component";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./App.css";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<
    | {
        id: number;
        name: string;
        year: number;
        color: string;
        pantone_value: string;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(3);
  const [postPerPage, setPostPerPage] = useState<number>(5);
  const [inputData, setInputData] = useState<InputFormValues>({ id: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id !== undefined) {
          const response = await axios.get(
            `https://reqres.in/api/products?id=${id}`
          );
          setData([response.data.data].flat());

          setMaxPage(Math.ceil(data.length / postPerPage));
        } else {
          if (inputData.id !== 0) {
            const response = await axios.get(
              `https://reqres.in/api/products?id=${inputData.id}`
            );
            setData([response.data.data].flat());
          } else {
            const response = await axios.get(
              `https://reqres.in/api/products?page=${currentPage}&per_page=${postPerPage}`
            );
            setData([response.data.data].flat());
            setMaxPage(response.data.total_pages);
          }
        }
      } catch (error: any) {
        if (error.response.status < 500 && error.response.status >= 400) {
          setError("There is no data for this id");
        } else {
          setError("Something went wrong");
        }

        setIsError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentPage, inputData, maxPage, id, isError]);
  useEffect(() => {
    if (inputData.id !== 0) {
      navigate(`/${inputData.id}`);
    }
  }, [inputData]);

  return (
    <>
      <InputForm inputData={inputData} setInputData={setInputData} />
      {isError && <p className="error">{error}</p>}
      <div>
        {!isError && (
          <table className="table-no-border">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Year</th>
              </tr>

              {data.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    year={item.year}
                    color={item.color}
                    pantone_value={item.pantone_value}
                    setIsModalOpen={setIsModalOpen}
                    setModalData={setModalData}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        {!isError && (
          <Pagination
            maxPage={maxPage}
            currentPage={currentPage}
            changePage={(selectedItem: { selected: number }) =>
              setCurrentPage(selectedItem.selected + 1)
            }
          />
        )}
        {isModalOpen && (
          <Modal
            modalData={modalData}
            setModalOpen={setIsModalOpen}
            setModalData={setModalData}
          />
        )}
        <div className="refresh-button-container">
          Refresh search
          <button
            className="refresh-button"
            onClick={() => {
              setCurrentPage(1);
              setInputData({ id: 0 });
              navigate(`/`);
              setError("");
              setIsError(false);
            }}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

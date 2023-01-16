import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import "./inputForm.styles.scss";

export interface InputFormValues {
  id: number;
}

interface InputFormProps {
  inputData: InputFormValues;
  setInputData: React.Dispatch<React.SetStateAction<InputFormValues>>;
}

export const InputForm: React.FC<InputFormProps> = ({
  inputData,
  setInputData,
}) => {
  const { register, reset, handleSubmit } = useForm<InputFormValues>();
  const onSubmitHandler = handleSubmit((data) => {
    setInputData(data);
    console.log(data);
  });
  useEffect(() => {
    reset({ id: inputData.id });
  }, [inputData, reset]);
  return (
    <div className="form-container">
      <form onSubmit={onSubmitHandler}>
        <label className="search-label">
          <span>Search items by ID</span>
          <input
            className="input-field"
            {...register("id")}
            type="number"
            placeholder="Search by id"
            //   defaultValue={inputData.id}
          />
        </label>

        <button className="search-button" type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

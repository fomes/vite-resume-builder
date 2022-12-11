import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputData from "../components/InputData";
import "../styles/form.css";

export default function ResumeForm() {
  const [resumeState] = useState(
    JSON.parse(localStorage.getItem("resumeStorage"))
  );

  const [isLoading, setIsLoading] = useState(false);
  const [inputState, setInputState] = useState([]);

  const navigate = useNavigate();

  const handleResetData = () => {
    if (confirm("Tem certeza?")) {
      setIsLoading(true);
      localStorage.removeItem("resumeStorage");
      localStorage.removeItem("profileImage");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const updateCV = (inputArr) => {
    setIsLoading(true);

    const stateZero = resumeState[0].map((item, index) => {
      if (resumeState[0].some((e) => e.key === Object.keys(inputArr)[index])) {
        return { ...item, value: inputArr[item.key] };
      } else {
        return item;
      }
    });

    console.log(stateZero);

    // const updateState = resumeState.map((item, index) => {
    //   if (index > 0) {
    //     return item;
    //   } else {
    //     return stateZero;
    //   }
    // });

    // localStorage.removeItem("resumeStorage");

    // setTimeout(() => {
    //   localStorage.setItem("resumeStorage", JSON.stringify(updateState));
    // }, 500);

    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader" />
      ) : (
        <div>
          <div className={"btn-container"}>
            <button
              type="button"
              className="input-form"
              onClick={() => updateCV(inputState)}
            >
              SAVE
            </button>

            <button
              type="button"
              className="input-form"
              onClick={handleResetData}
            >
              RESET
            </button>

            <button
              type="button"
              className="input-form"
              onClick={() => navigate("/")}
            >
              CANCEL
            </button>
          </div>
          <div className="form-container">
            {resumeState[0].map((item, index) => {
              return (
                <InputData
                  key={index}
                  placeholder={item.key}
                  value={item.value}
                  onChange={(event) =>
                    setInputState((state) => ({
                      ...state,
                      [item.key]: event.target.value,
                    }))
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

import React from "react";
import axiosConfig from "../Config/axiosConfig";
import profile from "../assets/profile.svg";
function Answers({ answers }) {
  return (
    <>
      {answers?.length > 0 ? (
        <div className="flex flex-col w-full  mx-auto justify-center ">
          {answers.map((answer, index) => (
            <div key={index} className="bg-white border-b-2 w-full ">
              <div className="flex gap-4 w-full px-4 py-2 items-center">
                <div className="flex flex-col items-center gap-2 w-[100px] min-w-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[110px] max-w-[110px] text-center break-all">
                    <h2 className="text-xl font-medium text-center text-gray-700">
                      {answer.userName}
                    </h2>
                  </div>
                </div>
                <span>
                  <h3 className="text-lg font-semibold">{answer.answer}</h3>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center text-center  items-center text-gray-700 text-xl font-bold">
          <h1 className="text-gray-700 text-3xl font-bold font-serif py-5 texa">
            {" "}
            Be the first to answer
          </h1>
        </div>
      )}
    </>
  );
}

export default Answers;

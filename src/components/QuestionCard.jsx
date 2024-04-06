import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import profile from "../assets/profile.svg";
function QuestionCard({ questionId, title, userName }) {
  return (
    <div>
      <Link to={`/question/${questionId}`}>
        <div className="bg-white rounded-lg p-4 shadow-md mb-2 group hover:shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-medium">{userName}</h2>
              </div>
            </div>
            <span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </span>
            <div className="group-hover:translate-x-2 transition-transform duration-300">
              <IoIosArrowForward className="text-2xl" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default QuestionCard;

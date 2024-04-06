import React, { useState, useEffect, useContext } from "react";
import axiosConfig from "../Config/axiosConfig";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import arrow from "../assets/arrow.svg";
import { useParams } from "react-router-dom";
import Answers from "./Answers";
import { AuthContext } from "../ContextApi/AuthContext";
import { Snackbar } from "../ContextApi/SnackBarContext";
import { useNavigate } from "react-router-dom";
function SingleQuestion() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { handleClick, setData, setError } = useContext(Snackbar);
  const { id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      window.location.reload();
      return;
    } else {
      try {
        async function fetchQuestion() {
          const response = await axiosConfig.get(
            `/questions/singleQuestion?id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setQuestion(response.data.question[0]);
        }
        fetchQuestion();
        async function fetchAnswers() {
          const response2 = await axiosConfig.get(
            `/answers/allAnswers?id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAnswers(response2.data.answers);
        }
        fetchAnswers();
        window.scrollTo(0, 0);
      } catch (err) {
        //console.log(err);
      }
    }
  }, [navigate, token, id]);
  const handlePost = async (e) => {
    e.preventDefault();
    if (!answer) {
      return;
    }
    try {
      const response = await axiosConfig.post(
        "/answers/postAnswer",
        {
          userId: user?.userId,
          questionId: id,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswers(response.data.answers);
      setAnswer("");
      window.scrollTo(0, 0);
      setError("");
      setData("Your answer has been posted successfully!!");
      handleClick();
    } catch (error) {
      setError(error.response.data.msg);
      handleClick();
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-[80%] mx-auto justify-center">
        <h1 className="text-gray-700 text-3xl font-bold font-serif py-5">
          Question
        </h1>
        <div className="flex gap-3 items-center group ">
          <img src={arrow} alt="arrow" className="w-6" />
          <div className="w-[fit-content] ">
            <h1 className="text-gray-700 text-3xl font-bold font-serif py-5">
              {question?.title}
            </h1>
            <hr className="border-2 border-secondary w-[40%] group-hover:w-[80%] transition-all duration-[1.5s] ease" />
          </div>
        </div>
        <div className="w-full p-10  text-gray-700 text-xl font-bold">
          <p>{question?.description}</p>
        </div>
        <div className="w-full p-10  text-gray-900 text-3xl font-bold border-t-[2px] border-b-[2px]">
          <h1>Answers from Community</h1>
        </div>
        <div className="w-full h-[300px]  border-black border[2px] shadow-[5px_5px_10px_rgba(0,0,0,0.4)] overflow-y-auto">
          <Answers answers={answers} />
        </div>

        <div className="w-full p-10 flex text-gray-900 text-3xl font-bold items-center justify-center">
          <h1>Answer the Top Question</h1>
        </div>
        <div className="w-full pb-10 ">
          <form onSubmit={handlePost} className="flex flex-col gap-4">
            <textarea
              maxLength={200}
              name="answer"
              id="answer"
              cols="30"
              rows="8"
              placeholder="write your answer in 200 characters"
              required
              style={{ resize: "none" }}
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="w-full bg-white rounded-lg p-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
            <button
              type="submit"
              className="btn bg-primary w-full text-lg text-white px-4 py-3 rounded-lg hover:bg-secondary transition-all duration-200"
            >
              Post your answer
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleQuestion;

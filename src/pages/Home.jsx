import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import NavBar from "../components/NavBar";
import { Link, useLocation } from "react-router-dom";
import axiosConfig from "../Config/axiosConfig";
import QuestionCard from "../components/QuestionCard";
import Footer from "../components/Footer";
function Home() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const location = useLocation();
  const searchRef = useRef(null);
  function handleSearch() {
    setSearch(searchRef.current.value);
    if (searchRef.current.value.trim() == "") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(
        questions.filter((question) =>
          question.title
            .toLowerCase()
            .includes(searchRef.current.value.trim().toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axiosConfig.get("/questions/allQuestions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response?.data?.questions);
        setFilteredQuestions(response?.data?.questions);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.msg);
      }
    }

    fetchQuestions();
    window.scrollTo(0, 0);
  }, [token, location.pathname]);
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-[80%]  mx-auto justify-center">
        <div>
          <div className="  flex flex-col gap-4  sm:flex-row sm:justify-between  w-full items-center my-10 ">
            <Link to="/ask">
              <button className="btn bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-secondary">
                Ask Question
              </button>
            </Link>
            <div>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search..."
                className="input border-2 border-primary outline-none focus:border-[4px]  text-[16px] rounded-lg p-1 w-full max-w-xs"
              />
            </div>
          </div>
          <div>
            <p className="text-xl">
              Welcome: <b> {user.userName ? user.userName : "User"}</b>
            </p>
          </div>
        </div>

        <div className="gap-4 min-h-[300px]" style={{ height: "auto" }}>
          {error && <p className="text-red-500">{error}</p>}
          {filteredQuestions.length === 0 && (
            <div className="text-gray-700 h-[300px] flex justify-center items-center w-full text-3xl">
              No questions found
            </div>
          )}
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              questionId={question.questionId}
              title={question.title}
              userName={question.userName}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;

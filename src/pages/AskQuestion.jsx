import React, { useState, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import axiosConfig from "../Config/axiosConfig";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import arrow from "../assets/arrow_black.svg";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "../ContextApi/SnackBarContext";
import ClipLoader from "react-spinners/ClipLoader";

function AskQuestion() {
  const { user } = useContext(AuthContext);
  const { handleClick, setData, setError } = useContext(Snackbar);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) {
      return;
    }

    setLoading(true);
    const trimmedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .join(",");
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    try {
      await axiosConfig.post(
        "/questions/ask",
        {
          userId: user?.userId,
          title: trimmedTitle,
          description: trimmedDescription,
          tags: trimmedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setTags("");
      setLoading(false);
      navigate("/");
      window.scrollTo(0, 0);
      setError("");
      setData("Your question has been posted successfully!!");
      handleClick();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
      handleClick();
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-[80%] mx-auto justify-center font-mono">
        <div className="group">
          <div className="w-[fit-content] m-3">
            <h1 className="text-gray-700 text-3xl font-bold font-serif py-5">
              Steps To Ask A Good Question
            </h1>
            <hr className="border-2 border-secondary w-[40%] group-hover:w-[80%] transition-all duration-[1.5s] ease" />
          </div>

          <div className="flex flex-col gap-4 font-bold">
            <span className="flex gap-2 items-center">
              <img src={arrow} alt="arrow" />
              <p>Summarize your problems in a one-line title.</p>
            </span>
            <span className="flex gap-2 items-center">
              <img src={arrow} alt="arrow" />
              <p>Describe your problem in more detail.</p>
            </span>
            <span className="flex gap-2 items-center">
              <img src={arrow} alt="arrow" />
              <p>
                Explain what you have tried and what you expected to happen.
              </p>
            </span>
            <span className="flex gap-2 items-center">
              <img src={arrow} alt="arrow" />
              <p>Review your question and post it to the site.</p>
            </span>
          </div>
        </div>

        <div className="w-full p-10 flex text-gray-900 text-3xl font-bold items-center justify-center">
          <h1 className="text-gray-700 text-3xl font-bold font-serif">
            Post Your Question
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-10">
          <input
            type="text"
            name="title"
            id="title"
            maxLength={100}
            required
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="8"
            maxLength={200}
            placeholder="write your question in 200 characters"
            required
            style={{ resize: "none" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full bg-white rounded-lg p-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            maxLength={50}
            placeholder="tag1, tag2, tag3"
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="btn bg-primary w-full text-lg text-white px-4 py-3 rounded-lg hover:bg-secondary transition-all duration-200"
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Post your Question"
            )}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default AskQuestion;

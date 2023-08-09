import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"
const img =
  "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80";

function DetailPage() {
  const { postid } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    fetch(`${HOST}/detail/${postid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPostData(result);
        // console.log(result);
      });
  }, []);

  return (
    <div className="sm:ml-64">
      <div className="font-bold text-4xl ml-3">Details</div>
      {postData ? (
        <div className="max-w-9xl mx-auto p-4">
          <div className="bg-slate-700 rounded shadow p-4">
            <div className="flex">
              <img
                src={img}
                alt="Thumbnail"
                className="w-2/4 rounded-md object-cover"
              />
              <div className="grid">
                <div className="ml-4">
                  <h1 className="text-5xl font-bold text-white mb-2">
                    {postData.projectTitle}
                  </h1>
                  <br />
                  <span className="text-white bold text-3xl">
                    Project Details
                  </span>
                  <div>
                    <ul className=" text-white">
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Description</span>
                          <p className="bg-white font-mono text-black m-2 p-2 rounded">
                            {postData.description}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Source Code</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.codeLink === ""?"Code is not Public yet" : postData.codeLink}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Website Link</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.websiteLink === ""? "Website is not Hosted yet": postData.websiteLink}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Documentation</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.documentationLink === "" ? "Documentation is not Available": postData.documentationLink}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Likes</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.likes.length}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Author</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.postedBy.name}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Author Email</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.postedBy.email}
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="text-white">
                          <span className="text-2xl ml-2">Posted On</span>
                          <p className="bg-white text-black m-2 p-2 rounded">
                            {postData.timeStamp}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default DetailPage;

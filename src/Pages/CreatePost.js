import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

function CreatePost() {
  const [projectTitle, setProjectTitle] = useState('')
  const [description, setDescription] = useState('')
  const [codeLink, setCodeLink] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [documentationLink, setDocumentationLink] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const navigate = useNavigate()

  function handleNewPost(event){
    event.preventDefault();
    
    fetch(`${HOST}/createpost`, {
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          projectTitle,
          description, 
          codeLink, 
          websiteLink,
          documentationLink,
          thumbnail 
        })
    }).then(res => {
      return res.json();
    })
    .then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data.message);
        navigate('/');
      }
    })
    .catch(err=>{
        console.log(err);
    });
}
  return (
    <div className="sm:ml-64">
      <div className="absolute top-0 w- h-12">
        <span className="text-4xl font-bold ml-4 bg">Create Post</span>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add a New Project
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleNewPost}>
                <div>
                  <label
                    htmlFor="projecttitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="projecttitle"
                    id="projecttitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ProjectGram"
                    required=""
                    onChange={(e)=>setProjectTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    row="10"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Short Description"
                    required=""
                    onChange={(e)=>setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="codelink"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Source Code
                  </label>
                  <input
                    type="text"
                    name="codelink"
                    id="codelink"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xyz.github.com"
                    // required=""
                    onChange={(e)=>setCodeLink(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="websitelink"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Site Link
                  </label>
                  <input
                    type="text"
                    name="websitelink"
                    id="websitelink"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="mywebsite.netify.com"
                    // required=""
                    onChange={(e)=>setWebsiteLink(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="documentationlink"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Documentation Link
                  </label>
                  <input
                    type="text"
                    name="documentationlink"
                    id="documentationlink"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xyz.notion.com"
                    // required=""
                    onChange={(e)=>setDocumentationLink(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Upload thumbnail"
                    // required=""
                    onChange={(e)=>setThumbnail(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="w-full btn" >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CreatePost;

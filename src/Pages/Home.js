import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

const img1 = "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80";
 
function Home() {
  const [data, setData] = useState([]);
  const {state, dispatch} = useContext(UserContext)
  
  useEffect(() => {
    fetch(`${HOST}/allpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  });

  const likePost = (id)=>{
    fetch(`${HOST}/like`,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
             //   console.log(result)
      const newData = data.map(item=>{
          if(item._id === result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

  const unLikePost = (id)=>{
    fetch(`${HOST}/unlike`,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res =>{return res.json()})
    .then(result => {
        const newData = data.map(item =>{
            if(item._id === result._id){
                return result
            }else{
                return item
            }
        })
        setData(newData)
    }).catch(err => {
        console.log(err);
    })
  }

  const makeComment = (text, postId) =>{
    fetch(`${HOST}/comment`,{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text,
        postId
      })
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.map(item =>{
        if(item._id === result._id){
            return result
        }else{
            return item
        }
    })
    setData(newData)
    })
    .catch(err =>{
      console.log(err);
    })
  }

  const deletePost = (postId) =>{
    fetch(`${HOST}/deletepost/${postId}`,{
      method:"delete",
      headers:{
        Authorization: "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => {return res.json()})
    .then(result => {
      console.log(result)
      const newData = data.filter(item => {
        return item._id !== result._id
      })
      setData(newData)
    })
  }

  return (
    <div className="sm:ml-64">
      <div className="absolute top-0 w- h-12">
        <span className="text-4xl font-bold ml-4 bg">Home</span>
      </div>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <div className="flex justify-center m-8">
              <div className="max-w-lg rounded overflow-hidden shadow-lg shadow-slate-700 ">
                <div className="flex justify-between m-2">
                  <div className="flex">
                    <img
                      className="object-fill h-10 w-10 rounded-full"
                      src={img1}
                      alt=""
                      srcSet=""
                    />
                    <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile" }><span className="ml-2 mt-2">
                      {item.postedBy == null ? "Loading.." : item.postedBy.name}
                    </span></Link>
                  </div>
                  <span className="ml-2 mt-2">{item.timeStamp}</span>
                </div>
                <img
                  className="w-full"
                  src={img1}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {item.projectTitle}
                  </div>
                  <p className="text-gray-700 text-base truncate ...">
                    {item.description}
                  </p>
                </div>
                <div className="flex">
                  <div className="ml-6">
                    {!item.likes.includes(state._id) ? <button className="btn" onClick = {()=>likePost(item._id)}>{item.likes.length}-</button>
                    :<button className="btn ml-1" onClick={()=>unLikePost(item._id)}>{item.likes.length}+</button>}
                  </div>
                  <div className="ml-6">
                    <Link to={"/post/"+item._id}><button className="btn">View Details</button></Link>
                  </div>
                  {item.postedBy && state._id === item.postedBy._id && <div className="ml-6">
                    <button className="btn" onClick={()=>deletePost(item._id)}>Delete</button>
                  </div>}
                </div>
                <div className="ml-6 grid">
                {item.comments.map(record=>{
                  return(
                    <div key={record._id} className="flex">
                    <h1 className="mr-5 font-bold">{record.postedBy.name === undefined ? "Anonymous": record.postedBy.name}</h1>
                    <h6><span>{record.text}</span></h6>
                    </div>
                  )
                })}
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
                  }}>
                  <input
                    className="w-full m-3 rounded border-none"
                    type="text"
                    placeholder="Add a comment"
                  />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Home;

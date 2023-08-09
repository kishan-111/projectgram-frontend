import { useContext, useEffect, useState } from "react";
import CardProfile from "../components/CardProfile";
import { UserContext } from "../App";
import { useParams} from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

function UserProfile() {
  const [userProfile, setProfile] = useState(null)
  const {state, dispatch} = useContext(UserContext)
  const {userid} = useParams()
  const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
  
  useEffect(()=>{
    fetch(`${HOST}/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => {return res.json()})
    .then(result => {
      setProfile(result)
    })
  },[])

  function followUser(){
    fetch(`${HOST}/follow`,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res => {return res.json()})
    .then(data =>{
        dispatch({type:"UPDATE", payload:{following: data.following, followers: data.followers}})
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState) => {
          return {
            ...prevState,
            user:{
              ...prevState.user,
              followers:[...prevState.user.followers, data._id]
            }
          }
        })
        setShowFollow(false)
    })
  }

  function unfollowUser(){
    fetch(`${HOST}/unfollow`,{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res => {return res.json()})
    .then(data =>{
        dispatch({type:"UPDATE", payload:{following: data.following, followers: data.followers}})
        localStorage.setItem("user", JSON.stringify(data))

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item !== data._id)
          return {
            ...prevState,
            user:{
              ...prevState.user,
              followers: newFollower
            }
          }
        })
        setShowFollow(true)
    })
  }

  return (
    <div className="sm:ml-64">
    {userProfile ? 
    <div>
    <div className="absolute top-0 w-[1260px] bg-slate-700">
         <span className="text-2xl text-white font-bold m-4 bg">Profile</span>
    </div>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute bg-slate-700"
            ></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-white-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1514543250559-83867827ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1125&q=80"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userProfile.user.followers.length}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Followers
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userProfile.posts.length}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Projects
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userProfile.user.following.length}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Following
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          150
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Likes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userProfile.user.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                   {userProfile.user.email}
                  </div>
                  <div className="m-2 text-blueGray-600 flex justify-evenly">
                    { showFollow === true ? <button className="bg-gray-500 rounded text-white p-2" onClick={() => followUser()}>Follow</button>
                    :<button className="bg-gray-500 rounded text-white p-2" onClick={() => unfollowUser()}>Unfollow</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        <hr/>
        </section>
        <div className="grid">
            {
              userProfile.posts.map(item =>{
                return (
                  <CardProfile key={item._id}data={item}/>
                  )
              })
            }
          </div>
      </main>
    </div>: <h1>Loading...</h1>}
    </div>
  );
}
export default UserProfile;

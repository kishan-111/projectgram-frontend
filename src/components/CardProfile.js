const img = "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80"

function CardProfile({data}) {
    return (
      <div>
        <div className="flex justify-center m-8">
        <div className="max-w-lg rounded overflow-hidden shadow-lg shadow-slate-700 ">
          <img className="w-full" src={img} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.projectTitle}</div>
            <p className="text-gray-700 text-base truncate ...">
              {data.description}
            </p>
          </div>
          <div className="ml-6">
            <button className="btn">View Details</button>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default CardProfile;
  
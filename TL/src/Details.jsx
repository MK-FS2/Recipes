import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link ,useLocation} from "react-router-dom";

export default function Details() {
  let { id } = useParams();
  const [toggl, set_toggl] = useState(false);
  const [list, setlist] = useState(null);
  let location = useLocation()
  function side_nav_hider() { set_toggl(!toggl); }

  async function fetchData(mealId) {
    try {
      let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      setlist(res.data.meals);
    } catch (error) { console.error("Error fetching data:", error); }
  }

  useEffect(() => { fetchData(id); }, [id]);

  function getIngredients(meal) {
    if (!meal) return [];
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal[`strIngredient${i}`], measure = meal[`strMeasure${i}`];
      if (ingredient) ingredients.push(`${measure} ${ingredient}`);
    }
    return ingredients;
  }

  const ingredients = getIngredients(list?.[0]);

  return (
    <div className="w-full relative flex lg:h-[100vh] xs:h-auto">
      {/* Toggle Icon */}
      <svg onClick={side_nav_hider} xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-list text-black absolute top-2 right-2 xs:block md:hidden" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg>

      {/* Sidebar */}
      <div className={`p-2 lg:w-2/12 md:w-4/12 xs:w-7/12 h-full bg-white xs:absolute ${toggl ? "xs:left-0" : "xs:left-[-100%]"} flex space-y-7 flex-col md:relative md:left-0 transition-all duration-500 ease-in-out`}>
        <div className="w-full"><img src="/log.png" alt="Logo"/></div>
        <Link to="/" className={`w-full rounded-md border border-black p-2 flex justify-center items-center text-xl font-serif ${location.pathname === "/" ? "bg-orange-400 border-none" : "bg-white"}`}>Meals</Link>
        <div className={`w-full rounded-md border border-black p-2 flex justify-center items-center text-xl font-serif ${location.pathname.includes("/Details") ? "bg-orange-400 border-none" : "bg-white"}`}>Ingredients</div>
        <div className="w-full rounded-md border border-black bg-white p-2 flex justify-center items-center text-xl font-serif">Area</div>
      </div>

      {/* Main Content */}
      <div className="lg:w-10/12 md:w-8/12 xs:w-full   space-y-3 pt-9 h-full bg-orange-100 p-4">
      <div className="w-full h-auto flex flex-wrap md:flex-nowrap space-x-3">
        <div className="lg:w-4/12 xs:w-full h-auto ">
        {/* image */}
        <img src={list?.[0]?.strMealThumb} alt={list?.[0]?.strMeal} className="w-full h-auto rounded-md"/>
        </div>
        <div className="lg:w-4/12 xs:w-full h-[400px] overflow-y-auto">
        {/* descruption */}

        <p className="text-gray-700 text-lg">{list?.[0]?.strInstructions}</p>
        </div>
        <div className="lg:w-4/12 xs:w-full  ">
          <div className="w-full h-auto rounded-md p-3 bg-white flex flex-col space-y-3 shadow shadow-gray-400">
            <p className="text-[1.5rem] font-bold">Ingredients</p>
            <div className="w-full bg-gray-500 h-[2px]"></div>
            {ingredients.map((ing, idx) => (<p key={idx} className="text-gray-800">{ing}</p>))}
          </div>
        </div>
        </div>
        
        <div className="w-full space-x-6 flex lg:justify-start xs:justify-center items-center"> 
        <a className="p-2 px-5 rounded-md bg-red-700 text-white" href={list?.[0]?.strYoutube}>YouTube</a>
        <a className="p-2 px-5 rounded-md bg-green-600 text-white" href={list?.[0]?.strSource}>Source</a>
        </div>
      </div>
    </div>
  );
}

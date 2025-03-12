import React from 'react'
import { useState ,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Home() {
let [list,setlist]=useState(null)
let location = useLocation();
    let [toggl,set_toggl] = useState(false)
    function side_nav_hider()
    {
   set_toggl(!toggl)
    }
    async function ALL()
    {
        try 
        {
            let res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            if(res.status != 200 && res.status !=201)
            {
                throw new Error("no")
            }
            else
            {
                setlist(res.data.meals)
                console.log(list)
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
     async function category_search(e)
    {
        try 
        {
            let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`)
            if(res.status != 200 && res.status !=201)
            {
                throw new Error("no")
            }
            else
            {
                setlist(res.data.meals)
                console.log(list)
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(()=>{
      ALL()
    },[])
  return (
    <div className='w-full md:h-[100vh] xs:h-full relative bg-orange-100 flex'>
   <svg onClick={side_nav_hider} xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-list text-black absolute top-2 right-2 xs:block md:hidden" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
   </svg>
    {/* side bar */}
    <div className={`p-2 lg:w-2/12 md:w-4/12 xs:w-7/12 h-full bg-white xs:absolute ${toggl ? 'xs:left-0' : 'xs:left-[-100%]'} flex space-y-7 flex-col md:relative md:left-0 transition-all duration-500 ease-in-out`}>
     <div className='w-full'>
     <img src='/log.png'></img>
     </div>
     <div className={`w-full rounded-md border border-black p-2 flex justify-center items-center text-xl font-serif ${location.pathname == '/' ? 'bg-orange-400 border-none' : 'bg-white'}          `}>
       meals
     </div>
     <div className='w-full  rounded-md border border-black bg-white p-2 flex justify-center items-center text-xl font-serif'>
       Ingridiants
     </div>
     <div className='w-full  rounded-md border border-black bg-white p-2 flex justify-center items-center text-xl font-serif'>
      Area
     </div>
    </div>
    {/* main */}
    <div className='lg:w-10/12 md:w-8/12 xs:w-full p-2 flex flex-col '>
    <div className='flex justify-between items-center px-3 mt-5'>
    <p className='lg:text-[3rem]  md:text-[2rem] xs:text-[1.3rem] font-bold bg-gradient-to-r from-orange-400 to-red-300 text-transparent bg-clip-text'>Learn,cook,Eat Your Food</p>
    <div className='xs:flex md:hidden'>
 <select 
  onChange={category_search} 
  onBlur={category_search} 
  className="text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100">
  <option value="All">All</option>
  <option value="Beef">Beef</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Chicken">Chicken</option>
  <option value="Dessert">Dessert</option>
  <option value="Goat">Goat</option>
  <option value="Lamb">Lamb</option>
  <option value="Miscellaneous">Random</option>
  <option value="Pasta">Pasta</option>
  <option value="Pork">Pork</option>
  <option value="Seafood">Seafood</option>
  <option value="Side">Side</option>
  <option value="Starter">Starter</option>
  <option value="Vegan">Vegan</option>
  <option value="Vegetarian">Vegetarian</option>
</select>
    </div>
    </div>
   
      <div className='md:flex justify-around mt-5  flex-wrap xs:hidden'>
        <button value={'ALL'}  onClick={ALL} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>ALL</button>
        <button value={'Beef'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Beef</button>
        <button value={'Breakfast'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Breakfast</button>
        <button value={'Chicken'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Chicken</button>
        <button value={'Dessert'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Dessert</button>
        <button value={'Goat'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Goat</button>
        <button value={'Lamb'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Lamb</button>
        <button value={'Miscellaneous'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Random</button>
        <button value={'Pasta'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>pasta</button>
        <button value={'Pork'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>pork</button>
        <button value={'Seafood'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>seafood</button>
        <button value={'Side'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>side</button>
        <button value={'Starter'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Starter</button>
        <button value={'Vegan'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Vegen</button>
        <button value={'Vegetarian'} onClick={category_search} className='text-gray-500 bg-gray-50 py-2 px-4 hover:bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-500 rounded-[40px] border border-gray-100'>Vegeterian</button>
      </div>
<div className='w-full flex flex-wrap flex-grow pt-5 mt-8 p-3 overflow-y-auto'>
  {/* card */}
  {list?.map((el)=>{
    return(
      <div key={el.idMeal} className='lg:w-3/12 md:w-6/12 xs:w-full p-3'>
       
      <div className='w-full rounded-[10px] flex flex-col justify-center items-center space-y-5 bg-white  group hover:scale-110 p-3 transition-all duration-300'>
        {/* img */}
        <div className='w-[50%] h-[50%] rounded-[50%] translate-y-[-20%]  group-hover:rotate-[360deg] transition-transform duration-1000 ease-out overflow-hidden'>
          <img src={el.strMealThumb} className='w-full h-full object-cover'></img>
        </div>
        {/* title */}
        <p className='font-bold '>{el.strMeal}</p>
        {/* area */}
        <div className='space-x-3 w-full flex justify-center items-center'>
          <p>{el.strArea}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
           <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
          </svg>
        </div>
        <Link to={`/Details/${el.idMeal}`} className='w-full  flex justify-center items-center rounded-[900px] bg-green-500 text-white p-2'>View Recipe</Link>
      </div>
       </div>
    )
  })}
    </div>
    </div>
    </div>
  )
}


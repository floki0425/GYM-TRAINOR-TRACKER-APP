import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getMealplan, getMealplanByClientId } from '../../api/mealPlanApi';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';

const MealPlanPanel = () => {
  const [mealplan,setMealplan] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const {mealplanId} = useParams()
  const selectedMealplanId = mealplanId ? mealplanId : null;
  const navigate = useNavigate();
  const ignoreRef = useRef(false);


const {selectedClientId,addMealplan,closeDrawer} = useOutletContext();

console.log(selectedMealplanId)

  const mealplanOpenList = (id) => {
    navigate(`${id}`)
  }

  const clientMealPlan = mealplan.find((plan)=> plan.clientId === selectedClientId)


  const deleteMealplan = (id)=>{
    setMealplan((prevMealplan)=>{
      return prevMealplan.filter((meal)=>meal.id !== id)
    })
  }


   const loadMealplan = useCallback(async () => {
      try{
        setLoading(true);
        setError(null)

        const data = await getMealplanByClientId(selectedClientId);

        if(!ignoreRef.current) setMealplan(data);
      } catch(err){
        if(!ignoreRef.current) setError(err?.message ?? "Failed to load mealplan")
      } finally{
        if(!ignoreRef.current) setLoading(false);
      }
    },[])



useEffect(()=>{
 ignoreRef.current = false
 loadMealplan()
 return () =>{
   ignoreRef.current = true;
 }

},[selectedClientId])
  

if(loading) return <p className="p-6 text-sm text-slate-600">Loading…</p>;
if(error) return <p>{error}</p>
if(!selectedClientId) return 
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Meal Plan</h3>
              <p className="mt-1 text-sm text-slate-600">
                No meal plan yet. Create one to set calories and macros.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addMealplan}
                className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
              >
                + New Meal Plan
              </button>
            </div>
          </div>
        </div>

 const outletContext = {
  selectedClientId,clientMealPlan,loadMealplan,closeDrawer
}




  return (  
 <div className="min-h-screen p-6">
   <div className='rounded-xl border border-slate-200 p-3'>
      <div className="flex justify-end">
    <button
      onClick={addMealplan}
      className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800 mb-4"
    >
      + New Meal Plan
    </button>
    </div>
      {!selectedMealplanId ? ( <div className="mx-auto max-w-5xl space-y-4">
     {mealplan.map((c) => {
        return (
          <div
            key={c.id}
            onClick={() => mealplanOpenList(c.id)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:bg-slate-50"
          >
            <div className="flex flex-col gap-3  md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Meal Plan</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Structured nutrition plan for client progress and consistency.
                </p>
              </div>

                <button
                type="button"
                className="self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                 onClick={(e) => {
                  e.stopPropagation();
                  deleteMealplan(c.id);
                }}
              >
                Delete
              </button>

              <button
                type="button"
                className="self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={(e) => e.stopPropagation()}
              >
                Edit Plan
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Goal
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {c.goal}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Calories
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {c.calories}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Protein
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {c.protein}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Carbs 
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {c.carbs} 
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Fats
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                    {c.fat}
                </p>
              </div>
            </div>
          </div>
        );
      })}

   </div> 
  
    
  ) : <Outlet context={outletContext}/>}
   </div>
 
  
  
  </div>


)
}
export default MealPlanPanel

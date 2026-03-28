import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deleteMealplan,  getMealplanByClientId } from '../../api/mealPlanApi';
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

const clientMealPlan = mealplan.find((plan)=> plan.clientId === selectedClientId)
const showDetails = location.pathname.endsWith("mealdetails")


const checkinList = (id)=>{
  navigate(`/clients/${selectedClientId}/workspace/meal-plan/${id}`)
}

const openDetails = (id)=>{
  navigate(`/clients/${selectedClientId}/workspace/meal-plan/${id}/mealdetails`)
}
  

  
  

  const removeMealplan = async(id)=>{
    try {
       await deleteMealplan(id);
        const remainingMealplan = mealplan.filter((f)=>f.id !== id);
        const nextCheckin = remainingMealplan[0];
        setMealplan(remainingMealplan);

         if (remainingMealplan.length > 0) {
      navigate(`/clients/${selectedClientId}/workspace/meal-plan/${nextCheckin.id}`);
    } else {
      navigate(`/clients/${selectedClientId}/workspace/meal-plan/`);
    }

    } catch (error) {
       setError(error?.message ?? "Failed to delete mealplan") 
    }

   
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
    },[selectedClientId])



useEffect(()=>{
 ignoreRef.current = false
 loadMealplan()
 return () =>{
   ignoreRef.current = true;
 }

},[loadMealplan])
  

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
  <div className="mx-auto max-w-5xl space-y-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Meal Plans</h2>
        <p className="mt-1 text-sm text-slate-600">Nutrition plans for this client.</p>
      </div>

      <button
        onClick={addMealplan}
        className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
      >
        Add Meal Plan
      </button>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {!showDetails? (
        <div className="space-y-4">
          {mealplan.map((c) => {
             const isSelected = c.id === selectedMealplanId;

            return (
              <div
                key={c.id}
                onClick={() => checkinList(c.id)}
                className={`cursor-pointer rounded-2xl border border-slate-200  p-5 transition hover:bg-slate-50 ${
                    isSelected 
                   ? "border-teal-300 bg-teal-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}>

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {c.goal}
                    </span>

                    <p className="mt-3 text-sm text-slate-600">
                      Calories: {c.calories} <span className="text-slate-300">|</span> Protein:{" "}
                      {c.protein} <span className="text-slate-300">|</span> Carbs: {c.carbs}{" "}
                      <span className="text-slate-300">|</span> Fats: {c.fat}
                    </p>
                  </div>

                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                     
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(c.id);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View Details
                  </button>
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMealplan(c.id);
                      }}
                      className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        ) : ( 
          
          <Outlet context={outletContext} />)}

   
       
     
    </div>
  </div>
</div>


)
}
export default MealPlanPanel

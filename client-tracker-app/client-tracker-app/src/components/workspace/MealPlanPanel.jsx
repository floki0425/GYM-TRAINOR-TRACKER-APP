import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getMealplan, getMealplanByClientId } from '../../api/mealPlanApi';
import { useOutletContext } from 'react-router-dom';

const MealPlanPanel = () => {
  const [mealplan,setMealplan] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
  const {selectedClientId} = useOutletContext();

  const clientMealPlan = mealplan.find((plan)=> plan.clientId === selectedClientId)

  const ignoreRef = useRef(false)

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
  


 

  return (
<div className="tab-panel">
 {loading ? ("loading"

 ) : (
  
  
  <div>
    {!clientMealPlan ? (
      <div className="meal-header">
      <h3>Meal Plan</h3>
      <div className="meal-actions">
        <button>+ New Meal Plan</button>
        <button>Edit</button>
      </div>
    </div>

      ) : (

    <div>
      <div className="meal-summary mb-10">
        <div className="meal-summary__title">
          <p>{clientMealPlan.goal}</p>
          <p>calories:{clientMealPlan.calories}</p>
        </div>

        <div className="meal-summary__macros">
          <div className="macro-chip">Protein: {clientMealPlan.protein}</div>
          <div className="macro-chip">Carbs: {clientMealPlan.carbs}</div>
          <div className="macro-chip">Fat: {clientMealPlan.fat}</div>
        </div>
      </div>

      {clientMealPlan.meals.map((meals, mealIndex)=>{
        return <div key={mealIndex} className="meal-list mb-5">
                <div className="meal-card">
                  <div className="meal-card__header">
                    <h4>{meals.name}</h4>
                    
                </div>
      {meals.items.map((items,itemIndex)=>{
        return <div key={itemIndex} className=''>
                 <p className=' bg-cyan-200 p-2 rounded text-xs'>{items}</p>
               </div> 
          })}
        </div>

      </div>
      }
      
     )}
      <button className="meal-add">+ Add Meal</button>

    </div>
  )}

  
        
    

 
  </div>
)}
 




</div>
  )
}

export default MealPlanPanel

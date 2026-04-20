import {http} from "./http"

export async function getMealplan(){
   return http("/mealplan")
}

export async function getMealplanByClientId(clientId) {
  return http(`/mealplan?clientId=${clientId}`);
}


export async function createMealplan(payload) {
  return http("/mealplan",{
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function editMealplan(payload) {
  return http(`/mealplan/${payload.id}`,{
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export async function deleteMealplan(id){
  return http(`/mealplan/${id}`,{
    method: "DELETE"
  })
}
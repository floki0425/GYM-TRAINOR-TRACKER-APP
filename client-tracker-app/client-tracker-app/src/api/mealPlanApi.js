import {http} from "./http"

export async function getMealplan(){
   return http("/mealplan")
}

export async function getMealplanByClientId(clientId) {
  return http(`/mealplan?clientId=${clientId}`);
}
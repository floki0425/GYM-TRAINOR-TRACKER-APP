import {http} from "./http"

export async function getClients(){
   return http("/clients")
}


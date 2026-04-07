import {http} from "./http"

export async function getClients(){
   return http("/clients")
}

export async function deleteClients(id){
  return http(`/clients/${id}`,{
    method: "DELETE",
  })
}


export async function createClients(payload) {
  return http("/clients",{
    method: "POST",
    body: JSON.stringify(payload)
  });
}



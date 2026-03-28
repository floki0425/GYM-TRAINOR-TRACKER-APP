import {http} from "./http"

export async function getCheckin(){
   return http("/checkins")
}

export async function getCheckinByClientId(clientId) {
  return http(`/checkins?clientId=${clientId}`);
}

export async function createCheckin(payload) {
  return http("/checkins",{
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function deleteCheckin(id){
  return http(`/checkins/${id}`,{
    method: "DELETE",
  })
}

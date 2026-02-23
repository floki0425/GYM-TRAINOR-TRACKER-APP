import {http} from "./http"

export async function getCheckin(){
   return http("/checkins")
}

export async function getCheckinByClientId(clientId) {
  return http(`/checkins?clientId=${clientId}`);
}


import {http} from "./http"

export async function getProgram(){
   return http("/programs")
}

export async function getProgramId(clientId) {
  return http(`/programs?clientId=${clientId}`);
}
import {http} from "./http"

export async function getProgram(){
   return http("/programs")
}

export async function getProgramId(clientId) {
  return http(`/programs?clientId=${clientId}`);
}


export async function deleteProgram(id) {
  return http(`/programs?${id}`,{
    method:"DELETE"
  });
}


export async function createProgram(payload) {
  return http("/program",{
    method: "POST",
    body: JSON.stringify(payload)
  });
}
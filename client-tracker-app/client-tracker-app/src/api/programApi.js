import {http} from "./http"

export async function getProgram(){
   return http("/programs")
}

export async function getProgramId(clientId) {
  return http(`/programs?clientId=${clientId}`);
}


export async function deleteProgram(id) {
  return http(`/programs/${id}`,{
    method:"DELETE"
  });
}



export async function editProgram(payload) {
  return http(`/programs/${payload.id}`,{
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export async function createProgram(payload) {
  return http("/programs",{
    method: "POST",
    body: JSON.stringify(payload)
  });
}
import React, { useCallback, useEffect, useState,useRef } from "react";


import { deleteClients, getClients } from "../api/clientApi.js";
import TopBar from "./TopBar.jsx";
import ClientsPanel from "./ClientsPanel.jsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { http } from "../api/http.js";



const ClientCard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientFilter,setClientFilter] = useState("ALL");

 const {id} = useParams()

  const ignoreRef = useRef(false);
  const navigate = useNavigate();
  const selectedClientId = id ? id : null;

  const onSelectClient = (id) => {
   navigate(`/clients/${id}`);
  };

  const openDrawer = ()=>{
   navigate("add")
 }
  const addClient = ()=>{
   navigate("addclient")
 }
 const addMealplan = ()=>{
   navigate("addmealplan")
 }

 const closeDrawer = ()=>{
   navigate(-1)
 }



  

  const selectedClient = clients.find((c) => c.id === selectedClientId);
  
  

 

  const deleteClient = async ()=>{
    try {
    await deleteClients(selectedClientId);
    const remainingClients = clients.filter((c)=>c.id !== selectedClientId)
    const nextClient = remainingClients[0]
    setClients(remainingClients);
    
    if (remainingClients.length > 0) onSelectClient(nextClient.id);
    if (remainingClients.length === 0 ) navigate("/clients")
    } catch (error) {
       setError(error?.message ?? "Failed to Delete client");
    }
   
  }

  const filtered = (filter)=>{
    return clients.filter((c)=>{
      if(filter === "ALL" ) return true ;
       if(filter === "ACTIVE" ) return c.status === "ACTIVE";
       if(filter === "PAUSED") return c.status === "PAUSED";
       return true;
    })
  }

 
 const filteredClients = filtered(clientFilter)

 const  loadClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getClients();
            
            if (!ignoreRef.current) setClients(data);
        } catch (err) {
            if (!ignoreRef.current) setError(err?.message ?? "Failed to load clients");
        } finally {
            if (!ignoreRef.current) setLoading(false);
        }

    }
,[])

  useEffect(() => {
    ignoreRef.current = false
    loadClients();
    return()=>{
        ignoreRef.current = true;
    }
  }, [loadClients]);


 const outletContext = {
    selectedClient,
    loading,
    selectedClientId,
    openDrawer,
    closeDrawer,
    loadClients,
   addMealplan,

}

 

  return (<>
      <TopBar/>
  
    <div className="flex min-h-screen bg-slate-50">
  {/* Left Sidebar */}
  <div className="w-[320px] border-r border-slate-200 bg-white">
    <ClientsPanel
      clients={clients}
      onSelectClient={onSelectClient}
      loading={loading}
      setClientFilter={setClientFilter}
      filteredClients={filteredClients}
      clientFilter={clientFilter}
      selectedClient={selectedClient}
      selectedClientId={selectedClientId}
      addClient={addClient}
      deleteClient={deleteClient}
      
       
    />
  </div>

  {/* Main Workspace */}
  <div className="flex-1">
    <Outlet context={outletContext}/>
  </div>
 
  
</div>
    </>
  
  );
};

export default ClientCard;


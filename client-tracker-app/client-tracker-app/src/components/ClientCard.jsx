import React, { useCallback, useEffect, useState,useRef } from "react";


import { getClients } from "../api/clientApi.js";
import TopBar from "./TopBar.jsx";
import ClientsPanel from "./ClientsPanel.jsx";
import Workspace from "./Workspace.jsx";
import { useNavigate, useParams } from "react-router-dom";



const ClientCard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientFilter,setClientFilter] = useState("ALL");
 const {id} = useParams()

  const ignoreRef = useRef(false);
  const navigate = useNavigate();
  const selectedClientId = id ? Number(id) : null;

  const onSelectClient = (id) => {
   navigate(`/clients/${id}`);
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId);



  
 


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




 

  return (<>
      <TopBar/>
  
      <div className="flex ">
        
    <ClientsPanel
        clients={clients}
        onSelectClient={onSelectClient}
        loading={loading}
       setClientFilter={setClientFilter}
       filteredClients={filteredClients}
       clientFilter={clientFilter}
        selectedClient={selectedClient}
      selectedClientId = {selectedClientId}

      />

      <Workspace
      selectedClient={selectedClient}
       loading={loading}
       selectedClientId={selectedClientId}
      />
      
      

  </div>
    </>
  
  );
};

export default ClientCard;


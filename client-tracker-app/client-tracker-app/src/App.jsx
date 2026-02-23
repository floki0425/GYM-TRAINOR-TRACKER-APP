import React, { useEffect, useState } from "react";
import ClientsPanel from "./components/ClientsPanel";
import Workspace from "./components/Workspace";
import { getClients } from "./api/clientApi.js";
import MealPlanPanel from "./components/workspace/MealPlanPanel.jsx";
import TopBar from "./components/TopBar.jsx";

const App = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientFilter,setClientFilter] = useState("ALL");
  const [selectedClientId, setSelectedClientId] = useState(null);

console.log(clients.length)

  const filtered = (filter)=>{
    return clients.filter((c)=>{
      if(filter === "All" ) return true ;
       if(filter === "ACTIVE" ) return c.status === "ACTIVE";
       if(filter === "PAUSED") return c.status === "PAUSED";
       return true;
    })
  }

 
 const filteredClients = filtered(clientFilter)




  useEffect(() => {
    let ignore = false;

    async function loadClients() {
      try {
        setLoading(true);
        setError(null);

        const data = await getClients();
        
        if (!ignore) setClients(data);
      } catch (err) {
        if (!ignore) setError(err?.message ?? "Failed to load clients");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadClients();

    return () => {
      ignore = true;
    };
  }, []);

  const onSelectClient = (id) => {
    setSelectedClientId(id);
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId);



 

  return (<>
      <TopBar/>
  
      <div className="flex ">
      <ClientsPanel
        clients={clients}
        selectedClientId={selectedClientId}
        onSelectClient={onSelectClient}
        loading={loading}
       setClientFilter={setClientFilter}
       filteredClients={filteredClients}
       clientFilter={clientFilter}
      />

      <Workspace 
      selectedClient={selectedClient}
      selectedClientId={selectedClientId}
       loading={loading}
      />

    

  </div>
    </>
  
  );
};

export default App;


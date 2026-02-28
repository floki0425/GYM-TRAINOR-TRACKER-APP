import React from 'react'
import search from '../assets/search.png'

        
const ClientsPanel = ({ clients, onSelectClient, selectedClientId, loading,setClientFilter,filteredClients,clientFilter,selectedClient}) => {
 




    return (
       <div className="clients-panel   bg-gray-100  ">
        <div className=' p-3'>
              <p className='font-semibold mb-4'>Clients</p>
       <div className="items-center bg-gray-100 border-1x mb-5 ">
            <button onClick={()=>{setClientFilter("ALL")}} className="px-4 py-1.5 text-sm font-medium bg-blue-400 text-white rounded-l shadow-sm ">
                All
            </button>
            <button onClick={()=>{setClientFilter("ACTIVE")}} className="px-4 py-1.5 text-sm font-medium text-gray-500  hover:bg-white/60 ">
                Active
            </button>
            <button onClick={()=>{setClientFilter("PAUSED")}} className="px-4 py-1.5 text-sm font-medium text-gray-500  hover:bg-white/60 ">
                Paused
            </button>
        </div>
       <div className='flex bg-white border border-gray-300 rounded item-center  w-full  '>
                       <img src={search} alt="asd" className='w-8 py-2 px-2 '/>
                       <input  type="text" placeholder='Search..' className=" w-full max-w-900 focus:outline-none  cursor-pointer"/>
                   </div>
        </div>
       
         <div className="clients-panel__list w-[320px] bg-gray-50 p-4 space-y-4">
           {loading  ? ("Loading clients…") : clients.length === 0 ? (                     
            <div className="clients-panel__empty">
                <p>No clients yet</p>
                <p>Add your first client to get started</p>
            </div>) : filteredClients.length === 0 ? (
            <div className="clients-panel__empty">
            <p>No {clientFilter} yet</p>
            <p>Add your first client to get started</p>
           </div>) : ( filteredClients.map((client)=>{
        return <button  key={client.id} onClick={()=>{onSelectClient(client.id)}} className={`client-row border-2 mb-2 flex flex-1 ${client.id === selectedClientId ? "client-row--selected " : "" }`}>
                <div >
                    {/* avatar or  placeholder */}
                </div>

                <div className="client-row__body  ">
                    <div className="client-row__name mr-5">
                       {client.name}
                    </div>

                    <div className="client-row__meta">
                {client.goalType} • {client.status}
                    </div>
                </div>

                <div >
                    {/* status badge / icon */}
                </div>
            </button>
           })
            
         
        )}
        

           
           
           
         </div>

       
       </div>
  )
}

export default ClientsPanel

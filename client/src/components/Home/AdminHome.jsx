import React, { useEffect } from 'react';
import Sidebar from '../AdminSidebar';
import BarChart from '../BarChart';

const AdminHome = () => {
  
   const topClients = [
      { id: 1, name: 'Alice Johnson', photo: 'https://randomuser.me/api/portraits/women/1.jpg', email: 'alice.johnson@example.com', totalProjects: 50 },
      { id: 2, name: 'Bob Smith', photo: 'https://randomuser.me/api/portraits/men/2.jpg', email: 'bob.smith@example.com', totalProjects: 45 },
      { id: 3, name: 'Catherine Brown', photo: 'https://randomuser.me/api/portraits/women/3.jpg', email: 'catherine.brown@example.com', totalProjects: 40 },
    ];
    
    const topDevelopers = [
      { id: 1, name: 'David Wilson', photo: 'https://randomuser.me/api/portraits/men/4.jpg', email: 'david.wilson@example.com', totalProjects: 60 },
      { id: 2, name: 'Emma Davis', photo: 'https://randomuser.me/api/portraits/women/5.jpg', email: 'emma.davis@example.com', totalProjects: 55 },
      { id: 3, name: 'Frank Miller', photo: 'https://randomuser.me/api/portraits/men/6.jpg', email: 'frank.miller@example.com', totalProjects: 50 },
    ];
    
  return (
    <div className="flex flex-row min-h-screen mt-[80px]">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className=" p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Developers</p>
              <p className="text-3xl font-bold text-white leading-tight">1500</p>
            </div>
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Clients</p>
              <p className="text-3xl font-bold text-white leading-tight">1500</p>
            </div>
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Projects</p>
              <p className="text-3xl font-bold text-white leading-tight">1500</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 p-4">
          <h2 className="text-2xl font-bold mb-4 mt-8">User Flow</h2>
            <div className="w-full h-full">
            <BarChart />
             
            </div>
          </div>

          <div className="flex flex-col items-center invisible justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 p-4">
            
          </div>

          <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top Clients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topClients.map(client => (
          <div key={client.id} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <img className="w-20 h-20 rounded-full object-cover" src={client.photo} alt={`${client.name}'s photo`} />
            <p className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{client.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{client.email}</p>
            <p className="mt-1 text-gray-800 dark:text-gray-100">Projects: {client.totalProjects}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">Top Developers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topDevelopers.map(developer => (
          <div key={developer.id} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <img className="w-20 h-20 rounded-full object-cover" src={developer.photo} alt={`${developer.name}'s photo`} />
            <p className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{developer.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{developer.email}</p>
            <p className="mt-1 text-gray-800 dark:text-gray-100">Projects: {developer.totalProjects}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

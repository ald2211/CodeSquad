import React, { useEffect, useState } from 'react';
import Sidebar from '../AdminSidebar';
import { getDashBoardData } from '../../api/service';
import AreaChart from '../AreaChart';
import { ThreeDots } from 'react-loader-spinner';
import { Failed } from '../../helper/popup';

const AdminHome = () => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await getDashBoardData();
        setData(res.data.dashboardData);
      } catch (err) {
        Failed(err?.message)
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-row min-h-screen mt-[80px]">
      <Sidebar />
      <div className="flex-1 p-4">
        {!loading?<div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Developers</p>
              <p className="text-3xl font-bold text-white leading-tight">{data?.usersCount?.[1]?.count || 0}</p>
            </div>
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Clients</p>
              <p className="text-3xl font-bold text-white leading-tight">{data?.usersCount?.[2]?.count || 0}</p>
            </div>
            <div className="card flex flex-col items-center justify-center h-24 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
              <p className="text-xl font-semibold text-white">Projects</p>
              <p className="text-3xl font-bold text-white leading-tight">{data?.projectsCount || 0}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 p-4">
            <h2 className="text-2xl font-bold mb-4 mt-8">Users Flow</h2>
            <div className="w-full h-full ">
              <AreaChart chartData={data?.chartData || []} />
            </div>
          </div>

          <div className="container mx-auto p-4 mt-[250px]">
            <h2 className="text-2xl font-bold mb-4 text-center">Top Clients</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.topClients&& data.topClients.map((client) => (
                <div key={client.clientId} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded shadow-md">
                  <img className="w-20 h-20 rounded-full object-cover" src={client.clientPhoto} alt={`${client.clientName}'s photo`} />
                  <p className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{client.clientName}</p>
                  <p className="text-gray-500 dark:text-gray-400">{client.clientEmail}</p>
                  <p className="mt-1 text-gray-800 dark:text-gray-100">Projects: {client.projectCount}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-center">Top Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.topDevelopers&&data.topDevelopers.map((developer) => (
                <div key={developer.developerId} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded shadow-md">
                  <img className="w-20 h-20 rounded-full object-cover" src={developer.developerPhoto} alt={`${developer.developerName}'s photo`} />
                  <p className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{developer.developerName}</p>
                  <p className="text-gray-500 dark:text-gray-400">{developer.developerEmail}</p>
                  <p className="mt-1 text-gray-800 dark:text-gray-100">Projects: {developer.projectCount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        :
        <div className="flex items-center justify-center min-h-screen">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#3333ff"
          ariaLabel="three-dots-loading"
        />
      </div> 
      }
      </div>
    </div>
  );
}

export default AdminHome;

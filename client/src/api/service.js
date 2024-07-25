import axiosInstance from "../../interceptors/axiosInterceptor";
import { Failed } from "../helper/popup";


export const userLogin = async (values) => {
    try {
        console.log('values:', values);
        const res = await axiosInstance.post('/auth/signin', values, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return { success: true, data: res.data };
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message) 
    }
};

export const OAuthLogin=async(user_details)=>{
  try{
     const res=await axiosInstance.post("/auth/OAuth", user_details, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res
  }catch(err){
    Failed(err.response ? err.response.data.message : err.message) 
  }
}

//fetch user info

export const fetchUser=async ()=>{
  try{
    const res = await axiosInstance.get('/user/user-info', {
      withCredentials:true
    });
    return res
  }catch(err){
    Failed(err.response ? err.response.data.message : err.message) 
  }
}
export const updateUser = async (userId, values) => {
    try {
        const res = await axiosInstance.patch(
            `/user/upload/${userId}`,
            values,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        return { success: true, data: res.data};
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message) 
    }
};

export const uploadImage=async (userId,imageUrl)=>{
    
    try {
        const res = await axiosInstance.patch(
          `/user/upload/${userId}`,
          { avatar: imageUrl },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log('res:',res)
        return res
      } catch (err) {
        console.log("serverImgErr:", err);
        Failed(err.response ? err.response.data.message : err.message) 
      }
}

export const uploadResume = async (userId, resumeUrl) => {
    try {
  
      const res = await axiosInstance.patch(`/user/upload/${userId}`, 
        {resume:resumeUrl}
      , {
        withCredentials: true
      });
  
      return res;
    } catch (err) {
      console.error('Error updating resume:', err);
      Failed(err.response ? err.response.data.message : err.message) 
    }
  };

  export const deleteEducation=async(id)=>{
    try {
        const res = await axiosInstance.delete(`/user/education/delete/${id}`, {
          withCredentials: true,
        });
        
        return res
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message) 
      }
  }

  export const editEducation=async(selectedEducationId,userId,values)=>{

    try {
     
         let res = await axiosInstance.patch(
          `/user/education/edit/${selectedEducationId}/${userId}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
      
    } catch (err) {
      console.log('err:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    
    }
  }

  export const addEducation=async (userId,values)=>{

    try{
      const res = await axiosInstance.post(
        `/user/education/add/${userId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const getEducation =async ()=>{

    try{
      const res=axiosInstance.get(`/user/education/get`,{
        withCredentials:true
      })
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  //experience

  export const deleteExperience=async(id)=>{
    try {
        const res = await axiosInstance.delete(`/user/experience/delete/${id}`, {
          withCredentials: true,
        });
        
        return res
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message) 
      }
  }

  export const editExperience=async(exp_id,userId,values)=>{

    try {
     
         let res = await axiosInstance.patch(
          `/user/experience/edit/${exp_id}/${userId}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
      
    } catch (err) {
      console.log('err:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    
    }
  }

  export const addExperience=async (userId,values)=>{

    try{
      const res = await axiosInstance.post(
        `/user/experience/add/${userId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const getExperience =async ()=>{

    try{
      const res=axiosInstance.get(`/user/experience/get`,{
        withCredentials:true
      })
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  //projects

  export const deleteProjects=async(id)=>{
    try {
        const res = await axiosInstance.delete(`/user/projects/delete/${id}`, {
          withCredentials: true,
        });
        
        return res
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message) 
      }
  }

  export const editProjects=async(proj_id,userId,values)=>{

    try {
     
         let res = await axiosInstance.patch(
          `/user/projects/edit/${proj_id}/${userId}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
      
    } catch (err) {
      console.log('err:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    
    }
  }

  export const addProjects=async (userId,values)=>{

    try{
      const res = await axiosInstance.post(
        `/user/projects/add/${userId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const getProjects =async ()=>{

    try{
      const res=axiosInstance.get(`/user/projects/get`,{
        withCredentials:true
      })
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  //skills
  
   export const uploadSkills=async(userId,skills)=>{

    try{
      const res = await axiosInstance.patch(
        `/user/upload/${userId}`,
        {skills:skills},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  //summary

  export const uploadSummary=async (userId,values)=>{
    try{
      const res = await axiosInstance.patch(
        `/user/upload/${userId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  //admin 

  export const getAllUsers=async(page,limit,search)=>{

    try{
      const res = await axiosInstance.get(`/admin/allUsers`, {
        params: {
          page,
          limit,
          search
        },
        withCredentials: true
      });
      
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
  

  export const updateUserState=async(userId,userState)=>{
    try{
      const res = await axiosInstance.patch(
        `/admin/updateStatus/${userId}`,
        {userState},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      console.log('updateStatusError:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const getAllWorksAdmin=async(page,limit,search)=>{

    try{
      const res = await axiosInstance.get(`/admin/allWorks`, {
        params: {
          page,
          limit,
          search
        },
        withCredentials: true
      });
      
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
  
  export const getAllCompletedWorksAdmin=async(page,limit,search)=>{

    try{
      const res = await axiosInstance.get(`/admin/completedWorks`, {
        params: {
          page,
          limit,
          search
        },
        withCredentials: true
      });
      
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
  
  export const updateWorkStatusAdmin=async(workNumber)=>{
    try{
      const res = await axiosInstance.patch(
        `/admin/updateProjectStatus/${workNumber}`,
        {
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      console.log('updateWorkStatusError:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }


  //work

  export const addWork=async(values)=>{

    try{
        const res = await axiosInstance.post(
          `/user/work/add`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
    }catch(err){
      console.log('addWorkerr:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const getClientsAllWorks = async (parameters) => {
    try {
      const res = await axiosInstance.get('/user/work/clientWorks', {
        params: parameters,
        withCredentials: true
      });
      return res;
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  export const updateClientWork=async(values,workId)=>{
    try{
      const res = await axiosInstance.patch(
        `/user/work/update/${workId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      Failed(err.response?err.response.data.message:err.message)
    }
  }

  export const deleteClientWork=async(id)=>{
    try {
        const res = await axiosInstance.delete(`/user/work/delete/${id}`, {
          withCredentials: true,
        });
        
        return res
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message) 
      }
  }

  export const getAllCommittedProjects=async(page,limit,search)=>{
    try {
      const res = await axiosInstance.get('/user/work/committedWorks', {
        params: {
          page,
          limit,
          search
        },
        withCredentials: true
      });
      return res;
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  }

  export const getAllCompletedProjects=async(page,limit,search)=>{
    try {
      const res = await axiosInstance.get('/user/work/completedWorks', {
        params: {
          page,
          limit,
          search
        },
        withCredentials: true
      });
      return res;
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  }
  //bookmark
  export const handlebookMark=async(workId)=>{

    try{
      const res= await axiosInstance.patch(`/user/work/bookmark/${workId}`,{
        withCredentials:true,
      })
      return res
    }catch(err){
      Failed(err.response?err.response.data.message:err.message)
    }
  }

  //bid related
  export const addBid=async(values)=>{

    try{
        const res = await axiosInstance.post(
          `/user/bid/place`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
    }catch(err){
      console.log('placeBidErr:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }

  export const removBid=async(workId)=>{

    try{
        const res = await axiosInstance.patch(
          `/user/bid/remove`,
          {workId},
          { 
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        return res
    }catch(err){
      console.log('placeBidErr:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
  
  export const getBidDetails = async (workNumber,page=1,pageSize=5) => {
    try {
      const res = await axiosInstance.get(`/user/bidDetails/${workNumber}`,
        {
          params: { page, pageSize },
        withCredentials: true
      });
      return res;
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  //accept developer bid
  export const AcceptBid=async(developer,workNumber,workType)=>{
    try{
      const res = await axiosInstance.patch(
        `/user/bid/accept`,
        {developer,workNumber},
        { 
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
  }catch(err){
    console.log('placeBidErr:',err)
    Failed(err.response ? err.response.data.message : err.message) 
  }
  }

  //get developer details
  export const getDeveloperDetails = async (developerId) => {
    try {
      const res = await axiosInstance.get(`/user/developer/${developerId}`,
        {
        withCredentials: true
      });
      return res;
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
    }
  };

  
  export const handleUpi=async(paymentId,upi)=>{
    try{
      const res = await axiosInstance.patch(
        `/payment/updateUpi`,
        {paymentId,upi},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res
    }catch(err){
      console.log('updateStatusError:',err)
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
  //logout
  export const userLogout =async ()=>{

    try{
      const res=await axiosInstance.get('/auth/signout')
      localStorage.removeItem('accessToken')
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
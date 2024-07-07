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


  //logout
  export const userLogout =async ()=>{

    try{
      const res=await axiosInstance.get('/auth/signout')
      return res
    }catch(err){
      Failed(err.response ? err.response.data.message : err.message) 
    }
  }
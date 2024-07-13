import workService from "../service/work.service.js"

export const createWork =async(req,res,next)=>{

     try{
        const data=await workService.addWork(req.user.id,req.body)
        return res.status(201).json({success:true,message:'project addedd Successfully',data})
     }
     catch(err){
        console.log(err)
        next(err)
     }
}

export const getClientAllWorks=async(req,res,next)=>{

   try{
      const data=await workService.getClientWorks(req.user.id)
      return res.status(200).json({success:true,message:' fetch success',data})
   }catch(err){
      console.log('err at clientwork fetch:',err)
      next(err)
   }
}

export const updateClientWork=async(req,res,next)=>{

   try{
      const data =await workService.updateWork(req.params.workId,req.body,req.user.id)
     
      return res.status(200).json({success:true,message:' project updated successfully',data})
   }catch(err){
      console.log('err at work update:',err)
   }
}

export const deleteClientWork=async(req,res,next)=>{

   try{
      const data=await workService.deleteClientWorkByWorkId( req.params.workId,req.user.id)
      console.log('dataWorkDelte:',data)
      return res.status(200).json({success:true,message:' project deleted successfully',data})
   }catch(err){
      console.log('error in work delete:',err)
      next(err)
   }
}
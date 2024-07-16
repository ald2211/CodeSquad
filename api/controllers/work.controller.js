import workService from "../service/work.service.js"

export const createWork =async(req,res,next)=>{

     try{
        const {data}=await workService.addWork(req.user.role,req.user.id,req.body)
        return res.status(201).json({success:true,message:'project addedd Successfully',data})
     }
     catch(err){
        console.log(err)
        next(err)
     }
}

export const getClientAllWorks=async(req,res,next)=>{

   try{
      const page = parseInt(req.query.page) || 1;  // Current page number, default to 1
      const limit = parseInt(req.query.limit)||10;  // Number of items per page
      const filterSearch=req.query.filterSearch||""
      const search= req.query.search || ""
      const {data,count}=await workService.getClientWorks(req.user.role,req.user.id,page,limit,search,filterSearch,req.query.miniNavFilter)
     
      return res.status(200).json({
         success:true,
         message:' fetch success',
          data,
      totalItems:count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      })
   }catch(err){
      console.log('err at clientwork fetch:',err)
      next(err)
   }
}

export const updateClientWork=async(req,res,next)=>{

   try{
      const {data} =await workService.updateWork(req.user.role,req.params.workId,req.body,req.user.id)
     
      return res.status(200).json({success:true,message:' project updated successfully',data})
   }catch(err){
      console.log('err at work update:',err)
   }
}

export const deleteClientWork=async(req,res,next)=>{

   try{
      const {data}=await workService.deleteClientWorkByWorkId( req.user.role,req.params.workId,req.user.id)
      console.log('dataWorkDelte:',data)
      return res.status(200).json({success:true,message:' project deleted successfully',data})
   }catch(err){
      console.log('error in work delete:',err)
      next(err)
   }
}

//bookmarks

export const handleBookMarks= async (req, res,next) => {
 
   try {
      console.log('req.user.id:',req.user.id,'req.params.id:',req.params.workId)
      const {status,message,data}=await workService.bookMarkHandler(req.user.role,req.user.id,req.params.workId)
      res.status(200).json({success:status,message,data})
    
   } catch (error) {
     console.log('errAtBookMark:',error)
     next(error)
   }
 };

 //place a bid

 export const placeAbid=async(req,res,next)=>{

   try{
      const {data}=await workService.placeBid(req.user.role,req.user.id,req.body)
      res.status(200).json({success:true,message:'bid placed SuccessFully',data})
    
   } catch (error) {
     console.log('errorAtPlaceAbid:',error)
     next(error)
   }
 }

 export const removeAbid=async(req,res,next)=>{

   try{
      const {data}=await workService.removeBid(req.user.role,req.user.id,req.body.workId)
      res.status(200).json({success:true,message:'bid withDrawed SuccessFully',data})
    
   } catch (error) {
     console.log('errorAtRemoveBid:',error)
     next(error)
   }
 }

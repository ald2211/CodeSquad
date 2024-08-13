import Notification from "../models/notification.model.js"

class notificationRepository{

    async createNotification(newNotification){
        const notification = new Notification(newNotification);
        return await notification.save();
    }

    async getNotifcationByUserId(userId){

        return await Notification.find({receiverId:userId})
    }

    async deleteNotificationById(id){

        return await Notification.deleteOne({_id:id})
    }

    async deleteAllNotificationByUserId(userId){
        
        return await Notification.deleteMany({receiverId:userId})
    }
}

export default new notificationRepository()


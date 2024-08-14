import notificationRepository from "../repository/notification.repository.js";

class notificationService {
  async getUserNotification(userId) {
    return await notificationRepository.getNotifcationByUserId(userId);
  }

  async deleteSpecificNotification(id) {
    return await notificationRepository.deleteNotificationById(id);
  }

  async deleteUsersAllNotification(userId) {
    await notificationRepository.deleteAllNotificationByUserId(userId);
  }
}

export default new notificationService();

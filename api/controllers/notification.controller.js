import notificationService from "../service/notification.service.js";

export const getNotification = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotification(
      req.user.id
    );

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};

export const deleteSingleNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.deleteSpecificNotification(
      req.params.id
    );

    res.status(200).json({ success: true, notification });
  } catch (err) {
    next(err);
  }
};

export const deleteAllNotification = async (req, res, next) => {
  try {
    await notificationService.deleteUsersAllNotification(req.user.id);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const pushNotificationController = require("../controllers/push-notifications.controller");

const express = require("express");
const router = express.Router();

router.post("/send-notification", pushNotificationController.sendNotification);
router.post("/send-notification-to-device", pushNotificationController.sendNotificationToDevice);

module.exports = router;
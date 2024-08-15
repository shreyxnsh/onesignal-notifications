const { ONE_SIGNAL_CONFIG } = require("../config/app.config");
const pushNotificationService = require("../services/push-notifications.service");

exports.sendNotification = async (req, res) => {
  const { title, message } = req.body;
  const data = {
    app_id: '9a5aa378-f162-4fd9-ab49-7924bdcfdd6d',
    contents: { en: message },
    headings: { en: title },
    included_segments: ["All"],
    small_icon: "ic_stat_onesignal_default",
  };
  pushNotificationService.sendNotification(data, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.status(200).send({ message: "Success", data: response });
    }
  });
};


exports.sendNotificationToDevice = async (req, res) => {
    const { title, message,  } = req.body;
    const data = {
      app_id: ONE_SIGNAL_CONFIG.APP_ID,
      contents: { en: message },
      headings: { en: title },
      included_segments: ["included_player_ids"],
      included_player_ids: req.body.devices,
      small_icon: "ic_stat_onesignal_default",
    };
    pushNotificationService.sendNotification(data, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.status(200).send({ message: "Success", data: response });
      }
    });
  };
  

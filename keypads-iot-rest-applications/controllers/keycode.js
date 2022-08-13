// Import our keyCode schema
const KeyCodeModel = require("../models/keycode");

module.exports = {
  //call back function to create our new key code
  createNewKeyCode: function (keyCode, active, description, callback) {
    KeyCodeModel.findOne({ keyCode: keyCode }, (err, record) => {
      // Key code is not in the database
      if (!record) {
        const newKeyCode = new KeyCodeModel({
          keyCode: keyCode,
          active: active,
          description: description,
        });
        newKeyCode.save(function (error, newKeyCode) {
          if (error) {
            callback({
              success: false,
              message: "Unable to create new key code!",
            });
          } else {
            console.log(newKeyCode);
            callback({
              success: true,
              message: "Successfully created new key code records",
            });
          }
        });
      } else {
        if (err) {
          callback({
            success: false,
            message: "Unexpected error when querying for new key code!",
          });
        }
        callback({
          success: false,
          message: `${keyCode} already exists in database`,
        });
      }
    });
  },

  // Get specific Key Code record
  getKeyCode: function (keyCode, callback) {
    KeyCodeModel.findOne({ keyCode: keyCode }, (err, record) => {
      if (err || !record) {
        callback({ success: false, message: "Unable find keycode record!" });
      } else {
        //console.log(record); -- show record on log
        callback({
          success: true,
          message: "Successfully retrieved keycode record",
          keyCode: record
        });
      }
    });
  },

  // Get all key codes records
  getAllKeyCodes: function (callback) {
    KeyCodeModel.find({}, (err, keyCodes) => {
      if (err) {
        callback({ success: false, message: "Unable find keycode records!" });
      } else {
        callback({
          success: true,
          message: "Successfully retrieved keycode records",
          keyCodes: keyCodes,
        });
      }
    });
  },

  //Update key code record
  updateKeyCodeRecord: function (keyCode, active, description, callback) {
    KeyCodeModel.findOne({ keyCode: keyCode }, (err, record) => {
      if (err || !record) {
        callback({
          success: false,
          message:
            "Unexpected error encountered or keycode record not found while updating keycode record!",
        });
      } else {
        record.active = active;
        record.description = description;

        record.save(function (error) {
          if (error) {
            callback({
              success: false,
              message: "Failed to update keycode record!",
            });
          } else {
            callback({
              success: true,
              message: "Successfully updated record!",
            });
          }
        });
      }
    });
  },

  //Delete key code record
  deleteKeyCodeRecord: function (keyCode, callback) {
    KeyCodeModel.findOne({ keyCode: keyCode }, (err, record) => {
      if (err || !record) {
        callback({
          success: false,
          message:
            "Unexpected error encountered or keycode record not found while deleting keycode!",
        });
      } else {
        record.remove(function (error) {
          if (error) {
            callback({
              success: false,
              message: "Failed to delete keycode record!",
            });
          } else {
            callback({
              success: true,
              message: "Successfully deleted keycode record!",
            });
          }
        });
      }
    });
  },
};

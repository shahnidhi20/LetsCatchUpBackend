const User = require("../models/authModel");
const Message = require("../models/messageModel");
const { Op } = require("sequelize");
module.exports.getFriends = async (req, res) => {
  const myId = req.myid;

  try {
    const friendGet = await User.findAll();
    const listofFriends = friendGet.map((friend) =>
      friend.get({ plain: true })
    );
    res.status(200).json({ success: true, friends: listofFriends });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        errmessage: "Internal server error",
      },
    });
  }
};

module.exports.messageUpload = async (req, res) => {
  // // Sever message {
  // [0]   senderId: '28',
  // [0]   sendername: 'nid',
  // [0]   receiverID: '30',
  // [0]   message: 'hi Amanda'
  // [0] }

  try {
    const messageSaved = await Message.create({
      senderid: req.body.senderId,
      sendername: req.body.sendername,
      recevierid: req.body.receiverID,
      message: req.body.message,
    });

    res.status(200).json({ success: true, message: messageSaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        errmessage: "Internal server error",
      },
    });
  }
};

module.exports.getMessage = async (req, res) => {
  //{ senderID: '28', receiverID: '30' }
  const myId = req.body.senderID;
  const fdId = req.body.receiverID;
  console.log(`myid: ${myId} fdid: ${fdId} `);
  try {
    let getAllMessages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ senderid: myId }, { recevierid: fdId }],
          },
          {
            [Op.and]: [{ senderid: fdId }, { recevierid: myId }],
          },
        ],
      },
    });
    // console.log("All the message", getAllMessages);
    // getAllMessages = getAllMessages.filter(
    //   (m) =>
    //     (m.senderid === myId && m.recevierid === fdId) ||
    //     (m.recevierid === myId && m.senderId === fdId)
    // );

    res.status(200).json({
      success: true,
      messages: { getAllMessages },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        errmessage: "Internal server error",
      },
    });
  }
};

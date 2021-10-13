const {
  RtcTokenBuilder,
  RtcRole
} = require("agora-access-token");

const appID = "3df1d4e0372c4892a380fe3399f49e2d";
const appCertificate = "aab866f5c4294f7ba59b581bf8823802";

class Agora {
  async gettoken(req, res) {
    const { channelName, uid } = req.query;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    // Build token with user uid
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    res.send({
      code: 0,
      data: token,
    });
  }
}

module.exports = new Agora();

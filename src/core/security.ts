import * as constants from "constants";
import * as crypto from "crypto";
import * as fs from "fs";

export default function security(credential, certPath) {
  const bufferToEncrypt = new Buffer(credential);

  const data = fs.readFileSync(certPath);
  const privateKey = String(data);

  const encrypted = crypto.publicEncrypt(
    {
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING
    },
    bufferToEncrypt
  );

  return encrypted.toString("base64");
}

// const rp = require("request-promise");
import { Buffer } from "buffer";
import * as rp from "request-promise";
import PesaLib from "../PesaLib";
import { OauthResponse } from "./response-classes";

export default function oAuth(pesaLib: PesaLib): Promise<OauthResponse> {
  const auth =
    "Basic " +
    new Buffer(pesaLib.consumerKey + ":" + pesaLib.consumerSecret).toString(
      "base64"
    );

  const options = {
    uri: `${pesaLib.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    headers: {
      Authorization: auth
    },
    json: true
  };

  return rp(options).then(
    response => new OauthResponse(response.access_token, response.expires_in)
  );
}

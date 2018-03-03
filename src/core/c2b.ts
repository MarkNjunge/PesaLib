import * as rp from "request-promise";
import PesaLib from "../PesaLib";
import oAuth from "./oauth";
import { C2bResponse } from "./response-classes";

const c2b = {
  register: function register(
    pesaLib: PesaLib,
    confirmationUrl: string,
    validationUrl: string
  ): Promise<C2bResponse> {
    return oAuth(pesaLib).then(response => {
      const options = {
        method: "POST",
        uri: `${pesaLib.baseUrl}/mpesa/c2b/v1/registerurl`,
        headers: {
          Authorization: "Bearer " + response.accessToken,
          "Content-Type": "application/json"
        },
        body: {
          ShortCode: pesaLib.shortCode,
          ResponseType: "Completed",
          ConfirmationURL: confirmationUrl,
          ValidationURL: validationUrl
        },
        json: true
      };

      return rp(options);
    });
  },
  simulate: function simulate(
    pesaLib: PesaLib,
    amount: number,
    phonerNumber: number,
    billRefNumber: string,
    commandId: string
  ): Promise<C2bResponse> {
    return oAuth(pesaLib).then(response => {
      const accessToken = response.accessToken;
      const token = accessToken;
      const options = {
        method: "POST",
        uri: `${pesaLib.baseUrl}/mpesa/c2b/v1/simulate`,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        },
        body: {
          ShortCode: pesaLib.shortCode,
          CommandID: commandId,
          Amount: amount,
          Msisdn: phonerNumber,
          BillRefNumber: billRefNumber
        },
        json: true
      };

      return rp(options);
    });
  }
};

export default c2b;

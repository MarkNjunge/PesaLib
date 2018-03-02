import * as moment from "moment";
import * as rp from "request-promise";
import PesaLib from "../PesaLib";
import oAuth from "./oauth";
import { LnmProcessResponse, LnmQueryResponse } from "./response-classes";

const lnm = {
  process: function process(
    pesaLib: PesaLib,
    amount: string,
    phoneNumber: string,
    callbackUrl: string,
    accountRef: string,
    transactionDesc: string
  ): Promise<LnmProcessResponse> {
    return oAuth(pesaLib).then(response => {
      const timestamp = moment().format("YYYYMMDDhhmmss");
      const accessToken = response.accessToken;
      const partyA = phoneNumber;
      const password = new Buffer(
        pesaLib.shortCode + pesaLib.passKey + timestamp
      ).toString("base64");

      const options = {
        method: "POST",
        uri: `${pesaLib.baseUrl}/mpesa/stkpush/v1/processrequest`,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        },
        body: {
          BusinessShortCode: pesaLib.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: partyA,
          PartyB: pesaLib.shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: callbackUrl,
          AccountReference: accountRef,
          TransactionDesc: transactionDesc
        },
        json: true
      };

      return rp(options);
    });
  },
  query: function query(
    pesaLib: PesaLib,
    checkoutRequestId
  ): Promise<LnmQueryResponse> {
    return oAuth(pesaLib).then(response => {
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const accessToken = response.accessToken;
      const password = new Buffer(
        pesaLib.shortCode + pesaLib.passKey + timestamp
      ).toString("base64");

      const options = {
        method: "POST",
        uri: `${pesaLib.baseUrl}/mpesa/stkpushquery/v1/query`,
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        },
        body: {
          BusinessShortCode: pesaLib.shortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId
        },
        json: true
      };

      return rp(options);
    });
  }
};

export default lnm;

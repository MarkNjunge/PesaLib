import * as moment from "moment";
import * as rp from "request-promise";
import PesaLib from "../PesaLib";
import oAuth from "./oauth";
import { BalanceResponse } from "./response-classes";

export default function balance(
  pesaLib: PesaLib,
  initiator: string,
  securityCredential: string,
  commandId: string,
  partyA: string,
  idType: string,
  remarks: string,
  queueTimeoutUrl: string,
  resultUrl: string
): Promise<BalanceResponse> {
  return oAuth(pesaLib).then(response => {
    const accessToken = response.accessToken;

    const options = {
      method: "POST",
      uri: `${pesaLib.baseUrl}/mpesa/accountbalance/v1/query`,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: {
        Initiator: initiator,
        SecurityCredential: securityCredential,
        CommandID: commandId,
        PartyA: partyA,
        IdentifierType: idType,
        Remarks: remarks,
        QueueTimeOutURL: queueTimeoutUrl,
        ResultURL: resultUrl
      },
      json: true
    };

    return rp(options);
  });
}

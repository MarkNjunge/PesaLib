import * as rp from "request-promise";
import PesaLib from "../PesaLib";
import oAuth from "./oauth";
import { GeneralResponse } from "./response-classes";

export default function tranactionStatus(
  pesaLib: PesaLib,
  commandId: string,
  partyA: string,
  identifierType: string,
  remarks: string,
  initiator: string,
  securityCredential: string,
  queueTimeoutUrl: string,
  resultUrl: string,
  transactionId: string,
  occassion?: string
): Promise<GeneralResponse> {
  return oAuth(pesaLib).then(response => {
    const accessToken = response.accessToken;

    const options = {
      method: "POST",
      uri: `${pesaLib.baseUrl}/mpesa/transactionstatus/v1/query`,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: {
        CommandID: commandId,
        PartyA: partyA,
        IdentifierType: identifierType,
        Remarks: remarks,
        Initiator: initiator,
        SecurityCredential: securityCredential,
        QueueTimeOutURL: queueTimeoutUrl,
        ResultURL: resultUrl,
        TransactionID: transactionId,
        Occassion: occassion
      },
      json: true
    };

    return rp(options);
  });
}

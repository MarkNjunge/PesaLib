import * as core from "./core";

export default class PesaLib {
  public consumerKey: string;
  public consumerSecret: string;
  public shortCode: string;
  public passKey: string;
  public production: boolean;
  public baseUrl: string;

  /**
   *
   * @param consumerKey Obtained from the developer portal
   * @param consumerSecret Obtained from the developer portal
   * @param shortCode Obtained from the developer portal
   * @param passKey Obtained from the developer portal
   * @param production Used for sandbox vs live. Defaults to false.
   *
   * @see https://developer.safaricom.co.ke
   */
  constructor(
    consumerKey: string,
    consumerSecret: string,
    shortCode: string,
    passKey: string,
    production: boolean = false
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.shortCode = shortCode;
    this.passKey = passKey;
    this.production = production;
    if (production) {
      this.baseUrl = "https://api.safaricom.co.ke";
    } else {
      this.baseUrl = "https://sandbox.safaricom.co.ke";
    }
  }

  /**
   * Returns an OAuth token from the Mpesa API
   */
  public oAuth(): Promise<core.responses.OauthResponse> {
    return core.oAuth(this);
  }

  /**
   * Create a Lipa Na M-Pesa request.
   *
   * @param amount The amount to be paid.
   * @param phoneNumber The phone number of the customer. Should start with 254.
   * @param callbackUrl Callback url to handle the payment response.
   * @param accountRef A reference for the payment.
   * @param transactionDesc Description of the payment.
   */
  public lnmProcess(
    amount: string,
    phoneNumber: string,
    callbackUrl: string,
    accountRef: string,
    transactionDesc: string
  ): Promise<core.responses.LnmProcessResponse> {
    return core.lnm.process(
      this,
      amount,
      phoneNumber,
      callbackUrl,
      accountRef,
      transactionDesc
    );
  }

  /**
   * Check the status of a Lipa Na M-Pesa request.
   *
   * @param checkoutRequestId Id received from a Lipa na M-Pesa request.
   */
  public lnmQuery(checkoutRequestId): Promise<core.responses.LnmQueryResponse> {
    return core.lnm.query(this, checkoutRequestId);
  }

  /**
   * Register validation and confirmation URLs.
   *
   * @param confirmationUrl See documentation
   * @param validationUrl See documentation
   */
  public c2bRegister(
    confirmationUrl: string,
    validationUrl: string
  ): Promise<core.responses.C2bResponse> {
    return core.c2b.register(this, confirmationUrl, validationUrl);
  }

  /**
   * Simulate a C2B transaction.
   *
   * @param amount Amount to be paid.
   * @param phoneNumber The phone number of the customer. Should start with 254.
   * @param billRef Bill referernce number.
   * @param commandId CustomerPayBillOnline or CustomerBuyGoodsOnline.
   */
  public c2bSimulate(
    amount: number,
    phoneNumber: number,
    billRef: string,
    commandId: string
  ): Promise<core.responses.C2bResponse> {
    return core.c2b.simulate(this, amount, phoneNumber, billRef, commandId);
  }

  /**
   * Encrypt data using a certificate file.
   *
   * @param credential Data to be encrypted. For sandbox use shorcode 1, for produciton use initiator password.
   * @param certData Path to the certificate file.
   *
   * @returns {string} Base64 encoded string
   */
  public security(credential, certPath): string {
    return core.security(credential, certPath);
  }

  /**
   * Enquire MPesa balance.
   *
   * @param securityCredential Encrypted Credential of user.
   * @param initiator The name of Initiator to initiating  the request.
   * @param partyA Organization receiving the transaction.
   * @param idType Type of organization receiving the transaction.
   * 1 – MSISDN, 2 – Till Number, 4 – Organization short code
   * @param remarks Comments that are sent along with the transaction.
   * @param queueTimeoutUrl The path that stores information of time out transaction
   * @param resultUrl	The path that stores information of transaction.
   *
   * @see PesaLib.security()
   */
  public balance(
    securityCredential,
    initiator,
    partyA,
    idType,
    remarks,
    queueTimeoutUrl,
    resultUrl
  ): Promise<core.responses.GeneralResponse> {
    return core.balance(
      this,
      initiator,
      securityCredential,
      "AccountBalance",
      partyA,
      idType,
      remarks,
      queueTimeoutUrl,
      resultUrl
    );
  }

  /**
   * Use this api to check the transaction status.
   *
   * @param identifierType Type of organization receiving the transaction
   * 1 – MSISDN
   * 2 – Till Number
   * 4 – Organization short code
   * @param remarks Comments that are sent along with the transaction. Up to 100 chars.
   * @param initiator This is the credential/username used to authenticate the transaction request.
   * @param securityCredential Encrypted password for the initiator to authenticate the transaction request
   * @param queueTimeoutUrl The path that stores information of time out transaction.
   * @param resultUrl The path that stores information of transaction.
   * @param transactionId M-Pesa reference number (LKXXXX1234).
   * @param occassion Optional. Up to 100 chars.
   *
   * @see PesaLib.security()
   */
  public transactionStatus(
    identifierType: number,
    remarks: string,
    initiator: string,
    securityCredential: string,
    queueTimeoutUrl: string,
    resultUrl: string,
    transactionId: string,
    occassion?: string
  ): Promise<core.responses.GeneralResponse> {
    return core.tranactionStatus(
      this,
      "TransactionStatusQuery",
      this.shortCode,
      identifierType.toString(),
      remarks,
      initiator,
      securityCredential,
      queueTimeoutUrl,
      resultUrl,
      transactionId,
      occassion
    );
  }
}

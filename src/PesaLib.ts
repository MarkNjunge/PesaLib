import * as core from "./core";

export default class PesaLib {
  public consumerKey: string;
  public consumerSecret: string;
  public shortCode: string;
  public passKey: string;
  public baseUrl: string;

  /**
   *
   * @param consumerKey Obtained from the developer portal
   * @param consumerSecret Obtained from the developer portal
   * @param shortCode Obtained from the developer portal
   * @param passKey Obtained from the developer portal
   * @param baseUrl Used for sandbox vs live. Defaults to sandbox. For live, pass https://api.safaricom.co.ke
   *
   * @see https://developer.safaricom.co.ke
   */
  constructor(
    consumerKey: string,
    consumerSecret: string,
    shortCode: string,
    passKey: string,
    baseUrl: string = "https://sandbox.safaricom.co.ke"
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.shortCode = shortCode;
    this.passKey = passKey;
    this.baseUrl = baseUrl;
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
}

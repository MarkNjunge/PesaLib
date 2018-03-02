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

  public oAuth(): Promise<core.responses.OauthResponse> {
    return core.oAuth(this);
  }

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

  public lnmQuery(checkoutRequestId): Promise<core.responses.LnmQueryResponse> {
    return core.lnm.query(this, checkoutRequestId);
  }
}

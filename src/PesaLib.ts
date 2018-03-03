import { c2b, lnm, oAuth, responses } from "./core";

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

  public oAuth(): Promise<responses.OauthResponse> {
    return oAuth(this);
  }

  public lnmProcess(
    amount: string,
    phoneNumber: string,
    callbackUrl: string,
    accountRef: string,
    transactionDesc: string
  ): Promise<responses.LnmProcessResponse> {
    return lnm.process(
      this,
      amount,
      phoneNumber,
      callbackUrl,
      accountRef,
      transactionDesc
    );
  }

  public lnmQuery(checkoutRequestId): Promise<responses.LnmQueryResponse> {
    return lnm.query(this, checkoutRequestId);
  }

  public c2bRegister(
    confirmationUrl: string,
    validationUrl: string
  ): Promise<responses.C2bResponse> {
    return c2b.register(this, confirmationUrl, validationUrl);
  }

  public c2bSimulate(
    amount: number,
    phoneNumber: number,
    billRef: string,
    commandId: string
  ): Promise<responses.C2bResponse> {
    return c2b.simulate(this, amount, phoneNumber, billRef, commandId);
  }
}

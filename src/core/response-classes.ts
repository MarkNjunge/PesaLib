/* tslint:disable:variable-name */
export class OauthResponse {
  public accessToken: string;
  public expiresIn: string;

  constructor(accessToken: string, expiresIn: string) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}

export class LnmProcessResponse {
  public MerchantRequestID: string;
  public CheckoutRequestID: string;
  public ResponseCode: string;
  public ResponseDescription: string;
  public CustomerMessage: string;
}

export class LnmQueryResponse {
  public ResponseCode: string;
  public ResponseDescription: string;
  public MerchantRequestID: string;
  public CheckoutRequestID: string;
  public ResultCode: string;
  public ResultDesc: string;
}

export class ApiError {
  public requestId: string;
  public errorCode: string;
  public errorMessage: string;

  constructor(errorText: string) {
    const error = JSON.parse(errorText.substr(5));
    this.requestId = error.requestId;
    this.errorCode = error.errorCode;
    this.errorMessage = error.errorMessage;
  }
}

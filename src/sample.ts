// tslint:disable:no-console
import { consumerKey, consumerSecret } from "./config";
import { ApiError } from "./core/response-classes";
import PesaLib from "./PesaLib";

const pesa = new PesaLib(
  consumerKey,
  consumerSecret,
  "174379",
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
);

function oAuth() {
  pesa
    .oAuth()
    .then(value => console.log(value.accessToken))
    .catch(error => console.log(JSON.stringify(error)));
}

function lnmo() {
  pesa
    .lnmProcess(
      "1",
      "254724721377",
      "https://us-central1-mpesahandler.cloudfunctions.net/callback_url",
      "Test",
      "test"
    )
    .then(value => console.log(value))
    .catch(error => {
      const err = new ApiError(error.message);
      console.log(err.errorMessage);
    });
}

function lnmo2() {
  pesa
    .lnmQuery("ws_CO_02032018014643109")
    .then(value => console.log(value.ResultDesc))
    .catch(error => {
      console.log(error.message);
      const err = new ApiError(error.message);
      console.log(err.errorMessage);
    });
}

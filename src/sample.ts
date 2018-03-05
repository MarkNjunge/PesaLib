// tslint:disable:no-console
import * as fs from "fs";
import * as path from "path";
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

function lnmoProcess() {
  pesa
    .lnmProcess(
      "1",
      "254721234567",
      "https://mpesa-handler/callback_url",
      "Test",
      "test"
    )
    .then(value => console.log(value))
    .catch(error => {
      const err = new ApiError(error.message);
      console.log(err.errorMessage);
    });
}

function lnmoQuery() {
  pesa
    .lnmQuery("ws_CO_02032018014643109")
    .then(value => console.log(value.ResultDesc))
    .catch(error => {
      console.log(error.message);
      const err = new ApiError(error.message);
      console.log(err.errorMessage);
    });
}

function c2bRegister() {
  pesa
    .c2bRegister("http://266522a4.ngrok.io", "http://266522a4.ngrok.io")
    .then(response => console.log(response))
    .catch(error => console.log(error.message));
}

function c2bSimulate() {
  pesa
    .c2bSimulate(1, 254721234567, "Test billing", "CustomerBuyGoodsOnline")
    .then(response => console.log(response))
    .catch(error => console.log(error.message));
}

function security() {
  const cred = pesa.security("460reset", "./src/sandbox-cert.cer");
  console.log(cred);
}

function balance() {
  const cred = pesa.security("460reset", "./src/sandbox-cert.cer");
  pesa
    .balance(
      cred,
      "apitest460",
      "601460",
      "4",
      "Remarks",
      "https://151d6ca3.ngrok.io/post",
      "https://151d6ca3.ngrok.io/post"
    )
    .then(response => console.log(response))
    .catch(error => console.log(error.message));
}

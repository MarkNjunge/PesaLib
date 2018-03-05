# Pesa Lib

[![NPM](https://nodei.co/npm/pesa-lib.png)](https://npmjs.org/package/pesa-lib)

An Node.js package for [Mpesa](https://www.safaricom.co.ke/personal/m-pesa).

Before using this package, create an account on the [Safaricom Developer Portal](https://developer.safaricom.co.ke/) to receive a Consumer Key and Consumer Secret.  
Business short code and pass key can be found at the [Test credentials](https://developer.safaricom.co.ke/test_credentials) page.

## Features

* [x] Generate OAuth access token
* [x] Lipa Na Mpesa online
* [x] C2B
* [ ] Reversal
* [ ] Transaction status
* [ ] B2B
* [ ] B2C

## Installation

`yarn add pesa-lib`

## Usage

* All methods return a promise.
* See [Sample.ts](./src/sample.ts)

### Initialization

```Typescript
// For Javascript use
// const PesaLib = require("pesa-lib").default;
import PesaLib from "pesa-lib";

const pesalib = new PesaLib(
  consumerKey,
  consumerSecret,
  businessShortCode,
  passKey,
  baseUrl // Optional. Used to switch from sandbox to production.
);
```

### [OAuth access token](https://developer.safaricom.co.ke/oauth/apis/get/generate-1)

Use this API to generate an OAuth access token to access other APIs.  
Other methods with use do this automatically so it's not needed.

```Typescript
pesaLib.oAuth()
```

### [Lipa na Mpesa Online - Process request](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest)

Use this API to initiate online payment on behalf of a customer.  
Phone number should begin with 254.

```Typescript
pesalib.lnmProcess(amount, phoneNumber,callbackUrl, accountRef, transactionDesc)
```

### [Lipa na Mpesa Online - Query request](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpushquery/v1/query)

Use this API to check the status of a Lipa Na M-Pesa Online Payment.

```Typescript
pesalib.lnmQuery(checkoutRequestId)
```

### [C2B - Register Url](https://developer.safaricom.co.ke/c2b/apis/post/registerurl)

Use this API to register validation and confirmation URLs on M-Pesa

```Typescript
pesalib.c2bRegister(confirmationUrl, validationUrl)
```

### [C2B - Simulate Transaction](https://developer.safaricom.co.ke/c2b/apis/post/simulate)

Use this API to simulate a C2B transaction

```Typescript
pesalib.c2bSimulate(amount, phoneNumber, billingRef, commandId)
```

### [Security Credentials](https://developer.safaricom.co.ke/docs#security-credentials)

Encrypt credentials using a certificate file.

```Typescript
pesalib.security(credential, pathToCert)
```

# Disclaimer

This is an unofficial package, not made by Safaricom.

# Notice

I will no longer be maintaining this library. I suggest using [mpesa-node](https://github.com/safaricom/mpesa-node-library) instead.

# Pesa Lib

[![NPM](https://nodei.co/npm/pesa-lib.png)](https://npmjs.org/package/pesa-lib)

An Node.js package for [Mpesa](https://www.safaricom.co.ke/personal/m-pesa).

Before using this package, create an account on the [Safaricom Developer Portal](https://developer.safaricom.co.ke/) to receive a Consumer Key and Consumer Secret.  
Business short code and pass key can be found at the [Test credentials](https://developer.safaricom.co.ke/test_credentials) page.

## Features

- [x] [Generate OAuth access token](#oauth)
- [x] [Lipa Na Mpesa online](#lnmo)
- [x] [C2B](#c2b)
- [x] [Balance](#balance)
- [x] [Transaction status](#transaction)
- [ ] Reversal
- [ ] B2B
- [ ] B2C

## Installation

`yarn add pesa-lib`

## Usage

- All methods return a promise.
- See [Sample.ts](./src/sample.ts)
- See the [wiki](https://github.com/MarkNjunge/PesaLib/wiki) for more documentation.

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
  false // Use 'true' to change to live url.
);
```

### [OAuth access token](https://developer.safaricom.co.ke/oauth/apis/get/generate-1)<a name="oauth"></a>

Use this API to generate an OAuth access token to access other APIs.  
Other methods with use do this automatically so it's not needed.

```Typescript
pesaLib.oAuth()
```

### [Lipa na Mpesa Online - Process request](https://developer.safaricom.co.ke/lipa-na-m-pesa-online/apis/post/stkpush/v1/processrequest)<a name="lnmo"></a>

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

### [C2B - Register Url](https://developer.safaricom.co.ke/c2b/apis/post/registerurl)<a name="c2b"></a>

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

### [Account Balance](https://developer.safaricom.co.ke/account-balance/apis/post/query)<a name="balance"></a>

Enquire the balance on an M-Pesa

```Typescript
pesalib.balance(securityCredential, initiator, partyA, idType, remarks, queueTimeoutUrl, resultUrl)
```

### [Transaction Status](https://developer.safaricom.co.ke/transaction-status/apis/post/query)<a name="transaction"></a>

Use this api to check the transaction status.

```Typescript
pesa.transactionStatus(identifierType, remarks, initiator, securityCredential, queueTimeoutUrl, resultTimeoutUrl, transactionId, occassion)
```

# Disclaimer

This is an unofficial package, not made by Safaricom.

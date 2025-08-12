# 🔐 Kunci SSO Integration Guide

---

## 📄 Overview

This document describes how to integrate with the **Kunci SSO** system using a custom flow. This flow includes:

1. Initiating a session with the Kunci SSO server.  
2. Requesting a token, which redirects to your app with a code.  
3. Handling the callback and using the code to bind or authenticate the user.

---

## 📋 Flow Summary

```
[1] GET /sso/authorize    → Creates a session  
[2] GET /sso/token        → Redirects with `?code=...`  
[3] App receives callback → Extracts and processes the `code`
```

---

## 🔧 Step-by-Step Instructions

---

### ✅ Step 1: Initiate SSO Session

**Endpoint:**

```
GET https://be.kunci.co.id/sso/authorize
```

**Query Parameters:**

| Parameter               | Description                                                |
|-------------------------|------------------------------------------------------------|
| `client_id`             | Your registered client ID                                  |
| `code_challenge`        | Base64URL-encoded SHA256 hash of the `code_verifier`       |
| `code_challenge_method` | Must be set to `S256 or plain`                             |
| `redirect_uri`          | Your app's callback URL                                    |
| `response_type`         | Must be set to `code`                                      |

**Example URL:**

```
https://be.kunci.co.id/sso/authorize?
  client_id=XRkpyvumjuxgZ15YNqd2vXEzmPWP7yMZ&
  code_challenge=NzdhOWMyMTVhY2JkOTFiOWI4ZjM0NjQwZTRmYzNhYjk2MjhhOTYwZjk3NjA1OWI4ZmM0MGI0M2Q0ZTMyODNjYw==&
  code_challenge_method=S256&
  redirect_uri=https://develope.jatidiri.app/api/auth/kunci/callback&
  response_type=code
```

> This step only creates a session on the SSO server. It does **not** redirect or return any token/code.

---

### ✅ Step 2: Request Token & Trigger Redirect

**Endpoint:**

```
GET https://be.kunci.co.id/sso/token
```

**Query Parameters:**

| Parameter        | Description                                |
|------------------|--------------------------------------------|
| `client_id`      | Same `client_id` used in Step 1            |
| `client_secret`  | Your app's client secret                   |
| `redirect_uri`   | Must match the one used in Step 1          |
| `code_verifier`  | The plain string that matches the challenge|

**Example URL:**

```
https://be.kunci.co.id/sso/token?
  client_id=XRkpyvumjuxgZ15YNqd2vXEzmPWP7yMZ&
  client_secret=qiBO67eM9GaTNNER7ZqaVkHvs4OGXP0G4MoppsWoUfXCfvyqejFRaDTp7PgigQ2U&
  redirect_uri=https://develope.jatidiri.app/api/auth/kunci/callback&
  code_verifier=kunci
```

> If the session is valid, the server will redirect to:

```
https://develope.jatidiri.app/api/auth/kunci/callback?code=<auth_code>
```

---

### ✅ Step 3: Handle the Callback

When redirected to your callback endpoint, extract the `code` parameter from the query string.

**Example:**

```
GET /api/auth/kunci/callback?code=khzhiof2roOfXO3T7I9WavBexXhQU9VZVgFX2RiOohsIJYxa6RDKP7zZQRlTvDLT
```

---

### ✅ Step 4: Bind User Account

After receiving the authorization code, you can bind the user's account to your system using the bind endpoint.

**Endpoint:**

```
POST https://be.kunci.co.id/sso/bind
```

**Request Body:**

| Parameter     | Description                                    |
|---------------|------------------------------------------------|
| `school_id`   | Unique identifier for the school               |
| `identifier`  | User's unique identifier (e.g., student ID)    |
| `secret`      | Authentication credential:                     |
|               | - For `type: "student"` or `"employee"`: PIN   |
|               | - For `type: "orang_tua"`: Password            |
| `type`        | User type (e.g.,"student","employee","parent") |
| `token`       | Authorization token received from callback     |

**Example Request:**

```json
{
    "school_id": "01j523trdnjsgcwt3c42swhq4t",
    "identifier": "2425011",
    "secret": "123",
    "type": "student",
    "token": "ZQ24VE0HOQYa0vAzBZXzHO8jbzBFOACHp75X7R0DulbQ7VbDbeoiK8QpKtKYV35T"
}
```

**Response:**

The endpoint will return a success response if the binding is successful, or an error response if there are any issues with the provided data.

---

### ✅ Step 5: Unbind User Account

To remove the binding between a user's account and your system, use the unbind endpoint.

**Endpoint:**

```
POST https://be.kunci.co.id/sso/unbind
```

**Request Body:**

| Parameter  | Description                                    |
|------------|------------------------------------------------|
| `school_id`| Unique identifier for the school               |
| `bind_id`  | Unique identifier of the binding to remove     |
| `token`    | Authorization token received from callback     |

**Example Request:**

```json
{
    "school_id": "01j523trdnjsgcwt3c42swhq4t",
    "bind_id": "01jtk1psx6zbzht057xvspr2r6",
    "token": "SsgfIjgqThf8qKYR3ziloJzZHFmex0Jx5JuKRRN0WqV1mJ5f3mt4GG41kCS753M7"
}
```

**Response:**

The endpoint will return a success response if the unbinding is successful, or an error response if there are any issues with the provided data.

---

## 🏫 Guest API Endpoints

### Schools Listing

Retrieve a list of available schools with optional filtering and pagination.

**Endpoint:**

```
GET https://be.kunci.co.id/api/v1/guest/schools
```

**Query Parameters:**

| Parameter    | Description                                    |
|--------------|------------------------------------------------|
| `page`       | Page number for pagination (optional)          |
| `search`     | Search term to filter schools (optional)       |
| `with_demo`  | Include demo schools in results (optional).    |
|              | ⚠️ Should not be used in production environment|

**Example Request:**

```
GET https://be.kunci.co.id/api/v1/guest/schools?page=1&search=demo&with_demo=true
```

> **Note:** In production environment, omit the `with_demo` parameter to ensure only real schools are returned in the results.

**Response:**

The endpoint returns a paginated list of schools matching the search criteria. Each school object includes details such as:
- School ID
- School name
- School type
- Location
- Other relevant information

---

## 🔒 Security Considerations

- Always use HTTPS to avoid leaking sensitive data.  
- Store `client_secret` securely (never expose it to the frontend).  
- Ensure `code_challenge` and `code_verifier` match exactly.  
- Validate the `code` before trusting the response.

---

## 🛠 Troubleshooting

| Issue                      | Possible Cause                                        |
|----------------------------|-------------------------------------------------------|
| No redirection after Step 1 | Session may not be created (cookies or headers lost) |
| Invalid redirect URL        | `redirect_uri` does not match registered one         |
| `code` is missing           | Token not granted or session expired                  |

---

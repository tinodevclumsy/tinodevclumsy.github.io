---
title: Creating a React Web App using the Spotify API - Obtaining Token (2)
description: 'This text aims to implement login using OAuth, but since there are no plans to implement the backend, PCKE is used to create OAuth login.'
pubDate: 'Feb 13 2024'
image: "/images/blog/react.png"
---

<!-- [Check out the first post](https://velog.io/@tinodev/Spotify-API-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9B%B9%EC%95%B1-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0-%ED%86%A0%ED%81%B0-%EB%B0%9C%EA%B8%89-1) -->

This text aims to implement login using OAuth, but since there are no plans to implement the backend, PCKE is used to create OAuth login. (Actually, it's my first time using PCKE).

In summary, there are additional parts added for enhanced security, giving it a feeling of extension from the original OAuth 2.0.

- Code Verifier: A randomly generated string of 43 to 128 characters.
- Code Challenge: The generated Code Verifier is encoded using a hash algorithm (SHA-256).
- When making requests, the Code Challenge is included for enhanced security.

#### PCKE

[Spotify PCKE code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)

### 1. Creating utility functions for implementing PCKE.

```js
// utils/auth
export const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

export const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
```

### 2. Creating a login page

```js
// page/Login.js
// url : /login
import React, { useEffect } from "react";
import { sha256, base64encode, generateRandomString } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const codeVerifier = generateRandomString(64);
  // Storing the code verifier for subsequent token requests.
  window.localStorage.setItem("code_verifier", codeVerifier);

  const clientId = "YOUR-CLIENT-ID";
  // URL to redirect after setting permissions.
  // It should be saved in the Spotify dashboard.
  const redirectUri = "http://localhost:3000/callback";

  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const requestAuth = async () => {
    try {
      // Encode after hashing
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Redirect if token doesn't exist.
    const token = localStorage.getItem("access_token");
    if (!token) {
      requestAuth();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <p>Authorizing...</p>
    </div>
  );
};

export default Login;
```

### 3. Creating a page to redirect

```js
// page/Redirect.js
// url: /callback

import React, { useEffect } from "react";
import { generateToken } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Access code after successful login.
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    // Checking for the presence of a token.
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Utilizing the previously created generateToken request function.
      generateToken(code).then((res) => {
        if (res) navigate("/");
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default Redirect;
```

### 4. Modify generateToken function

```js
import api from "./auth";

export const generateToken = (code) => {
  return new Promise((resolve, reject) => {
    api
      .post("/token", {
        grant_type: "authorization_code",
        client_id: "YOUR-CLIENT-ID",
        code_verifier: localStorage.getItem("code_verifier"),
        // When requesting the initial access code, it must match the redirect_uri.
        // For verification purposes, no actual redirection takes place.
        redirect_uri: "http://localhost:3000/callback",
        code,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          resolve(true);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
```

Now that we've implemented the login, it's time to use the API to fetch real information. Stay tuned for the next article!

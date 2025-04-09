---
title: Creating a React Web App using the Spotify API - Obtaining Token (1)
description: 'How about trying to create a simple web app using the Spotify API as a toy project?'
pubDate: 'Jan 01 2024'
image: "/images/blog/react.png"
categories: ["React", "Project"]
---

How about trying to create a simple web app using the Spotify API as a toy project? (For now, it's free)

## Creating a Spotify App

First, go to the Spotify developer website and create a Spotify app. (I don't think there are any difficult parts to this.) After creating the app, if you click on the Settings button on the app details page, you can see the Client ID and Client Secret values. In this post, we'll use these two values to obtain a token.

[Spotify Developer Website](https://developer.spotify.com/documentation/web-api)

## Creating a React project and connecting it to the Spotify API

> npx create-react-app app-name

> yarn add axios

- Create a React project and install axios.
- Since the base URL for token creation is different from the base URL for other Spotify API requests, I created a separate instance.

```js
// src/api/auth.js
import axios from "axios";

export default axios.create({
  baseURL: `https://accounts.spotify.com/api`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
```

```js
// src/api/AuthAPI.js
import api from "./auth";

export const generateToken = () => {
  return api
    .post("/token", {
      grant_type: "client_credentials",
      client_id: "YOUR-CLIENT-ID",
      client_secret: "YOUR-CLIENT-SECRET",
    })
    .then((res) => {
      if (res.status === 200) {
        // If the response is successful, you can save the access_token to localStorage for now.
        localStorage.setItem("token", res.data.access_token);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
```

In App.js, I tried sending a request when it's mounted to see if it works properly.

```js
// App.js
import "./App.css";
import { useEffect } from "react";
import { generateToken } from "./api/AuthAPI";

function App() {
  useEffect(() => {
    // If there's no access_token in localStorage, a request is sent.
    if (!localStorage.getItem("access_token")) {
      generateToken();
    }
  }, []);

  return <div className="App"></div>;
}

export default App;
```

<!-- ![TINO-Seungjun Lee - api response](./image-1.png) -->

Next post is about implementing login to receive the token and utilize the API. If you need any further assistance or have any questions along the way, feel free to ask!

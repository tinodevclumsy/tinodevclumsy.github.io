---
title: Creating a React web app using the Spotify API - Token Renewal (3)
description: 'I successfully implemented login with OAuth and issued tokens.'
pubDate: 'Feb 21 2024'
image: "/images/blog/react.png"
---

<!-- ![TINO-Seungjun Lee - api response](./image.png) -->

I successfully implemented login with OAuth and issued tokens. The problem is that the token has a lifespan of 1 hour. I want to implement token refreshing when it expires.

### 1. Connect to the Spotify API & Check if the Token Has Expired

Since Spotify doesn't seem to have an API that directly informs about token expiration, I plan to use an API to retrieve user profile information from the homepage to verify it.

```js
import axios from "axios";

export default axios.create({
  // Using a different URL, create a new instance to differentiate it from 'auth'.
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});
```

```js
import api from "./index";

// Create a request function to retrieve user profile information.
export const getProfile = (code) => {
  return new Promise((resolve, reject) => {
    api
      .get("/me")
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
```

Now, when you send the request, if the response status code is 401 as shown in the initial image, you need to refresh the token.

#### Modify API Request for Token Refresh

As seen in the previous post, there is a function called generateToken to initially receive the token. In the response, along with the access_token, there is also a refresh_token, which should also be stored in localStorage.

> localStorage.setItem("refresh_token", res.data.refresh_token);

```js
export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    api
      .post("/token", {
        // Change grant_type
        grant_type: "refresh_token",
        client_id: "YOUR-CLIENT-ID",
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then((res) => {
        // Implement the same process in the generateToken request function as well.
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
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

#### Add it to the component

```js
const [user, setUser] = useState();

useEffect(() => {
  if (localStorage.getItem("access_token")) {
    getProfile()
      .then((res) => {
        setUser(res);
      })
      .catch((e) => {
        // if status is 401, refresh the token
        if (e.response.status === 401) {
          handleToken();
        }
      });
  }
}, []);

const handleToken = () => {
  refreshToken().then((res) => {
    if (res) {
      getProfile().then((res) => {
        setUser(res);
      });
    }
  });
};
```

With this, you can successfully receive a refreshed token. Here are some areas for improvement or considerations:

1. Asynchronous processing and API error handling (async, await).
2. State management (Context API, Redux).

If you have any suggestions for improvement after reading this, I would appreciate it :)
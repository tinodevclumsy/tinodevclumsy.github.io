---
title: Setting up Themes in styled-components
description: ""
pubDate: 2025-03-05T02:47:15.793Z
image: ""
categories: ["styled-components"]
---

**styled-components** is a CSS-in-JS library that I personally prefer when starting with React. The ThemeProvider component in styled-components provides themes globally. In this article, we'll look at how to set up themes as the title suggests.

## 1. Creating a theme object
```javascript
// src/utils/theme.js
const theme = {
  primary: "#1DB954",
  dark: "#212121",
  black: "#121212",
  grey: "#535353",
  light_grey: "#b3b3b3",
};
export default theme;
```

## 2. Providing the theme through ThemeProvider
```javascript
// index.js 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
```

## 3. Using it within components
The provided theme can be accessed through props. Here, props can be received when attributes are added to the component, allowing for dynamic styling.
```javascript
import styled from "styled-components";
const LinkButton = styled.a`
  width: 175px;
  border: 1px solid ${(props) => props.theme.primary};
  padding: 15px;
  border-radius: 35px;
  color: ${(props) => props.theme.primary};
`;
export default LinkButton;
```

## 4. Additional usage methods
Since the theme used in styled-components is an object, it can be structured in various ways.

### Organizing by category with nested objects
```javascript
// src/utils/theme.js
const theme = {
  colors: {
    primary: "#1DB954",
    dark: "#212121",
    black: "#121212",
    grey: "#535353",
    light_grey: "#b3b3b3",
  },
  fonts: {
    main: "'Roboto', sans-serif",
    accent: "'Montserrat', sans-serif",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
  }
};
export default theme;
```

### Separating dark/light themes
```javascript
// src/utils/theme.js
export const lightTheme = {
  colors: {
    background: "#FFFFFF",
    text: "#121212",
    primary: "#1DB954",
    secondary: "#535353",
    accent: "#b3b3b3",
  }
};
export const darkTheme = {
  colors: {
    background: "#121212",
    text: "#FFFFFF",
    primary: "#1DB954",
    secondary: "#b3b3b3",
    accent: "#535353",
  }
};
```

```javascript
// Changing themes according to state in index.js
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/theme";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {/* App components */}
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </button>
    </ThemeProvider>
  );
}
```

As shown, using ThemeProvider in styled-components allows you to easily set up and manage global themes.
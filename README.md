<div>
  <img align="center" width="100%" src="src/assets/icons/poster.avif">
</div>

<br />

This Library build for kyc verification. you can use this library for verification for PAN Card and Aadhaar Card.
We Will add more kyc documents later.

## Installation

```sh
yarn add react-native-vision-camera
```

```sh
npm install react-native-vision-camera
```

## How to use

```tsx
import React from "react";
import Verification from "react-native-kyc-sdk";

function App() {
  return <Verification sequence={["Pan card", "Aadhaar card"]} />;
}
export default App;
```

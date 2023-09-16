# react-native-kyc-sdk

This Library build for kyc verification sdk. you can use this library for verification for PAN Card and Aadhaar Card.
We Will add more kyc documents later.

## Installation

npm install react-native-kyc-sdk or yarn add react-native-kyc-sdk

## How to use

```import React from 'react';
import Verification from 'react-native-kyc-sdk';

const App = () => {
return(
<Verification sequence={
["Pan card",
"Aadhaar card"
]} />
)
}
export default App;```

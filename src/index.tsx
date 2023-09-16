import React, { FunctionComponent, useState } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import OnBoarding from "./components/onBoarding";
import { Colors } from "./helper/Colors";
import { Icons } from "./helper/Images";
import Identity from "./components/Identity";

export type Props = {
  /**
   * Main Screen Styles
   **/
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * How To Verify Process execute (basically it's sequence of verification flow)
   **/
  sequence?: string[];
  /**
   * This Pan icon is onboarding screen Icon
   **/
  panIcon?: ImageSourcePropType;
  /**
   * This Pan icon is onboarding screen Icon
   **/
  aadhaarIcon?: ImageSourcePropType;
  /**
   * This Pan icon is onboarding screen Icon
   **/
  drivingIcon?: ImageSourcePropType;
  /**
   * This style for onboarding icon styles
   **/
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * This title for PAN Card
   **/
  panTitle?: string;
  /**
   * This title for Aadhaar Card
   **/
  aadhaarTitle?: string;
  /**
   * This title for Driving License
   **/
  drivingTitle?: string;
  /**
   * This style for onboarding Items
   **/
  ItemStyle?: StyleProp<ViewStyle>;
  /**
   * This style for onboarding steps text
   **/
  stepTextStyle?: StyleProp<TextStyle>;
  /**
   * This style for onboarding items title
   **/
  itemTitleStyle?: StyleProp<TextStyle>;
  /**
   * This style for onboarding button styles
   **/
  onBoardingButtonStyle?: StyleProp<ViewStyle>;
  /**
   * This title for onboarding button title
   **/
  onBoardingButtonTitle?: string;
  /**
   * This style for onboarding button title styles
   **/
  onBoardingButtonTitleStyle?: StyleProp<TextStyle>;
  /**
   * This response is get when verified PAN
   **/
  // panResponse?: (val: object) => void;
  /**
   * This style for success Modal View Style
   **/
  successModalViewStyle?: StyleProp<ViewStyle>;
  /**
   * This Icon for success Modal Success Icon
   **/
  successIcon?: ImageSourcePropType;
  /**
   * This style for success Modal message
   **/
  successMessageStyle?: StyleProp<TextStyle>;
  /**
   * This style for success Modal Icon style
   **/
  successIconStyle?: StyleProp<ImageStyle>;
  /**
   * This style for verify screen view style
   **/
  verifyContainerStyle?: StyleProp<ViewStyle>;
  /**
   * This style for verify screen TextInput style
   **/
  textInputStyle?: StyleProp<TextStyle>;
  /**
   * This style for verify screen ERROR Message style
   **/
  errorMessageStyle?: StyleProp<TextStyle>;
  /**
   * This title for verify screen PAN Input Title
   **/
  inputPANTitle?: string;
  /**
   * This title for verify screen Aadhaar Input Title
   **/
  inputAadhaarTitle?: string;
  /**
   * This title for verify screen PAN Button Title
   **/
  verifyPANButtonTitle?: string;
  /**
   * This title for verify screen Aadhaar Button Title
   **/
  verifyAadhaarButtonTitle?: string;
};

const Verification: FunctionComponent<Props> = (props) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  return (
    <SafeAreaView style={[styles.container, props.containerStyle]}>
      {currentScreen === 1 && (
        <OnBoarding
          sequence={props.sequence}
          panIcon={props.panIcon}
          aadhaarIcon={props.aadhaarIcon}
          drivingIcon={props.drivingIcon}
          iconStyle={props.iconStyle}
          panTitle={props.panTitle}
          aadhaarTitle={props.aadhaarTitle}
          drivingTitle={props.drivingTitle}
          ItemStyle={props.ItemStyle}
          stepTextStyle={props.stepTextStyle}
          itemTitleStyle={props.itemTitleStyle}
          onBoardingButtonStyle={props.onBoardingButtonStyle}
          onBoardingButtonTitle={props.onBoardingButtonTitle}
          onBoardingButtonTitleStyle={props.onBoardingButtonTitleStyle}
          onPress={(val: number) => setCurrentScreen(val)}
        />
      )}
      {currentScreen === 2 && (
        <Identity
          sequence={props.sequence}
          backPress={(val: number) => setCurrentScreen(val)}
          successModalViewStyle={props.successModalViewStyle}
          successIcon={props.successIcon}
          successMessageStyle={props.successMessageStyle}
          successIconStyle={props.successIconStyle}
          verifyContainerStyle={props.verifyContainerStyle}
          stepTextStyle={props.stepTextStyle}
          itemTitleStyle={props.itemTitleStyle}
          textInputStyle={props.textInputStyle}
          inputPANTitle={props.inputPANTitle}
          inputAadhaarTitle={props.inputAadhaarTitle}
          verifyPANButtonTitle={props.verifyPANButtonTitle}
          buttonTitleStyle={props.onBoardingButtonTitleStyle}
          verifyAadhaarButtonTitle={props.verifyAadhaarButtonTitle}
          errorMessageStyle={props.errorMessageStyle}
          buttonStyle={props.onBoardingButtonStyle}
        />
      )}
    </SafeAreaView>
  );
};

Verification.defaultProps = {
  sequence: ["Pan card", "Aadhaar card", "Driving license"],
  panIcon: Icons.PAN,
  aadhaarIcon: Icons.Aadhaar,
  drivingIcon: Icons.License,
  panTitle: "Verify PAN",
  aadhaarTitle: "Verify Aadhaar",
  drivingTitle: "Verify Driving License",
  onBoardingButtonTitle: "Start Verification",
  successIcon: Icons.Verified,
  inputPANTitle: "Enter PAN",
  inputAadhaarTitle: "Enter Aadhaar Number",
  verifyPANButtonTitle: "Verify PAN",
  verifyAadhaarButtonTitle: "Verify Aadhaar card",
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

import React, { FunctionComponent, useCallback } from "react";
import {
  FlatList,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Fonts } from "../helper/Fonts";
import { Colors } from "../helper/Colors";

type Props = {
  sequence?: string[];
  panIcon?: ImageProps;
  aadhaarIcon?: ImageProps;
  drivingIcon?: ImageProps;
  iconStyle?: StyleProp<ImageStyle>;
  panTitle?: string;
  aadhaarTitle?: string;
  drivingTitle?: string;
  ItemStyle?: StyleProp<ViewStyle>;
  stepTextStyle?: StyleProp<TextStyle>;
  itemTitleStyle?: StyleProp<TextStyle>;
  onBoardingButtonStyle?: StyleProp<ViewStyle>;
  onBoardingButtonTitle?: string;
  onBoardingButtonTitleStyle?: StyleProp<TextStyle>;
  onPress: (val: number) => void;
};

const OnBoarding: FunctionComponent<Props> = ({
  sequence,
  panIcon,
  aadhaarIcon,
  drivingIcon,
  iconStyle,
  panTitle,
  aadhaarTitle,
  drivingTitle,
  ItemStyle,
  stepTextStyle,
  itemTitleStyle,
  onBoardingButtonStyle,
  onBoardingButtonTitle,
  onBoardingButtonTitleStyle,
  onPress,
}) => {
  const renderItem = ({ item, index }: any) => {
    return (
      <>
        {item === "Pan card" && (
          <View style={[styles.renderContainer, ItemStyle]}>
            <View style={styles.titleView}>
              <Text style={[styles.boldText, stepTextStyle]}>
                STEP {index + 1} -{" "}
              </Text>
              <Text style={[styles.titleText, itemTitleStyle]}>{panTitle}</Text>
            </View>
            <View>
              <Image
                source={panIcon}
                style={[styles.iconStyle, iconStyle]}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
        {item === "Aadhaar card" && (
          <View style={[styles.renderContainer, ItemStyle]}>
            <View style={styles.titleView}>
              <Text style={[styles.boldText, stepTextStyle]}>
                STEP {index + 1} -{" "}
              </Text>
              <Text style={[styles.titleText, itemTitleStyle]}>
                {aadhaarTitle}
              </Text>
            </View>
            <View>
              <Image
                source={aadhaarIcon}
                style={[styles.iconStyle, iconStyle]}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
        {item === "Driving license" && (
          <View style={[styles.renderContainer, ItemStyle]}>
            <View style={styles.titleView}>
              <Text style={[styles.boldText, stepTextStyle]}>
                STEP {index + 1} -{" "}
              </Text>
              <Text style={[styles.titleText, itemTitleStyle]}>
                {drivingTitle}
              </Text>
            </View>
            <View>
              <Image
                source={drivingIcon}
                style={[styles.iconStyle, iconStyle]}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      </>
    );
  };

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={{ marginTop: 20 }} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Complete Your KYC</Text>
      <View style={styles.mainView}>
        <FlatList
          data={sequence}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
        <TouchableOpacity
          style={[styles.button, onBoardingButtonStyle]}
          onPress={() => onPress(2)}
        >
          <Text style={[styles.buttonText, onBoardingButtonTitleStyle]}>
            {onBoardingButtonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headingText: {
    fontFamily: Fonts.PoppinsBold,
    textAlign: "center",
    color: Colors.black,
    fontSize: 22,
    marginVertical: 30,
  },
  mainView: {
    marginHorizontal: 20,
    marginTop: 0,
  },
  renderContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  boldText: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 18,
    color: Colors.black,
  },
  titleText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 18,
    color: Colors.black,
    flex: 1,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: Colors.button,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.white,
    fontSize: 18,
  },
});

import React, { FunctionComponent, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../helper/Colors";
import { Icons } from "../helper/Images";
import { Fonts } from "../helper/Fonts";

type Props = {
  backPress: (val: number) => void;
  sequence: string[] | undefined;
  successModalViewStyle?: StyleProp<ViewStyle>;
  successIcon?: ImageSourcePropType;
  successMessageStyle?: StyleProp<TextStyle>;
  successIconStyle?: StyleProp<ImageStyle>;
  verifyContainerStyle?: StyleProp<ViewStyle>;
  stepTextStyle?: StyleProp<TextStyle>;
  itemTitleStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  buttonTitleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  inputPANTitle?: string;
  inputAadhaarTitle?: string;
  verifyPANButtonTitle?: string;
  verifyAadhaarButtonTitle?: string;
};

const { width, height } = Dimensions.get("window");

const PANURL = "https://ind.thomas.hyperverge.co/v1/fetchPANDetailed";
const AadhaarURL = "https://ind.thomas.hyperverge.co/v1/verifyAadhaar";
const header = {
  "content-type": "application/json",
  appId: "1dp8mf",
  appKey: "9mg3qqijafb04zqnk8e7",
  transactionId: "1",
};

const Identity: FunctionComponent<Props> = ({
  backPress,
  sequence,
  successModalViewStyle,
  successIcon,
  successMessageStyle,
  successIconStyle,
  verifyContainerStyle,
  stepTextStyle,
  itemTitleStyle,
  textInputStyle,
  errorMessageStyle,
  buttonStyle,
  inputPANTitle,
  inputAadhaarTitle,
  buttonTitleStyle,
  verifyPANButtonTitle,
  verifyAadhaarButtonTitle,
}) => {
  const [panError, setPanError] = useState<string>("");
  const [aadhaarError, setAadhaarError] = useState<string>("");
  const [panNumber, setPanNumber] = useState<string>("");
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const flatListRef = useRef<FlatList | null>(null);

  const verifyPAN = async (index: number) => {
    setLoading(true);
    if (panNumber) {
      try {
        const request = await fetch(PANURL, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ pan: panNumber }),
        });
        const response = await request.json();
        if (request.status === 400) {
          setPanError(response.error.reason.message);
        } else if (request.status === 403) {
          setPanError("Data not found");
        } else if (request.status === 422) {
          setPanError("Invalid Pan pattern");
        } else if (request.status === 500) {
          setPanError("Internal Server Error");
        } else if (request.status === 503) {
          setPanError("Service Unavailable");
        } else if (request.status === 504) {
          setPanError("The request has timed out. Please try again.");
        } else if (request.status === 200) {
          setSuccess(true);
          setSuccessMessage("PAN Verified Successfully.");
          setTimeout(() => {
            setSuccess(false);
            setSuccessMessage("");
            flatListRef.current?.scrollToIndex({
              index: index + 1,
              animated: true,
            });
          }, 3000);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setPanError("Something went wrong! Please try again later.");
        console.error(err);
      }
    } else {
      setLoading(false);
      setPanError("Enter PAN Number");
    }
  };

  const verifyAadhaar = async (index: number) => {
    setLoading(true);
    if (aadhaarNumber) {
      try {
        const request = await fetch(PANURL, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ aadhaarNumber: aadhaarNumber, consent: "Y" }),
        });
        const response = await request.json();
        if (request.status === 400) {
          setPanError(response.error.reason.message);
        } else if (request.status === 401) {
          setPanError("Invalid credentials");
        } else if (request.status === 403) {
          setPanError("Access Denied");
        } else if (request.status === 422) {
          setPanError("Invalid Aadhaar pattern");
        } else if (request.status === 500) {
          setPanError("Internal Server Error");
        } else if (request.status === 503) {
          setPanError("Service Unavailable");
        } else if (request.status === 504) {
          setPanError("The request has timed out. Please try again.");
        } else if (request.status === 200) {
          setSuccess(true);
          setSuccessMessage("Aadhaar Verified Successfully.");
          setTimeout(() => {
            setSuccess(false);
            setSuccessMessage("");
          }, 3000);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setAadhaarError("Something went wrong! Please try again later.");
        console.error(err);
      }
    } else {
      setLoading(false);
      setAadhaarError("Enter Aadhaar Number");
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.renderContainer}>
        {item === "Pan card" && (
          <View style={[styles.mainView, verifyContainerStyle]}>
            <Text style={[styles.stepText, stepTextStyle]}>
              STEP {index + 1}
            </Text>
            <Text style={[styles.title, itemTitleStyle]}>{inputPANTitle}</Text>
            <TextInput
              style={[styles.input, textInputStyle]}
              autoCapitalize="characters"
              onChangeText={(val) => {
                setPanError("");
                setPanNumber(val);
              }}
            />
            {panError && (
              <Text style={[styles.errorStyle, errorMessageStyle]}>
                {panError}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.button, buttonStyle]}
              onPress={() => verifyPAN(index)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} size={25} />
              ) : (
                <Text style={[styles.buttonText, buttonTitleStyle]}>
                  {verifyPANButtonTitle}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        {item === "Aadhaar card" && (
          <View style={styles.mainView}>
            <Text style={[styles.stepText, stepTextStyle]}>
              STEP {index + 1}
            </Text>
            <Text style={[styles.title, itemTitleStyle]}>
              {inputAadhaarTitle}
            </Text>
            <TextInput
              style={[styles.input, textInputStyle]}
              keyboardType="number-pad"
              onChangeText={(val) => {
                setAadhaarError("");
                setAadhaarNumber(val);
              }}
            />
            {aadhaarError && (
              <Text style={[styles.errorStyle, errorMessageStyle]}>
                {aadhaarError}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.button, buttonStyle]}
              onPress={() => verifyAadhaar(index)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} size={25} />
              ) : (
                <Text style={[styles.buttonText, buttonTitleStyle]}>
                  {verifyAadhaarButtonTitle}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => backPress(1)}>
        <Image source={Icons.Back} style={styles.backIconStyle} />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={sequence}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalMainView, successModalViewStyle]}>
            <Image
              source={successIcon}
              style={[styles.modalImageStyle, successIconStyle]}
            />
            <Text style={[styles.title, successMessageStyle]}>
              {successMessage}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Identity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  backIconStyle: {
    width: 30,
    height: 30,
  },
  renderContainer: {
    width: width - 40,
    height: height,
    marginHorizontal: 20,
    marginTop: 50,
  },
  mainView: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  stepText: {
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.black,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.PoppinsSemiBold,
    color: Colors.black,
    fontSize: 16,
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.black,
    fontSize: 14,
    paddingHorizontal: 20,
    letterSpacing: 5,
  },
  button: {
    backgroundColor: Colors.button,
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
  errorStyle: {
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.red,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalMainView: {
    backgroundColor: Colors.white,
    width: width / 1.1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  modalImageStyle: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});

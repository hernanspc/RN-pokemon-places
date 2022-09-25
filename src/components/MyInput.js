import { TextInput, View as ViewDefault, StyleSheet, useColorScheme, } from "react-native";
import Colors from "../constants/colors";
import { View } from "../themed/Themed";
import MyText from "./MyText";
import React from "react";

export default function MyInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  selectionColor,
  multiline,
  numberOfLines,
  editable,
  keyboardType,
  onBlur
}) {
  const theme = useColorScheme();

  return (
    <ViewDefault style={styles.container}
    >
      <MyText style={{ fontWeight: "bold", marginBottom: 5 }} type={"caption"}>
        {label}
      </MyText>
      <TextInput
        placeholder={label}
        style={[styles.input, styles[theme], multiline ? { height: 100 } : null]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        selectionColor={selectionColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlur}
      />
    </ViewDefault>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dark: {
    backgroundColor: Colors.dark.text + "06",
    borderColor: Colors.dark.text + "80",
    color: Colors.dark.text,
  },
  light: {
    // backgroundColor: Colors.light.text + "06",
    backgroundColor: Colors.light.backgroundInput,
    // borderColor: Colors.light.text + "80",
    borderColor: Colors.light.borderInput,
    borderColor: "#dddddd",
    color: Colors.light.text,
  },
  input: {
    // color: "gray",
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});

import * as React from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/colors";

export default function MyText({ children, type = "body", style }) {
  const theme = useColorScheme();
  return (
    <Text style={[styles[type], { color: Colors[theme].caption }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  body: {
    fontSize: 17,
  },
  caption: {
    fontSize: 14,
  },
});

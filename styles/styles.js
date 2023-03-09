import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
  },
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  blogPost: {
    backgroundColor: "lightgrey",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "grey",
  },
});

export default styles;

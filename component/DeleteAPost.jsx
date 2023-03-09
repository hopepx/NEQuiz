import styles from "../styles/styles";
import { useRef } from "react";
import { Button, TextInput, Text } from "react-native";

const DeleteAPost = (props) => {
  // useRef is for storing data persistently across component rerenders.
  const postData = useRef({
    postId: "",
  });

  const handleDeleteAPost = () => {
    props.deletePostCB(postData.current);
  };

  return (
    <>
      <Text style={styles.title}>Delete a Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Post ID"
        keyboardType="number-pad"
        onChangeText={(newText) => {
          // Set the post's Id.
          postData.current = {
            postId: newText,
          };
        }}
      />

      <Button
        title="Submit"
        onPress={() => {
          handleDeleteAPost();
        }}
      />
    </>
  );
};

export default DeleteAPost;

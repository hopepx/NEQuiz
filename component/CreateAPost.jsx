import styles from "../styles/styles";
import { useRef } from "react";
import { Button, Text, TextInput, View } from "react-native";

const CreateAPost = (props) => {
  // useRef is for storing data persistently across component rerenders.
  const postData = useRef({
    postTitle: "",
    postContent: "",
  });

  const handleCreateAPost = () => {
    props.submitPostCB(postData.current);
  };

  return (
    <>
      <Text style={styles.title}>Create a Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(newText) => {
          // Set the post's title data.
          postData.current = {
            postTitle: newText,
            postContent: postData.current.postContent,
          };
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        onChangeText={(newText) => {
          // Set the post's content data.
          postData.current = {
            postTitle: postData.current.postTitle,
            postContent: newText,
          };
        }}
      />
      <Button
        title="Submit"
        onPress={() => {
          handleCreateAPost();
        }}
      />
    </>
  );
};

export default CreateAPost;

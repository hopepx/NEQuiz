import styles from "../styles/styles";
import { useRef } from "react";
import { Button, TextInput, Text } from "react-native";

const UpdateAPost = (props) => {
  // useRef is for storing data persistently across component rerenders.
  const postData = useRef({
    postId: "",
    postTitle: "",
    postContent: "",
  });

  const handleUpdateAPost = () => {
    props.updatePostCB(postData.current);
  };

  return (
    <>
      <Text style={styles.title}>Update a Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Post ID"
        keyboardType="number-pad"
        onChangeText={(newText) => {
          // Set the post's Id.
          // postData.current = {
          //   postId: newText,
          //   postTitle: postData.current.postTitle,
          //   postContent: postData.current.postContent,
          // };
          postData.current = {
            // Use of the spread operator.
            ...postData.current, // This places the current values of postData.current into this JSON.
            postId: newText,
          };
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        keyboardType="number-pad"
        onChangeText={(newText) => {
          // Set the post's title.
          postData.current = {
            postId: postData.current.postId,
            postTitle: newText,
            postContent: postData.current.postContent,
          };
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="content"
        keyboardType="number-pad"
        onChangeText={(newText) => {
          // Set the post's content.
          postData.current = {
            postId: postData.current.postId,
            postTitle: postData.current.postTitle,
            postContent: newText,
          };
        }}
      />

      <Button
        title="Submit"
        onPress={() => {
          handleUpdateAPost();
        }}
      />
    </>
  );
};

export default UpdateAPost;

import styles from "../styles/styles";
import { Text, View } from "react-native";

const ReadAPost = (props) => {
  if (props.data.postId === 0) {
    return null;
  } else
    return (
      <View style={styles.blogPost}>
        <Text style={styles.title}>{props.data.postTitle}</Text>
        <Text>{props.data.postContent}</Text>
      </View>
    );
};

export default ReadAPost;

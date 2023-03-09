import styles from "../styles/styles";
import { FlatList, Text, View } from "react-native";

function ShowAllPosts(props) {
  if (props.data.length > 0) {
    return (
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <View style={styles.blogPost}>
            <Text style={styles.title}>
              {item.id}: {item.title}
            </Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    );
  } else {
    return null;
  }
}

export default ShowAllPosts;

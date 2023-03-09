import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import styles from "./styles/styles";
import ReadAPost from "./component/ReadAPost";
import ShowAllPosts from "./component/ShowAllPosts";
import CreateAPost from "./component/CreateAPost";
import UpdateAPost from "./component/UpdateAPost";
import DeleteAPost from "./component/DeleteAPost";
import { API_URL, buttonsText } from "./constants"; // Importing of named exports.

export default function App() {
  const [isShowAllPosts, setIsShowAllPosts] = useState(false);
  const [isShowReadAPost, setIsShowReadAPost] = useState(false);
  const [isShowCreateAPost, setIsShowCreateAPost] = useState(false);
  const [isShowUpdateAPost, setIsShowUpdateAPost] = useState(false);
  const [isShowDeleteAPost, setIsShowDeleteAPost] = useState(false);

  const [postData, setPostData] = useState({
    postId: 0,
    postTitle: "",
    postContent: "",
  });

  const [allPostsData, setAllPostsData] = useState([]);

  useEffect(() => {
    // This is a callback function. I.e. React Native will call this function for us.
    // console.log(1);
    getAllPosts(); // Asynchronous, i.e. the code continues running while waiting for the data from the server.
    // readPost(postId).then((returnedData) => {
    //   // Asynchronous, i.e. the code continues running while waiting for the data from the server.
    //   console.log(returnedData);
    // });

    // We can chain promises so that we control which function is called first.
    // getAllPosts().then(() => {
    //   readPost(postId).then((returnedData) => {
    //     // Asynchronous, i.e. the code continues running while waiting for the data from the server.
    //     console.log(returnedData);
    //   });
    // });
    // }, [[postId]]);
  }, []);

  const hidePostData = () => {
    setIsShowAllPosts(false);
    setIsShowReadAPost(false);
    setIsShowCreateAPost(false);
    setIsShowUpdateAPost(false);
    setIsShowDeleteAPost(false);
  };

  const doSubmitAPost = (data) => {
    console.log(`doSubmitAPost() has been called:`);
    console.log(data);

    // The API is expecting the "title" and "content" keys (instead of "postTitle" and "postContent"), so we need to create them in an object.
    createAPost({
      title: data.postTitle,
      content: data.postContent,
    });
  };

  const doUpdateAPost = (data) => {
    console.log(`doUpdateAPost() has been called:`);
    console.log(data);

    // The API is expecting the "title" and "content" keys (instead of "postTitle" and "postContent"), so we need to create them in an object.
    updateAPost({
      id: data.postId,
      title: data.postTitle,
      content: data.postContent,
    }).then((response) => {
      console.log(response.message);
      console.log(`status: ${response.status}`);
    });
  };

  const doDeleteAPost = (data) => {
    console.log(`doDeleteAPost() has been called:`);
    console.log(data);

    deleteAPost(data).then((response) => {
      console.log(response.message);
      console.log(`status: ${response.status}`);
    });
  };

  const renderButtons = () => {
    const elements = [];
    buttonsText.forEach((text, index) => {
      elements.push(
        <Button
          key={text}
          id={index}
          value={index}
          title={text}
          onPress={() => {
            handleButtonPress(index);
          }}
        />
      );
    });

    return elements;
  };

  const handleButtonPress = (buttonIndex) => {
    // console.log(`button pressed: ${buttonIndex}`);
    hidePostData();
    if (buttonIndex === 0) {
      getAllPosts().then((returnedData) => {
        setAllPostsData(returnedData);
      });
      setIsShowAllPosts(true);
    } else if (buttonIndex === 1) {
      setIsShowReadAPost(true);
    } else if (buttonIndex === 2) {
      setIsShowCreateAPost(true);
    } else if (buttonIndex === 3) {
      setIsShowUpdateAPost(true);
    } else if (buttonIndex === 4) {
      setIsShowDeleteAPost(true);
    }
  };

  const getAllPosts = () => {
    return new Promise((resolve, reject) => {
      fetch(API_URL + "/posts")
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          console.log("getAllPosts() data:");
          console.log(responseData);

          resolve(responseData);
        });
    });
  };

  function readAPost(id) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + `/posts/${id}`).then((data) => {
        if (data.status === 200) {
          // status is OK.
          data.json().then((jsonData) => {
            // There are 2 ways to return a JSON. This is one way:
            // let jsonAsString = `{"message": "The post with id ${id} has been read", "id": ${jsonData.id}, "title": "${jsonData.title}", "content": "${jsonData.content}"}`;
            // resolve(JSON.parse(jsonAsString)); // JSON.parse() creates a JSON from a string.

            // This is the other way of returning a JSON:
            resolve({
              message: `The post with id ${id} has been read`, // Template string (also called template literal).
              id: `${jsonData.id}`, // Template string (also called template literal).
              title: `${jsonData.title}`, // Template string (also called template literal).
              content: `${jsonData.content}`, // Template string (also called template literal).
            });
          });
        } else {
          reject("data not ok");
        }
      });
    });
  }

  function createAPost(data) {
    return new Promise((resolve, reject) => {
      // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
      fetch(API_URL + `/create`, {
        method: "POST",
        // Setting the header is optional because we've coded the API such that it will always try to read the data as JSON.
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          // status is OK.
          response.json().then((jsonData) => {
            resolve({
              message: `The post with id ${jsonData.id} has been created`, // Template string (also called template literal).
              id: `${jsonData.id}`, // Template string (also called template literal).
              title: `${jsonData.title}`, // Template string (also called template literal).
              content: `${jsonData.content}`, // Template string (also called template literal).
              status: "ok",
            });
          });
        } else {
          reject("data not ok");
        }
      });
    });
  }

  function updateAPost(data) {
    return new Promise((resolve, reject) => {
      // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
      fetch(API_URL + `/posts/${data.id}`, {
        method: "PUT",
        // Setting the header is optional because we've coded the API such that it will always try to read the data as JSON.
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          // status is OK.
          response.json().then((jsonData) => {
            resolve({
              message: jsonData.Message,
              status: "ok",
            });
          });
        } else {
          reject("The post has not been deleted");
        }
      });
    });
  }

  function deleteAPost(data) {
    return new Promise((resolve, reject) => {
      // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
      fetch(API_URL + `/posts/${data.postId}`, {
        method: "DELETE",
        // Setting the header is optional because we've coded the API such that it will always try to read the data as JSON.
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 200) {
          // status is OK.
          response.json().then((jsonData) => {
            resolve({
              message: jsonData.Message,
              status: "ok",
            });
          });
        } else {
          reject("The post has not been deleted");
        }
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bigTitle}>Consuming the blog post API</Text>
      {renderButtons()}
      {isShowAllPosts && ( // We use short circuit evaluation to conditionally show things on the screen only when the value of isShowAllPosts is true.
        <>
          {/* ** Todo: Place this next line into ShowAllPosts.jsx ** */}
          <Text style={styles.title}>Get All Posts</Text>
          {/* ** End of todo ** */}
          <ShowAllPosts data={allPostsData} />
        </>
      )}
      {isShowReadAPost && (
        <>
          {/* ** Todo: Migrate the following code into ReadAPost.jsx ** */}
          {/* Hint: Use a callback function to send back the postId to App.js */}
          <Text style={styles.title}>Read a Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Post ID"
            keyboardType="number-pad"
            onChangeText={(newText) => {
              readAPost(parseInt(newText))
                .then((returnedData) => {
                  setPostData({
                    postId: returnedData.id,
                    postTitle: returnedData.title,
                    postContent: returnedData.content,
                  });
                })
                .catch((err) => {
                  // catch() is a callback function that will be called if the readPost() promise returns an error.
                  console.log(err); // err is a variable that contains the result of readPost's reject() function.
                  setPostData({
                    postId: 0,
                    postTitle: "",
                    postContent: "",
                  });
                });
            }}
          />
          {/* ** End of todo ** */}
          <ReadAPost data={postData} />
        </>
      )}
      {isShowCreateAPost && (
        <>
          <CreateAPost submitPostCB={doSubmitAPost} />
        </>
      )}
      {isShowUpdateAPost && (
        <>
          <UpdateAPost updatePostCB={doUpdateAPost} />
        </>
      )}
      {isShowDeleteAPost && (
        <>
          <DeleteAPost deletePostCB={doDeleteAPost} />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

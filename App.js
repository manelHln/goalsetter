import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setmodalIsVisible] = useState(false);

  function goalInputHandler(userInput) {
    setEnteredGoalText(userInput);
  }

  function addGoalHandler() {
    setGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setEnteredGoalText("");
    setmodalIsVisible(false)
  }

  function deleteGoalHandler(id) {
    setGoals((prev) => {
      return prev.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.container}>
      <Button
        title="Add New Goal"
        color="#a065ec"
        onPress={() => setmodalIsVisible(true)}
      />
      {modalIsVisible && (
        <Modal visible={modalIsVisible} animationType="slide">
          <View style={styles.inputContainer}>
            {/* <Image style={styles.image} source={require("./assets/splash.png")} /> */}
            <TextInput
              style={styles.textInput}
              placeholder="Your course goal"
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />
            <View style={styles.btnContainer}>
              <View style={styles.button}>
                <Button title="Add goal" onPress={addGoalHandler} color="#b180f0" />
              </View>
              <View style={styles.button}>
                <Button title="Cancel" onPress={()=> setmodalIsVisible(false)} color="#f31282" />
              </View>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          renderItem={(goalData) => {
            return (
              <Pressable onPress={() => deleteGoalHandler(goalData.item.id)}>
                <View style={styles.goalItem}>
                  <Text style={styles.text}>{goalData.item.text}</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  text: {
    color: "white"
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 16
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  }
});

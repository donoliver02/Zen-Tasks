import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [EditTask, setEditTask] = useState(-1);
  function handler() {
    if (task) {
      if (EditTask !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[EditTask] = task;
        setTasks(updatedTasks);
        setEditTask(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  }

  function renderItem({ item, index }) {
    return (
      <View style={styles.Task}>
        <Text style={styles.TaskText}>{item}</Text>
        <View style={styles.ActionButton}>
          <TouchableOpacity onPress={() => handleEdit(index)}>
            <Text style={styles.EditButton}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Text style={styles.DeletetButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function handleEdit(index) {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditTask(index);
  }

  function handleDelete(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, -1);
    setTasks(updatedTasks);
  }
  return (
    <LinearGradient colors={["#93A5CF", "#E4EfE9"]} style={styles.gradient}>
      <View>
        <Text style={styles.Heading}>Zen Tasks</Text>
        <Text style={styles.SubHeading}>ToDo's:</Text>

        <TextInput
          style={styles.Input}
          placeholder="Enter Task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.Button} onPress={handler}>
          <Text style={styles.ButonText}>
            {EditTask !== -1 ? "Update Task" : "Add Task"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginTop: 40,
    margin: 20,
  },
  SubHeading: {
    color: "#666666",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 25,
  },
  Input: {
    borderWidth: 2,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    borderColor: "gray",
    fontSize: 18,
    padding: 10,
    color: "black",
    borderRadius: 5,
  },

  Button: {
    backgroundColor: "#333333",
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 18,
  },
  ButonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  container: {
    backgroundColor: "#e8f0fe",
    height: "100%",
  },
  gradient: {
    height: "100%",
  },
  Task: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 28,
    marginRight: 25,
    marginBottom: 15,
  },

  ActionButton: {
    flexDirection: "row",
  },
  TaskText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
  },

  DeletetButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },

  EditButton: {
    color: "#666666",
    fontWeight: "bold",
    fontSize: 18,
  },
});

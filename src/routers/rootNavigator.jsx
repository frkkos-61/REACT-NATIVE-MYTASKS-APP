import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TASK, ADDTASKS, TASKDETAIL} from '../utils/routes';
import Home from '../screens/home';
import AddTask from '../screens/addTask';
import TaskDetail from '../screens/taskDetail';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={TASK} component={Home} />
      <Stack.Screen name={ADDTASKS} component={AddTask} />
      <Stack.Screen name={TASKDETAIL} component={TaskDetail} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

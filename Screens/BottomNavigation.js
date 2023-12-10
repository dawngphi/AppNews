import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Settings" component={Screen4} />
      <Tab.Screen name="Settings" component={Screen5} />
      <Tab.Screen name="Settings" component={Screen5} />
    </Tab.Navigator>
  );
}

export default MyTabs;
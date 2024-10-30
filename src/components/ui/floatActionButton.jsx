import { Add } from 'iconsax-react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';


const FloatActionButton = (props) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size="30" color="#fff" />
    </TouchableOpacity>
  );
};

export default FloatActionButton;

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        width:70,
        height:70,
        borderRadius:500,
        position:"absolute",
        bottom:30,
        right:30,
        backgroundColor:"#2CCCE4"
    }
});

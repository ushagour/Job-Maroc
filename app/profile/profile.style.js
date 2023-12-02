import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
    container: {
       alignItems: 'center',
       paddingTop: 20,
    },
    profileImage: {
       width: 150,
       height: 150,
       borderRadius: 75,
    },
    name: {
       fontSize: 24,
       marginTop: 10,
    },
    email: {
       fontSize: 16,
       color: COLORS.gray,
       marginTop: 5,
    },
    editProfileButton: {
       marginTop: 20,
       paddingHorizontal: 20,
       paddingVertical: 10,
       backgroundColor: 'lightblue',
       borderRadius: 5,
    },
    editProfileText: {
       fontSize: 16,
       color: 'white',
       textAlign: 'center',
    },
   });


   export default styles;

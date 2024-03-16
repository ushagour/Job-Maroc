import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
   container: {
     flex: 1,
    //  padding: 16,
     justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        paddingTop: 20,
     alignItems: 'center',
      paddingTop: 20,
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 16,
   },
   profileInfo: {
     marginBottom: 24,
   },
   label: {
     fontSize: 18,
     fontWeight: 'bold',
     marginBottom: 4,
   },
   value: {
     fontSize: 16,
     marginBottom: 16,
   },
   editButton: {
     backgroundColor: '#3498db',
     padding: 12,
     borderRadius: 8,
   },
   editButtonText: {
     color: '#fff',
     fontSize: 18,
     textAlign: 'center',
   },
   searchTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
},
noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
},
loaderContainer: {
    marginTop: SIZES.medium
},
footerContainer: {
    marginTop: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
},
paginationButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
},
paginationImage: {
    width: '60%',
    height: '60%',
    tintColor: COLORS.white
},
paginationTextBox: {
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
},
paginationText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary
}
 });

    export default styles;

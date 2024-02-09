import React,{useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import { Stack,useRouter } from 'expo-router'
import {app,auth} from "../../../firebase/config";

import {collection, addDoc,doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { signInWithEmailAndPassword, getAuth,createUserWithEmailAndPassword  } from "firebase/auth";
import  {COLORS,icons, SIZES} from "../../../constants"


const Registre = () => {
    const router =useRouter();
     const firestore = getFirestore(app);
    const [email,SetEmail]=useState('');
    const [displayName, setDisplayName] = useState('');
    const [password,SetPassword]=useState('');
    const [avatarURL,SetavatarURL]=useState('://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg');
    const [confirmPassword,SetconfirmPassword]=useState('');
    const [error, setError] = useState('');




    const handleSigneup = async () => {
        try {
                                    // Validate inputs
                            if (!email || !displayName || !password || ! confirmPassword) {
                                setError('All fields are required');
                                return;
                            }
                        
                            if (password !== confirmPassword) {
                                setError('Passwords do not match');
                                return;
                            }



                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                    );    


                // router.push('/Home'); // Adjust the route accordingly
                const user = userCredential.user;


                const uid = user.uid;
          
                // Update user profile with additional information
                // await updateProfile(user, {
                //   displayName: name,
                //   photoURL: avatarURL,
                // });  
            
                // Store additional user information in Firestore
                const usersCollection = collection(firestore, 'users');
                await addDoc(usersCollection, {
                  uid: uid,
                  displayName: displayName,
                  avatar: avatarURL,
                  // Add more fields as needed
                });
             console.log(`the user ${user} was created successfly /`);

            
                router.push(`/profile/profile`)


           
        }catch (err) {
            // Handle login error
        if (err.code === "auth/too-many-requests") {
              alert("too many requests try later !");
            }
            // setLoading(false);
            // alert(err);
            console.log(err);
          }
    }


 
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
       >
 <Stack.Screen
        options={{
          headerStyle:{backgroundColor:COLORS.lightWhite},
          headerShadowVisible:false,
          headerBackVisible:false,
          headerShown: false, // Set this to false to hide the navigation bar on the Login screen
        }}
      />
<View style={styles.headerwrapper}>
        <Text style={styles.headerTitle}>Registre</Text>


        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        </View>
 
        <View style={styles.Inputscontainer}> 
            <TextInput
            placeholder="displayName"
            value={displayName}
            onChangeText={text=>setDisplayName(text)}
            style={styles.input}>
             </TextInput>
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text=>SetEmail(text)}
            style={styles.input}>
             </TextInput>

            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text=>SetPassword(text)}
            secureTextEntry
            style={styles.input}
            >
            </TextInput>
            <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text=>SetconfirmPassword(text)}
            secureTextEntry
            style={styles.input}
            >
            </TextInput>

        </View>
        <View style={styles.Buttunscontainer}> 

            <TouchableOpacity           
            onPress={handleSigneup}
            style={styles.button} //to give the component more than 1 style 
            
            >
                <Text style={styles.ButtunsText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() =>  router.push(`/profile/login/Login`)}       
                 style={[styles.button,styles.buttonOutLine]}
            >
                <Text style={styles.ButtunsText}>Login</Text>
            </TouchableOpacity>
        </View>
  


    </KeyboardAvoidingView>
  )
}

export default Registre

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    headerwrapper:{},
    headerTitle:{
      fontSize: 33,
      marginBottom: 16,
    },
    Inputscontainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        borderRadius:20,
        marginVertical: 7,
        height:40,
        fontSize:16,
        color:'black',
        borderWidth:.3,
        borderColor:'#ccc'



        
    },
    Buttunscontainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,

    },
    button:{
        backgroundColor:'#023047',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'

    },
    buttonOutLine:{
        backgroundColor:'#219ebc',
        marginTop:5,
        borderColor:'#8ecae6',
        borderWidth:2
        

    },
    ButtunsText:{
        color:'white',
        fontSize:16,
        fontWeight:'700'
    },
    errorText: {
        color: COLORS.danger,
        marginBottom: 16,
      },


})
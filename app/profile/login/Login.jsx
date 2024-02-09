import React,{useEffect, useState} from 'react'
import { SafeAreaView,KeyboardAvoidingView, StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native'
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Stack,useRouter } from 'expo-router'
import { signInWithEmailAndPassword, getAuth  } from "firebase/auth";
// import { GoogleSignin } from 'react-native-google-signin';
import {app,auth} from "../../../firebase/config";
import { COLORS, FONT, SIZES } from "../../../constants";

import styles from "./login.style";




const Login = () => {
    const firestore = getFirestore(app);
    const router =useRouter();


    const [Email,SetEmail]=useState('');
    const [Password,SetPassword]=useState('');



    const handelSingneIn= async ()=>{
        // setLoading(true);
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            Email,
            Password
          );
          // console.log("ali");
          // router.push('/Home'); // Adjust the route accordingly
          router.push(`/profile/profile`)


        //   setLoading(false);
        } catch (error) {
            console.log(error);
          // Handle login error
          if (error.code === "auth/user-not-found") {
            alert("user not found !");
            // setLoginFailed(true);
          }
          if (error.code === "auth/wrong-password") {
            alert("wrong password !");
            // setLoginFailed(true);
          }
          if (error.code === "auth/too-many-requests") {
            alert("too many requests try later !");
          }
        //   setLoading(false);
        }
      }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
 <Stack.Screen
        options={{
          headerStyle:{backgroundColor:COLORS.lightWhite},
          headerShadowVisible:false,
          headerBackVisible:false,
          headerShown: false, // Set this to false to hide the navigation bar on the Login screen
        }}
      />
    <KeyboardAvoidingView
    style={styles.container}
    // behavior='padding'
       >
        <View style={styles.headerwrapper}>
        <Text style={styles.headerTitle}>Login</Text>

        </View>

 
        <View style={styles.Inputscontainer}> 
            <TextInput
            placeholder="Email"
            value={Email}
            onChangeText={text=>SetEmail(text)}
            style={styles.input}>
             </TextInput>

            <TextInput
            placeholder="Password"
            value={Password}
            onChangeText={text=>SetPassword(text)}
            secureTextEntry
            style={styles.input}
            >


            </TextInput>

        </View>
        <View style={styles.Buttunscontainer}> 



            <TouchableOpacity
            
            onPress={handelSingneIn}
            style={styles.button}
            
            >
                <Text style={styles.ButtunsText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            
            onPress={() => router.push(`/profile/login/Registre`)}       
            style={[styles.button,styles.buttonOutLine]} //to give the component more than 1 style 
            
            >
                <Text style={styles.ButtunsText}>Register</Text>
            </TouchableOpacity>

        </View>
        {/* Line */}
        <View style={styles.lineStyle}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      {/* <TouchableOpacity 
      
      onPress={() => handelLogingGoogle}  // for navigation
      style={styles.boxStyle}
      shadow={3}>
      <Image
            
            roundedTop="lg"
            style={styles.imageStyle}
          

            source={{
              uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
            }}
            alt="image"
          /> */}
      {/* <Image
            
            roundedTop="lg"
            style={styles.imageStyle}
          

            source={{
              uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
            }}
            alt="image"
          /> */}


      {/* </TouchableOpacity> */}

    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login


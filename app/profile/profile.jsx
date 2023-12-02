import React from 'react';
import {
   View,
   Text,
   SafeAreaView,
   ScrollView,
   Image,
   TouchableOpacity,
   ActivityIndicator,
   RefreshControl,Share 
 } from "react-native";
 import {
   Company,
   JobAbout,
   JobFooter,
   JobTabs,
   ScreenHeaderBtn,
   Specifics,
 } from "../../components";
import styles from "./profile.style";
import { COLORS, icons, SIZES } from "../../constants";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
const profile = () => {


const router = useRouter()

 return (


   <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>

   <Stack.Screen
       options={{
           headerStyle:{backgroundColor:COLORS.lightWhite},
           headerShadowVisible:false,
           headerBackVisible:false,
           headerLeft:()=>(
               <ScreenHeaderBtn
               iconUrl={icons.left}
               dimension={"60%"}
               HandelOnPress={()=> router.back()}
               
               />
           ),
           headerRight:()=>(
               <ScreenHeaderBtn
               iconUrl={icons.logout}
               dimension="60%"     
               // HandelOnPress={handleShare}
               />
           ),
           headerTitle:''

       }}
       />
       <>
           <ScrollView showsVerticalScrollIndicator={false}>







    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{uri: 'https://via.placeholder.com/150'}}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@gmail.com</Text>
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
                </>
    </SafeAreaView>

 );
};


export default profile

import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <> 
     <StatusBar style="dark" />
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='70%' />
          ),
          headerTitle: "",
        }}
      />


      <ScrollView>
        <View  style={{flex:1,padding:SIZES.medium}} >

          <Welcome  
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
            />
          <Popularjobs
          country="Morocco"

          />
          <Nearbyjobs
          city="Rabat"

          
          />


        </View>
      </ScrollView>

</SafeAreaView>
</>
  
  )
}
 export default Home
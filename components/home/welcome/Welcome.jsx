import React, { useState } from 'react'
import { View, Text,TouchableOpacity,FlatList, TextInput,Image } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import  {icons, SIZES} from "../../../constants"
const Welcome = () => {

  const router =useRouter();
  const jobTypes =["full-time","Part-time","Freelace"];
  const [activeJobType,setactiveJobType]= useState("full-time");
  return (
    <View>
      <View style={styles.container}>

        <Text style={styles.userName}>Hello ALI</Text>
        <Text style={styles.welcomeMessage}>Find your perfect Cour</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TextInput
            style={styles.searchInput}
            onChangeText={(text) => console.log(text)}
            placeholder='What are you looking for?'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>

          <Image source={icons.search}
          resizeMode ="contain"
          style={styles.searchBtnImage}/>
        </TouchableOpacity>
     </View>


     <View style={styles.tabsContainer}>
     <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setactiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
     </View>
    </View>
  )
}

export default Welcome
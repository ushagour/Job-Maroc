import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../constants';
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { ScreenHeaderBtn, Company, NearbyJobCard } from '../../components';
import styles from './profile.style';
const Profile = () => {
  const router = useRouter();
  const [finalData, setFinalData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { user, signOut,likedJobs } = useAuth();
  

  useEffect(() => {
    // setFinalData(likedJobs)
      console.log(user)    
  }, []);
      
  const handleLogout = () => {
    signOut();
  };

    const { data, isLoading, error } =  useFetch('job-details', {
      job_id: likedJobs?likedJobs:"",
      extended_publisher_details: 'false'
      // extended_publisher_details: "false", job_id: "f34DpFVUjgBZ-AAAAAA=="
    });
  


    // const handleRefresh = () => {
    //   setIsFetching(true);
    //   refetch();
    //   setIsFetching(false);


    // };
  
 


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" HandelOnPress={() => router.back()} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.logout} dimension="60%" HandelOnPress={handleLogout} />
          ),
          headerTitle: '',
        }}
      />
   <View style={styles.container}>
      <View style={styles.userInfoHeader}>
        <Image source={{ uri: user?.avatar }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          {user && user.email && <Text style={styles.bio}>{user.email}</Text>}
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.contentText}>My lked jobs :</Text>


  {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : data.length > 0 ? (
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <NearbyJobCard
                isLiked={true}
                job={item}
                handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
    
          />
        </View>
      )
      :
      (<Text>Something went wrong</Text>)
      
      }


        
      </View>
    </View>
    
    </SafeAreaView>
  );
};



export default Profile;

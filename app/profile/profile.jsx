import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../constants';
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { ScreenHeaderBtn, Company, NearbyJobCard } from '../../components';
import { useLikedJob } from  '../../hook/context/LikedJobContext';
import { Swipeable } from 'react-native-gesture-handler';



import styles from './profile.style';
const Profile = () => {
  const router = useRouter();
  const [finalData, setFinalData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { user, signOut,likedJobs } = useAuth();
  const { removeLikedJob} =  useLikedJob();


  useEffect(() => {
    // setFinalData(likedJobs)
      console.log(user)    
  }, []);
      
  const handleLogout = () => {
    signOut();
  };

    const { data, isLoading, error,refetch } =  useFetch('job-details', {
      job_id: likedJobs?likedJobs:"",
      extended_publisher_details: 'false'
      // extended_publisher_details: "false", job_id: "f34DpFVUjgBZ-AAAAAA=="
    });
  


    // const handleRefresh = () => {
    //   setIsFetching(true);
    //   refetch();
    //   setIsFetching(false);


    // };
    const handleDeslike = (likedJobIdToRemove) => {
      removeLikedJob(user.uid,likedJobIdToRemove);
      refetch();//TODO had function dyal refresh khssni nkmlha afetr  removing liked jobs 


    };
  
 


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
<ScreenHeaderBtn iconUrl={icons.home} dimension="60%" HandelOnPress={() => router.push('/')} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.logout} dimension="60%" HandelOnPress={handleLogout} />
          ),
          headerTitle: '',
        }}
      />
      <View style={styles.userInfoHeader}>
        <Image source={{ uri: user?.avatar }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          {user && user.email && <Text style={styles.bio}>{user.email}</Text>}
        </View>
        <TouchableOpacity style={styles.editButton}>
        <ScreenHeaderBtn iconUrl={icons.edit} dimension="60%" style={styles.editButtonText} HandelOnPress={() => router.push('/profile/EditProfile')} />

        </TouchableOpacity>
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.contentText}>My lked jobs :</Text>




        
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : data.length > 0 ? (
        <View>
       
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => (
                  <TouchableOpacity onPress={() => handleDeslike(item.job_id)} style={styles.rightAction}>
                    <Text style={styles.actionText}>
                      
                      
                      Delete</Text>
                  </TouchableOpacity>
                )}
              >
                <NearbyJobCard
                  isLiked={true}
                  job={item}
                  handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                />
              </Swipeable>
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
          />
        </View>
      )
      :
      (<Text>Something went wrong</Text>)
      
      }


    
    </SafeAreaView>
  );
};



export default Profile;

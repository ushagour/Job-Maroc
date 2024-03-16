import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../firebase/AuthContext';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import { app } from '../../firebase/config';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../constants';
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { ScreenHeaderBtn, Company, NearbyJobCard } from '../../components';
const Profile = () => {
  const router = useRouter();
  const [finalData, setFinalData] = useState();
  // const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const { user, signOut,likedJobs } = useAuth();
  

  useEffect(() => {
    setFinalData(likedJobs)

  }, []);
      

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
  
    // const handleScroll = (event) => {
    //   const { contentOffset } = event.nativeEvent;
    //   if (contentOffset.y <= 0) {
    //     // User has scrolled to the top of the list
    //     handleRefresh();
    //   }
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
            <ScreenHeaderBtn iconUrl={icons.logout} dimension="60%" HandelOnPress={signOut} />
          ),
          headerTitle: '',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: SIZES.medium }}>
{user??(
  <Company
  companyLogo={user.avatar+'.jpg'}
  jobTitle={user.displayName}
  companyName={user.email}
/>
)}
            
    
        </View>
      </ScrollView>
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
            // refreshing={isFetching}
            // onRefresh={handleRefresh}
            // onScroll={handleScroll}
            // scrollIndicatorInsets={{ top: 1 }} 
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

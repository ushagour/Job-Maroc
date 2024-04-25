import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Button, FlatList, ScrollView, Text, View,Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {  NearbyJobCard } from '../../components';
import  useFetch  from '../../hook/useFetch'; // Assuming useFetch is properly exported from useFetch.js
import { COLORS, icons, images, SIZES } from '../../constants';
import styles from './likedJ.style';


const LikedJ = ({ jobs,deslike}) => {

    const { data, isLoading, error, refetch } = useFetch('job-details', {
      job_id: jobs,
      extended_publisher_details: 'false'
    });
  
  
  return (
    <>
  
    {isLoading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : data.length > 0 ? (
      <View>
     
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => (
                <TouchableOpacity onPress={() => deslike(item.job_id)} style={styles.rightAction}>
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
        </>

  );
};

export default LikedJ;
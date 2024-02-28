
import { useRouter } from "expo-router";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyjobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import { useCallback,useEffect, useState } from "react";
import { addDoc, collection,doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app, auth } from '../../../firebase/config';
import { useAuth } from  '../../../firebase/AuthContext';
import { useLikedJob } from  '../../../hook/context/LikedJobContext';

const Nearbyjobs = (props) => {
  const router = useRouter();
  // Initialize likedJobs as an object with job_id as keys
  const [likedJobs, setLikedJobs] = useState({});
  const firestore = getFirestore(app);
  const { user, signIn, signOut } = useAuth();

  const { updateOrCreateLikedJobs} =  useLikedJob();

  const { data, isLoading, error } = useFetch("search", {
    query: `NearBay jobs for software developers in ${props.city}`,
    num_pages: "1",
    radius: '1',
  });

  const handleLikeButtonPress = (jobId) => {
  const userId = user ? user.uid : '';
    // Toggle the liked status for the specific job
    setLikedJobs((prevLikedJobs) => ({
      ...prevLikedJobs,
      [jobId]: !prevLikedJobs[jobId],
    }));

    // console.log("ali-----------------------------------"+likedJobs);
    // Save liked job to the database (if needed)
    // updateOrCreateLikedJobs(,user);
    updateOrCreateLikedJobs(userId,jobId);
  };
  
 
   

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NearBy jobs</Text>
        <TouchableOpacity onPress={()=>{router.push(`/search/NearBay jobs for software developers in ${props.city}`)}} >
          <Text style={styles.headerBtn} >Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job)=>{
            return( 
              
            <NearbyjobCard
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            handleLikeButtonPress={()=>{handleLikeButtonPress(job?.job_id)}}
            isLiked={likedJobs[job?.job_id] || false}//the prop isliked containe the value true or false

          />
          )
          }
           
          )
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs

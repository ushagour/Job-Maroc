import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../helpers";
import { images } from "../../../../constants";

const NearbyJobCard = ({ job, handleNavigate,handleLikeButtonPress,isLiked }) => {

  

console.log(job);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title}
        </Text>

        <Text style={styles.jobType}>{job?.job_employment_type}</Text>
      </View>
      <TouchableOpacity onPress={handleLikeButtonPress} style={styles.likeButton}>
        <Image
          source={isLiked ? require('../../../../assets/icons/heart.png') : require('../../../../assets/icons/heart-ol.png')}
          style={styles.likeIcon}
        />

      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default NearbyJobCard;
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {useQueryClient} from '@tanstack/react-query';
import {useGetScorecards} from './hooks/getScorecardsQuery';
import {useGetUserDetails} from './hooks/getUserDataQuery';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';

const Scorecards = ({navigation}) => {
  const {
    data: scorecardData,
    // isLoading: isScorecardLoading,
    // isError: isScorecardError,
    // error: Scorecarderror,
  } = useGetScorecards();
  const {
    data: userDetails,
    isLoading: isUserDataLoading,
    // isError: isUserDataError,
    // error: UserDataerror,
  } = useGetUserDetails();
  const queryClient = useQueryClient();
  const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  const handleScorecardPressed = async id => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scorecard = await axios.get(
        `http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/scorecard/${id}`,
        {
          headers,
        },
      );
      await navigation.navigate('FullScorecard', {
        id: scorecard.data.id,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');

    const icon = item.isCompleted ? (
      <FontAwesomeIcon
        icon={faCheck}
        color={'white'}
        size={12}
        style={{margin: 8}}
      />
    ) : (
      <FontAwesomeIcon
        icon={faExclamation}
        color={'white'}
        size={12}
        style={{margin: 8}}
      />
    );

    return (
      <View style={styles.flatListItemContainer}>
        <View
          style={styles.flatlistTextItemStyle} // container for text content on left
        >
          <TouchableOpacity
            onPress={() => handleScorecardPressed(item.id, item.courseLength)}>
            <Text style={styles.renderCourseName}>{item.courseName}</Text>
            <Text style={styles.renderHoleText}>{item.courseLength} Holes</Text>
            <Text style={styles.renderText}>{date}</Text>
          </TouchableOpacity>
        </View>

        <View // icon continaer on right
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          {icon}
          <TouchableOpacity onPress={() => deleteScorecard(item.id)}>
            <FontAwesomeIcon
              icon={faTrashCan}
              color={'white'}
              size={12}
              style={{margin: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const deleteScorecard = async id => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    Alert.alert(
      'Delete Scorecard',
      'Are you sure you want to delete this scorecard?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(
                `http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/scorecard/${id}`,
                {headers},
              );
              queryClient.invalidateQueries('scorecardData');
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View
          style={{
            padding: 10,
            alignItems: 'flex-start',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontFamily: 'Satoshi-Medium',
              fontSize: 20,
              marginTop: 10,
            }}>
            Hi,{' '}
            {isUserDataLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              userDetails.firstName
            )}
          </Text>
          <Text style={{flexDirection: 'column', color: 'grey'}}>
            Welcome back to{' '}
            <Text
              style={{
                color: '#45B369',
                fontSize: 14,
                fontFamily: 'Satoshi-Medium',
              }}>
              DG Scorecard
            </Text>
            !
          </Text>
        </View>

        <View
          style={{
            padding: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: 570,
            width: windowWidth,
          }}>
          {scorecardData && scorecardData.length === 0 ? (
            <Text>You have not recorded any rounds yet.</Text>
          ) : (
            <FlatList
              renderItem={renderItem}
              data={scorecardData}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.createScorecardButton}
            onPress={() => navigation.navigate('CreateScorecard')}>
            <Text style={styles.buttonText}>Create Scorecard</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Scorecards;

const styles = StyleSheet.create({
  imageBackground: {
    // flex: 1,
    resizeMode: 'cover',
  },
  box1: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  flatListItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2D6061',
    borderRadius: 10,
    marginBottom: 10,
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    marginBottom: 15,
    color: 'black',
  },
  createScorecardButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  flatlistTextItemStyle: {
    width: 280,
    height: 80,
    margin: 15,
    alignItems: 'flex-start',
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
    marginBottom: 5,
  },
  renderHoleText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    marginBottom: 2,
  },
  renderText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    // margin: 2,
  },
});

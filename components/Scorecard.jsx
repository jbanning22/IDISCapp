import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';

const Scorecards = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [scorecardData, setScorecardData] = useState([]);

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');
    return (
      <View style={styles.flatlistStyle}>
        <Text style={styles.renderCourseName}>{item.courseName}</Text>
        <Text style={styles.renderHoleText}>{item.courseLength} Holes</Text>
        <Text style={styles.renderText}>{date}</Text>
      </View>
    );
  };

  const fetchLoggedInStatus = async () => {
    try {
      const Atoken = await AsyncStorage.getItem('token');
      setToken(Atoken);
    } catch (error) {
      console.error('Error fetching logged-in status:', error);
    }
  };

  const getScorecards = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(`http://localhost:3000/scorecard`, {
        headers,
      });
      //   if (scoreC.data === []) {
      //     setScorecardData(['You have not recorded any rounds yet.']);
      //   } else {
      setScorecardData(scoreC.data);
      //   }
    } catch (error) {
      console.log('get Scorecard error is: ', error);
    }
  };

  useEffect(() => {
    fetchLoggedInStatus();
  }, []);
  useEffect(() => {
    getScorecards();
  }, []);

  return (
    // <ScrollView>
    <SafeAreaView style={styles.box1}>
      <Text style={styles.homeText}>Scorecards</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('CreateScorecard1')}>
        <Text style={styles.buttonText}>Create Scorecard</Text>
      </TouchableOpacity>
      <FlatList
        renderItem={renderItem}
        data={scorecardData}
        showsVerticalScrollIndicator={false}
        //   contentContainerStyle={styles.flatlistStyle}
      />
    </SafeAreaView>
    // </ScrollView>
  );
};

export default Scorecards;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BDE9FF',
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C7DEE',
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  flatlistStyle: {
    width: 300,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  renderItemStyle: {
    flexDirection: 'column',
    margin: 10,
  },
  renderCourseName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  renderHoleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  renderText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
});

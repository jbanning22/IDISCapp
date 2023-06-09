import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import myImage from '../assets/images/DiscGolfSunset.jpeg';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <Image
        source={myImage}
        style={{width: 300, height: 300, borderRadius: 150}}
      />
      <Text style={styles.homeText}>
        Welcome to <Text style={styles.appTitle}>DG Scorecard</Text>
      </Text>
      <Text style={styles.messageText}>
        Now you can enjoy disc golf with us!
      </Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('SignInPage')}>
        <Text style={styles.textButton}>Sign In with Email</Text>
      </TouchableOpacity>
      <Text style={styles.questionStyle}>Don&apos;t have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.signUpSize}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    background: '#7D7D7D',
  },
  loginButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    fontFamily: 'Satoshi-Medium',
    alignItems: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 12,
    marginBottom: 40,
    marginTop: 60,
  },
  homeText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 40,
    fontFamily: 'Satoshi-Medium',
  },
  appTitle: {
    color: '#45B369',
    fontFamily: 'Satoshi-Medium',
  },
  messageText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  signUpSize: {
    fontFamily: 'Satoshi-Medium',
    color: '#45B369',
    marginLeft: 5,
    fontSize: 18,
  },
  questionStyle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
  },
});

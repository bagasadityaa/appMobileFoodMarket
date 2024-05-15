import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getData, showMessage, useForm} from '../../utils/utils';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import {API_HOST} from '../../config/config';
import {setLoading} from '../../redux/action/global';
import {Button, Header, TextInput} from '../../components/Components';
import {ScrollView} from 'react-native';
import {useState} from 'react';

const UpdateProfile = ({route, navigation}) => {
  const userProfile = route.params;
  const [form, setForm] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    password: '', // Anda bisa menambahkan logika penanganan kata sandi di sini
    nomor_hp: userProfile.nomor_hp || '',
    alamat: userProfile.alamat || '',
  });

  return (
    <View>
      <Header
        title="Profile Detail"
        subTitle="Profile Detail"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.containerItem}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.inputText}>{userProfile.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.inputText}>{userProfile.email}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nomor Hp</Text>
            <Text style={styles.inputText}>{userProfile.nomor_hp}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.addressText}>{userProfile.alamat}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  inputText: {
    fontSize: 16,
    color: 'black',
  },
  addressText: {
    fontSize: 16,
    // marginBottom: 24,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    marginTop: 16,
  },
});
export default UpdateProfile;

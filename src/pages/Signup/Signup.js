import Axios from 'axios';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Header, TextInput} from '../../components/Components';
import {API_HOST} from '../../config/config';
import {setLoading} from '../../redux/action/global';
import {showMessage, storeData, useForm} from '../../utils/utils';

const Signup = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    nomor_hp: '',
    alamat: '',
  });
  const dispatch = useDispatch();

  const dataRegister = {
    name: form.name,
    email: form.email,
    password: form.password,
    nomor_hp: form.nomor_hp,
    alamat: form.alamat,
  };
  const onSubmit = () => {
    dispatch(setLoading(true));
    Axios.post(`${API_HOST.url}register`, dataRegister)
      .then(res => {
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        const profile = res.data.data.user;

        dispatch({type: 'SET_REGISTER', value: form});
        storeData('token', {value: token});

        storeData('userProfile', profile);
        navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
        console.log('sucess', res);
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage('Gagal Registrasi');
        console.log('gagal regusrer', err);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Sign Up"
          subTitle="Register and eat"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Nama"
            placeholder="Nama"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <View style={{height: 16}} />
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <View style={{height: 16}} />
          <TextInput
            label="Password"
            placeholder="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />

          <View style={{height: 26}} />
          <TextInput
            label="Nomor Hp"
            placeholder="Nomor Hp"
            value={form.nomor_hp}
            onChangeText={value => setForm('nomor_hp', value)}
          />
          <View style={{height: 16}} />
          <TextInput
            label="Alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChangeText={value => setForm('alamat', value)}
          />
          <View style={{height: 24}} />
          <Button text="Sign Up Now" onPress={onSubmit} />
          <View style={{height: 12}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: 24,
    flex: 1,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 26,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});

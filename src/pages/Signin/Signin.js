import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Header, TextInput} from '../../components/Components';
import {signInAction} from '../../redux/action/auth';
import {useForm} from '../../utils/utils';

const Signin = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
  };

  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Login Dulu Yu, Sebelum Pesan" />
      <ScrollView>
        <View style={styles.container}>
          <View style={{height: 26}} />
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
          <View style={{height: 24}} />
          <Button text="Sign In" onPress={onSubmit} />
          <View style={{height: 12}} />
          <Button
            text="Create New Account"
            color="#8D92A3"
            textColor="#FAFAFA"
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Signin;

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
});

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Header, Select, TextInput} from '../../components/Components';
import {signUpAction} from '../../redux/action/auth';
import {setLoading} from '../../redux/action/global';
import {useForm} from '../../utils/utils';
const SigninAddress = ({navigation}) => {
  const [form, setForm] = useForm({
    phonenumber: '',
    address: '',
    housenumber: '',
    city: 'Bandung',
  });
  const dispatch = useDispatch();
  const {registerReducer, photoReducer} = useSelector(state => state);
  const onSubmit = () => {
    // console.log('form: ', form);
    const data = {
      ...form,
      ...registerReducer,
    };
    dispatch(setLoading(true));
    dispatch(signUpAction(data, photoReducer, navigation));
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it's value"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={{height: 26}} />
          <TextInput
            label="Phone No."
            placeholder="Type your Phone No."
            value={form.phonenumber}
            onChangeText={value => setForm('phonenumber', value)}
          />
          <View style={{height: 16}} />
          <TextInput
            label="Address"
            placeholder="Type your Address"
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />
          <View style={{height: 16}} />
          <TextInput
            label="House No."
            placeholder="Type your House No."
            value={form.housenumber}
            onChangeText={value => setForm('housenumber', value)}
          />
          <View style={{height: 16}} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={value => setForm('city', value)}
          />
          <View style={{height: 24}} />
          <Button text="Sign Up Now" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SigninAddress;

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
    padding: 24,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});

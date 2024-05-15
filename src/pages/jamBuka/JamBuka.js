import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getJam, getStatus} from '../../redux/action/home';
import {useEffect} from 'react';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Header} from '../../components/Components';

const JamBuka = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {jam} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getJam());
  }, [dispatch]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getJam());
    setRefreshing(false);
  };
  return (
    <View>
      <Header
        title="Jam Operasional"
        subTitle="Jam Operasional Resto"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.jamOperasional}>Jam Operasional</Text>
          <View style={styles.containerJamOperasionalHeader}>
            <Text style={styles.hari}>Hari</Text>
            <Text style={styles.hari}>Jam Buka</Text>
            <Text style={styles.hari}>Jam Tutup</Text>
          </View>
          {jam.map(jam => (
            <TouchableOpacity
              key={jam.id}
              onPress={() => navigation.navigate('Status', jam)}
              style={styles.containerJamOperasional}>
              <Text style={styles.hari}>{jam.hari}</Text>
              <Text style={styles.jamBuka}>{jam.jamBuka.substring(0, 5)}</Text>
              <Text style={styles.jamTutup}>
                {jam.jamTutup.substring(0, 5)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default JamBuka;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 24,
  },
  jamOperasional: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 10,
    color: 'black',
    padding: 10,
  },
  containerJamOperasionalHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  containerJamOperasional: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    // alignSelf: 'center',
    marginHorizontal: 10,
    padding: 5,
  },
  hari: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 1,
  },
  jamBuka: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 1,
  },
  jamTutup: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 1,
  },
});

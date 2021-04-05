import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faFileSignature} from '@fortawesome/free-solid-svg-icons';

const DocumentsDashboard = ({navigation, setDocuments}) => {
  const [prueba, setPrueba] = useState(false);
  const navigateTo = (route) => {
    navigation.navigate(route);
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.cardContainer}>
          <TouchableHighlight onPress={() => navigateTo('DocumentsNotSigned')}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Pendientes de firma</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>3</Text>
              </View>
            </CardList>
          </TouchableHighlight>
          <CardList>
            <View style={styles.iconTextContainer}>
              <FontAwesomeIcon
                icon={faFileSignature}
                style={styles.iconStyle2}
                size={38}
              />
              <Text style={styles.text}>Firmados</Text>
            </View>
          </CardList>
          {prueba ? <Text>HOLA ESTO ESTA BIEN</Text> : null}
        </View>
      </ContainerScreen>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 35,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  iconStyle2: {
    color: '#3f51b5',
    marginRight: 10,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  count: {
    width: 30,
    height: 30,
    backgroundColor: '#f0ae42',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default DocumentsDashboard;

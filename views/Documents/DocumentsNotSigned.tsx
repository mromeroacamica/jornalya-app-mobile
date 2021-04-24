import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProcedureServices from '../../services/procedure/ProcedureServices';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';
import SessionService from '../../services/session/SessionService';
import RoundCheck from '../../Components/RoundCheck/RoundCheck';

export interface Props{
  navigation:any,
  setDocuments:any
}

const DocumentsNotSigned : React.FC<Props>= ({navigation, setDocuments}) => {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [checkedIdList, setCheckedIdList] = useState<any[]>([])
  let processDefinitionId = '';

  const viewDocument = (documentId:string, documentType:string) => {
    navigation.navigate('DocumentViewer', {
      itemId: documentId,
      otherParam: documentType,
    });
  };
  useEffect(() => {
    let isMounted = true;
    const currentUser = SessionService.getCurrentUser();
    const roleId = currentUser.account.currentRole.id;
    const filter = `&filter[roleId]=${roleId}`;
    async function initDocumentNotSigned() {
      const res = await ProcedureServices.getProcedures(filter, 0, 0);
      console.log(res)
      if (isMounted && res.length > 0) {
        for (let document of res) {
          document.selected = false;
        }
        res[0].disabled = false
        setReceipts(res);
        console.log(res)
      }
    }
    initDocumentNotSigned();
  }, []);
  const longPressHandler = (condition:boolean, index:number) => {
    receipts[index].selected = !condition
    if (index !== 0) {
      receipts[index - 1].disabled = !condition;
    }
    if (index < receipts.length - 1) {
      receipts[index + 1].disabled = condition;
    }
    if (!condition) {
      processDefinitionId = receipts[index].processDefinitionIdentificator;
      setCheckedIdList([...checkedIdList,receipts[index].id])
    } else {
        setCheckedIdList(checkedIdList.filter(id=>id != receipts[index].id))
    }
    setReceipts([...receipts])
    console.log('esto es checkedidlist',checkedIdList)
  };

  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.cardContainer}>
          <ScrollView>
            {receipts.map((value:any, index:any) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onLongPress={() => {
                      longPressHandler(value.selected, index);
                    }}
                    delayLongPress={50}
                    onPress={() =>
                      viewDocument(index, value.processDefinitionName)
                    } 
                    disabled={value.disabled}>
                    <CardList disabled={value.disabled}>
                      <View
                        style={[
                          styles.iconTextContainer,]}>
                          {value.selected?
                          <RoundCheck/>
                          :
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            style={styles.iconStyle}
                            size={38}
                          />
                        }
                        <Text style={styles.text}>
                          {value.processDefinitionName}
                          {value.attributes.visibleInView ? ':' : null}{' '}
                          {value.attributes.visibleInView}
                        </Text>
                      </View>
                      <View style={styles.count}>
                        <Text style={styles.countText}></Text>
                      </View>
                    </CardList>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
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
  cardDisabled:{
    backgroundColor:'grey'
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
    width: 8,
    height: 8,
    backgroundColor: '#f0ae42',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default DocumentsNotSigned;

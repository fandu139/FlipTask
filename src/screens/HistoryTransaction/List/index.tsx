import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native';
import Modal from "react-native-modal";
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Fonts from '../../../theme/fonts';
import { ICON_SEARCH, ICON_ARROW_DOWN } from '../../../assets/icon';
import Icon from '../../../uikit/Icon';
import Spinner from '../../../uikit/Spinner';
import EmptyContent from '../../../uikit/EmptyContent';
import Checkbox from '../../../uikit/Checkbox';
import { navigate } from '../../../helper/navigation';
import ItemList from '../components/ItemList';
import AuthContext from '../../../context/AppContext';

const ListFishPriceScreen: React.FC = () => {
  const {
    historyTransactionData
  } = React.useContext(AuthContext);
  
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isShowSpinner, setIsShowSpinner] = React.useState(!historyTransactionData);
  const [searchBy, setSearchBy] = React.useState({
    showModal: false,
    selectedId: 0,
    optionSearch: [
      {
        id: 0,
        label: 'URUTKAN',
      },
      {
        id: 1,
        label: 'Nama A-Z',
      },
      {
        id: 2,
        label: 'Nama Z-A',
      },
      {
        id: 3,
        label: 'Tanggal Terbaru',
      },
      {
        id: 4,
        label: 'Tanggal Terlama',
      },
    ],
  });
  const [searchByFilter, setSearchByFilter] = React.useState('');
  const [actionType, setActionType] = React.useState('all');

  const onRefresh = async () => {
    setIsRefreshing(true);
    setIsShowSpinner(true)
    setActionType('all');
    setSearchByFilter('');
    setIsRefreshing(false);
    setIsShowSpinner(false)

  };

  const handleModal = () => {
    setSearchBy({
      ...searchBy,
      showModal: !searchBy.showModal
    })
  };

  const handleSelectSearchBy = (item) => {
    setSearchBy({
      ...searchBy,
      showModal: false,
      selectedId: item?.id,
    });
    setActionType('sort')
  };

  const handleSearch = (text: string) => {
    setSearchByFilter(text);
    setActionType('search');
  }

  const getDataList = () => {
    if (actionType === 'all') {
      return historyTransactionData;
    } else if (!!searchByFilter && actionType === 'search') {
      const filterData = historyTransactionData.filter(word => {
        const keys = Object.keys(word)[0]
        const values = Object.values(word)[0];
        const regex = new RegExp(searchByFilter.toLowerCase());
        const result = regex.test(values.sender_bank) || regex.test(values.amount) || regex.test(values.sender_bank) || regex.test(values.beneficiary_bank);
        
        return result;
      });
      return filterData;
    } else if (actionType === 'sort') {
      historyTransactionData.sort((a, b) => { 
        const keysA = Object.keys(a)[0];
        const keysB = Object.keys(b)[0];
        if (searchBy?.selectedId === 1) {
          return a[keysA].beneficiary_name.localeCompare(b[keysB].beneficiary_name, 'es', {sensitivity: 'base'})
        } else if (searchBy?.selectedId === 2) {
          return b[keysB].beneficiary_name.localeCompare(a[keysA].beneficiary_name, 'es', {sensitivity: 'base'})
        } else if (searchBy?.selectedId === 3) {
          return b[keysB].created_at.localeCompare(a[keysA].created_at, 'es', {sensitivity: 'base'})
        } else if (searchBy?.selectedId === 4) {
          return a[keysA].created_at.localeCompare(b[keysB].created_at, 'es', {sensitivity: 'base'})
        }
      });

      return historyTransactionData;
    }
  }

  const getSelectedSortData = () => {
    const selected = searchBy.optionSearch.filter(value => value.id === searchBy.selectedId);
    return selected[0].label;
  }

  const SearchByModalComponent = () => {
    return (
      <View>
        <Modal
          isVisible={searchBy.showModal}
          backdropColor={Colors.BLACK}
          style={styles.modalContent}
          onSwipeComplete={handleModal}
          swipeDirection={['down']}
          onBackButtonPress={handleModal}
          onBackdropPress={handleModal}
        >
          <Text style={styles.searchText}>Cari bersarkan</Text>
          <View style={{ flex: 1 }}>
            {
              searchBy?.optionSearch?.map((item, index) => (
                <View key={index} style={styles.flatListText}>
                  <Checkbox
                    testID={item.label}
                    onChangeValue={() => handleSelectSearchBy(item)}
                    checked={searchBy?.selectedId === item?.id}
                    label={item.label}
                  />
                </View>
              ))
            }
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <View style={styles.containerInputSearch}>
          <View style={styles.containerIconSearch}>
            <Icon name={ICON_SEARCH} size={16} color={Colors.GRAY80} />
          </View>
          <TextInput
            value={searchByFilter}
            onChangeText={(text) => handleSearch(text)}
            style={styles.textInput}
            placeholder={"Cari nama, bank atau nominal"}
            testID="text-input-search-by-order-id-active"
          />
          <View style={[styles.containerIconSearch, styles.containerIconSort]}>
            <TouchableOpacity style={AppStyles.rowItemsCenterSpace} testID="button-filter-screen-active" onPress={handleModal}>
              <Text style={styles.searchTextTitle}>{getSelectedSortData()}</Text>
              <Icon name={ICON_ARROW_DOWN} size={8} color={Colors.ORANGE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isShowSpinner ? 
        <View style={{ flex: 1,justifyContent: 'space-around' }}><Spinner /></View> :
        <FlatList
          testID="flat-list-item-order-active"
          onEndReachedThreshold={0.1}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          contentContainerStyle={AppStyles.flatListContainer}
          data={getDataList()}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => {
            return <EmptyContent />;
          }}
          renderItem={({ item, index }) => (
            <ItemList
              key={index.toString()}
              item={item}
              index={index}
              onPress={() => {
                navigate('HistoryTransaksiDetailScreen', {
                  item,
                })}
              }
            />
          )}
        />
      }
      <SearchByModalComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    backgroundColor: Colors.GRAYF3,
  },
  marketplaceButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  containerSearch: {
    height: 50,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    backgroundColor: Colors.WHITE,
  },
  iconSort: {
    marginTop: 10,
    padding: 12,
  },
  containerInputSearch: {
    ...Fonts.regular,
    flexDirection: 'row',
    flex: 1,
  },
  spinnerContainer: {
    marginVertical: 20,
  },
  textInput: {
    flex: 1,
    fontSize: Fonts.size.extraSmall,
  },
  containerIconSearch: {
    width: 40,
    ...AppStyles.centerContent,
  },
  containerIconSort: {
    width: 110,
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    padding: 15,
  },
  flatListText: {
    padding: 15,
  },
  actionContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 5,
    borderTopWidth: 1,
    borderColor: Colors.GRAYEF,
  },
  searchText: {
    fontWeight: 'bold' ,
    paddingVertical: 20, 
  },
  searchTextTitle: {
    color: Colors.ORANGE,
    paddingRight: 8,
    fontSize: 10,
  }
});

export default ListFishPriceScreen;

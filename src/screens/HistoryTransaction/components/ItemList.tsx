import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ICON_ARROW_DIRECTION, ICON_COPY } from '../../../assets/icon';
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Dot from '../../../uikit/Dot';
import String from '../../../helper/string';
import Fonts from '../../../theme/fonts';

type Props = {
  item: {
    sender_bank: string;
    beneficiary_bank: string;
    created_at: string;
    amount: string;
  };
  index: number;
  onPress: () => void;
};

/**
 *
 * @param item
 * @param index
 * @param onPress
 * @returns {*}
 * @constructor
 */

const ItemList: React.FC<Props> = ({
  item,
  onPress,
  index
}: Props) => {
  const getKeys = Object.keys(item)[0];
  const getValue = Object.values(item)[0];

  const senderBank = getValue?.sender_bank.toUpperCase();
  const beneficiaryBank = getValue?.beneficiary_bank.toUpperCase();
  const beneficiaryName = getValue?.beneficiary_name.toUpperCase()
  const createdAt = getValue?.created_at;
  const price = getValue?.amount;
  const isSuccess = getValue?.status === 'SUCCESS';
  const orderConfig = isSuccess ? {
    backgroundColor: Colors.GREEN50,
  } : {
    backgroundColor: Colors.ORANGE,
  };

  const getMonth = (key) => {
    switch (key) {
      case 0:
        return 'Januari'
      case 1:
        return 'Februari'
      case 2:
        return 'Maret'
      case 3:
        return 'April'
      case 4:
        return 'Mei'
      case 5:
        return 'Juni'
      case 6:
        return 'Juli'
      case 7:
        return 'Agustus'
      case 8:
        return 'September'
      case 9:
        return 'Oktober'
      case 10:
        return 'November'
      case 11:
        return 'Desember'
      default:
        break;
    }
  }

  const date = new Date(createdAt.replace(' ', 'T'));
  const getDate = `${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
  
  return (
    <TouchableOpacity onPress={onPress} key={getKeys.toString()} style={[styles.container, orderConfig]} testID="card-item-order">
      <View style={styles.orderInfoSection}>
        <View style={styles.orderAddressInfo}>
          <Text style={styles.textBank}>{`${senderBank} -> ${beneficiaryBank}`}</Text>
        </View>
        <View style={AppStyles.rowItemsCenterSpace}>
          <View style={AppStyles.rowItemsCenter}>
            <Text style={styles.textColor}>{`${beneficiaryName}`}</Text>
          </View>
          {isSuccess ? (<View style={{
            backgroundColor: Colors.GREEN50,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10
          }}>
            <Text style={styles.textstatusSuccess}>Berhasil</Text>
          </View>) : (
          <View style={{
            borderColor: Colors.ORANGE,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10
          }}>
            <Text style={styles.textstatusOnCheck}>Pengecekan</Text>
          </View>)}
        </View>
        <View style={AppStyles.rowItemsCenter}>
          <Text style={styles.textColor}>{`Rp. ${String.thousandSeparator(price)}  `}</Text>
          <Dot />
          <Text style={styles.textColor}>{`  ${getDate}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  address: {
    marginBottom: 5,
  },
  icon: {
    marginBottom: 5,
  },
  iconChat: {
    padding: 10,
    paddingRight: 20,
  },
  container: {
    borderColor: Colors.GRAYE0,
    borderRadius: 5,
    marginVertical: 10,
  },
  orderInfoSection: { 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    marginLeft: 10,
    backgroundColor: 'white',
  },
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.GRAYE0,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.GRAYE0,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  orderAddressInfo: {
    marginVertical: 1,
  },
  textColor: {
    color: Colors.BLACK_50,
  },
  textBank: {
    color: Colors.BLACK_50,
    fontWeight: 'bold',
  },
  textstatusSuccess: {
    color: Colors.WHITE,
    fontSize: Fonts.size.extraSmall
  },
  textstatusOnCheck: {
    color: Colors.BLACK,
    fontSize: Fonts.size.extraSmall
  },
  iconCopy: {
    marginLeft: 5,
  },
});

export default ItemList;

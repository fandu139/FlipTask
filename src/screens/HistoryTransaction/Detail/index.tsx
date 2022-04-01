import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../../theme/colors';
import { StackScreenProps } from '@react-navigation/stack';
import String from '../../../helper/string';
import AppStyles from '../../../theme/appStyles';
import Divider from '../../../uikit/Divider';

type RootStackParamList = {
  HistoryTransaksiDetailScreen: {
    item: {
      area_kota: string,
      area_provinsi: string,
      komoditas: string,
      price: string,
      size: string,
      tgl_parsed: string,
      timestamp: string,
      uuid: string,
    },
  };
};

type Props = StackScreenProps<RootStackParamList, 'HistoryTransaksiDetailScreen'>;

const HistoryTransaksiDetailScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { item } = route.params;
  const getKeys = Object.keys(item)[0];
  const getValue = Object.values(item)[0];

  const senderBank = getValue?.sender_bank.toUpperCase();
  const beneficiaryBank = getValue?.beneficiary_bank.toUpperCase();
  const beneficiaryName = getValue?.beneficiary_name.toUpperCase()
  const accountNumber = getValue?.account_number
  const remark = getValue?.remark;
  const price = getValue?.amount;
  const fee = getValue?.fee;
  const createdAt = getValue?.created_at;

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
    <View style={styles.container}>
      <Text style={styles.textIDTransaksi}>{`ID TRANSAKSI: #${getKeys}`}</Text>
      <Divider color={Colors.GRAYE0} />
      <View style={[AppStyles.rowItemsCenterSpace, styles.containerDetailTranskasi]}>
        <Text style={[styles.textDescription, styles.textTitle]}>{`DETAIL TRANSAKSI`}</Text>
        <Text style={styles.textClose}>{`TUTUP`}</Text>
      </View>
      <Divider color={Colors.GRAYE0} />
      <Text style={styles.textBank}>{`${senderBank} -> ${beneficiaryBank}`}</Text>
      <View style={AppStyles.rowItemsCenterSpace}>
        <Text style={styles.textTitle}>{`${beneficiaryName}`}</Text>
        <Text style={styles.textTitle}>{`NOMINAL`}</Text>
      </View>
      <View style={AppStyles.rowItemsCenterSpace}>
        <Text style={styles.textDescription}>{`${accountNumber}`}</Text>
        <Text style={styles.textDescription}>{`Rp. ${String.thousandSeparator(price)}`}</Text>
      </View>

      <View style={[AppStyles.rowItemsCenterSpace, styles.containerGap]}>
        <Text style={styles.textTitle}>{`BERITA TRANSFER`}</Text>
        <Text style={styles.textTitle}>{`KODE UNIK`}</Text>
      </View>
      <View style={AppStyles.rowItemsCenterSpace}>
        <Text style={styles.textDescription}>{`${remark}`}</Text>
        <Text style={styles.textDescription}>{`${fee}`}</Text>
      </View>
      <View style={styles.containerGap}>
        <Text style={styles.textTitle}>{'WAKTU DIBUAT'}</Text>
        <Text>{`${getDate}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textIDTransaksi: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerDetailTranskasi: {
    marginVertical: 20,
  },
  containerGap: {
    marginTop: 20,
  },
  textBank: {
    fontWeight: 'bold',
    marginTop: 10,
    marginVertical: 15,
  },
  textTitle: {
    fontWeight: 'bold',
  },
  textDescription: {
    marginBottom: 5,
  },
  icon: {
    marginBottom: 5,
  },
  textClose: {
    fontWeight: 'bold',
    color: Colors.ORANGE
  }
});


export default HistoryTransaksiDetailScreen;

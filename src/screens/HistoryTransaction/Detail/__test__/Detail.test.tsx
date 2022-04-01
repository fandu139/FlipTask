import DetailTransaction from '../index';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Filter screen test', () => {
  describe('Filter screen snapshot test', () => {
    it('should render correctly', () => {
      const navigation = {
        setOptions: jest.fn(),
        replace: jest.fn(),
      };

      const mockedRoute = {
        params: {
          HistoryTransaksiDetailScreen: {
            "item": {
              "FT37089": {
                "account_number":"4645442340",
                "amount":2069579,
                "beneficiary_bank":"bri",
                "beneficiary_name":"Shanice Harwood",
                "completed_at":"2022-04-01 16:16:33",
                "created_at":"2022-03-27 09:16:33",
                "fee":0,
                "id":"FT37089",
                "remark":"sample remark",
                "sender_bank":"bni",
                "status":"SUCCESS",
                "unique_code":698
              },
            },
          },
        },
      };

      const tree = render(<DetailTransaction navigation={navigation as never} route={mockedRoute as never} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

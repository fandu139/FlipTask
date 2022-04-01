import Dot from '../index';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Dot component test', () => {
  describe('Dot snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Dot />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

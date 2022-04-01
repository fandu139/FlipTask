import React from 'react';

interface Context {
  historyTransactionData: any[];
  setHistoryTransactionData: React.Dispatch<React.SetStateAction<any[] | []>>;
}

export const initialAuthContext: Context = {
  historyTransactionData: null,
  setHistoryTransactionData: () => null,
};

const AuthContext = React.createContext<Context>(initialAuthContext);
export default AuthContext;

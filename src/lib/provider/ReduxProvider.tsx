import { persistor, store } from "@/src/redux/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const EProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default EProvider;

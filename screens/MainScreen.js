import * as React from 'react';

import SplitView from '../components/SplitView';
import UserDetailStack from '../stacks/UserDetailStack';
import MainStack from '../stacks/MainStack';
// import useSystemBack from './useSystemBack';
import {useIsTablet} from '../isTabletContext';

const MessageScreenSplit = () => {
//   useSystemBack();

  return (
    <SplitView
      master={<MainStack />}
      detail={<UserDetailStack />}
    />
  );
};

const MessageScreen = () => {
  const [isTablet] = useIsTablet();

  if (isTablet) {
    return <MessageScreenSplit />;
  }

  return <MainStack />;
};

export default MessageScreen;
import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Home, Params, Predictions, Info } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [developers, setDevelopers] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  const [data, setData] = useState({at_least_one:0,at_least_two:0,at_least_three:0})

  const [predictionResult, setPredictionResult] = useState('loading');

  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDataDev() {
      const devel = await bridge.send('VKWebAppGetUserInfo',{user_ids:[313060651, 282954677, 281285708].join(',')})
      setDevelopers(devel.result)
      console.log(devel)
    }
    fetchDataDev();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser}/>
          <Info id="info" developers={developers}/>
          <Params id="params" setPredictionResult = {setPredictionResult} setData={setData}/>
          <Predictions id="predictions" data={data} result={predictionResult}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

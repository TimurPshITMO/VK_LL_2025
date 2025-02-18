import { Button, Div, Flex, FormItem, FormLayoutGroup, Input, Panel, PanelHeader, PanelHeaderBack, Placeholder, Slider, Title} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import { useState } from 'react';
import { PageCPM, PageHours, PagePublishers, PageUsers } from '../formpages';
import { sendRequest } from '../apiRequest';

export const Params = ({ id, setPredictionResult, setData }) => {
  const routeNavigator = useRouteNavigator()

  const [cpm, setCpm] = useState(120);
  const [hourStart, setHourStart] = useState(new Date())
  const [hourEnd, setHourEnd] = useState(new Date())
  const [publishers, setPublishers] = useState(new Array(21).fill(0))
  const changePublisherState = (i, b) =>
    setPublishers(p =>{
      let p_copy = p.slice()
      p_copy[i] = (p_copy[i]+1)%2
      return p_copy
    })
  const [usersIds, setUsersIds] = useState('');
  const usersSet = new Set(usersIds && usersIds.replaceAll(/\s/g,'').replace(/,$/,'').split(','));
  const isUsersValid = /^(,?\d+)*$/.test(usersIds.replaceAll(/\s/g,'').replace(/,$/,''));

  const [page, setPage] = useState('cpm')

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => {
          if (page == 'cpm') routeNavigator.back()
          else if (page == 'hours') setPage('cpm')
          else if (page == 'publishers') setPage('hours')
          else if (page == 'users') setPage('publishers')
        }} />}>
        Параметры
      </PanelHeader>

       {(page == 'cpm')?
        (<PageCPM value = {cpm} setValue = {setCpm} nextAction = {()=>setPage('hours')}/>):
      (page == 'hours')?
        (<PageHours valueStart = {hourStart} setValueStart = {setHourStart} valueEnd = {hourEnd} setValueEnd = {setHourEnd} nextAction = {()=>setPage('publishers')}/>):
      (page == 'publishers')?
        (<PagePublishers value = {publishers} setValue = {changePublisherState} nextAction = {()=>setPage('users')}/>):
      (page == 'users')?
        (<PageUsers value = {usersIds} setValue = {setUsersIds} usersSet={usersSet} isInvalid = {! isUsersValid} 
                    nextAction = {() => {
                      let firstDayHistory = new Date(2024, 10, 25, 0, 0, 0, 0).getTime()
                      let publishersList = [];
                      routeNavigator.replace('/predictions');
                      for (let i=1; i<publishers.length; i++) if (publishers[i]) publishersList.push(i);
                      sendRequest(cpm,
                        Math.floor((hourStart.getTime() - firstDayHistory) / 3600000),
                        Math.floor((hourEnd.getTime() - firstDayHistory) / 3600000),
                        publishersList,
                        usersSet.size,
                        usersIds.replaceAll(/\s/g,'').replace(/,$/,''))
                        .then((e)=>{setPredictionResult(e.result); setData(e.data)})
                        .catch((e)=>console.error(e))
                        .finally((e)=>{setPredictionResult(e.result); setData(e.data)})
                    }}/>):0}
        
      
    </Panel>
  );
};

Params.propTypes = {
  id: PropTypes.string.isRequired,
};

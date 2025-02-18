import { Button, ButtonGroup, Div, Flex, FormItem, FormLayoutGroup, Input, Panel, PanelHeader, PanelHeaderBack, Placeholder, Progress, ScreenSpinner, Slider, Title} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import { useState } from 'react';
import { PageCPM, PageHours, PagePublishers, PageUsers } from '../formpages';

export const Predictions = ({ id, result='loading', data}) => {
  const routeNavigator = useRouteNavigator();


  if (result == 'loading')
    return (
      <Panel id={id} popout={(<ScreenSpinner/>)}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Загрузка...
        </PanelHeader>
      </Panel>
    )

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Результат
      </PanelHeader>

      

      <Flex direction='column' style={{padding:'5%', gap: 50}}>

        <div style={{textAlign:'center'}}>
          Давай взглянем на результат!<br/>
          Ниже преставлены доли пользователей, которые увидят твою рекламу:
        </div>

        <div style={{textAlign:'center'}}>
          <Title style={{fontSize: 50}}>
              <br/>{Math.round(data['at_least_one']*100)}%
          </Title>
          <br/><b>указанных пользователей увидят твое объявление</b>
        </div>
        <FormItem id="progresslabel">
          <Progress aria-labelledby="progresslabel" value={data['at_least_one']*100} height={20}/>
        </FormItem>

        <div style={{textAlign:'center'}}>
          <Title style={{fontSize: 50}}>
              <br/>{Math.round(data['at_least_two']*100)}%
          </Title>
          <br/><b>пользователей увидят его еще раз</b>
        </div>
        <FormItem id="progresslabel">
          <Progress aria-labelledby="progresslabel" value={data['at_least_two']*100} height={20}/>
        </FormItem>
        
        <div style={{textAlign:'center'}}>
          <Title style={{fontSize: 50}}>
              <br/>{Math.round(data['at_least_three']*100)}%
          </Title>
          <br/><b>увидят объявление целых 3 раза!</b>
        </div>
        <FormItem id="progresslabel">
          <Progress aria-labelledby="progresslabel" value={data['at_least_three']*100} height={20}/>
        </FormItem>


        <ButtonGroup mode="vertical" gap='m' align='center' style={{ minWidth: 328 }}>

          <Button onClick={() => {routeNavigator.replace('/params')}} size="l" appearance="accent">
            Попробовать еще раз
          </Button>

          <Button onClick={() => {routeNavigator.back()}} size="l" appearance="accent" mode="tertiary">
            Вернуться в начало
          </Button>

      </ButtonGroup>
      </Flex>
      
    </Panel>
  );
};

Predictions.propTypes = {
  id: PropTypes.string.isRequired,
};

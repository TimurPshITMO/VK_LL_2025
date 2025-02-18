import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Title, ButtonGroup, Text, SimpleGrid, Flex, List, FormItem, PanelHeaderBack } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const Info = ({ id, developers}) => {
  const routeNavigator = useRouteNavigator()

  return (
    <Panel id={id}>
    
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          О нас
        </PanelHeader>
        
      <Flex direction='column' align='center' style={{padding:'5%', gap: 50}}>
      <Avatar src='square.jpg' size={220}/>
      
      <Title>
          {`Quackademic Squad`}
      </Title>

      <div style={{textAlign:'center'}}>
        Если что-то очень сильно не получается - расскажи об этом резиновой уточке
      </div>

      {(developers) && (developers.map) && 
            (developers.map(({ id, first_name, last_name, photo_100 }, i) => {
              return (
                  <Cell key={i} before={<Avatar src={photo_100}/>}>
                    <b>{first_name} {last_name} </b>
                  </Cell>
              );
            }))
        }

        <div style={{textAlign:'center'}}>
          Мы - команда одногруппников 3-го курса Факультета Систем Управления и Робототехники
          <br/><br/>
          Почему утки? Потому что общеизвестный мем
          <br/><br/>
          Почему академик? В дань уважения отмученному курсу продмата
          <br/><br/>
          Почему ∀ε{'>'}0 ∃δ, а у меня до сих пор нет девушки? Хороший вопрос...
          
        </div>
        
        <ButtonGroup mode="vertical" gap='m' align='center' style={{ minWidth: 328 }}>

        <Button onClick={() => routeNavigator.replace('/')} size="l" stretched appearance="accent" mode="tertiary">
          Назад
        </Button>

        </ButtonGroup>
      </Flex>
    </Panel>
  );
}

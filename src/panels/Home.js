import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Title, ButtonGroup, Text, SimpleGrid, Flex } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const Home = ({ id, fetchedUser}) => {
  const routeNavigator = useRouteNavigator()
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  return (
    <Panel id={id}>

      <Flex direction='column' align='center' style={{padding:'20% 5%', gap: 50}}>
        <Title>
          {`Привет, ${fetchedUser ? first_name : 'мир'}!`}
        </Title>

        <div style={{textAlign:'center'}}>
          Ты находишься в презентационном мини-приложении команды <b>Quackademic Squad</b>!
          <br/><br/>
          Здесь ты можешь вживую увидеть результат проделанной нами работы
          <br/><br/>
          Просто нажми "Предсказать рекламные охваты" и следуй инструкциям)
        </div>
        
        <ButtonGroup mode="vertical" gap='m' align='center' style={{ minWidth: 328 }}>

          <Button onClick={() => {routeNavigator.push('params')}} size="l" appearance="accent">
            Предсказать рекламные охваты
          </Button>

          <Button onClick={() => {routeNavigator.push('info')}} size="l" appearance="accent" mode="tertiary">
            Узнать подробнее о нас
          </Button>

        </ButtonGroup>
      </Flex>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

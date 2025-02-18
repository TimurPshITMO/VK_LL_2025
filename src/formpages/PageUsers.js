import { Icon12ArrowDown } from "@vkontakte/icons";
import { Button, Div, Flex, FormItem, FormLayoutGroup, Input, Popover, Slider, Title } from "@vkontakte/vkui";
import { useState } from "react";

export const PageUsers = ({value, setValue, isInvalid, usersSet, nextAction}) =>{
  
  const [randomizeSize, setRandomizeSize] = useState(1000)
  const randomizeButton = (
  <Flex justify='end'>
  <Button mode='outline' style={{borderRadius:'7px 0px 0px 7px', height: 30}}
          onClick={()=>{
            if (!(randomizeSize<1) && !(randomizeSize>=5000)){
              let randomizedArray=[];
              for (let i=0; i<randomizeSize; i++) randomizedArray.push(Math.round(Math.random()*27768))
              setValue(randomizedArray.join(', '))
            }
          }}>Сгенерировать</Button>
  <Popover
    trigger="click"
    role="dialog"
    aria-describedby="dialog-2"
    aria-label="Форма отправки сообщения"
    content={({ onClose }) => (
      <FormLayoutGroup>
        <FormItem top="Размер генерируемой выборки"
            status={((randomizeSize<1) | (randomizeSize>=5000)) ? 'error' : 'valid'}
            bottom={((randomizeSize<1) || (randomizeSize>=5000)) && '1-5000'}>
          <Input type='number' value={randomizeSize} onChange={(e)=>setRandomizeSize(e.target.value)}/>
        </FormItem>
      </FormLayoutGroup>
    )}
  >
    <Button id="dialog-2" mode='outline' before={(<Icon12ArrowDown/>)} style={{borderRadius:'0px 7px 7px 0px', height:30}}/>
  </Popover>
  </Flex>)

  return (<Flex direction='column' style={{padding:'10% 5%', gap: 50}}>
          
            <div style={{textAlign:'center'}}>
              Ну и, наконец, подберем ЦА... Ты ведь знаешь, кому показывать свои объявления?)<br/>
              Можешь ввести их id вручную через запятую в поле ниже, либо сгенерировать их случайно<br/>
              P.S.: В датасете users 27769 пользователей (id - целые числа от 0 до 27768 включительно) <br/>
            </div>
            
            <div style={{textAlign:'center'}}>
            <Title style={{fontSize: 50}}>
                <br/><br/>{usersSet ? usersSet.size : 0}
            </Title>
            <br/><b>уникальных пользователей</b>
            </div>

            <FormLayoutGroup mode='vertical'>
              <FormItem>{randomizeButton}</FormItem>
              <FormItem htmlFor="users" top="Пользователи"
                status={isInvalid ? 'error' : 'valid'}
                bottom={isInvalid && 'Поле должно содержать только неотрицательные числа, перечисленные через запятую'}> 
                <Input
                  id="users"
                  type="text"
                  placeholder="0, 1, 2, ..., 27768"
                  value={value}
                  onChange={e=>setValue(e.target.value)}
                />
              </FormItem>
              <br/>
              <FormItem>
                  <Button type="submit" size="l" stretched appearance="accent" mode='secondary' onClick={nextAction} disabled={isInvalid}>
                    Далее
                  </Button>
              </FormItem>
    
            </FormLayoutGroup>
          </Flex>)
}
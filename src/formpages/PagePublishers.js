import { Avatar, Button, Cell, Flex, FormItem, FormLayoutGroup, SimpleGrid, Slider, Title } from "@vkontakte/vkui";

export const PagePublishers = ({value, setValue, nextAction}) =>
{
  const cells = [];
  for (let i=1; i<=21; i++) cells.push((<Cell key = {"c"+i} mode="selectable" checked={value[i-1]}
                                              onChange={(b)=>setValue(i-1, b)}>Площадка {i}</Cell>))
  
  return (<Flex direction='column' style={{padding:'5% 5%', gap: 50}}>
          
            <div style={{textAlign:'center'}}>
              Где бы ты хотел разместиться?<br/>
              Учитывая абстрактность названия площадок внутри датасетов (они обозначены лишь числами), 
              названия здесь также являются исключительно номинальными<br/>
            </div>
    
            <FormLayoutGroup mode='vertical'>

              <SimpleGrid columns={2} >
                {cells}
              </SimpleGrid>
              <br/>
              <FormItem>
                  <Button type="submit" size="l" stretched appearance="accent" mode='secondary' onClick={nextAction}>
                    Далее
                  </Button>
              </FormItem>
    
            </FormLayoutGroup>
          </Flex>)}
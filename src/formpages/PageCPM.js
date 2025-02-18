import { Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Slider, Title } from "@vkontakte/vkui";

export const PageCPM = ({value, setValue, nextAction}) =>
          (<Flex direction='column' style={{padding:'15% 5%', gap: 50}}>
          
            <div style={{textAlign:'center'}}>
              Начнем с простого (но очень важного)<br/>
              Введи cpm - цену, которую ты готов заплатить за 1000 показов рекламы<br/>
            </div>
            <FormLayoutGroup mode='vertical'>
              <div style={{textAlign:'center'}}>
                <Title style={{fontSize: 50}}>
                    <br/>{value}
                </Title>
                <br/><b>Cost Per Mille</b>
              </div>
    
              <FormItem htmlFor="cpm" top="cpm"> 
                <Slider
                  step={1}
                  min={1}
                  max={500}
                  value={Number(value)}
                  onChange={setValue}
                />
              </FormItem>
              <br/>
              <FormItem>
                <Button type="submit" size="l" stretched appearance="accent" mode='secondary' onClick={nextAction}>
                  Далее
                </Button>
              </FormItem>
    
            </FormLayoutGroup>
          </Flex>)
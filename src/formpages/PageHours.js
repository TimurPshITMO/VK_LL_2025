import { Button, DateInput, Flex, FormItem, FormLayoutGroup, Slider, Title } from "@vkontakte/vkui";

export const PageHours = ({valueStart, setValueStart, valueEnd, setValueEnd, nextAction}) =>
  { const startAfterEnd = (valueEnd.getTime() < valueStart.getTime())

    return  (<Flex direction='column' style={{padding:'10% 5%', gap: 20}}>
          
            <div style={{textAlign:'center'}}>
              Теперь определимся с временными рамками<br/>
              Укажи дату начала и дату окончания размещения рекламы на аукционах<br/>
              <b>P.S.:</b> Минуты не учитываются в выборе времени<br/>
            </div>

            <div style={{textAlign:'center'}}>
            <Title style={{fontSize: 50}}>
                <br/>{Math.max(0, Math.floor((valueEnd.getTime() - valueStart.getTime()) / 3600000))}
            </Title>
            <br/><b>часов всего</b>
            </div>
    
            <FormLayoutGroup mode='vertical'>
    
    
              <FormItem htmlFor="hour_start" top="Время начала"
                        status={startAfterEnd ? 'error' : 'default'}> 
                <DateInput
                  id="dateStart"
                  value={valueStart}
                  onChange={(t)=>t?setValueStart(t):setValueStart(new Date())}
                  enableTime={true}
                  disablePast={true}
                  closeOnChange={true}
                />
              </FormItem>

              <FormItem htmlFor="hour_end" top="Время окончания"
                        status={startAfterEnd ? 'error' : 'default'}
                        bottom={startAfterEnd && 'Время окончания должно быть после времени старта!'}> 
                <DateInput
                  id="dateEnd"
                  value={valueEnd}
                  onChange={(t)=>t?setValueEnd(t):setValueEnd(new Date())}
                  enableTime={true}
                  disablePast={true}
                  closeOnChange={true}
                />
              </FormItem>


              <br/>
              <FormItem>
                  <Button type="submit" size="l" stretched appearance="accent" mode='secondary' onClick={nextAction} disabled={startAfterEnd}>
                    Далее
                  </Button>
              </FormItem>
    
            </FormLayoutGroup>
          </Flex>)}
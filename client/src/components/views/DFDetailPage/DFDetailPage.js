import React,{useState,useEffect} from 'react'
import {Typography, Button, Form,  Input ,Card, Avatar, Col,Row , Descriptions , Tabs} from 'antd'
import {DF_KEY,ServerOptions,GradeOptions} from '../../Config'
import './DF.css'
import moment from 'moment';
const { TextArea } = Input;
const { Title } = Typography;
const {TabPane} = Tabs;
function DFDetailPage(props) {
    const nowTime = moment().format('YYYY-MM-DD HH:mm');
    const characterId = props.match.params.characterId;
    const serverId = props.match.params.serverId;
    const [Basic, setBasic] = useState([])
    const [Timeline, setTimeline] = useState([])
    const [TimelineRow, setTimelineRow] = useState([])
    const [StatusRow, setStatusRow] = useState([])
    const [Equipment, setEquipment] = useState([])
    const [Date, setDate] = useState([])
    const [StartDate, setStartDate] = useState("")
    const [EndDate, setEndDate] = useState("")
    const [EndNumber, setEndNumber] = useState(0)
    const [StartNumber, setStartNumber] = useState(30)
    useEffect(() => {
        console.log()
        setStartDate(moment(nowTime).subtract(StartNumber,'d').format('YYYY-MM-DD HH:mm'))
        setEndDate(moment(nowTime).subtract(EndNumber,'d').format('YYYY-MM-DD HH:mm'))
        const endpoint = `/df/servers/${serverId}/characters/${characterId}/timeline?limit=10&startDate=${StartDate}&endDate=${EndDate}&code=402,403,404,405,406,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520&apikey=${DF_KEY}`
        fetchDatas(endpoint,1)
        const endpoint2 = `/df/servers/${serverId}/characters/${characterId}/status?apikey=${DF_KEY}`
        fetchDatas(endpoint2,3)
        const endpoint3 = `/df/servers/${serverId}/characters/${characterId}/equip/equipment?apikey=${DF_KEY}`
        fetchDatas(endpoint3,4)

    }, [])
    const fetchDatas = (endpoint,num) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
          
            if(num===1){
                setBasic(response)
                setDate(response.timeline.date)
                setTimeline(response.timeline)
                setTimelineRow([...TimelineRow,...response.timeline.rows])
     
            }else if(num===2){
               setTimeline(response.timeline)
               setDate(response.timeline.date)
               setTimelineRow(response.timeline.rows)
            }else if(num===3){
                setStatusRow(response.status)
            }
            else if(num===4){
              setEquipment(response.equipment)
              console.log(response.equipment)
            }
            
        })
    }
 
    const loadMoreItems = () => {
        const endpoint = `/df/servers/${serverId}/characters/${characterId}/timeline?next=${Timeline.next}&apikey=${DF_KEY}`;
        if(Timeline.next !==null){
            fetchDatas(endpoint,1)
        }else{
           
            const st = StartNumber+30;
            const ed = EndNumber+30;
            setStartNumber(st)
            setEndNumber(ed)
            setStartDate(moment(nowTime).subtract(st,'d').format('YYYY-MM-DD HH:mm'))
            setEndDate(moment(nowTime).subtract(ed,'d').format('YYYY-MM-DD HH:mm'))
            const a = moment(nowTime).subtract(st,'d').format('YYYY-MM-DD HH:mm');
            const b = moment(nowTime).subtract(ed,'d').format('YYYY-MM-DD HH:mm');
            const endpoint2 = `/df/servers/${serverId}/characters/${characterId}/timeline?limit=10&startDate=${a}&endDate=${b}&code=402,403,404,405,406,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520&apikey=${DF_KEY}`
            fetchDatas(endpoint2,2)
        }
    }
    return (
        <div>
        <div style={{ textAlign:'center', marginTop:'2rem'}}>
                <Title level={2} ><a href="/df">DUNCHANG</a></Title>
        </div> 
        <div align="center"style={{ position: 'relative'}}>
                <img style={{width: '300px'  }} src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`} alt=""  /><br/>
                <span>LV.{Basic.level}/{Basic.jobGrowName}/{ServerOptions.find(server => server.value===serverId).label}</span><br/>
                <span>길드 : {Basic.guildName}</span> <br/>
                <span>모험단 : {Basic.adventureName}</span><br/>
                <span style={{fontSize:'16px',fontWeight:'bold'}}>{Basic.characterName}</span>

        </div>
        
        <Tabs defaultActiveKey="1">
        
        <TabPane tab="능력치" key="1" >
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
        <Title level={3}>능력치</Title>
       
        <div style={{width:"50%", paddingTop:'1rem'}}>
        <Descriptions bordered >
                 {StatusRow && StatusRow.map((status,index)=> (
                     <Descriptions.Item label={status.name} key={index}>{status.value}</Descriptions.Item>
                 ))}
         </Descriptions>
         </div>
         </div>
        </TabPane>
        <TabPane tab="타임라인" key="2" >
                <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
                <Title level={3}>타임 라인</Title>
                <Title level={4} style={{paddingBottom:'1rem', paddingLeft:'0.5rem'}}><span className="datetime">{Date.start}</span> 부터 <span className="datetime">{Date.end}</span> 결과 입니다.</Title>
                </div>
             
              
                <table style={{marginRight:'auto',marginLeft:'auto' }}>
                <tbody>
                {TimelineRow && TimelineRow.map((row,index) => (  
                <tr key={index}> 
                <td>
                
                    {(row.code===513 || row.code===505 || row.code===504) &&
                    <div>{row.date}<br/>
                    {row.code !== 504 ? `${row.data.dungeonName}에서 (${row.data.itemRarity})${row.data.itemName} ${row.name}`:`(${row.data.itemRarity})${row.data.itemName} ${row.name}`}
                    </div>}
                    {row.code===207 &&
                        <div>{row.date}<br/>
                        {row.data.guide? `(가이드)${row.name}` :`${row.name}`}
                        </div>}
                    {row.code===201 &&
                        <div>{row.date}<br/>
                        {row.data.guide ? `(가이드)${row.data.raidName} ${row.name} 클리어` : (row.data.squad ? `${row.data.raidName} ${row.name} 스쿼드 클리어`: (row.data.phaseName? `${row.data.raidName} ${row.name} ${row.data.phaseName} 클리어`:`${row.data.raidName} ${row.name} 클리어`))}
                        </div>}
                    {(row.code===406 || row.code===510 || row.code==405) &&
                        <div>{row.date}<br/>
                        ({row.data.itemRarity}){row.data.itemName} {row.name}
                        </div>}
                    {(row.code===401 || row.code===402 || row.code==403 || row.code==404) &&
                        <div>{row.date}<br/>
                        {`(${row.data.itemRarity})${row.data.itemName} +${row.data.after} ${row.name}`}{row.data.result?"에 성공 하였습니다":"에 실패 하였습니다"}
                        </div>}
                    {row.code===501 &&
                        <div>{row.date}<br/>
                        {row.data.booster? `봉인된 자물쇠에서 ${row.data.itemName}를 2배로 획득`:`봉인된 자물쇠에서 ${row.data.itemName}를 획득`}
                        </div>}
                </td>
                </tr>
                
                
            )
                )}
                </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}> 더보기</button>
            </div>
        </TabPane>
        <TabPane tab="장착장비" key="3">
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
                <Title level={3}>장착 장비</Title>
               
                </div>
        <div style={{border:'1px solid #dedede' , width:'40%', position:'relative' , left:"30%",right:"30%"}}>
        <table style={{width:"98%"}}>
            <tbody>
            {Equipment.map((row,index) => (
                
                <tr key={index}>
                    <td style={{width:'6%'}}><span style={{position:'absolute', fontSize:'8px',zIndex:1,color:'white',paddingLeft:'2px'}}>{row.itemRarity}</span><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="48px" height="48px"/></td>
                    <td style={{width:'47%'}}><span style={row.itemRarity!=="신화"?{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}:{color:GradeOptions.find(grade => grade.value===row.itemRarity).label,background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{row.itemName}</span><br/>
                        {row.enchant.status.map((status,index) => (
                            <span style={{paddingRight:'0.3rem' ,fontSize:'12px'}} key={index}>{status.name+"+"+status.value}</span>
                        ))}
                    </td>
                    <td style={{width:'47%',textAlign:'right'}}><span>{row.reinforce !==0 ? "+"+row.reinforce+(row.amplificationName!==null? "증폭":(row.remodelInfo?"개조":"강화")):""}</span><span>{row.refine !==0 ? `(${row.refine})`:""}</span>
                    
                    </td>
                   
                    
                </tr> 
                
            ))}
            </tbody>
        </table>
        </div>
        </TabPane>
        </Tabs>      
        </div>
    )
}

export default DFDetailPage

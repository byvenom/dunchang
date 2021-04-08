import React,{useState,useEffect} from 'react'
import {Typography, Descriptions , Tabs} from 'antd'
import {DF_KEY,ServerOptions,GradeOptions} from '../../Config'
import './DF.css'
import moment from 'moment';
import backimg from './img/back_image.png'
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

    const [Avatar, setAvatar] = useState([])
    const [Date, setDate] = useState([])
    const [SkillBuff_a, setSkillBuff_a] = useState([])
    const [SkillBuff_b, setSkillBuff_b] = useState([])
    const [SkillBuff_c, setSkillBuff_c] = useState([])
    const [SkillBuff_i, setSkillBuff_i] = useState([])
    const [SkillBuff_l, setSkillBuff_l] = useState([])
    const [StartDate, setStartDate] = useState("")
    const [EndDate, setEndDate] = useState("")
    const [EndNumber, setEndNumber] = useState(0)
    const [StartNumber, setStartNumber] = useState(30)
    useEffect(() => {
        const api = `/df/servers/${serverId}/characters/${characterId}`
        setStartDate(moment(nowTime).subtract(StartNumber,'d').format('YYYY-MM-DD HH:mm'))
        setEndDate(moment(nowTime).subtract(EndNumber,'d').format('YYYY-MM-DD HH:mm'))
        const endpoint1 = `${api}/timeline?limit=10&startDate=${StartDate}&endDate=${EndDate}&code=402,403,404,405,406,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520&apikey=${DF_KEY}`
        fetchDatas(endpoint1,1)
        const endpoint3 = `${api}/status?apikey=${DF_KEY}`
        fetchDatas(endpoint3,3)
        const endpoint4 = `${api}/equip/equipment?apikey=${DF_KEY}`
        fetchDatas(endpoint4,4)
        const endpoint5 = `${api}/equip/avatar?apikey=${DF_KEY}`
        fetchDatas(endpoint5,5)
        const endpoint6 = `${api}/skill/buff/equip/equipment?apikey=${DF_KEY}`
        fetchDatas(endpoint6,6)
        const endpoint7 = `${api}/skill/buff/equip/avatar?apikey=${DF_KEY}`
        fetchDatas(endpoint7,7)
        const endpoint8 = `${api}/skill/buff/equip/creature?apikey=${DF_KEY}`
        fetchDatas(endpoint8,8)

    }, [])
    const fetchDatas = (endpoint,num) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
          
            if(num===1&&response.timeline){
                setBasic(response)
                setDate(response.timeline.date)
                setTimeline(response.timeline)
                setTimelineRow([...TimelineRow,...response.timeline.rows])
     
            }else if(num===2&&response.timeline){
               setTimeline(response.timeline)
               setDate(response.timeline.date)
               setTimelineRow(response.timeline.rows)
            }else if(num===3){
                setStatusRow(response.status)
            }
            else if(num===4&&response.equipment){
             
              setEquipment(response.equipment)
            }
            else if (num ===5){
                if(response.avatar){
                setAvatar(response.avatar)
                }
            }
            else if (num ===6 && response.skill.buff ){
               
                setSkillBuff_a(response.skill.buff.equipment)
                setSkillBuff_i(response.skill.buff.skillInfo)
                setSkillBuff_l(response.skill.buff.skillInfo.option)
               
                
            }else if(num ===7 && response.skill.buff){
          
                setSkillBuff_b(response.skill.buff.avatar)
              
                
            }else if(num ===8&&response.skill.buff){
                
                setSkillBuff_c(response.skill.buff.creature)
                
            }
            
        })
    }
 
    const loadMoreItems = () => {
        const endpoint1 = `/df/servers/${serverId}/characters/${characterId}/timeline?next=${Timeline.next}&apikey=${DF_KEY}`;
        if(Timeline.next !==null){
            fetchDatas(endpoint1,1)
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
                <Title level={2} ><a href="/dunfa">DUNCHANG</a></Title>
        </div> 
        <div align="center" style={{ position: 'relative'}}>
                <img style={{width: '300px' ,backgroundImage: `url("${backimg}")`,backgroundSize:'cover',backgroundPosition:'center'}} src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`} alt=""  /><br/>
                <span>LV.{Basic.level}/{Basic.jobGrowName}/{ServerOptions.find(server => server.value===serverId).label}</span><br/>
                <span>길드 : {Basic.guildName}</span> <br/>
                <span>모험단 : {Basic.adventureName}</span><br/>
                <span style={{fontSize:'16px',fontWeight:'bold'}}>{Basic.characterName}</span>

        </div>
        
        <Tabs defaultActiveKey="1">
        
        <TabPane tab="능력치" key="1" >
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
        <Title level={3}>능력치</Title>
       
        <div style={{width:"50%", paddingTop:'1rem',minWidth:'460px'}}>
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
                <Title level={4} style={{paddingBottom:'1rem', paddingLeft:'0.5rem'}}><span style={{background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{Date.start}</span> ~ <span style={{background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{Date.end}</span> 결과 입니다.</Title>
                </div>
             
              
                <table style={{marginRight:'auto',marginLeft:'auto' }}>
                <tbody>
                {TimelineRow && TimelineRow.map((row,index) => (  
                <tr key={index} className="timeline"> 
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
                    {(row.code===406 || row.code===510 || row.code===405) &&
                        <div>{row.date}<br/>
                        ({row.data.itemRarity}){row.data.itemName} {row.name}
                        </div>}
                    {(row.code===401 || row.code===402 || row.code===403 || row.code===404) &&
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
        <div >
        <table align="center" style={{width:'40%',border:'1px solid #dedede' ,minWidth:'460px'}}>
            <tbody>
            {Equipment &&Equipment.map((row,index) => (
                
                <tr key={index}>
               
                    <td style={{width:'6%'}}><span style={{position:'absolute', fontSize:'8px',zIndex:1,color:'white',paddingLeft:'2px'}}>{row.itemRarity}</span><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="48px" height="48px" alt=""/></td>
                    <td style={{width:'64%'}}><span style={row.itemRarity!=="신화"?{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}:{color:GradeOptions.find(grade => grade.value===row.itemRarity).label,background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{row.itemName}</span><br/>
                        {row.enchant&&row.enchant.reinforceSkill ===null &&row.enchant.status.map((status,i) => (
                            <span style={{paddingRight:'0.3rem' ,fontSize:'12px'}} key={i}>{status.name+"+"+status.value}</span>
                        ))}
                        {
                            row.enchant&& row.enchant.reinforceSkill &&
                            <span style={{paddingRight:'0.3rem' ,fontSize:'12px'}} >{row.enchant.reinforceSkill[0].skills[0].name+"+"+row.enchant.reinforceSkill[0].skills[0].value}</span>
                            
                        }
                    </td>
                    <td style={{width:'30%',textAlign:'right'}}><span>{row.reinforce !==0 ? "+"+row.reinforce+(row.amplificationName!==null? "증폭":(row.remodelInfo?"개조":"강화")):""}</span><span>{row.refine !==0 ? `(${row.refine})`:""}</span>
                    
                    </td>
                   
                    
                </tr> 
                
            ))}
            </tbody>
        </table>
        </div>
        </TabPane>
        <TabPane tab="아바타" key="4">
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
                <Title level={3}>아바타</Title>
               
                </div>
        <div>
        <table align="center" style={{border:'1px solid #dedede',width:"40%",minWidth:'460px'}}>
            <tbody>
            {Avatar.map((row,index) => (
                
                <tr key={index}>
                    <td style={{width:'9%' , minWidth:'69px'}}>
                    <span style={{fontSize:'20px',fontWeight:'bold'}}>{row.slotName.split(' ')[0]}</span>
                    </td>
                    <td style={{width:'7%'}}><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="36px" height="36px" alt=""/></td> 
                    <td style={{width:'84%'}}><span style={{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}}>{row.itemName}</span>
                    {row.emblems && row.emblems.map((emblem,index) => (
                        <div key={index} style={{fontSize:'12px',color:GradeOptions.find(grade => grade.value===emblem.itemRarity).label}}>{emblem.itemName}</div> 
                    ))}
                    </td>
                   
                    
                </tr> 
                
            ))}
            </tbody>
        </table>
        </div>
        </TabPane>
        <TabPane tab="버프강화" key="5">
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
                <Title level={3}>버프강화</Title>
               
        </div>
        <div align="center" style={{paddingBottom:'0.5rem'}}>
        {SkillBuff_i.name &&<div align="right" style={{width:'40%',background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',minWidth:'460px'}}><p style={{border:'5px solid transparent',borderImage:'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',borderImageSlice:'1',width:'17%',fontSize:'16px',padding:'3px',minWidth:'130px'}}>{SkillBuff_i.name +" LV."+SkillBuff_l.level}</p></div>
                    }
        <br/>
        
        
        </div>               
        <div align="center" style={{paddingTop:'1rem',paddingBottom:'0.5rem'}}>
        {SkillBuff_a.length !==0 &&<div align="left" style={{width:"40%",fontWeight:'bold',minWidth:'460px'}}>장비</div>}
        </div>
        <div>
        <table align="center" style={{border:'1px solid #dedede',width:"40%",minWidth:'460px'}}>
            <tbody>
            {SkillBuff_a && SkillBuff_a.map((row,index) => (  
                <tr key={index}>
                    <td style={{width:'6%'}}><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="36px" height="36px" alt=""/></td>
                    <td>
                        <span style={row.itemRarity!=="신화"?{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}:{color:GradeOptions.find(grade => grade.value===row.itemRarity).label,background:'-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{row.itemName}</span>
                    </td>   
                </tr>       
            ))}
            </tbody>
        </table>
        </div>
        <div align="center" style={{paddingTop:'0.5rem',paddingBottom:'0.5rem'}}>
        {SkillBuff_b.length !==0 &&<div align="left" style={{width:"40%",fontWeight:'bold',minWidth:'460px'}}>아바타</div>}
        </div>
        <div >
        <table align="center" style={{width:"40%", minWidth:'460px',border:'1px solid #dedede'}}>
            <tbody>
            {SkillBuff_b && SkillBuff_b.map((row,index) => (
                <tr key={index}>
                    <td style={{width:'6%'}}><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="36px" height="36px" alt=""/></td>
                    <td>
                        <span style={{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}}>{row.itemName}</span>
                        {row.emblems.map((emblem,index) => (
                            <div key={index} style={{fontSize:'12px',color:GradeOptions.find(grade => grade.value===emblem.itemRarity).label}}>{emblem.itemName}</div> 
                        ))}
                    </td>            
                </tr>  
            ))}
            </tbody>
        </table>
        </div>
        <div align="center" style={{paddingTop:'0.5rem',paddingBottom:'0.5rem'}}>
        {SkillBuff_c.length !==0 &&<div align="left" style={{width:"40%",fontWeight:'bold',minWidth:'460px'}}>크리쳐</div>}
        </div>
        <div>
        <table align="center" style={{width:"40%",border:'1px solid #dedede',minWidth:'460px'}}>
            <tbody>
            {SkillBuff_c &&SkillBuff_c.map((row,index) => (
                
                <tr key={index}>
                    <td style={{width:'6%'}}><img src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} width="36px" height="36px" alt=""/></td>
                    <td>
                        <span style={{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}}>{row.itemName}</span>
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

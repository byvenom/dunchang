import React,{useState} from 'react'
import {Typography, Button, Form,  Input ,Card, Avatar, Col,Row} from 'antd'
import {DF_KEY,ServerOptions} from '../../Config'


const { Title } = Typography;
const { Meta} = Card;


function DFPage() {
    
   
    const [Server, setServer] = useState("all")
    const [Name, setName] = useState("")
    const [rows, setrows] = useState([])
    const [Status, setStatus] = useState("none")
    const [SearchName, setSearchName] = useState("")
  
    const onServerChange = (e) => {
        setServer(e.currentTarget.value)
    }
    const onNameChange = (e) => {
        setName(e.currentTarget.value)
    }
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setrows(response.rows)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `/df/servers/${Server}/characters?characterName=${Name}&apikey=${DF_KEY}&wordType=full&limit=200`;
        fetchMovies(endpoint)
        setStatus("")
        setSearchName(Name)
    }
    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            loadMoreItems();
        }
    }
    const renderCards = rows?rows.map((row,index) =>{
        var characterNames = row.characterName;
        var characterIds = row.characterId;
        var jobGrowNames = row.jobGrowName;
        var levels =row.level;
        var serverIds = row.serverId;
       
        return <React.Fragment key={index}><Col lg={6} md={8} xs={24}>
                <a href={`/df/detail/${serverIds}/${characterIds}`}>
                <div style={{ position: 'relative'}}>
                <img style={{width: '100%'  }} src={`https://img-api.neople.co.kr/df/servers/${serverIds}/characters/${characterIds}?zoom=1`} alt=""  />
                </div>
                </a>
                <br/>
                <div align="center">
                <span style={{ fontSize:"16px" , fontWeight:"bold"}}>{characterNames}</span>
                <br/>
                <span style={{paddingTop:"5px"}}>LV.{levels}/{jobGrowNames}/{ServerOptions.find(server => server.value===serverIds).label}</span>
                </div>
                </Col>
                </React.Fragment>
    }) : <div align="center" style={{paddingTop: '2rem'}}><b style={{fontSize:'24px'}}>점검중입니다.</b></div>
    return (
        <div style={{ maxWidth:'1200px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}><a href="/df">DUNCHANG</a></Title>
            </div> 
                <Form>

            <div style={{display:Status, textAlign:'center'}}>
                <Title level={4}>{SearchName}에 대한 검색 결과입니다.</Title>
            </div>
            <div align="center" >
            
            <br/>
            <select defaultValue="all" style={{width:"100px" , height:"30px"}} onChange={onServerChange} >
                {ServerOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
             
            </select>
            <Input style={{width:200}} placeholder="캐릭터명" onChange={onNameChange} value={Name} onKeyPress={onKeyPress}/>
            <Button type="primary" onClick={loadMoreItems}>
                검색
            </Button>
            </div>
                </Form>
                <Row gutter={[32, 16]}>
                {renderCards}
                
                </Row>
             
            
        </div>
    )
}

export default DFPage

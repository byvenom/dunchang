import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd'
import Axios from 'axios';


const {TextArea} = Input;
const { Title} = Typography;



function NewsSearchPage(props) {
    
    

    const [SearchText, setSearchText] = useState("")
    const [Search, setSearch] = useState("");
    const [SearchBox, setSearchBox] = useState([]);
    const [Start, setStart] = useState(1);
    const [Toggle, setToggle] = useState("none");
    const onSearchTextChange = (e) => {
        setSearchText(e.currentTarget.value)
    }
   
    
    
      
    const onSubmit = () =>{
        
        if(SearchText == ""){
            message.error("검색어를 입력해주세요!!")
            return
        }
        setSearch(SearchText);
        setToggle("");
        const variables = {
            text: SearchText,
            start: Start
        }
        Axios.post('/api/naver/newssearch',variables)
        .then(response => {
            setSearchBox(response.data.items)
           
        })

    }
    const onKeyPress = (e) => {
        e.preventDefault();
        if(e.key === 'Enter'){
            onSubmit();
        }
    }

    const loadMoreItems = () => {
        setStart(Start+10)
        const variables2 = {
            text: Search,
            start: Start
        }
        Axios.post('/api/naver/newssearch',variables2)
        .then(response => {
            setSearchBox([...SearchBox,...response.data.items])
           
        })
    }

 
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>뉴스 검색</Title>
            </div> 
                <Form onSubmit={onSubmit}>
                      
            <label>검색어</label>
            <Input
                onChange={onSearchTextChange}
                value={SearchText}
                onKeyPress={onKeyPress}
            />
            <br/>
            <br/>
            <div align="center">
            <Button type="primary" size="large" onClick={onSubmit}>
               검색
            </Button>
            </div>
            <br/>
            <div style={{display:Toggle}}>
            <label>{Search} 검색 결과</label>
            <div>
            {SearchBox.map((item,index)=> (
                <div key={index}>
                <a href={item.link} target="_blank"><div dangerouslySetInnerHTML={{__html:item.title}} ></div></a>
                <div dangerouslySetInnerHTML={{__html:item.description}}></div>
                </div>
            ))}
            
            </div>
            <br/>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button type="link" size="large" onClick={loadMoreItems}> 더보기</Button>
            </div>
           
            </div>
                </Form>
            
            
        </div>
    )
}

export default NewsSearchPage

import React,{useState,useRef} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd'
import Axios from 'axios';


const {TextArea} = Input;
const { Title} = Typography;



function ShortUrlPage(props) {
    
    const textInput = useRef();

    const [AllUrl, setAllurl] = useState("")
    const [ResultUrl, setResulturl] = useState("")
    const [Toggle,setToggle] = useState("none")
    const onAllUrlChange = (e) => {
        setAllurl(e.currentTarget.value)
    }
    const onResultUrlChange = (e) => {
        setResulturl(e.currentTarget.value)
    }
    
    
      
    const onSubmit = () =>{
     
       
       
        const variables = {
            url: AllUrl,
        }
        Axios.post('/api/naver/url',variables)
        .then(response => {
            
            if(!response.data==""){
                message.success('URL 단축에 성공하였습니다.')
                setToggle("");
                setResulturl(response.data.result.url)
            }else{
                message.error('잘못된 URL입니다. 확인해주세요!!')
            }
        })

    }
    const onKeyPress = (e) => {
      
        if(e.key === 'Enter'){
            onSubmit();
        }
    }

    const copy = (e) => {
        e.preventDefault();
        const el = textInput.current
        el.select()
        document.execCommand("copy")
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>URL 단축</Title>
            </div> 
                <Form onSubmit={onSubmit}>
                      
            <label>URL</label>
            <Input
                onChange={onAllUrlChange}
                value={AllUrl}
                onKeyPress={onKeyPress}
            />
            <br/>
            <br/>
            <div align="center">
            <Button type="primary" size="large" onClick={onSubmit}>
                변환
            </Button>
            </div>
            <br/>
            <div style={{display:Toggle}}>
            <label>RESULT</label>
            <Input
                onChange={onResultUrlChange}
                value={ResultUrl}
                ref={textInput}
                readOnly
            />
            <br/>
            <br/>
            <div align="center">
            <Button type="primary" size="small" onClick={copy}>copy</Button>
            </div>
            </div>
                </Form>
            
            
        </div>
    )
}

export default ShortUrlPage

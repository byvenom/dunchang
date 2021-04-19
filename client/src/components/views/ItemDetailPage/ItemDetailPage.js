import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {Typography, Descriptions , Tabs} from 'antd'
import {DF_KEY,DF_URL} from '../../Config'

const { Title } = Typography;
const {TabPane} = Tabs;
function ItemDetailPage(props) {
    const itemId = props.match.params.itemId;
    const [keys,setkeys] = useState([])
    const [rows, setrows] = useState([])
    const a = [1,2,3,4,5];
    useEffect(() => {
        const endpoint = `/df/items/${itemId}?apikey=${DF_KEY}`;
        fetchDatas(endpoint)
       
    }, [])
    const fetchDatas = (endpoint) => {
        Axios.get(endpoint)
        .then(response=> response.data)
        .then(response => {
         setkeys(Object.keys(response))
         setrows(Object.values(response))
        
        }
        )
    }
    const gogoik = () => {
      
    }
  

    return (
        <div>
        <div align="center" style={{paddingTop:'2rem',paddingBottom:'1rem'}}>
        
        <Title level={3}>아이템정보</Title>
        <div><b style={{fontSize:'48px'}} className="updating">아직 수정중.......</b></div>
        <div style={{width:"85%", paddingTop:'1rem',minWidth:'460px'}}>
        <Descriptions bordered>
        {rows.map((row,index)=>(
         typeof(row)==="string" && <Descriptions.Item label={keys[index]} key={index}>{row}</Descriptions.Item>   
        ))
        }
        </Descriptions>
   
        </div>
        </div>
        </div>
    )
}

export default ItemDetailPage

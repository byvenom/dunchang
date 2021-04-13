import React,{useState} from 'react'
import {Typography, Button, Form,  Input ,Col,Row,AutoComplete} from 'antd'
import {DF_KEY,GradeOptions} from '../../Config'
import Axios from 'axios'


const { Title } = Typography;



function ItemSearchPage() {
    
   
  
    const [Name, setName] = useState("")
    const [rows, setrows] = useState([])
    const [Status, setStatus] = useState("none")
    const [SearchName, setSearchName] = useState("")
    const [Options, setOptions] = useState([])
    const [SearchRow, setSearchRow] = useState([])

    const onNameChange = (e) => {
        setName(e)
    }
    const fetchMovies = (endpoint) => {
        Axios.get(endpoint)
        .then(response=> response.data)
        .then(response => {
        console.log(response)
        setrows(response.rows)
          
        })
        
    }


    const searchResult = (text) => {
        const endpoint = `/df/items?itemName=${text}&wordType=front&limit=30&apikey=${DF_KEY}`;
        fetchMovies(endpoint)
        rows.map((row,index)=>{
            const information = {
                id:row.itemId,
                name:row.itemName
            }
            setSearchRow([...SearchRow,information])
        })
        return SearchRow
    }
    const onNameSearch = (text) => {
        setOptions(
            !text ? [] : searchResult(text)
        );
    }
    const renderCards = rows?rows.map((row,index) =>{
             
        return <React.Fragment key={index}>
               
                <tr key={index}>
                <td width="6%"><img width="36px" height="36px" src={`https://img-api.neople.co.kr/df/items/${row.itemId}`} alt="" /></td>
                <td><a href={`/dunfa/itemdetail/${row.itemId}/`} style={{color:GradeOptions.find(grade => grade.value===row.itemRarity).label}}>{row.itemName}</a></td>
                </tr>
                </React.Fragment>
    }) : <div align="center" style={{paddingTop: '2rem'}}><b style={{fontSize:'24px'}}>점검중입니다.</b></div>
    return (
        <div style={{ maxWidth:'1200px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}><a href="/dunfa">DUNCHANG</a></Title>
            </div> 
                <Form>

            <div style={{display:Status, textAlign:'center'}}>
                <Title level={4}>{SearchName}에 대한 검색 결과입니다.</Title>
            </div>
            <div align="center" >
            <div><b style={{fontSize:'48px'}}>아직 수정중.......</b></div>
            <br/>
            <AutoComplete style={{width:200}} placeholder="아이템명" onChange={onNameChange} value={Name} onSearch={onNameSearch} options={Options} />
        
            </div>
            </Form>
            <br/> 
            <table align="center" style={{border:'1px solid #dedede',width:"40%",minWidth:'460px'}}>
                <tbody>
                    {renderCards}
                </tbody>
            </table>    
          
             
            
        </div>
    )
}

export default ItemSearchPage

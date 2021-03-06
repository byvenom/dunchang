import React,{useEffect, useState} from 'react'
import os from 'os'
import {Card, Avatar, Col, Typography,Row} from 'antd';
import Axios from 'axios';
import moment from 'moment';
const {Title} = Typography;
const { Meta} = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([])
    useEffect(() => {
        const subscriptionVariables = {
            userFrom : localStorage.getItem('userId')
        }
        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
        .then(response => {
            if(response.data.success){
               
                setVideo(response.data.videos)
            }else{
                alert('비디오 가져오기를 실패 했습니다.')
            }

        })
        
    }, [])
    const renderCards = Video.map((video,index) =>{
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - (minutes * 60)));
    return <React.Fragment key={index}> 
    <Col lg={6} md={8} xs={24}>
    <a href={`/video/detail/${video._id}`}>
        <div style={{ position: 'relative'}}>
            
            <img style={{ width: '100%'}} src={`http://${os.hostname()}:5000/${video.thumbnail}`} alt="" />
             <div className="duration">
                 <span>{minutes} : {seconds}</span>
             </div>
        </div>
    </a>
    <br />
    <Meta
        avatar={
            <Avatar src={video.writer.image} />
        }
        title={video.title}
        description=""
    />
    <span>{video.writer.name}</span><br />
    <span style={{ marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createAt).format("MMM Do YY")}</span>
</Col>
</React.Fragment>
})
return (
   <div style={{ width: '85%', margin: '3rem auto'}}>
       <Title level={2} > 구독영상</Title>
       <hr />
       <Row gutter={[32, 16]}>
        {renderCards}
       

       </Row>
   </div>
)
}

export default SubscriptionPage

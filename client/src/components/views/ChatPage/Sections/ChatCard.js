import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';
import 'moment/locale/ko'
var os = require('os');
function ChatCard(props) {
    
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                    props.message.substring(0, 7) == 'uploads' ?
                        // this will be either video or image 

                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://${os.hostname()}:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://${os.hostname()}:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default React.memo(ChatCard);
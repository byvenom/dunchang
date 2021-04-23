import React, { useState } from 'react'
import { Comment, Avatar , Button } from 'antd'
import { useSelector , shallowEqual} from 'react-redux'
import LikeDislikes from './LikeDislikes'
import Axios from 'axios';
import {withRouter} from 'react-router-dom'


function SingleComment(props) {
    const user = useSelector(state =>state.user,shallowEqual);
    const check = useSelector(state =>state.user.userData?state.user.userData.error:"",shallowEqual);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onLogin = () => {
        alert('로그인이 필요합니다.');
        props.history.push('/login')
    }
    const onclickReplyOpen = ()=>{
        setOpenReply(!OpenReply)
    }
    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onclickReplyOpen} key="comment-basic-reply-to"> 답글</span>
    ]
    const onHandleChange = (event) =>{
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        const variables = {
            content: CommentValue,
            writer: user.userData._id, //리덕스에서 정보 가져오기.
            postId: props.postId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                
                props.refreshFunction(response.data.result)
                setCommentValue("")
                setOpenReply(false)
            }else {
                alert('comment not save')
            }
        })
    }
    return (
       
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer? props.comment.writer.name:""}
                avatar={<Avatar src={props.comment.writer?props.comment.writer.image:""} alt="" />}
                content={ <span> {props.comment.content}</span>}
            />
            {OpenReply &&
            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%' , borderRadius:'5px' , resize:'none'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder=" 답글을 작성해 주세요."

                
                />
                <br /><br />
                <Button type="primary" style={{ width:'20%' ,height:'52px'} } onClick={check ? onLogin:onSubmit}  >작성</Button>

            </form>
            }
        </div>
    )
}

export default withRouter(SingleComment)

import Axios from 'axios'
import React,{ useState,useEffect } from 'react'
import { useSelector,shallowEqual} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd'
function Comment(props) {
   
    const videoId = props.postId;
    const user = useSelector(state =>state.user,shallowEqual);
    const check = useSelector(state =>state.user.userData?state.user.userData.error:"",shallowEqual);
    const [commentValue, setcommentValue] = useState("")

    useEffect(() => {
       
    }, [])
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }
    const onLogin = () => {
        alert('로그인이 필요합니다.');
        props.history.push('/login')
    }
    const onSubmit = (event) => {
        // 새로고침 안되게함
        event.preventDefault();
        
        const variables = {
            content: commentValue,
            writer: user.userData._id, //리덕스에서 정보 가져오기.
            postId: videoId
        }
        
        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
           
            if(response.data.success){
                
                props.refreshFunction(response.data.result)
                setcommentValue("");
            }else {
                alert('comment not save')
            }
        })
    }
    return (
        <div>
            <br />
            <p>댓글 {props.commentLists?props.commentLists.length:"0"}개</p>
            <hr /> 


            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment,index) => (
                    (!comment.responseTo &&
                        <React.Fragment key={index}>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/> 
                        </React.Fragment>// 리액트 플래그먼트로 감싸주지않으면 에러
                    )
            ))}
            

            {/* Root Comment Form */}
            <br />
            {user &&
            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%' , borderRadius:'5px' , resize:'none'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder=" 댓글을 작성해 주세요."

                
                />
                <br />
          <Button type="primary" style={{ width:'20%' ,height:'52px'} } onClick={check ? onLogin:onSubmit} >작성</Button>
            
           
            </form>
            }
           
        </div>
    )
}

export default withRouter(Comment)

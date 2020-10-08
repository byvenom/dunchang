import Axios from 'axios'
import React,{ useState } from 'react'
import { useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state =>state.user);
    const [commentValue, setcommentValue] = useState("")
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
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
            <p> Replies</p>
            <hr /> 


            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment,index) => (
                    (!comment.responseTo &&
                        <React.Fragment>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/> 
                        </React.Fragment>// 리액트 플래그먼트로 감싸주지않으면 에러
                    )
            ))}
            

            {/* Root Comment Form */}
            <br />
            {!user &&
            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%' , borderRadius:'5px' , resize:'none'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="Comment write"

                
                />
                <br />
                <button style={{ width:'20%' ,height:'52px'} } onClick={onSubmit}>Submit</button>

            </form>
            }
           
        </div>
    )
}

export default Comment

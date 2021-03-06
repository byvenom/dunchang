import Axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useSelector , shallowEqual} from 'react-redux'
import {withRouter} from 'react-router-dom'
function Subscribe(props) {
    const check = useSelector(state =>state.user.userData?state.user.userData.error:"",shallowEqual);
    const [SubscribeNumber, setSubscribeNumber] = useState("")
    const [Subscribed, setSubscribed] = useState("")

    useEffect(() => {

        let variable = { userTo: props.userTo}

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response =>{
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보를 읽는데 실패하였습니다.')
                }
            })
        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response =>{
                if(response.data.success){
                    setSubscribed(response.data.subcribed)
                }else{
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    }, [])
    const onLogin = () => {
        alert('로그인이 필요합니다.');
        props.history.push('/login')
    }
    const onSubscribe = () =>{

        let subscribedVariable = {
            userTo:props.userTo,
            userFrom:props.userFrom
        }

        // 이미 구독 중이라면
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe',subscribedVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 취소 하는데 실패하였습니다.')
                    }
                })

        // 아직 구독 중이 아니라면
        }else{
            Axios.post('/api/subscribe/subscribe',subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('구독 하는데 실패하였습니다.')
                }
            })
        }
    }
    return (
        <div>
            <button
                style={{ backgroundColor:`${Subscribed ?'#AAAAAA':'#CC0000'}`, borderRadius:'4px',
                color: 'white', padding: '10px 16px',
                fontWeight: '500', fontSize:'1rem', textTransform: 'uppercase'}}
                onClick={check ?  onLogin:onSubscribe}
                
                >
                    {SubscribeNumber} {Subscribed ? '구독 중' : '구독'}
            </button>
        </div>
    )
}

export default withRouter(Subscribe)

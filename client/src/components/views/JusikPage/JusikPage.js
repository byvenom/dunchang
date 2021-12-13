import React,{useState} from 'react'
import {Typography, Button, Form,  Input ,Col,Row} from 'antd'
import {JUSIK_KEY} from '../../Config'
import Axios from 'axios'
import $ from 'jquery'
const opendart = require('opendart');


const { Title } = Typography;


function JusikPage() {

    var options = {
        'corp_code' : '00126380'
    }
    const load = () =>{
        $.ajax({
            url: 'https://opendart.fss.or.kr/api/company.json?crtfc_key=74b7f8732a9fb83c2187f5bb5cc82422cb17ed81&corp_code=00126380',
            type: 'GET',
            cache: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {},
            dataType: "html",
            timeout: 10000,
            success: function(data, textStatus, errorThrown) {
                alert(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                alert(textStatus);           
            }
        })
}
    return (
        <div>
            주식페이지테스트 
            <Button onClick={load}>테스트</Button>
        </div>
    )
}

export default JusikPage

import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import os from 'os';


const {TextArea} = Input;
const { Title} = Typography;

const PrivateOptions = [
    {value :0, label: "비공개"},
    {value :1, label: "공개"}
]

const CategoryOptions = [
    {value :0, label: "영화 및 애니메이션"},
    {value :1, label: "자동차 및 차량"},
    {value :2, label: "음악"},
    {value :3, label: "애완동물 및 동물"},
    {value :4, label: "자유"},
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("영화 및 애니메이션")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
                let variable = {
                    url:response.data.url,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.url)
                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success){
                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.url)



                    } else{
                        alert('썸네일 생성에 실패 했습니다.')
                    }
                })
            }else {
                alert('비디오 업로드를 실패했습니다.')
            }
        })
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,

        }
        Axios.post('/api/video/uploadVideo',variables)
        .then(response => {
            if(response.data.success){
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
            }else{
                alert('비디오 업로드에 실패 하였습니다.')
            }
        })

    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>영상 업로드</Title>
            </div> 
                <Form onSubmit={onSubmit}>
                    <div style={{ display:'flex' , justifyContent:'space-between'}}>
                        {/* Drop zone */}
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={100000000}
                            >
                            {({ getRootProps,getInputProps}) =>(
                                <div style={{width: '300px', height:'240px', border:'1px solid lightgray', display:'flex',
                                alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize :'3rem'}} />

                                </div>
                            )}
                            </Dropzone>
                        {/* Thumnail */}
                                    
                    
                        {ThumbnailPath &&
                            <div>
                                <img src={`http://${os.hostname()}:5000/${ThumbnailPath}`} alt="thumbnail" />
                            </div>
                        }
                    </div>
            <br />
            <br />
            <label>제목</label>
            <Input
                onChange={onTitleChange}
                value={VideoTitle}
            />
            <br />
            <br />
            <label>내용</label>
            <TextArea
                onChange={onDescriptionChange}
                value={Description}
            />
            <br />
            <br />

            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
             
            </select>
            <br />
            <br />
            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br />
            <br />
            <Button type="primary" size="large" onClick={onSubmit}>
                올리기
            </Button>
                </Form>
            
            
        </div>
    )
}

export default VideoUploadPage

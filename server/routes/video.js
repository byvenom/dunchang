const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const {Subscriber} = require('../models/Subscriber');
const fs = require('fs');



var storage = multer.diskStorage ({
    destination: (req,file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
 
});

var upload = multer({ storage: storage,
    fileFilter: (req,file,cb) => {
        const ext = file.originalname.split(".")[1]
        console.log("ext",ext)
        if(ext!=='mp4'){
            console.log("mp4 only")
            return cb(new Error('only mp4'),false);
        }
        cb(null, true);
    }
})
.single("file");
//=================================                                                               
//             Video
//=================================
router.post('/hit', (req,res) => {

    Video.findOne({"_id": req.body.videoId})
        .populate('writer')
        .exec((err, hits) => {
            if(err) return res.json({success:false,err})
            hits.views++;
            hits.save();
            return res.json({success: true,hits:hits.views})
        })

});

router.post('/uploadfiles', (req,res) => {
    
    // 비디오를 서버에 저장한다.
    upload(req, res ,err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success : true,url:res.req.file.path, fileName:res.req.file.filename})
    })

    });
router.post('/getVideoDetail', (req,res) => {

        Video.findOne({"_id": req.body.videoId})
            .populate('writer')
            .exec((err, videoDetail) => {
                if(err) return res.status(400).send(err)
                return res.status(200).json({ success: true, videoDetail})
            })

    });
router.get('/getVideos', (req,res) => {

    //비디오를 DB 에서 가져와서 클라이언트에 보낸다.

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos})
        })
    

    });

router.post('/uploadVideo', (req,res) => {

        //비디오 정보들을 저장한다.
       const video = new Video(req.body)

       video.save((err, doc) => {
           if(err) return res.json({success: false, err})
           res.status(200).json({success: true})
       })
       //썸네일 아닌 이미지 삭제 2021-12-13 추가

       const delArr = req.body.thumbnailArray.filter(value=> value !==req.body.thumbnail);

       for(let i=0;i<delArr.length;i++){
           fs.unlinkSync(delArr[i]);
       }
       

       

       
        });
router.post('/getSubscriptionVideos', (req,res) => {

        // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
        Subscriber.find({ userFrom:req.body.userFrom})
            .exec((err, subscriberInfo) => {
                if(err) return res.status(400).send(err);

                let subscribedUser = [];

                subscriberInfo.map((Subscriber, i) => {
                    subscribedUser.push(Subscriber.userTo);
                })

            
        // 찾은 사람들의 비디오를 가지고 온다.

        Video.find({writer : { $in: subscribedUser}})
            .populate('writer')
            .exec((err,videos)=> {
                if(err) return res.status(400).send(err);
                res.status(200).json({success: true, videos})
            })
        })
    });
        

router.post('/thumbnail', (req,res) => {
    
        // 썸네일 생성 하고 비디오 런닝타임도 가져오기

        let filePath =[];
        let fileDuration = ""

        // 비디오 정보 가져오기
        ffmpeg.ffprobe(req.body.url, function (err, metadata){
            console.dir(metadata);
      
            fileDuration = metadata.format.duration
        });

        // 썸네일 생성
        ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
           
            filenames.map((filename,i)=>{
                filePath.push("uploads/thumbnails/" + filenames[i])
            })
            
        })
        .on('progress', function(progress){
            if(progress.percent>0)return res.json({success: true, url: filePath, fileDuration: fileDuration});
        })
        .on('error', function(err) {
         
            return res.json({ success: false, err});
        })
        .screenshots({
            count: 10,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
    
        });

module.exports = router;

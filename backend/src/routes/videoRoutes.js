const express = require("express");
const video = require("../models/video");
const axios = require("axios");

const router= express.Router();

//Helper Function(extract video Id)
function extractYouTubeVideoId(url){
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match =  url.match(regex);
    return match ? match [1]:null;
}

//Helper:Fetch metadata
async function fetchyouTubeDetails(videoId) {
    try{
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const response = await axios.get(url);
        return{
            title:response.data.title,
            thumbnail:response.data.thumbnail_url
        };
    }catch (error){
        console.error(`Error fetching metadata for ${videoId}:`, error.message);
        return {
            title: "Unknown",
            thumbnail: null
          };          
    }
    
}

router.get('/videos',async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page -1)*limit;

    try{
        const videos = await video.find().skip(skip).limit(limit);

        const videoDetails = await Promise.all(
            videos.map(async (video)=>{
                const videoId = extractYouTubeVideoId(video.link);
                const metadata = await fetchyouTubeDetails(videoId);
                return{
                    youtubeLink:video.link,
                    title:metadata?. title || "Unknown",
                    thumbnail: metadata?.thumbnail || null
                };

            })
        );

        const totalCount = await video.countDocuments();
        const totalPages = Math.ceil(totalCount/limit);

        res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            videos: videoDetails,
        });
    }catch(error){
        res.status(500).json({error:'Failed to fetch video metadata'});
    }
   
});

module.exports = router;
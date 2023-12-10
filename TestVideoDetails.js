import './App.js';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
// import YouTube from 'react-youtube';
// used npm install react-youtube
import axios from 'axios';


const VideoDetails = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // Extract video ID from the URL
        const videoId = videoUrl.split('v=')[1];

        // Fetch video details using YouTube API
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,statistics',
              id: videoId,
              key: 'AIzaSyBPCfCe5G4V6COFjULuvjz4FHvgtYuunkU', // Replace with your API key
            },
          }
        );

        // Set the video data in state
        setVideoData(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [videoUrl]);

  return (
    <div>
      {videoData && (
        <div>
          <h2>{videoData.snippet.title}</h2>
          <p>Tags: {videoData.snippet.tags && videoData.snippet.tags.join('|')}</p>
          <p>Likes: {videoData.statistics.likeCount}</p>
          <p>Dislikes: {videoData.statistics.dislikeCount}</p>
          <p>Comment Count: {videoData.statistics.commentCount}</p>
          <p>View Count: {videoData.statistics.viewCount}</p>
          <p>Channel: {videoData.snippet.channelTitle}</p>
          {/* Add more details as needed */}
          {/* <YouTube videoId={videoData.id} /> */}
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
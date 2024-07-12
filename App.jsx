import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/esm/CardBody';

import VideoDetails from './TestVideoDetails.js';
// import TrendOptionsComponent from './HistoricalTrends.js';
// import UploadVideoForm from './UploadVideoForm.js';

const VideoDetailDisplay = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showResult, setShowResult] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };
  // const youtubeUrl = 'https://www.youtube.com/watch?v=ZIf0FnaZjT8'; // Replace with your YouTube URL

  return (
    <div>
      <h1>YouTube Video Details</h1>
      <label>Enter YouTube URL:</label>
        <Form.Control className='w-25' type="text" id="youtubeURL" onChange={
          (e) => setVideoUrl(e.target.value)}/>

      <Button onClick={handleSubmit}>Submit</Button>
      {showResult && <VideoDetails videoUrl={videoUrl} />}
    </div>
  );
};



function App() {

  const [ID, setID] = useState(''); // Permanent Id that refreshes the page
  let id = ""; // Temporary id 

  const [Channel, setChannel] = useState('');
  let userChanneltemp = "";

  const [ChannelID, setChannelID] = useState('');
  let titletemp = "";

  const[TotalViews, setTotalViews] = useState('');
  let totalviewstemp = "";

  const[TotalLikes, setTotalLikes] = useState('');
  let totallikestemp = "";

  const[TotalDislikes, setTotalDislikes] = useState('');
  let totaldislikestemp = "";

  const[TotalComments, setTotalComments] = useState('');
  let totalcommentstemp = "";

  const[LatestTrendingDate, setLatestTrendingDate] = useState('');
  let latesttrendingdatetemp = "";


  const [loggedin, setloggedin] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState("default");
  
  const [Playlist, setPlaylist] = useState({"default" : []})
  
  const [FilterVals, setFilterVals] = useState([{
        trending_date: "January 5th, 2021",
        title: "Tiktoks that are bussin",
        thumbnail_link:"https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Pikmin_species.jpg/440px-Pikmin_species.jpg",
        video_id: "ZIf0FnaZjT8",
        tags: "gaming|tiktok|funny",
	      likes: 144,
	      dislikes: 10,
	      comment_count: 500,
	      view_count: 1600,
	      comments_disabled : false,
	      ratings_disabled: true,
      }
    ])
  
  

  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/get').then((response) => {
  //     setMovieReviewList(response.data)
  //   })
  // },[])
  const UploadVideoHandler = ({closeUploaderForm}) => {
    let videoIDtemp = "-1";
    let channelIDtemp = ChannelID;
    let monthtemp = "-1";
    let daytemp = "-1";
    let yeartemp = "-1";
    let title_temp = "";
    let tagtemp = "[None]";
    let categorytemp= "";
    let viewtemp = "0";
    let likestemp = "0";
    let dislikestemp = "0";
    let commentstemp = "0";
    let publishedtemp = "0000-00-00";
    let thumbnailtemp = "";
    let discommenttemp = "FALSE";
    let disratingtemp = "FALSE";
    // console.log("videoIDtemp:", videoIDtemp);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle the form submission, e.g., send data to the server
      // Should replace with a specific backend query req to database
      // like SELECT * FROM Entries WHERE Date < && Date > ...
    };
    const addVideoToDataBase = () => {
        console.log("Adding an uploaded video to DB start");
        // channelIDtemp = document.getElementById("UVFChannelID").value;
        videoIDtemp = document.getElementById("UVFVideoID").value;
        monthtemp = document.getElementById("UVFMonth").value;
        daytemp = document.getElementById("UVFDay").value;
        yeartemp = document.getElementById("UVFYear").value;
        title_temp = document.getElementById("UVFTitle").value;
        tagtemp =document.getElementById("UVFTag").value;
        categorytemp= document.getElementById("UVFCategory").value;
        viewtemp = document.getElementById("UVFViews").value;
        likestemp = document.getElementById("UVFLikes").value;
        dislikestemp = document.getElementById("UVFDislikes").value;
        commentstemp = document.getElementById("UVFComments").value;
        publishedtemp = document.getElementById("UVFPublishedAt").value;
        thumbnailtemp = document.getElementById("UVFThumbnailLink").value;
        discommenttemp = document.getElementById("UVFCommentsDisabled").value;
        disratingtemp = document.getElementById("UVFRatingsDisabled").value;
        if (channelIDtemp === "") {
            alert(`Please add a channel to the account.`);
        }
        else if (videoIDtemp === "" || monthtemp === "" || daytemp === "" || yeartemp === "") {
            alert(`Please fill in the required fields (VideoID and Trending Date) if you haven't already.`);
        }  
        else if (monthtemp !== "01" && monthtemp !== "02" && monthtemp !== "03" && 
                monthtemp !== "04" && monthtemp !== "05" && monthtemp !== "06" && 
                monthtemp !== "07" && monthtemp !== "08" && monthtemp !== "09" && parseInt(monthtemp) > 12) {
            alert(`Please enter in an appropriately formatted month.`);
        }
        else if (daytemp !== "01" && daytemp !== "02" && daytemp !== "03" && 
                daytemp !== "04" && daytemp !== "05" && daytemp !== "06" && 
                daytemp !== "07" && daytemp !== "08" && daytemp !== "09" && parseInt(daytemp) > 31) {
            alert(`Please enter in an appropriately formatted day.`);
        }
        else if (parseInt(yeartemp) < 0 || parseInt(yeartemp) > 9999) {
            alert(`Please enter in an appropriately formatted year.`);
        }
        else {
            // First check if the video (trending_date, video_id, etc) already exists
            // and alert/ block if it does
            if (categorytemp === "") categorytemp = "0";
            if (tagtemp === "") tagtemp = "[None]";
            if (viewtemp === "") viewtemp = "0";
            if (likestemp === "") likestemp = "0";
            if (dislikestemp === "") dislikestemp = "0";
            if (commentstemp === "") commentstemp = "0";
            if (publishedtemp === "") publishedtemp = "1969-12-31";
            if (discommenttemp === "") discommenttemp = "FALSE";
            if (disratingtemp === "") disratingtemp = "FALSE";
            Axios.post(`http://localhost:3002/api/insert_video_to_channel`, {
                videoId: videoIDtemp,
                publishedAt: publishedtemp,
            
                trendingDate: yeartemp +"-"+monthtemp+"-"+daytemp,
                title: title_temp,
                // not sure how to transfer the ChannelID from App to here,
                // simply importing it doesn't work
                // console.log("channel:", document.getElementById("ChannelID"));
                channelId: channelIDtemp,
                categoryId: categorytemp,
                tags: tagtemp,
                viewCount: viewtemp,
                likes: likestemp,
                dislikes: dislikestemp,
                commentCount: commentstemp,
                thumbnailLink: thumbnailtemp, 
                commentsDisabled: discommenttemp,  
                ratingsDisabled: disratingtemp
            }).then((response) => {
                if (response.length !== 0 && response.data === "OK") {
                    closeUploaderForm();
                    alert(`Video successfully uploaded.`);
                } else {
                    alert("Video upload unsuccessful.");
                }
            }).catch((error) => {
                alert("Video upload unsuccessful.");                
            });
            
        }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
            {/* <div className="row-container"> */}
                <label>Video ID (Required)</label>
                <Form.Control className='w-25' type="text" id="UVFVideoID" onChange={(e) => {
                    videoIDtemp = e.target.value;
                }}/>
                <label>Channel ID:</label>
                <div>{channelIDtemp}</div>
                {/* <Form.Control className='w-25' type="text" id="UVFChannelID" onChange={(e) => {
                    channelIDtemp = e.target.value;
                }}/> */}
            {/* </div> */}
            <hr/>
            <label> Trending Date (Required):</label>
            <div className="row-container">
                <label>Trending Month</label>
                <Form.Control className='w-25' type="text" id="UVFMonth" placeholder ="01 - 12" onChange={(e) => {
                    monthtemp = e.target.value;
                    }}/>

                <label>Trending Day</label>
                <Form.Control className='w-25' type="text" id="UVFDay" placeholder ="01 - 31" onChange={(e) => {
                    daytemp =e.target.value;
                    }}/>

                <label>Trending Year</label>
                <Form.Control className='w-25' type="text" id="UVFYear" placeholder ="0000 - 9999" onChange={(e) => {
                    yeartemp = e.target.value;
                    }}/>
            </div>
            <hr/>
            <div className="row-container">
                <label>Title</label>
                <Form.Control className='w-25' type="text" id="UVFTitle" onChange={(e) => {
                    titletemp = e.target.value;
                }}/>
                <label>Tags</label>
                <Form.Control className='w-25' type="text" id="UVFTag" placeholder="split|your tags|with pipes"onChange={(e) => {
                    tagtemp = e.target.value;
                }}/>
                <label>Category</label>
                <Form.Select className='w-25' aria-label="Category" id="UVFCategory" onChange={(e) => {
                    categorytemp = e.target.value;
                }}>
                    <option value="1">Film & Animation</option>
                    <option value="2">Autos & Vehicles</option>
                    <option value="10">Music</option>
                    <option value="15">Pets & Animals</option>
                    <option value="17">Sports</option>
                    <option value="18">Short Movies</option>
                    <option value="19">Travel & Events</option>
                    <option value="20">Gaming</option>
                    <option value="21">Videoblogging</option>
                    <option value="22">People & Blogs</option>
                    <option value="23">Comedy</option>
                    <option value="24">Entertainment</option>
                    <option value="25">News & Politics</option>
                    <option value="26">Howto & Style</option>
                    <option value="27">Education</option>
                    <option value="28">Science & Technology</option>
                    <option value="29">Nonprofits & Activism</option>
                    <option value="30">Movies</option>
                    <option value="31">Anime/Animation</option>
                    <option value="32">Action/Adventure</option>
                    <option value="33">Classics</option>
                    <option value="34">Comedy</option>
                    <option value="35">Documentary</option>
                    <option value="36">Drama</option>
                    <option value="37">Family</option>
                    <option value="38">Foreign</option>
                    <option value="39">Horror</option>
                    <option value="40">Sci-Fi/Fantasy</option>
                    <option value="41">Thriller</option>
                    <option value="42">Shorts</option>
                    <option value="43">Shows</option>
                    <option value="44">Trailers</option>
                </Form.Select>
            </div>
            <div className="row-container">
                <label>View Count</label>
                <Form.Control className='w-25' type="text" id="UVFViews" placeholder="0" onChange={(e) => {
                    viewtemp = e.target.value;
                }}/>
                <label>Likes</label>
                <Form.Control className='w-25' type="text" id="UVFLikes" placeholder="0" onChange={(e) => {
                    likestemp = e.target.value;
                }}/>
                <label>Dislikes</label>
                <Form.Control className='w-25' type="text" id="UVFDislikes" placeholder="0" onChange={(e) => {
                    dislikestemp = e.target.value;
                }}/>
            </div>
            <div className="row-container">
                <label>Comment Count</label>
                <Form.Control className='w-25' type="text" id="UVFComments" placeholder="0" onChange={(e) => {
                    commentstemp = e.target.value;
                }}/>
                <label>Publish Date</label>
                <Form.Control className='w-25' type="text" id="UVFPublishedAt" placeholder="YYYY-MM-DD" onChange={(e) => {
                    publishedtemp = e.target.value;
                }}/>
                <label>Thumbnail Link</label>
                <Form.Control className='w-25' type="text" id="UVFThumbnailLink" onChange={(e) => {
                    thumbnailtemp = e.target.value;
                }}/>
            </div>
            <div className="row-container">
                <label>Comments Disabled</label>
                <Form.Control className='w-25' type="text" id="UVFCommentsDisabled" placeholder="TRUE/FALSE" onChange={(e) => {
                    discommenttemp = e.target.value;
                }}/>
                <label>Ratings Disabled</label>
                <Form.Control className='w-25' type="text" id="UVFRatingsDisabled" placeholder="TRUE/FALSE" onChange={(e) => {
                    disratingtemp = e.target.value;
                }}/>
            </div>
        </div>
        <Button onClick={addVideoToDataBase}> Submit</Button>
      </form>
    );
  }

// Overlay screen that handles input options
  const UploadVideoForm = () => {
    const [isVideoUploaderOpen, setVideoUploaderOpen] = useState(false);

    const openVideoUploader = () => {
      setVideoUploaderOpen(true);
    }
    const closeVideoUploader = () => {
      setVideoUploaderOpen(false);
      retrieveAllChannelInfo();
    }

    return (
      <div>
        <Button onClick={openVideoUploader}>Upload Trending Video</Button>

        {isVideoUploaderOpen && (
          <div className = "overlay">
            <div className = "mini-screen">
              <h2>Upload a Trending Video</h2>
              <label>The video ID is the unique section of a video's YT URL.</label>
              <label>If you aren't sure about the trending date, you can default to today's date.</label>
              <hr/>
              <UploadVideoHandler closeUploaderForm={closeVideoUploader}/>
              <hr/>
              <Button variant="danger" onClick={closeVideoUploader}>Close</Button>
            </div>
          </div>
        )}
      </div>
    );
  }


  const DeleteVideoHandler = ({closeDeleteForm}) => {
    let videoIDtemp = "-1";
    let channelIDtemp = ChannelID;
    let monthtemp = "-1";
    let daytemp = "-1";
    let yeartemp = "-1";

    const handleSubmit = (e) => {
      e.preventDefault();
    };
    const removeVideoFromDataBase = () => {
        console.log("Adding an uploaded video to DB start");
        channelIDtemp = ChannelID;
        videoIDtemp = document.getElementById("del_UVFVideoID").value;
        monthtemp = document.getElementById("del_UVFMonth").value;
        daytemp = document.getElementById("del_UVFDay").value;
        yeartemp = document.getElementById("del_UVFYear").value;
        
        if (channelIDtemp === "") {
            alert(`Please add a channel to the account.`);
        }
        else if (videoIDtemp === "" || monthtemp === "" || daytemp === "" || yeartemp === "") {
            alert(`Please fill in the required fields (VideoID and Trending Date) if you haven't already.`);
        }  
        else if (monthtemp !== "01" && monthtemp !== "02" && monthtemp !== "03" && 
                monthtemp !== "04" && monthtemp !== "05" && monthtemp !== "06" && 
                monthtemp !== "07" && monthtemp !== "08" && monthtemp !== "09" && parseInt(monthtemp) > 12) {
            alert(`Please enter in an appropriately formatted month.`);
        }
        else if (daytemp !== "01" && daytemp !== "02" && daytemp !== "03" && 
                daytemp !== "04" && daytemp !== "05" && daytemp !== "06" && 
                daytemp !== "07" && daytemp !== "08" && daytemp !== "09" && parseInt(daytemp) > 31) {
            alert(`Please enter in an appropriately formatted day.`);
        }
        else if (parseInt(yeartemp) < 0 || parseInt(yeartemp) > 9999) {
            alert(`Please enter in an appropriately formatted year.`);
        }
        else {
            // First check if the video (trending_date, video_id, etc) already exists
            // and alert/ block if it does
            Axios.post(`http://localhost:3002/api/get_video_exist`, {
                videoId: videoIDtemp,
                trendingDate: yeartemp +"-"+monthtemp+"-"+daytemp,
                channelId: channelIDtemp
            }).then((response) => {
                console.log("response delete:");
                console.log(response)
                if (response.data.length !== 0) {
                  Axios.post(`http://localhost:3002/api/delete_video_from_channel`, {
                      videoId: videoIDtemp,
                      trendingDate: yeartemp +"-"+monthtemp+"-"+daytemp,
                      channelId: channelIDtemp
                  }).then((response2) => {
                      if (response2.length !== 0 && response2.data === "OK") {
                          closeDeleteForm();
                          alert(`Video deletion request submitted.`);
                      } else {
                          alert("Video delete unsuccessful.");
                      }
                  });
                } else {
                    alert("Video does not exist.");
                }
            }).catch((error) => {
                alert("Video does not exist.");                
            });
            
            
        }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
            {/* <div className="row-container"> */}
                <label>Video ID (Required)</label>
                <Form.Control className='w-25' type="text" id="del_UVFVideoID" onChange={(e) => {
                    videoIDtemp = e.target.value;
                }}/>
                <label>Channel ID:</label>
                <div>{channelIDtemp}</div>
                {/* <Form.Control className='w-25' type="text" id="UVFChannelID" onChange={(e) => {
                    channelIDtemp = e.target.value;
                }}/> */}
            {/* </div> */}
            <hr/>
            <label> Trending Date (Required):</label>
            <div className="row-container">
                <label>Trending Month</label>
                <Form.Control className='w-25' type="text" id="del_UVFMonth" placeholder ="01 - 12" onChange={(e) => {
                    monthtemp = e.target.value;
                    }}/>

                <label>Trending Day</label>
                <Form.Control className='w-25' type="text" id="del_UVFDay" placeholder ="01 - 31" onChange={(e) => {
                    daytemp =e.target.value;
                    }}/>

                <label>Trending Year</label>
                <Form.Control className='w-25' type="text" id="del_UVFYear" placeholder ="0000 - 9999" onChange={(e) => {
                    yeartemp = e.target.value;
                    }}/>
            </div>
            <hr/>

        </div>
        <Button onClick={removeVideoFromDataBase}> Submit</Button>
      </form>
    );
  }

  // DELETE video from channel
  const DeleteVideoForm = () => {
    const [isVideoDeleteOpen, setVideoDeleteOpen] = useState(false);

    const openVideoDelete = () => {
      setVideoDeleteOpen(true);
    }
    const closeVideoDelete = () => {
      setVideoDeleteOpen(false);
      retrieveAllChannelInfo();
    }

    return (
      <div>
        <Button onClick={openVideoDelete}>Delete Trending Video</Button>

        {isVideoDeleteOpen && (
          <div className = "overlay">
            <div className = "mini-screen">
              <h2>Delete a Trending Video</h2>
              <label>The video ID is the unique section of a video's YT URL.</label>
              <label>If you aren't sure about the trending date, you can default to today's date.</label>
              <hr/>
              <DeleteVideoHandler closeDeleteForm={closeVideoDelete}/>
              <hr/>
              <Button variant="danger" onClick={closeVideoDelete}>Close</Button>
            </div>
          </div>
        )}
      </div>
    );
  }


  const changeCurrentPlaylist = () => {

    console.log(Playlist);
    let playlist_id = document.getElementById("playlistPrompt").value;
    if (playlist_id in Playlist) 
    {
      setCurrentPlaylist(playlist_id);
    }
    else 
    { 
      Axios.post(`http://localhost:3002/api/insert_new_playlist`, {
        playlistId: playlist_id,
        userId: ID
      });
      setPlaylist(prevState => ({
        ...prevState,
        ...{[playlist_id] : []}
      }));
      setCurrentPlaylist(playlist_id);
    }
  }

  const deleteWholePlaylist = () => {
    if (!(currentPlaylist === "" || currentPlaylist === "default")) {
      Axios.post(`http://localhost:3002/api/delete_playlist`, {
          playlistId: currentPlaylist,
          userId: ID
      });
      delete Playlist[currentPlaylist]
      setCurrentPlaylist("default");
    }
  }
  

  const addtoPlaylist = (val) => {
    let playlist_id = currentPlaylist;
    if (playlist_id === "") {playlist_id = "default"}

    if (Playlist.length === 0 || !(playlist_id in Playlist) || playlist_id === "default" ) {
      console.log(playlist_id + "fafafasfasf");
      console.log(Playlist)
      Axios.post(`http://localhost:3002/api/insert_new_playlist`, {
        playlistId: playlist_id,
        userId: ID
      });
      setPlaylist(prevState => ({
        ...prevState,
        ...{[playlist_id] : [val]}
      }));
      console.log(`inserted ${playlist_id} as a new playlist`)
      console.log(Playlist);
      let va = val.trending_date.replace('T'," ");
      va = va.replace('Z',"");
      va = va.split(' ')[0] + " 00:00:00"
      Axios.post(`http://localhost:3002/api/insert_video_to_playlist`, {
          playlistId: playlist_id,
          userId: ID,
          trendingDate: va,
          videoId: val.video_id
      });
    }
    else{
      setPlaylist(prevState => ({
        ...prevState,
        ...{[playlist_id] : [...Playlist[playlist_id], val]}
      }));
      let va = val.trending_date.replace('T'," ");
      va = va.replace('Z',"");
      va = va.split(' ')[0] + " 00:00:00"
      Axios.post(`http://localhost:3002/api/insert_video_to_playlist`, {
          playlistId: playlist_id,
          userId: ID,
          trendingDate: va,
          videoId: val.video_id
      });
    }
  };

  const deletefromPlaylist = (val) => {
    console.log("deletetime")
    let playlist_id = currentPlaylist;
    if (playlist_id === "") {playlist_id = "default"}
    let va = val.trending_date.replace('T'," ");
    va = va.replace('Z',"");
    va = va.split(' ')[0] + " 00:00:00"
    Axios.post(`http://localhost:3002/api/delete_video_from_playlist`, {
      playlistId: playlist_id,
      videoId: val.video_id,  
      trendingDate: va,
    });
    setPlaylist(prevState => ({
      ...prevState,
      [playlist_id]: prevState[playlist_id].filter(value => value !== val)
    }));
  };


  const updateUser = () => {
    alert(`Updated as '${id}'`);
    Axios.post(`http://localhost:3002/api/update_userId`, {
      userId: ID,
      newUserId: id
    });
    setID(id);
    id = ""
    setloggedin(true);
  };

  const deleteUser = () => {
      alert(`Deleting User '${ID}'`);
      Axios.post(`http://localhost:3002/api/delete_user`, {
          userId: ID,
          chanId: ChannelID,
      });
      setID("");
      setChannelID("");
      setChannel("");
      setloggedin(false);
  }
  
  const channelAdd = () => {
        userChanneltemp = document.getElementById("channelId_").value;
        titletemp = document.getElementById("channelTitle_").value;
        setChannel(titletemp);
        setChannelID(userChanneltemp);
        Axios.post(`http://localhost:3002/api/insert_new_channel`, {
          userId: ID,
          channelId: userChanneltemp,
          channelTitle: titletemp
        });
        // titletemp = "";
        // userChanneltemp = "";
        // totalviewstemp = "0";
        // totallikestemp = "0";
        // totaldislikestemp = "0";
        // totalcommentstemp = "0";
        // latesttrendingdatetemp = "12-31-1969";
  };

  // Filter Search Variables
    let monthtemp = "";
    let daytemp ="";
    let yeartemp ="";
    let tagtemp ="";
    let categorytemp= "";
    let metrictemp ="title";
    let sorttemp="ASC";

  const filterSearch = () => {
    console.log("Filter Search start");

    monthtemp = document.getElementById("Month").value;
    daytemp =document.getElementById("Day").value;
    yeartemp =document.getElementById("Year").value;
    tagtemp =document.getElementById("Tag").value;
    categorytemp= document.getElementById("Category").value;
    metrictemp =document.getElementById("Metric").value;
    sorttemp=document.getElementById("AscDesc").value;
    console.log(monthtemp);
    if(daytemp!== "" && monthtemp !== "" && yeartemp !== "" && tagtemp ==="" && categorytemp ===""){
      Axios.post(`http://localhost:3002/api/get_day_ms`, {
        metric: metrictemp,
        sortBy: sorttemp,
        date: yeartemp +"-"+monthtemp+"-"+daytemp
      }).then((response) => {console.log(response.data);setFilterVals(response.data)})
    }
    else if(daytemp !== "" && monthtemp !== "" && yeartemp !== "" && tagtemp !=="" && categorytemp ===""){
      Axios.post(`http://localhost:3002/api/get_day_msk`, {
        metric: metrictemp,
        sortBy: sorttemp,
        date: yeartemp +"-"+monthtemp+"-"+daytemp,
        tag: tagtemp
      }).then((response) => {console.log(response.data);setFilterVals(response.data)})
    }
    else if(daytemp !== "" && monthtemp !== "" && yeartemp !== "" && tagtemp ==="" && categorytemp !==""){
      Axios.post(`http://localhost:3002/api/get_day_msi`, {
        metric: metrictemp,
        sortBy: sorttemp,
        date: yeartemp +"-"+monthtemp+"-"+daytemp,
        categoryId: categorytemp
      }).then((response) => {console.log(response.data);setFilterVals(response.data)})
    }
    else if(daytemp !== "" && monthtemp !== "" && yeartemp !== "" && tagtemp !=="" && categorytemp !==""){
      Axios.post(`http://localhost:3002/api/get_day_mski`, {
        metric: metrictemp,
        sortBy: sorttemp,
        date: yeartemp +"-"+monthtemp+"-"+daytemp,
        categoryId: categorytemp,
        tag: tagtemp
      }).then((response) => {console.log(response.data);setFilterVals(response.data)})
    }
  };


  const Navigation = () => {
  // JANE: ADD ELSE STATEMENT, alert that they can't login
  // move the alert statement
    const login = () => {
        Axios.post(`http://localhost:3002/api/get_userId`, {
          userId: id
        }).then((response) => {
          if ((response.data).length === 1) {
            alert(`You logged in for '${id}'`);
            setID(id);
            id = ""
            setloggedin(true);
            console.log(response.data);
            console.log("hi");
          } else {
              alert(`Cannot login: '${id}'. User does not exist.`);
              setloggedin(false);
          }
      });
        
    }

    const register = () => {
        Axios.post(`http://localhost:3002/api/get_userId`, {
          userId: id
        }).then((response) => {
          if ((response.data).length === 1) {
            alert(`Cannot register: '${id}'. User already exists.`);
            setloggedin(false);
          } else {
            alert(`Registered as '${id}'`);
            Axios.post(`http://localhost:3002/api/insert_new_user`, {
              userId: id,
            });
            setID(id);
            id = ""
            setloggedin(true);
          }
      });
        
    }


    if (loggedin) {
        return (
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary justify-content-between">
          <Container>
            <Navbar.Brand href="/">Youtube Archiver</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: {ID}
            </Navbar.Text>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    else {
      return (
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary justify-content-between">
          <Container>
            <Navbar.Brand href="/">Youtube Archiver</Navbar.Brand>
            <Form>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">UserId</InputGroup.Text>
                <Form.Control name='login'
                  placeholder="UserID"
                  aria-label="UserID"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    id = (e.target.value);
                  } }
                />
                <Button onClick={login}>Login</Button>
                <Button onClick={register}>Register</Button>
              </InputGroup>
            </Form>
          </Container>
        </Navbar>
      );
    }
  };
  
  // Retrieve Channel Information
  // const retrieveChannelInfo = () => {
  //   Axios.post(`http://localhost:3002/api/get_channel_title`, {
  //     userId: ID
  //   }).then((response) => {
  //     if (!Object.keys(response.data).length) {
  //       setChannel("");
  //       setChannelID("");
  //     } else {
  //       let channel_title = response.data[0]["channel_title"];
  //       let channel_id = response.data[0]["channel_id"];
  //       setChannel(channel_title);
  //       setChannelID(channel_id);
  //     }
  //   });
  // }

  const retrievePlaylistInfo = () => {
    Axios.post(`http://localhost:3002/api/get_playlists`, {
      userId: ID
    }).then((response) => { 
      for (var obj in response.data) {
        obj = response.data[obj]
        let playid = obj.playlist_id;
         Axios.post(`http://localhost:3002/api/get_playlist_videos`, {
          userId: ID,
          playlistId: playid
        }).then((response2) => {
          if (!(playid in Playlist)) {
            console.log(response2.data)
            setPlaylist(prevState => ({
              ...prevState,
              ...{[playid] : response2.data}
            }));
          }

        })
      }
    });
  }


  const retrieveAllChannelInfo = () => {
    console.log("starting to retrieve all channel info");
    Axios.post(`http://localhost:3002/api/get_channel_title`, {
      userId: ID
    }).then((response) => {
      if (!Object.keys(response.data).length) {
        setChannel("");
        setChannelID("");
      } else {
        let channel_id = response.data[0]["channel_id"];
        Axios.post(`http://localhost:3002/api/get_channel_info`, {
          channelId: channel_id
        }).then((response) => {
            let channel_title = response.data[0]["channel_title"];
            let channel_id = response.data[0]["channel_id"];
            let total_views = response.data[0]["total_views"];
            let total_likes = response.data[0]["total_likes"];
            let total_dislikes = response.data[0]["total_dislikes"];
            let total_comments = response.data[0]["total_comment_count"];
            let latest_date = response.data[0]["latest_trending_date"];
            setChannel(channel_title);
            setChannelID(channel_id);
            setTotalViews(total_views);
            setTotalLikes(total_likes);
            setTotalDislikes(total_dislikes);
            setTotalComments(total_comments);
            setLatestTrendingDate(latest_date);
        });
      }
    });
        
  }

  if (loggedin) {
    // original code that only retrieved channel name and ID
    // retrieveChannelInfo();
    retrievePlaylistInfo();
    retrieveAllChannelInfo();
    return (
        <div className="App">
          <Navigation id="va"/>
          <br/>
           <div className="form">
            <h1> User ID : "{ID}" </h1>
            <label>Update User ID: </label>
            <Form.Control className="w-25" type="text" name="userIDUpdate" onChange={(e) => {
                id = (e.target.value);
              } }/>
            <Button onClick={updateUser}>Update</Button>
          </div>
          <hr/>
          <h1> Playlist </h1>
          <h5>(To delete: Set the playlist, then click delete):</h5>
          <label>Select Playlist To View:</label>
          <Form.Control className='w-25' type="text" id="playlistPrompt"/>
          <Button onClick={changeCurrentPlaylist}>Set Playlist</Button>
          <Button variant='warning' onClick={deleteWholePlaylist}>Delete Playlist</Button>
          {Playlist[currentPlaylist].map((val) => {
          return (
            <Card style={{padding: "1%", width: '50%', margin:'auto'}}>
              <h1> Title: <b>{val.title}</b> </h1>
              <CardBody>
              <p>Trending Date: {val.trending_date}</p>
              <p>Tags: {val.tags}</p>
              <p>Likes: {val.likes}</p>
              <p>Dislikes: {val.dislikes}</p>
              <p>Comment Count: {val.comment_count}</p>
              <p>View Count: {val.view_count}</p>
              <p>Comment Disabled: {val.comments_disabled}</p>
              <p>Ratings Disabled: {val.ratings_disabled}</p>
              { <Button variant="warning" size="l" onClick={() => {
                console.log(deletefromPlaylist(val))
              }}> Delete From Playlist</Button>}
              </CardBody>
            </Card>
          );
        })}
        <hr></hr> 
          <div className="form">
            <h1> My Channel Name: "{Channel}" </h1>
            <h1> My Channel ID: "{ChannelID}" </h1>
            <h6>Total Views: {TotalViews}</h6>
            <h6>Total Likes: {TotalLikes}</h6>
            <h6>Total Dislikes: {TotalDislikes}</h6>
            <h6>Total Comments: {TotalComments}</h6>
            <h6>Latest Trending Date: {LatestTrendingDate}</h6>

            <label>Channel ID: </label>
            <Form.Control className="w-25" type="text" id="channelId_" name="channelID" onChange={(e) => {
                userChanneltemp = (e.target.value);
                console.log(e.target.value);
              } }/>
            <label>Channel Title: </label>
            <Form.Control className="w-25" type="text" id="channelTitle_" name="channelTitle" onChange={(e) => {
                titletemp = (e.target.value);
                console.log(e.target.value);
              } }/>
            <Button onClick={channelAdd}>Submit</Button>
          </div>
          <hr/>
          <h1>Youtube Archiver</h1>
          <div className="form">

        <h3><b>Filter Search</b>:</h3>

        <label>Month (01 - 12)</label>
        <Form.Control className='w-25' type="text" id="Month" onChange={(e) => {
            monthtemp = e.target.value;
          }}/>

        <label>Day (01 - 31)</label>
        <Form.Control className='w-25' type="text" id="Day" onChange={(e) => {
            daytemp =e.target.value;
          }}/>

        <label>Year (0000 - 9999) </label>
        <Form.Control className='w-25' type="text" id="Year" onChange={(e) => {
            yeartemp = e.target.value;
          }}/>

        <label>Tag</label>
        <Form.Control className='w-25' type="text" id="Tag" onChange={(e) => {
            tagtemp = e.target.value;
          }}/>

        <label>Category</label>
        <Form.Select className='w-25' aria-label="Category" id="Category" onChange={(e) => {
            metrictemp = e.target.value;
          }}>
            <option value="">All Categories</option>
            <option value="1">Film & Animation</option>
            <option value="2">Autos & Vehicles</option>
            <option value="10">Music</option>
            <option value="15">Pets & Animals</option>
            <option value="17">Sports</option>
            <option value="18">Short Movies</option>
            <option value="19">Travel & Events</option>
            <option value="20">Gaming</option>
            <option value="21">Videoblogging</option>
            <option value="22">People & Blogs</option>
            <option value="23">Comedy</option>
            <option value="24">Entertainment</option>
            <option value="25">News & Politics</option>
            <option value="26">Howto & Style</option>
            <option value="27">Education</option>
            <option value="28">Science & Technology</option>
            <option value="29">Nonprofits & Activism</option>
            <option value="30">Movies</option>
            <option value="31">Anime/Animation</option>
            <option value="32">Action/Adventure</option>
            <option value="33">Classics</option>
            <option value="34">Comedy</option>
            <option value="35">Documentary</option>
            <option value="36">Drama</option>
            <option value="37">Family</option>
            <option value="38">Foreign</option>
            <option value="39">Horror</option>
            <option value="40">Sci-Fi/Fantasy</option>
            <option value="41">Thriller</option>
            <option value="42">Shorts</option>
            <option value="43">Shows</option>
            <option value="44">Trailers</option>
        </Form.Select>
  
        <label>Sort By</label>
        <Form.Select className='w-25' aria-label="Metric" id="Metric" onChange={(e) => {
            metrictemp = e.target.value;
          }}>
            <option value="title">Title</option>
            <option value="view_count">View Count</option>
            <option value="likes">Likes</option>
            <option value="dislikes">Dislikes</option>
            <option value="comment_count">Comment Count</option>
        </Form.Select>
        
        <Form.Select className='w-25' aria-label="ASCENDING/DESCENDING" id="AscDesc" onChange={(e) => {
            sorttemp = e.target.value;
          }}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </Form.Select>

        <Button onClick={filterSearch}>Submit</Button>
        
      </div>
      
      <h3><b>Results</b>:</h3>  
        {FilterVals.map((val) => {
          return (
            <Card style={{padding: "1%", width: '50%', margin:'auto'}}>
              <h1> Title: <b>{val.title}</b> </h1>
              <CardBody>
              <img src={val.thumbnail_link} alt="thumbnail"/>
              <p>Trending Date: {val.trending_date}</p>
              <p>Tags: {val.tags}</p>
              <p>Likes: {val.likes}</p>
              <p>Dislikes: {val.dislikes}</p>
              <p>Comment Count: {val.comment_count}</p>
              <p>View Count: {val.view_count}</p>
              <p>Comment Disabled: {val.comments_disabled.toString()}</p>
              <p>Ratings Disabled: {val.ratings_disabled.toString()}</p>

              { <Button variant="success" size="l" onClick={() => {
                console.log(addtoPlaylist(val))
              }}> Add to Playlist</Button>}

              </CardBody>
            </Card>
          );
        })} 
      <hr/>
      {/* <Button onClick={UploadVideoForm}>Upload Trending Video</Button> */}
      <UploadVideoForm/>
      <DeleteVideoForm/>
      <hr/>
      <Button variant="danger" onClick={deleteUser}>Delete Account</Button>
      </div>
    );
  }
  return (
    <div className="App">
      <Navigation id="va"/>
      <br/>
      <h1> YouTube Archiver </h1>
    
      <div className="form">

        <h3><b>Filter Search</b>:</h3>

        <label>Month (01 - 12)</label>
        <Form.Control className='w-25' type="text" id="Month" onChange={(e) => {
            monthtemp = e.target.value;
          }}/>

        <label>Day (01 - 31)</label>
        <Form.Control className='w-25' type="text" id="Day" onChange={(e) => {
            daytemp =e.target.value;
          }}/>

        <label>Year (0000 - 9999) </label>
        <Form.Control className='w-25' type="text" id="Year" onChange={(e) => {
            yeartemp = e.target.value;
          }}/>

        <label>Tag</label>
        <Form.Control className='w-25' type="text" id="Tag" onChange={(e) => {
            tagtemp = e.target.value;
          }}/>

        <label>Category</label>
        <Form.Select className='w-25' aria-label="Category" id="Category" onChange={(e) => {
            metrictemp = e.target.value;
          }}>
            <option value="">All Categories</option>
            <option value="1">Film & Animation</option>
            <option value="2">Autos & Vehicles</option>
            <option value="10">Music</option>
            <option value="15">Pets & Animals</option>
            <option value="17">Sports</option>
            <option value="18">Short Movies</option>
            <option value="19">Travel & Events</option>
            <option value="20">Gaming</option>
            <option value="21">Videoblogging</option>
            <option value="22">People & Blogs</option>
            <option value="23">Comedy</option>
            <option value="24">Entertainment</option>
            <option value="25">News & Politics</option>
            <option value="26">Howto & Style</option>
            <option value="27">Education</option>
            <option value="28">Science & Technology</option>
            <option value="29">Nonprofits & Activism</option>
            <option value="30">Movies</option>
            <option value="31">Anime/Animation</option>
            <option value="32">Action/Adventure</option>
            <option value="33">Classics</option>
            <option value="34">Comedy</option>
            <option value="35">Documentary</option>
            <option value="36">Drama</option>
            <option value="37">Family</option>
            <option value="38">Foreign</option>
            <option value="39">Horror</option>
            <option value="40">Sci-Fi/Fantasy</option>
            <option value="41">Thriller</option>
            <option value="42">Shorts</option>
            <option value="43">Shows</option>
            <option value="44">Trailers</option>
        </Form.Select>
  
        <label>Sort By</label>
        <Form.Select className='w-25' aria-label="Metric" id="Metric" onChange={(e) => {
            metrictemp = e.target.value;
          }}>
            <option value="title">Title</option>
            <option value="view_count">View Count</option>
            <option value="likes">Likes</option>
            <option value="dislikes">Dislikes</option>
            <option value="comment_count">Comment Count</option>
        </Form.Select>
        
        <Form.Select className='w-25' aria-label="ASCENDING/DESCENDING" id="AscDesc" onChange={(e) => {
            sorttemp = e.target.value;
          }}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </Form.Select>
        <Button onClick={filterSearch}>Submit</Button>
        
      </div>

      <h3><b>Results</b>:</h3>  
        {FilterVals.map((val) => {
          return (
            <Card style={{padding: "1%", width: '50%', margin:'auto'}}>
              <h1> Title: <b>{val.title}</b> </h1>
              <CardBody>
              <img src={val.thumbnail_link} alt="thumbnail"/>
              <p>Trending Date: {val.trending_date}</p>
              <p>Tags: {val.tags}</p>
              <p>Likes: {val.likes}</p>
              <p>Dislikes: {val.dislikes}</p>
              <p>Comment Count: {val.comment_count}</p>
              <p>View Count: {val.view_count}</p>
              <p>Comment Disabled: {val.comments_disabled.toString()}</p>
              <p>Ratings Disabled: {val.ratings_disabled.toString()}</p>
              {/* <Button variant="success" size="l" onClick={() => {
                console.log("addtoPlaylist(val)")
              }}> Add to Playlist</Button> */}
              </CardBody>

              
              </Card>
          );
        })} 
  </div>
  );
}

export default App;

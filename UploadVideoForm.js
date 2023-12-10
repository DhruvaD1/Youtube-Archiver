import './App.js';
import returnChannelID from "./App.js";
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css';
// npm install react-datepicker was needed in the terminal...

const UploadVideoHandler = ({closeUploaderForm}) => {
    let videoIDtemp = "-1";
    let channelIDtemp = "";
    let monthtemp = "-1";
    let daytemp = "-1";
    let yeartemp = "-1";
    let titletemp = "";
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
        channelIDtemp = document.getElementById("UVFChannelID").value;
        videoIDtemp = document.getElementById("UVFVideoID").value;
        monthtemp = document.getElementById("UVFMonth").value;
        daytemp = document.getElementById("UVFDay").value;
        yeartemp = document.getElementById("UVFYear").value;
        titletemp = document.getElementById("UVFTitle").value;
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
                 title: titletemp,
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
            <div className="row-container">
                <label>Video ID (Required)</label>
                <Form.Control className='w-25' type="text" id="UVFVideoID" onChange={(e) => {
                    videoIDtemp = e.target.value;
                }}/>
                <label>Channel ID (Required)</label>
                <Form.Control className='w-25' type="text" id="UVFChannelID" onChange={(e) => {
                    channelIDtemp = e.target.value;
                }}/>
            </div>
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
// const UploadVideoForm = () => {
//     const [isVideoUploaderOpen, setVideoUploaderOpen] = useState(true);

//     // const openVideoUploader = () => {
//     //   setVideoUploaderOpen(true);
//     // }
//     // openVideoUploader();

//     const closeVideoUploader = () => {
//       setVideoUploaderOpen(false);
//     }

//     return (
//       <div>
//         {/* <Button onClick={openVideoUploader}>Upload Trending Video</Button> */}

//         {isVideoUploaderOpen && (
//           <div className = "overlay">
//             <div className = "mini-screen">
//               <h2>Upload a Trending Video</h2>
//               <label>The video ID is the unique section of a video's YT URL.</label>
//               <label>If you aren't sure about the trending date, you can default to today's date.</label>
//               <hr/>
//               <UploadVideoHandler closeUploaderForm={closeVideoUploader}/>
//               <hr/>
//               <Button variant="danger" onClick={closeVideoUploader}>Close</Button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

  export default UploadVideoForm;
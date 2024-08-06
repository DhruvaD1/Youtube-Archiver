const express = require("node");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'34.70.49.83',
    user: 'root',
    password:'test1234',
    database:'YoutubeArchiverTest',
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



// ------------------- GET -------------------

// USER
// Checks whether userId is already in table
app.post("/api/get_userId", (require, response) => {
    const userId = require.body.userId;
    const sqlSelect = "SELECT * FROM User WHERE user_id = ?;"; //good
    db.query(sqlSelect, [userId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});


//get user_channel_id from User

app.post("/api/get_user_channel_id", (require, response) => {
    const userId = require.body.userId;
    const sqlSelect = "SELECT user_channel_id FROM User WHERE user_id = ?;"; //good
    db.query(sqlSelect, [userId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

app.post("/api/get_channel_info", (require, response) => {
    const channelId = require.body.channelId;
    const sqlSelect = "SELECT * FROM Trending_Channel WHERE channel_id = ?;";
    db.query(sqlSelect, [channelId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});


app.post("/api/get_channel_title", (req, response) => {
    const userId = req.body.userId; 
    const sqlSelectUserChannel = "SELECT user_channel_id FROM User WHERE user_id = ?;";
    db.query(sqlSelectUserChannel, [userId], (err, result) => {
        if (err) {
            console.log(err);
            response.status(500).send('Error while retrieving user_channel_id');
            return;
        }
        if (result.length === 0) {
            response.status(404).send('No user_channel_id found for the given user_id');
        } else {
            const userChannelId = result[0].user_channel_id;
            const sqlCheckTrending = "SELECT channel_title, channel_id FROM Trending_Channel WHERE channel_id = ?;";
            db.query(sqlCheckTrending, [userChannelId], (err2, result2) => {
                if (err2) {
                    console.log(err2);
                    response.status(500).send('Error while checking Trending_Channel');
                    return;
                }
                response.send(result2);
            });
        }
    });
});

// Get playlists associated with user
app.post("/api/get_playlists", (require, response) => {
    const userId = require.body.userId;
    const sqlSelect = "SELECT * FROM Playlist WHERE user_id = ? ;";  //good
    db.query(sqlSelect, [userId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get playlist videos associated with playlist and user id
// WIP HERE
app.post("/api/get_playlist_videos", (require, response) => {
    const userId = require.body.userId;
    const playlistId = require.body.playlistId;
    const sqlSelect = "SELECT * "+
                        "FROM Trending_Videos "+
                        "WHERE (video_id, trending_date) IN (SELECT video_id, trending_date "+
                        "FROM Playlist_Videos "+
                        `WHERE user_id = ? AND playlist_id = '${playlistId}');`;  //good
    db.query(sqlSelect, [userId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});


// Get category name associated with category id
app.post("/api/get_category_name", (require, response) => {
    const categoryId = require.body.categoryId;
    const sqlSelect = "SELECT category_name FROM Category WHERE category_id = ? ;";  //good
    db.query(sqlSelect, [categoryId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get videos from a playlist
app.post("/api/get_videos", (require, response) => {
    const userId = require.body.userId;
    const sqlSelect = "SELECT * FROM Trending_Videos WHERE user_id = ?;"; // no User_id in trending videos
    db.query(sqlSelect, [userId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

app.post("/api/get_video_exist", (require, response) => {
    const channelId = require.body.channelId;
    const trendingDate = require.body.trendingDate;
    const videoId = require.body.videoId;

    const sqlSelect = "SELECT * FROM Trending_Videos WHERE channel_id = ? AND trending_date = ? AND video_id = ?;"; // no User_id in trending videos
    db.query(sqlSelect, [channelId, trendingDate, videoId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});


// A DAY ON YOUTUBE
/* Default Get based on
    - Metric (Order by)
    - Sort by (Order by)
    - keyword search (optional)
    - Only include (optional)
*/
app.post("/api/get_day_ms", (require, response) => {
    const metric = require.body.metric;
    const sortBy = require.body.sortBy;
    const date = require.body.date;

    const sqlSelect = "SELECT * " + 
                    "FROM Trending_Videos " +
                    "WHERE trending_date = ?"+
                    `ORDER BY ${metric} ${sortBy} LIMIT 10;`;
    console.log("get day ms");

    db.query(sqlSelect, [date], (err, result) => { // good
        console.log(result);

        if (err) 
            console.log(err);
        response.send(result);
    });
});

// + keyword search (ONLY ONE TAG SUPPORTED)
app.post("/api/get_day_msk", (require, response) => {
    const metric = require.body.metric;
    const sortBy = require.body.sortBy;
    const date = require.body.date;
    const tag = require.body.tag;

    const sqlSelect = "SELECT * " + 
                    "FROM Trending_Videos "+
                    `WHERE trending_date = ? AND (tags LIKE '%${tag}%')`+
                    `ORDER BY ${metric} ${sortBy} LIMIT 10;`; 
    console.log("get day msk");
    console.log(sqlSelect);
    db.query(sqlSelect, [date], (err, result) => { //good
        if (err) 
            console.log(err);
        response.send(result);
    });
});

//  + only include (ONLY CATEGORY IS SUPPORTED)
// NOTE: I can change categoryId to categoryName if that's easier
app.post("/api/get_day_msi", (require, response) => {
    const metric = require.body.metric;
    const sortBy = require.body.sortBy;
    const date = require.body.date;
    const categoryId = require.body.categoryId;

    const sqlSelect = "SELECT * " + 
                    "FROM Trending_Videos "+
                    "WHERE trending_date = ? AND category_id = ?"+ //good
                    `ORDER BY ${metric} ${sortBy} LIMIT 10;`;
    db.query(sqlSelect, [date, categoryId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// + both keyword search AND only include
app.post("/api/get_day_mski", (require, response) => {
    const metric = require.body.metric;
    const sortBy = require.body.sortBy; // ASC or DESC
    const date = require.body.date;
    const categoryId = require.body.categoryId;
    const tag = require.body.tag;

    console.log(metric);
    const sqlSelect = "SELECT * " + 
                    "FROM Trending_Videos "+
                    `WHERE trending_date = ? AND category_id = ? AND (tags LIKE '%${tag}%')`+
                    `ORDER BY ${metric} ${sortBy} LIMIT 10;`;
    db.query(sqlSelect, [date, categoryId], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// ================= WIP!!! DON'T TOUCH UNTIL IN PERSON MEETING ===========================
// HOW ARE WE COUNTING FREQUENCY???????

// TOP 5 TIME PERIOD
// Get the top 5 occurring videos within a time period
app.post("/api/get_period_video", (require, response) => {
    const minDate = require.body.minDate;
    const maxDate = require.body.minDate;
    const sortBy = require.body.sortBy; // ASC or DESC

    const sqlSelect = "SELECT video_id, title, COUNT(video_id) as video_count " +
                        "FROM Trending_Videos "
                        "WHERE ? <= trending_date AND trending_date <= ? " + //good
                        "GROUP BY video_id, title " +
                        "ORDER BY video_count ? " +
                        "LIMIT 5;";
    db.query(sqlSelect, [minDate, maxDate, sortBy], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get top 5 categories within a time period
app.post("/api/get_period_category", (require, response) => {
    const minDate = require.body.minDate;
    const maxDate = require.body.minDate;
    const sortBy = require.body.sortBy;

    const sqlSelect = "SELECT category_id, COUNT(video_id)" + // should be good
                        "FROM Trending_Videos " +
                        "WHERE ? <= trending_date AND trending_date <= ? " +
                        "GROUP BY category_id " +
                        "ORDER BY COUNT(video_id) ? " +
                        "LIMIT 5;";
    db.query(sqlSelect, [minDate, maxDate, sortBy], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get top category frequency within time period (make a graph from this..?)
app.post("/api/get_period_topCategory", (require, response) => {
    const minDate = require.body.minDate;
    const maxDate = require.body.minDate;
    const sortBy = require.body.sortBy;

    const sqlSelect = "SELECT category_title, trending_date, category_occur" +  //two from statments
            "FROM (SELECT category_id, trending_date, COUNT(video_id) as category_occur " +
            "FROM Trending_Videos " +
            "WHERE category_id = (SELECT category_id " +
            "FROM Trending_Videos " +
            "WHERE ? <= trending_date AND trending_date <= ? "
            "GROUP BY category_id " +
            "ORDER BY COUNT(video_id) ? " +
            "LIMIT 1)  " +
            "AND " +
            "? <= trending_date AND trending_date <= ? " +
            "GROUP BY category_id, trending_date) as inside " +
            "NATURAL JOIN Category;";
    db.query(sqlSelect, [minDate, maxDate, sortBy, minDate, maxDate], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get top 5 youtube channels within a time period (days trending- NOT amount )
app.post("/api/get_period_channels", (require, response) => {
    const minDate = require.body.minDate;
    const maxDate = require.body.minDate;
    const sortBy = require.body.sortBy;

    const sqlSelect = "SELECT channel_title, channel_id, COUNT(trending_date) " + //good
                        "FROM Trending_Videos NATURAL JOIN Trending_Channel " +
                        "WHERE ? <= trending_date AND trending_date <= ? " +
                        "GROUP BY channel_id " +
                        "ORDER BY COUNT(trending_date) ? " +
                        "LIMIT 5;";
    db.query(sqlSelect, [minDate, maxDate, sortBy], (err, result) => {
        if (err) 
            console.log(err);
        response.send(result);
    });
});

// Get top trending days for a channel within a time period (make a graph with this??)
// Not impelmented


// ------------------- INSERT -------------------

// USER
// Create new user
// UNDEFINED BEHAVIOR: Creating a user using user_id that already exists
//      - CHECK if the user_id already exists before using this
app.post("/api/insert_new_user", (require, response) => {
    const userId = require.body.userId;

    const sqlInsert = "INSERT INTO User (user_id) VALUES (?)";
    db.query(sqlInsert, [userId], (err, result) => {
        console.log(err);
        response.send(result);
    })
});

// CHANNEL
// Insert user channel associated with user_id
// QUESTION: check if we need to manually set defaults, or can we mention something when creating table
app.post("/api/insert_new_channel", (require, response) => {
    const userId = require.body.userId;
    const channelId = require.body.channelId;
    const channelTitle = require.body.channelTitle;

  
    const sqlDelete = "DELETE FROM Trending_Channel " +
                        " WHERE channel_id = (SELECT user_channel_id " +
                                            "FROM User WHERE user_id = ?);";
    db.query(sqlDelete, [userId], (err, result) => {
        console.log(err);
        const sqlInsert2 = "INSERT INTO Trending_Channel (channel_id, channel_title, total_views, total_likes, "+
                        "total_dislikes, total_comment_count,latest_trending_date) VALUES (?,?,0,0,0,0,'');";
        console.log("new channel title");
        console.log(channelTitle);
        
        db.query(sqlInsert2, [channelId, channelTitle], (err, result) => {
            console.log(err);
        })
    })

    const sqlInsert1 = "UPDATE User SET user_channel_id = ? " + 
        "WHERE user_id = ?";
    db.query(sqlInsert1, [channelId, userId], (err, result) => {
    console.log(err);
    })

    
});

// PLAYLIST
// Create new playlist (associated with userId)
// UNDEFINED BEHAVIOR: Creating a playlist using playlist_id that already exists
//      - CHECK if the playist already exists before using this
app.post("/api/insert_new_playlist", (require, response) => {
    const playlistId = require.body.playlistId;
    const userId = require.body.userId;

    const sqlInsert = "INSERT INTO Playlist (playlist_id, user_id, count_videos) VALUES (?,?, 0)";
    db.query(sqlInsert, [playlistId, userId], (err, result) => {
        console.log(err);
        response.send(result);
    })
});

// VIDEO
// Note: need to update Playlist count whenever video is added/ deleted to Playlist (stored procedure)
//      ALSO separate stored procedure to update Trending Channel + Playlist counts when adding/ removing user video
//          note to self: needs to take the latest values of the video_ids
// QUESTION: Since Playlist is defined by both playlist_id and user_id, should the Playlist_Videos also
//          include user_id????
app.post("/api/insert_video_to_playlist", (require, response) => {
    const playlistId = require.body.playlistId;
    const userId = require.body.userId;
    const trendingDate = require.body.trendingDate;
    const videoId = require.body.videoId;

    const sqlInsert = "INSERT INTO Playlist_Videos (playlist_id, trending_date, video_id, user_id) VALUES (?,?,?,?)";
    db.query(sqlInsert, [playlistId, trendingDate, videoId, userId], (err, result) => {
        console.log(err);
        response.send(result);
    })
});

// Add new youtube video (associated with current user's channelId)
// NOTE: Can turn this into a transaction + trigger...?
app.post("/api/insert_video_to_channel", (require, response) => {
    const videoId = require.body.videoId;
    const publishedAt = require.body.publishedAt;

    const trendingDate = require.body.trendingDate;
    const title = require.body.title;
    const channelId = require.body.channelId;
    const categoryId = require.body.categoryId;
    const tags = require.body.tags;
    const viewCount = require.body.viewCount;
    const likes = require.body.likes;
    const dislikes = require.body.dislikes;
    const commentCount = require.body.commentCount; 
    const thumbnailLink = require.body.thumbnailLink;    
    const commentsDisabled = require.body.commentsDisabled;    
    const ratingsDisabled = require.body.ratingsDisabled;    


    // Inserts in to Youtube_Video if video_id doesn't exist
    const sqlCheck = "SELECT * FROM Youtube_Video WHERE video_id = ?;";
    db.query(sqlCheck, [videoId], (err, result) => {
        console.log("sqlCheck");
        console.log(result);
        const sqlInsert2 = "INSERT INTO Trending_Videos " +
            "(trending_date, video_id, title, channel_id, category_id, tags, view_count, "+
            "likes, dislikes, comment_count, thumbnail_link, comments_disabled, ratings_disabled) " +
            ` VALUES (?,?,?,?,${categoryId},?,?,${likes},${dislikes},${commentCount},?,?,?);`;
        if (result.length === 0) {
            console.log("inserting to Youtube_Video");
            const sqlInsert1 = "INSERT INTO Youtube_Video (video_id, published_at) VALUES (?,?)";
            db.query(sqlInsert1, [videoId, publishedAt], (err2, result2) => {
                if (err2) {
                    console.log(err2);
                    response.send("BAD");
                } else {
                    db.query(sqlInsert2, [trendingDate, videoId, title, channelId, tags, viewCount, thumbnailLink, commentsDisabled, ratingsDisabled], (err, result) => {
                        if (err) {
                            console.log(err);
                            response.send("BAD");
                        } else {
                            response.send("OK");
                        }
                    })
                }
            })
        } else {
            console.log("updating Youtube_Video");
            const sqlUpdate = "UPDATE Youtube_Video SET published_at = ? WHERE video_id = ?";
            db.query(sqlUpdate, [publishedAt, videoId], (err3, result3) => {
                if (err3) {
                    console.log(err3);
                    response.send("BAD");
                } else {
                    db.query(sqlInsert2, [trendingDate, videoId, title, channelId, tags, viewCount, thumbnailLink, commentsDisabled, ratingsDisabled], (err, result) => {
                        if (err) {
                            console.log(err);
                            response.send("BAD");
                        } else {
                            response.send("OK");
                        }
                    })
                }
                
            })
        }
        
        
    })
    

});

// ------------------- DELETE -------------------

// Delete User
/* NOTE: Use a stored procedure to delete user and: 
    - videos uploaded by the user + user channel
    QUESTION: If we allow users to insert videos, then other users will have the videos show up in their search results
            Should we make this a separate table instead??
*/
app.post("/api/delete_user", (require, response) => {
    const userId = require.body.userId;
    
    const sqlDelete = "DELETE FROM User WHERE user_id = ?";
    db.query(sqlDelete, [userId], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);

    })
});

// Delete user's video 
// NOTE: Stored procedure to update all counts of the playlists that incuded that video
// QUESTION: should we give users the ability to delete any videos?
//          or videos from their channel?
// USES THE TRIGGER: after_delete_video_from_channel to DELETE video_id from Youtube_Video 
//                  if no more exists
app.post("/api/delete_video_from_channel", (require, response) => {
    const videoId = require.body.videoId;
    const trendingDate = require.body.trendingDate;
    const channelId = require.body.channelId;
    console.log("sql delete video from channel");
    const sqlDelete = "DELETE FROM Trending_Videos WHERE video_id = ? AND trending_date = ? AND channel_id = ?;";
    db.query(sqlDelete, [videoId, trendingDate, channelId], (err, result) => {
        if (err)  {
            console.log(err);
        } else {
            response.send("OK");
        }
    })
});

// Delete video from playlist
app.post("/api/delete_video_from_playlist", (require, response) => {
    const playlistId = require.body.playlistId;
    const videoId = require.body.videoId;
    const trendingDate = require.body.trendingDate;

    const sqlDelete = "DELETE FROM Playlist_Videos WHERE playlist_id= ? AND video_id = ? AND trending_date = ?";
    db.query(sqlDelete, [playlistId, videoId, trendingDate], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

// Delete playlist
app.post("/api/delete_playlist", (require, response) => {
    const playlistId = require.body.playlistId;
    const userId = require.body.userId;


    const sqlDelete = "DELETE FROM Playlist WHERE playlist_id= ? AND user_id = ?";
    db.query(sqlDelete, [playlistId, userId], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

// Delete channel associated with current userId
// app.post("/api/delete_channel", (require, response) => {
//     const channelId = require.body.channelId;

//     const sqlDelete1 = "DELETE FROM Trending_Channel WHERE channel_id= ?";
//     db.query(sqlDelete1, channelId, (err, result) => {
//         if (err) 
//         console.log(err);
//     })

//     const sqlUpdate = "U WHERE channel_id= ?";
//     db.query(sqlDelete2, channelId, (err, result) => {
//         if (err) 
//         console.log(err);
//     })
// });

// ------------------- UPDATE -------------------

// Update user_id
app.post("/api/update_userId", (require, response) => {
    const userId = require.body.userId;
    const newUserId = require.body.newUserId;

    const sqlUpdate = "UPDATE User SET user_id = ? WHERE user_id= ?";
    db.query(sqlUpdate, [newUserId, userId], (err, result) => {
        if (err) 
        console.log(error);
        response.send(result);
    })
});


// Update channel
app.post("/api/update_channel", (require, response) => {
    const oldChannelId = require.body.oldChannelId;
    //const userId = require.body.userId;
    const newChannelId = require.body.newChannelId;
    const channelTitle = require.body.channelTitle;
    const userId = require.body.userId;


    const sqlUpdate1 = "UPDATE Trending_Channel" +
                        "SET channel_id = ?, channel_title = ?" +
                        "WHERE channel_id = ?";
    db.query(sqlUpdate1, [newChannelId, channelTitle, oldChannelId], (err, result) => {
        console.log(err);
    })
    const sqlUpdate2 = "UPDATE User" +
                        "SET user_channel_id = ?" +
                        "WHERE user_id = ?";
    db.query(sqlUpdate2, [newChannelId, userId], (err, result) => {
        console.log(err);
        response.send(result);
    })
});

// QUESTION: Do we need an update playlist_id??

app.listen(3002, () => {
    console.log("running on port 3002");
})

import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import Post from "./components/Post";
import { useAuth } from "./context/AuthContext";
import { db } from "./firebase";
import InstagramEmbed from "react-instagram-embed";

function App() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="app_posts">
        <div className="app__postsLeft">
          {currentUser ? (
            <ImageUpload />
          ) : (
            <h3 style={{ padding: "20px", textAlign: "center" }}>
              Login to Upload
            </h3>
          )}
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/CKO6SFeAMij/"
            clientAccessToken="129401268964738|6cd3d836ea60f4b7e80217098ef1445e"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

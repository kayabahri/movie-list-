import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Firebase authentication import
import { db } from '../firebase'; // Firebase Firestore import
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Link import
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Beğeni ikonları için react-icons kullanıyoruz

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  // Kullanıcı durumu için auth kontrolü
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Yorumları Firestore'dan çekme ve güncelleme
    const unsubscribeComments = onSnapshot(
      collection(db, 'movies', movieId, 'comments'),
      (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            likes: Array.isArray(data.likes) ? data.likes : [], // likes alanı bir dizi mi kontrol et
            dislikes: Array.isArray(data.dislikes) ? data.dislikes : [], // dislikes alanı bir dizi mi kontrol et
          };
        });
        setComments(commentsData);
      }
    );

    return () => {
      unsubscribe();
      unsubscribeComments();
    };
  }, [movieId]);

  // Yorum gönderme işlevi
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    try {
      await addDoc(collection(db, 'movies', movieId, 'comments'), {
        text: newComment,
        user: user?.displayName || 'Anonim', // Kullanıcı adı yoksa 'Anonim' gösterilecek
        createdAt: new Date(),
        likes: [],
        dislikes: [],
      });
      setNewComment('');
    } catch (error) {
      console.error('Yorum eklenirken hata:', error);
    }
  };

  // Beğeni işlevi
  const handleLike = async (commentId, currentLikes, currentDislikes) => {
    const commentRef = doc(db, 'movies', movieId, 'comments', commentId);
    const hasLiked = currentLikes.includes(user.uid);
    const hasDisliked = currentDislikes.includes(user.uid);

    try {
      if (hasLiked) {
        // Eğer kullanıcı zaten beğenmişse beğeniyi kaldır
        await updateDoc(commentRef, {
          likes: currentLikes.filter((uid) => uid !== user.uid),
        });
      } else {
        // Kullanıcı beğenmemişse beğeni ekle
        const updatedLikes = [...currentLikes, user.uid];
        const updatedDislikes = hasDisliked
          ? currentDislikes.filter((uid) => uid !== user.uid) // Eğer dislike atmışsa dislike'ı kaldır
          : currentDislikes;

        await updateDoc(commentRef, {
          likes: updatedLikes,
          dislikes: updatedDislikes, // Eğer dislike atmışsa kaldır
        });
      }
    } catch (error) {
      console.error('Beğeni güncellenirken hata:', error);
    }
  };

  // Dislike işlevi
  const handleDislike = async (commentId, currentLikes, currentDislikes) => {
    const commentRef = doc(db, 'movies', movieId, 'comments', commentId);
    const hasLiked = currentLikes.includes(user.uid);
    const hasDisliked = currentDislikes.includes(user.uid);

    try {
      if (hasDisliked) {
        // Eğer kullanıcı zaten dislike atmışsa dislike'ı kaldır
        await updateDoc(commentRef, {
          dislikes: currentDislikes.filter((uid) => uid !== user.uid),
        });
      } else {
        // Kullanıcı dislike atmamışsa dislike ekle
        const updatedDislikes = [...currentDislikes, user.uid];
        const updatedLikes = hasLiked
          ? currentLikes.filter((uid) => uid !== user.uid) // Eğer beğenmişse beğeniyi kaldır
          : currentLikes;

        await updateDoc(commentRef, {
          dislikes: updatedDislikes,
          likes: updatedLikes, // Eğer beğenmişse kaldır
        });
      }
    } catch (error) {
      console.error('Dislike güncellenirken hata:', error);
    }
  };

  return (
    <div className="flex w-full h-full max-w-screen-lg mx-auto">
      {/* Sol taraf: Yorum yapma ve yorum listesi */}
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4 text-white text-left">Comments</h2> {/* Sola hizalı başlık */}
        
        {/* Yorumlar Listesi */}
        {comments.length > 0 ? (
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-transparent p-6 rounded-md shadow-md text-left"> {/* Şeffaf arka plan */}
                <div className="flex items-center mb-2">
                  <span className="text-pink-500 font-bold mr-2">{comment.user}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(comment.createdAt.toDate()).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.text}</p>

                {/* Beğen/Beğenmeme Butonları */}
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleLike(comment.id, comment.likes, comment.dislikes)}
                    className={`flex items-center transition ${
                      comment.likes.includes(user?.uid) ? 'text-green-500' : 'text-gray-400'
                    } hover:text-green-400`}
                  >
                    <FaThumbsUp className="mr-1" /> {comment.likes.length}
                  </button>
                  <button
                    onClick={() => handleDislike(comment.id, comment.likes, comment.dislikes)}
                    className={`flex items-center transition ${
                      comment.dislikes.includes(user?.uid) ? 'text-red-500' : 'text-gray-400'
                    } hover:text-red-400`}
                  >
                    <FaThumbsDown className="mr-1" /> {comment.dislikes.length}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-left">No comments yet.</p>
        )}

        {/* Kullanıcı giriş yapmışsa yorum formunu göster */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4 text-left"> {/* Sola hizalı form */}
            <textarea
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
              rows={4}
            />
            <button
              type="submit"
              className="bg-gradient-pink text-white py-2 px-6 rounded-lg shadow-custom-pink transition-all duration-500 hover:brightness-125 hover:shadow-lg"
            >
              Send
            </button>
          </form>
        ) : (
          <p className="mt-6 text-white text-left">
            <Link to="/signin" className="text-pink-500 hover:underline">Sign in</Link> to leave a comment.
          </p>
        )}
      </div>

      {/* Sağ taraf: Boş alan (başka bir içerik ekleyebilmen için) */}
      <div className="w-1/2 p-6">
        {/* Buraya başka bir içerik ekleyebilirsin */}
        <div className="h-full w-full rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default Comments;

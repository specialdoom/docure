import { apiEndpoints } from "../config/api";
import { firebase } from "./firebase";

class ArticleSummaryService {
  getArticles() {
    return firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        return fetch(apiEndpoints.article.all, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data);
      });
  }

  getArticle(id) {
    return firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        return fetch(`${apiEndpoints.article.get}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => data);
      });
  }

  addToRecentlyViewed(id, userId) {
    return firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        return fetch(apiEndpoints.article.recentlyViewed, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, userId: userId }),
        })
          .then((res) => res.json())
          .then((data) => data);
      });
  }
}

export default ArticleSummaryService;

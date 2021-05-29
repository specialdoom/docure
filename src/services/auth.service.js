import { firebase } from "./firebase";
import { navigateTo } from "yrv";
import { loading } from "../store/app.store";
import { isAuthenticated, user } from "../store/auth.store";

class AuthService {
  constructor() {
    this.auth = firebase.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.provider = new firebase.auth.GoogleAuthProvider();

    this.auth.onAuthStateChanged((state) => {
      if (state) {
        isAuthenticated.set(true);
        user.set({
          displayName: state.displayName,
          email: state.email,
          uid: state.uid,
        });
      } else {
        isAuthenticated.set(false);
        user.set({
          displayName: "",
          email: "",
          uid: "",
        });
      }
      loading.set(false);
    });

    loading.set(true);

    this.auth.getRedirectResult().then((result) => {
      if (result.user) {
        user.set({
          displayName: result.user.displayName,
          email: result.user.email,
        });
        isAuthenticated.set(true);
      }
      loading.set(false);
    });
  }

  register(email, password) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  login() {
    this.auth.signInWithRedirect(this.provider);
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        isAuthenticated.set(false);
        navigateTo("/");
      })
      .catch(() => {
        isAuthenticated.set(false);
      });
  }

  getToken() {
    return this.auth.currentUser.getIdToken();
  }
}

export default new AuthService();

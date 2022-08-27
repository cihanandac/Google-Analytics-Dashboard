const initAuth = () => {
  return window.gapi.client.init({
    clientId:
      "67149944135-4608iad6up8cleubnedprrq7kncq5hsg.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    plugin_name: "Google Analytics Data API",
  });
};

export const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth() //calls the previous function
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
        resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const renderButton = () => {
  window.gapi.signin2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

const onSuccess = (googleUser) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
  console.error(error);
};

const axios = require("axios").default;
import { Redirect } from "react-router-dom";
import convertToJSONString from "../../convertToJSONString.js";
import { HashConnect } from "hashconnect";

//function getCookie(cookieName) {
//    const name = cookieName + "=";
//    const decodedCookie = decodeURIComponent(document.cookie);
//    const cookieArray = decodedCookie.split(';');
//
//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i].trim();
//         if (cookie.indexOf(name) === 0) {
//             return cookie.substring(name.length);
//         }
//     }

//     return null; // Retourne null si le cookie n'est pas trouvé
// }
let hashconnect;
let saveData;

const account = {

  saveConnection:(item)=> {
    hashconnect = item;
  },

  saveData:(item)=> {
    saveData = item;
  },

  saveAccount: (item) => {
    // const now = new Date();
    // const expire = new Date();
    // expire.setTime(now.getTime() + 3 * 60 * 60 * 1000);

    sessionStorage.setItem("Account", item);

    // const cookieString = `${'Account'}=${encodeURIComponent(item)}; expires=${expire}; path=/`;
    // document.cookie = cookieString;
  },

  saveAuth: (item) => {
    // const now = new Date();
    // const expire = new Date();
    // expire.setTime(now.getTime() + 3 * 60 * 60 * 1000);

    sessionStorage.setItem("Auth", item);
    // const cookieString = `${'Auth'}=${encodeURIComponent(item)}; expires=${expire}; path=/`;
    //document.cookie = cookieString;
    let delaiEnMillisecondes = 3 * 60 * 60 * 1000;

    setTimeout(() => {
      sessionStorage.removeItem("Account");
      sessionStorage.removeItem("Auth");
      let urlPrincipale = window.location.origin;
      window.location.href = urlPrincipale + "/login";
    }, delaiEnMillisecondes);
  },

  saveKeys: (item) => {
    sessionStorage.setItem("keys", item);
  },

  getKeys: () => {
    let keys = JSON.parse(window.sessionStorage.keys);
    return keys.length;
  },
  getSerials: () => {
    let keys = JSON.parse(window.sessionStorage.keys);
    return keys;
  },
  isLogged: async function () {
    let Auth = sessionStorage.getItem("Auth");
    let Account = sessionStorage.getItem("Account");
    // const Auth = JSON.parse(getCookie('Auth'));
    // const Account = JSON.parse(getCookie('Account'));

    if (Auth && Account) {
      const auth = account.getAuth();
      const id = account.getAccount();

      const body = JSON.stringify({
        userId: id,
        auth: JSON.stringify(auth.userSignature),
        sign: JSON.stringify(auth.signedPayload),
      });

      const url = `https://c9grcgr3s1.execute-api.eu-west-2.amazonaws.com/default/redirectEC2?target=getAuth&walletid=${id}`;
      const resAuth = await axios.post(url, body);

      if (Auth !== null && resAuth.data.msg === "ok") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  getAuth: () => {
    // const Auth = JSON.parse(getCookie('Auth'));
    let auth = sessionStorage.getItem("Auth");
    if (auth === null || auth === undefined) {
      return null;
    } else {
      let AuthJSON = JSON.parse(auth);
      return AuthJSON;
    }
  },

  getAccount: () => {
    // const Account = JSON.parse(getCookie('Account'));
    let account = sessionStorage.getItem("Account");
    if (account === null || account === undefined) {
      return null;
    } else {
      let AccountJSON = JSON.parse(account);
      return AccountJSON;
    }
  },

  getConnection: () => {
    return hashconnect
  },

  getData: () => {
    return saveData
  },

  checkRight: async () => {
    try {
      let account = sessionStorage.getItem("Account");
      account = JSON.parse(account);

      if (account) {
        let url = `https://whvd3dvccg.execute-api.eu-west-2.amazonaws.com/default/Committee_Function?target=checkRight&accountid=${account}`;
        const response = await axios.get(url);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error
    }
  },

  logout: () => {
    sessionStorage.removeItem("Account");
    sessionStorage.removeItem("Auth");
    let urlPrincipale = window.location.origin;
    window.location.href = urlPrincipale + "/login";
  },

  getPseudo: async () => {
    const auth = account.getAuth();
    const authAccount = account.getAccount();

    const body = JSON.stringify({
      userId: authAccount,
      auth: JSON.stringify(auth.userSignature),
      sign: JSON.stringify(auth.signedPayload),
    });

    let url = `https://whvd3dvccg.execute-api.eu-west-2.amazonaws.com/default/Committee_Function?target=getPseudo`;
    const response = await axios.post(url, body);
    return convertToJSONString(response.data);
  },

  getRepresentatives: async () => {
    const auth = account.getAuth();
    const authAccount = account.getAccount();
    try {
      let url = `https://whvd3dvccg.execute-api.eu-west-2.amazonaws.com/default/Committee_Function?target=getRepresentatives`;

      const body = JSON.stringify({
        user: authAccount,
        legend: "Cleo",
        auth: JSON.stringify(auth.userSignature),
        sign: JSON.stringify(auth.signedPayload),
      });

      const response = await axios.post(url, body);

      return JSON.parse(convertToJSONString(response.data));
    } catch (error) {
      console.log(error);
    }
  },

  getOptions: async (id) => {
    const auth = account.getAuth();
    const authAccount = account.getAccount();

    try {
      let url = `https://whvd3dvccg.execute-api.eu-west-2.amazonaws.com/default/Committee_Function?target=getRepresentativesOption`;

      const body = JSON.stringify({
        user: authAccount,
        legend: "Cleo",
        auth: JSON.stringify(auth.userSignature),
        sign: JSON.stringify(auth.signedPayload),
        idvote: id,
      });

      const response = await axios.post(url, body);
      console.log(response);
      if (response.data.length > 0) {
        return JSON.parse(convertToJSONString(response.data));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  NotVoted: async (id, serial) => {
    let url = `https://whvd3dvccg.execute-api.eu-west-2.amazonaws.com/default/Committee_Function?target=CheckVoteRepresentatives&idvote=${id}&serials=${serial}`;
    const response = await axios.post(url);
    console.log(response.data);
    const serialsObject = JSON.parse(convertToJSONString(response.data));
    const nouveauTableau = [];

    // Itérez sur les clés de l'objet
    Object.keys(serialsObject).forEach((cle, index) => {
      // Créez un nouvel objet avec les propriétés appropriées
      const nouvelObjet = {
        serial: parseInt(cle), // Supposons que "serial" doit être un nombre
        hasvoted: serialsObject[cle],
        index: index,
      };
      // Ajoutez le nouvel objet au tableau
      nouveauTableau.push(nouvelObjet);
    });
    const arrayNotVoted = nouveauTableau
      .filter((objet) => objet.hasvoted === false)
      .map((objet) => objet.serial);

    return serialsObject;
  },
};

export default account;

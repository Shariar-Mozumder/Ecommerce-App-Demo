export abstract class Authentication {

   public static isLoginAuthenticated() {
      let authUser = localStorage.getItem("User");
      return !!authUser;
   }
   
}

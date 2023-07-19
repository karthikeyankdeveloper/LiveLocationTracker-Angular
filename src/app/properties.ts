export class Credential{
  private static dbUrl = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";

  protected static url(){
    return this.dbUrl;
  }
}

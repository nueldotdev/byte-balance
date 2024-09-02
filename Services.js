export function isauthenticated(){
  var authenticated = localStorage.getItem("user_id")?true:false;
  return authenticated;
}
export function isActive(myroute){
 
  return window.location.pathname == myroute? true: false;
  /*
  if(pathparams == myroute){
      return true
  }
  else{
      return false
  }*/

}
export var config={
  baseurl:"https://radar2.pythonanywhere.com",
  routeconfig:{
      dashboard:"/dashboard",
      login:"/",
      question: "/question",
      usermanagement: "/usermanagement" ,
      subjectmanagement: "/subjectmanagement",
      assigment: "/assigment" 
  },
  loginstate:["signup", "login"]
}
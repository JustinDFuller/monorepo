# CSS Snippets

### Make an alert box that will count down & disappear
[Codepen](http://codepen.io/Iamjfu/pen/vLaXoM)
 ```css
 .alert {
   background: rgba(179, 14, 14, 0.77);
   color: white;
   min-height: 50px;
   min-width: 250px;
   max-width: 350px;
   padding: 10px;
   border-radius: 6px;
   position: absolute;
   bottom: 5%;
   right: 3%;
   display: none;
   -webkit-box-shadow: 0 10px 6px -6px #777;
   -moz-box-shadow: 0 10px 6px -6px #777;
   box-shadow: 0 10px 6px -6px #777;
 }

 .alert::before {
   content: "";
   background: rgb(165, 26, 26);
   height: 5px;
   position: absolute;
   top: -1px;
   left: 0%;
   right: 0%;
   border-top-right-radius: 6px;
   border-top-left-radius: 6px;
   animation: countdown 5s linear 1;
 }

 @keyframes countdown {
   from {
     right: 0%;
     opacity: 1;
   }
   to {
     right: 100%;
     opacity: 0;
   }
 }
  ```

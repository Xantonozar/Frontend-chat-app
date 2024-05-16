const socket = io('https://server-ye6l.onrender.com');
var names="";
const chatBubbleClasses = [
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error'
];


const randMe= Math.floor(Math.random() * 7);
const bubbleMe= chatBubbleClasses[randMe];
chatBubbleClasses.splice(randMe, 1);
const randOthers  = Math.floor(Math.random() * 6);
const bubble= chatBubbleClasses[randOthers];


const container = document.getElementById('container');
const btn=document.getElementById('btn');
const audio= new Audio('sound.mp3');
const send= document.getElementById('send');
function changeWindow() {
    const btnColor= `btn-${bubbleMe}`;
    const inpColor= `input-${bubbleMe}`;
 const messageBox= document.getElementById('message-box');
  messageBox.remove();
 const msgInp = document.getElementById('msgInp');
 msgInp.removeAttribute('disabled');
 msgInp.classList.add(inpColor);
const send= document.getElementById('send');
send.removeAttribute('disabled');
send.classList.add(btnColor);
btn.innerText="";
btn.innerText="Exit Now";

button.setAttribute('id','exit');
const exit = document.getElementById('exit');
exit.innerText="";
exit.innerText="Exit ";

exit.addEventListener('click',()=>{
  // Reloads the current document
location.reload();


})


}
function getUserName() {
  const username= document.getElementById('username').value;
    console.log(username);
   names= username;
   
  changeWindow();
  socket.emit('new-user-joined', names );
}
function createMsg (name,message){

  let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let time= hours + ":" + minutes + ":" + seconds;

  const msg = document.createElement('div');
  msg.innerHTML=`
  <div class="chat chat-start">
  <div class="chat-header text-${bubble}">
    ${name}
    <time class="text-xs opacity-50">${time}</time>
  </div>
  <div class="chat-bubble chat-bubble-${bubble}">${message}</div>
</div>
  `;
  container.appendChild(msg);
  audio.play();
}
const button = document.getElementById('button');
button.addEventListener('click', getUserName);

socket.on("user-joined", (name) => {
  const message = document.createElement('div');
  message.innerHTML=`
<div class="alert-box"> 
<div role="alert" class="alert alert-success">
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
<span>${name} has joined the conversation!</span>
</div>
</div>
  `
  container.appendChild(message);
  audio.play();
});
const form= document.getElementById('myform');
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgInp = document.getElementById('msgInp');
  const messages = msgInp.value;

  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let time= hours + ":" + minutes + ":" + seconds;
  
    const msg = document.createElement('div');
    msg.innerHTML=`
    <div class="chat chat-end">
    <div class="chat-header text-${bubbleMe}">
      ${names}
      <time class="text-xs opacity-50">${time}</time>
    </div>
    <div class="chat-bubble chat-bubble-${bubbleMe}">${messages}</div>
  </div>
    `;
    container.appendChild(msg);

  msgInp.value="";
  socket.emit('send', messages);
});
socket.on("recieve", (data) => {
   const name= data.name;
   const message = data.messages;
console.log(message);
 createMsg(name,message);
  console.log(data.name + ':'+ data.messages);
  
});


  socket.on("left", (name) => {
    const message = document.createElement('div');
    message.innerHTML=`
  <div class="alert-box"> 
  <div role="alert" class="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>${name} has left the conversation!</span>
</div>
  </div>
    `
    console.log(name);
    container.appendChild(message);
    audio.play();
  });
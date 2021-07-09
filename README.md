# Video Chat(Webrtc)

enables you to video chat by sharing a link

no authentication required just share the link and enter you name

made using express server , socket.io and peerjs(webrtc) and inbult navigator api

socket.io is used for communicating to server

peerjs is used to send stream to all the peer in the specific link

## features

1.  mute /unmute (mute or unmute you)

2.  stop /start video(starts the video or stops video)

3.  screen share (helps you share your screen)

4.  disconnect (helps you to leave meeting and enter post chat)

5.  chat (you can chat with the participants)

6.  raise hand (raise hand tells everyone in the meeting that you have raised your hand)

7.  speak command to execute above commands (mordern feature)(unique)

8.  blur (blur the background)

## to use in your pc

1.  clone this repositry

2.  make sure to install dependencies (npm i dependencies_name)

3.  run node server.js (while in the folder)

4.  go to web browser to http://localhost:3000

5.  enter your name and share link

## directions to use

1.  when you go to localhost:3000 you will be directed to the chat before the meeting

2.  you will be asked to enter your name

3.  you can either chat or leave or start a video chat by pressing the above buttons

4.  if your start a video chat you will be redirected to the different url which will show your video and different button with specific features written above

5.  if you hover over buttons you will come to know about what they do

6.  TIP:- if you want to go to the before/after chat of the meeting just add '/chat' on the url

## the SPEAK TO BOT button

1.  click on button and tell the work that you want to do

2.  its not a AI (only works on specific keywords)

3.  the keywords are :-

         KEYWORDS(with_functionality)

    3.1. MUTE/UNMUTE (for muting or unmuting)
    3.2. DISCONNECT?LEAVE (for leavig the meeting)
    3.3. RAISEHAND/HAND/HANDRAISE (raises your hand)
    3.4. SCREENSHARE/SHARESCREEN (share your scrren)
    3.5. COPY/COPYLINK (copy the link of your meeting)
    3.6. PARTICIPANTS/PARTICIPANT (shows you participants)
    3.7. VIDEO (turns on or off the video)
    3.8. BLUR (blurs the background)

4.  it will show you what it hears

## TRY ON OTHER TAB

if you dont have friends try this in other chrome tab just copy link and join the meeting

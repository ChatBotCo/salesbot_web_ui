import {AvatarWindow} from "../components/avatar/AvatarWindow.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {MuteBtn} from "../components/avatar/MuteBtn.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {useRef} from "react";
import {TextInput} from "../components/chat/TextInput.jsx";
import {InstallDemoApp} from "../components/chat/InstallDemoApp.jsx";
import {ContactSales} from "../components/chat/ContactSales.jsx";
import {AvatarResponse} from "../components/chat/AvatarResponse.jsx";
import {HeaderBar} from "../components/HeaderBar.jsx";

export const ChatPage = () => {
  const {
    backendUrl,
    loading,
    setLoading,
    company,
    conversation,
    avatarResponse,
    setAvatarResponse,
    lastAvatarResponseText,
    setLastAvatarResponseText,
    resetConvo,
    mute,
    onMessagePlayed,
    setAudio,
  } = useChat();

  const {
    showAvatar,
  } = useAvatar()

  const input = useRef();

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && !avatarResponse) {
      setLoading(true);
      const _muted = mute || !showAvatar
      const body = JSON.stringify({
        user_msg:  text || "Hello",
        mute: _muted,
      })
      const data = await fetch(`${backendUrl}/api/submit_user_message?convoid=${conversation.id}&companyid=${company.company_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      // console.log(data)
      const newAvatarResponse = await data.json()
      console.log(newAvatarResponse)
      // console.log(newAvatarResponse.assistant_response.content)

      // Update state
      setLoading(false);
      setAvatarResponse(newAvatarResponse)// ephemeral
      setLastAvatarResponseText(newAvatarResponse.assistant_response.content)// persists - so the text remains on the screen
      input.current.value = "";

      if(!_muted) {
        // Play the audio - this must be inline with the user-initiated event (button press) due to mobile device auto-playback permission issues
        if(newAvatarResponse.audio.startsWith("AAAAAAAAAAAAAAAA")) {
          console.error(`Bad audio file data:${newAvatarResponse.audio}`)
          onMessagePlayed()
        } else {
          const audio = new Audio("data:audio/mp3;base64," + newAvatarResponse.audio);
          audio.play();
          setAudio(audio);
          audio.onended = onMessagePlayed;
        }
      } else {
        // If muted, then immediately clear the message
        onMessagePlayed()
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-between items-center">
      <HeaderBar/>
      <a
        className='text-blue-500 underline cursor-pointer'
        onClick={resetConvo}
      >Reset conversation</a>
      <div className='
        flex flex-col justify-end grow
        overflow-x-hidden overflow-y-scroll
        p-1
      '>
        <div className="flex flex-row justify-between items-end w-96">
          {showAvatar && <AvatarWindow/>}
          <AvatarResponse/>
        </div>
        <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
        <InstallDemoApp />
        <ContactSales />
        <MuteBtn/>
      </div>
    </div>
  );

};

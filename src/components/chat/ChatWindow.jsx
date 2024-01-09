import {useRef} from "react";
import {useChat} from "../../hooks/useChat.jsx";
import {TextInput} from "./TextInput.jsx";
import {AvatarResponse} from "./AvatarResponse.jsx";
import {InstallDemoApp} from "./InstallDemoApp.jsx";
import {ContactSales} from "./ContactSales.jsx";
import {useAvatar} from "../../hooks/useAvatar.jsx";

export const ChatWindow = () => {
  const {
    backendUrl,
    loading,
    setLoading,
    company,
    conversation,
    avatarResponse,
    setAvatarResponse,
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
    <div className="flex w-full flex-col justify-start md:justify-end items-center pb-2 pt-5">
      <h1>Welcome to <span className='font-extrabold text-xl'>{company && company.name}</span></h1>
      <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
      <AvatarResponse />
      <InstallDemoApp />
      <ContactSales />
      <a
        className='text-blue-500 underline cursor-pointer'
        onClick={resetConvo}
      >Reset conversation</a>
    </div>
  );

};

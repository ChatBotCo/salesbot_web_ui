import {AvatarWindow} from "./avatar/AvatarWindow.jsx";
import {useAvatar} from "../hooks/useAvatar.jsx";
import {useChat} from "../hooks/useChat.jsx";
import {useUtilities} from "../hooks/useUtilities.jsx";
import {useCompany} from "../hooks/useCompany.jsx";
import {useEffect, useRef, useState} from "react";
import {TextInput} from "./chat/TextInput.jsx";
import {ButtonInstallDemoApp} from "./chat/ButtonInstallDemoApp.jsx";
import {ButtonContactSales} from "./chat/ButtonContactSales.jsx";
import {AvatarResponse} from "./avatar/AvatarResponse.jsx";
import {HeaderBar} from "./chat/HeaderBar.jsx";


let initialized = false

export const ChatPage = () => {
  const {
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
    companyId,
    company,
    companyLoadError,
  } = useCompany();

  const {
    backendUrl,
    loading,
    setLoading,
  } = useUtilities();

  const {
    showAvatar,
  } = useAvatar()

  const input = useRef();

  const [showCompanyIdError, setShowCompanyIdError] = useState(false);

  useEffect(() => {
    if(!initialized) {
      initialized = true
      if(!companyId) {
        setShowCompanyIdError(true)
      }
    }
  }, []);

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
      {
        showCompanyIdError ? (
          <div className="flex h-96 w-full flex-col justify-center items-center p-4">
            <h1>Missing parameter: <em>company_id</em></h1>
          </div>
        ) : (
          companyLoadError ? (
            <div className="flex h-96 w-full flex-col justify-center items-center p-4">
              <h1>Error loading companyId <em>{companyId}</em></h1>
            </div>
          ) : (
            <>
              <div className='
                flex flex-col justify-end grow
                overflow-x-hidden overflow-y-auto
                p-1
              '>
                <div className="flex flex-row justify-between items-end w-96">
                  {showAvatar && <AvatarWindow showMuteBtn={true}/>}
                  <AvatarResponse/>
                </div>
                <TextInput inputActive={true} inputRef={input} sendMessage={sendMessage}/>
                <ButtonInstallDemoApp />
                <ButtonContactSales />
              </div>
            </>
          )
        )
      }
    </div>
  );

};

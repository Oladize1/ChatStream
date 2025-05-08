import React from 'react'
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

import { useAuthStore } from '../Store/Store';


const VideoCall = () => {
    const { selectedUser } = useAuthStore()
    const apiKey = 'zumsgar8e3t5';
    const token ='rgv4zwjpqpyxexvcrg8mhxjsken7jbmwqx29matgkbfmm5fsk6u9x8j5qg9v46bf';
    const userId = selectedUser;
    const callId = 'FJ3NDdmA4XH3';
    console.log("selected user",selectedUser)
  return (
    <div>VideoCall</div>
  )
}

export default VideoCall
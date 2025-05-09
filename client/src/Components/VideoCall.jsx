import React from 'react'
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

import { useAuthStore } from '../Store/Store';


const VideoCall = () => {
    const { selectedUser } = useAuthStore()
    console.log("selected user",selectedUser)
  return (
    <div>VideoCall</div>
  )
}

export default VideoCall
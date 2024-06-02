"use client";

import { useTimer } from "@gabrielyotoo/react-use-timer";

const OTPVerification = () => {
  const { currentTime, isRunning, start } = useTimer(10000);

  const handleResend = () => {
    // Code to resend the SMS
    // Reset the timer
    start();
  };

  return (
    <div>
      {isRunning ? (
        <p>Time Remaining: {currentTime}</p>
      ) : (
        <button onClick={handleResend}>Resend OTP</button>
      )}
    </div>
  );
};

export default OTPVerification;

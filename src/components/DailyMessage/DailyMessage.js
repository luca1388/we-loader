import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomIntBetweenZeroAnd } from "../../utils/math-utils";
import messages from "../../i18n.json";

const DailyMessage = ({ ratio }) => {
  const messageRef = useRef(null);
  const [message, setMessage] = useState("");

  const getMessage = useCallback(() => {
    if (ratio === null) {
        return "";
    }
    if (ratio < 0.5) {
      const index = getRandomIntBetweenZeroAnd(
        messages.weekendMessages.firstHalf.length
      );
      return messages.weekendMessages.firstHalf[index];
    }
    if (ratio < 1) {
      const index = getRandomIntBetweenZeroAnd(
        messages.weekendMessages.secondHalf.length
      );
      return messages.weekendMessages.secondHalf[index];
    }
    const index = getRandomIntBetweenZeroAnd(
      messages.weekendMessages.completed.length
    );
    return messages.weekendMessages.completed[index];
  }, [ratio]);

  useEffect(() => {
    if (ratio !== null) {
      if (messageRef.current === null) {
        messageRef.current = true;
      }
    }
  }, [ratio]);

  useEffect(() => {
    if (messageRef.current || ratio === 1) {
      messageRef.current = false;
      setMessage(getMessage());
    }
  }, [getMessage, ratio]);

  return <p>{message}</p>;
};

export default DailyMessage;
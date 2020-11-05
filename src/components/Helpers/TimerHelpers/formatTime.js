export default function formatTime(internalTimeInSec) {
  // Quotient-Remainder Theorem: Given any integer, n, and positive, integer, d,
  // I can find integers q and r s.t.
  // n = dq + r where r is between 0 and d-1
  let hours = Math.floor(internalTimeInSec / 3600); // n div d
  let remainingSeconds = internalTimeInSec % 3600; // n mod d
  let minutes = Math.floor(remainingSeconds / 60); // n div d
  let seconds = remainingSeconds % 60;

  // conditional rendering: when the hours, minutes and seconds to display are less than 10, add an extra 0 for normal looking display
  minutes = hours > 0 && minutes < 10 ? "0" + minutes : minutes;
  seconds = minutes > 0 && seconds < 10 ? "0" + seconds : seconds;

  // if hours > 0, show it, if the minutes are > 0, show them, else only show the seconds
  let timeToDisplay = `${seconds} seconds`;
  //hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  if (hours > 0) {
    timeToDisplay = `${hours}:${minutes}:${seconds}`;
  } else if (minutes > 0) {
    timeToDisplay = `${minutes}:${seconds}`;
  }

  return timeToDisplay;
}

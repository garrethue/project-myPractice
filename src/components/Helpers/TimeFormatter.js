function TimeFormatter(totalseconds) {
  // Quotient-Remainder Theorem: Given any integer, n, and positive, integer, d,
  // I can find integers q and r s.t.
  // n = dq + r where r is between 0 and d-1
  let hours = Math.floor(totalseconds / 3600); // n div d
  let remainingSeconds = totalseconds % 3600; // n mod d
  let minutes = Math.floor(remainingSeconds / 60); // n div d
  let seconds = remainingSeconds % 60;

  // if hours > 0, show it, if the minutes are > 0, show them, else only show the seconds
  let timeToDisplay = `${seconds} seconds`;
  //hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  if (hours > 0) {
    timeToDisplay = `${hours} hours ${minutes} minutes ${seconds} seconds`;
  } else if (minutes > 0) {
    timeToDisplay = `${minutes} minutes ${seconds} seconds`;
  }

  return timeToDisplay;
}
export default TimeFormatter;

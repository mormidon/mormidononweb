function CurrentDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = today.getMonth();
  const month = monthNames[monthIndex];
  const year = today.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return (
    <>
      <h1>{formattedDate}</h1>
    </>
  );
}

export default CurrentDate;

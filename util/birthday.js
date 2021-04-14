const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

function getNextBirthday(birthdate) {
  const now = new Date();
  const nextBirthdayIsThisYear =
    now.getMonth() < birthdate.getMonth() ||
    (now.getMonth() === birthdate.getMonth() &&
      now.getDate() < birthdate.getDate());
  let next_birth_date;

  if (nextBirthdayIsThisYear) {
    next_birth_date = new Date(
      now.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
  } else {
    //next birthday is next year
    next_birth_date = new Date(
      now.getFullYear() + 1,
      birthdate.getMonth(),
      birthdate.getDate()
    );
  }
  return next_birth_date;
}

function getHowManyDaysUntilBirthday(birthdate) {
  const now = new Date();
  const next_birth_date = getNextBirthday(birthdate);
  console.log(next_birth_date);

  return Math.floor(
    (next_birth_date.getTime() - now.getTime()) / oneDayInMilliseconds
  );
}

module.exports = {
  getHowManyDaysUntilBirthday,
};

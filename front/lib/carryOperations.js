function numberOfCarryOperations(firstInt, secondInt) {
  const firstDigits = `${firstInt}`.split("").reverse();
  const secondDigits = `${secondInt}`.split("").reverse();

  let carryCount = 0;
  let carryLast = false;

  for (let i = 0; !(i >= firstDigits.length && i >= secondDigits.length); i++) {
    const carry = carryLast ? 1 : 0;
    const sum =
      parseInt(firstDigits[i] || 0) +
      parseInt(secondDigits[i] || 0) +
      parseInt(carry);
    if (sum >= 10) {
      carryCount++;
      carryLast = true;
    } else {
      carryLast = false;
    }
  }

  console.log(firstInt, secondInt);
  console.log("CARRY COUNT: ", carryCount);

  return carryCount;
}

export default numberOfCarryOperations;

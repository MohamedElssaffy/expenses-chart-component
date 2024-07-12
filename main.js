(async () => {
  const balance = document.querySelector('.balance');
  let balanceSpan = balance.querySelector('span');
  const monthAmount = document.querySelector('.curr-month');
  let monthAmountSpan = monthAmount.querySelector('span');
  try {
    const response = await fetch('./data.json');
    const json = await response.json();

    balanceSpan.innerHTML += json['balance'];
    monthAmountSpan.innerHTML += json['monthAmount'];

    const days = json['days'];

    // calc total and max value
    let amounts = [];
    const totalAmount = Object.values(days).reduce((acc, cur) => {
      amounts.push(cur.amount);
      return acc + cur.amount;
    }, 0);
    const max = Math.max(...amounts);

    Object.keys(days).forEach((key) => {
      const day = document.querySelector(`.${key} div span`);
      day.innerHTML += days[key]['amount'];

      if (max === days[key]['amount']) day.parentElement.classList.add('max');

      day.parentElement.style.height = `${
        (days[key]['amount'] / totalAmount) * 30
      }rem`;
    });
  } catch (error) {
    balanceSpan.innerHTML += 0;
    monthAmountSpan.innerHTML += 0;

    Array.from(document.querySelectorAll('.chart > div > div span')).forEach(
      (span) => (span.innerHTML = 0)
    );
  }
})();

export default function AboutDonations({ donations, users }) {
  let countHelpers = 0;

  const filteredDonations = users.map((user, index) => {
    if (user.donations.length >= 1) {
      countHelpers = countHelpers + 1;
    }
  });

  const total = donations.reduce(function (sum, current) {
    return sum + current.amount;
  }, 0);

  return (
    <ul>
      <li>
        <p>{donations.length}</p>
        <p>Donations</p>
      </li>
      <li>
        <p>£{total}</p>
        <p>Donated</p>
      </li>
      <li>
        <p>{countHelpers}</p>
        <p>Helpers</p>
      </li>
    </ul>
  );
}

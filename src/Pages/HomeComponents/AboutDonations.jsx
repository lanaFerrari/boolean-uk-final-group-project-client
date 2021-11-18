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
    <div className="centering padding-top padding-bottom">
      <ul className="three-c-grid bold-font">
        <li className="box align-center padding-top padding-bottom">
          <p className="align-center ">{donations.length}</p>
          <p className="blue-color ">Donations</p>
        </li>
        <li className="box align-center padding-top padding-bottom">
          <p className="align-center ">£{total}</p>
          <p className="blue-color">Donated</p>
        </li>
        <li className="box align-center padding-top padding-bottom">
          <p className="align-center ">{countHelpers}</p>
          <p className="blue-color">Helpers</p>
        </li>
      </ul>
    </div>
  );
}

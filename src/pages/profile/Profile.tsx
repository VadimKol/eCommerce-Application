import classNames from 'classnames';

import styles from './styles.module.scss';

export function Profile(): JSX.Element {
  return (
    <main className={classNames('main', styles.main)}>
      <h1>Profile</h1>
      <form>
        <div>
          <div>Person</div>
          <div>Shipping</div>
          <div>Billing</div>
        </div>
        <div>
          <div>
            <h2>Person info</h2>
            <div className={styles.name_block}>
              <label htmlFor="name-profile" className={styles.name_label}>
                Name:
                <input id="name-profile" placeholder="name" />
              </label>
            </div>
            <div className={styles.surname_block}>
              <label htmlFor="surname-profile" className={styles.surname_label}>
                Surname:
                <input id="surname-profile" placeholder="surname" />
              </label>
            </div>
            <div className={styles.date_block}>
              <label htmlFor="date-profile" className={styles.date_label}>
                Birhday:
                <input type="date" id="datel-profile" />
              </label>
            </div>
            <div className={styles.email_block}>
              <label htmlFor="email-profile" className={styles.email_label}>
                Email:
                <input id="email-profile" placeholder="email" autoComplete="email" />
              </label>
            </div>
            <div className={styles.password_block}>
              <label htmlFor="password-login" className={styles.password_label}>
                Password:
                <input id="password-login" placeholder="password" autoComplete="current-password" />
              </label>
            </div>
          </div>
          <div>
            <h2>Shipping addresses</h2>
            <table>
              <thead>
                <tr>
                  <th id="shipping_id">Id</th>
                  <th id="shipping_country">Country</th>
                  <th id="shipping_city">City</th>
                  <th id="shipping_address">Address</th>
                  <th id="shipping_postal">Postal code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>US</td>
                  <td>New York City</td>
                  <td>Second Street 15</td>
                  <td>10001</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>US</td>
                  <td>Durham</td>
                  <td>South Road</td>
                  <td>27517</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td>
                    <label htmlFor="new-country-profile">
                      <span className="visually-hidden">New country Profile</span>
                      <input id="new-country-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-city-profile">
                      <span className="visually-hidden">New city Profile</span>
                      <input id="new-city-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-street-profile">
                      <span className="visually-hidden">New street Profile</span>
                      <input id="new-street-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-postal-profile">
                      <span className="visually-hidden">New postal code Profile</span>
                      <input id="new-postal-profile" />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Billing addresses</h2>
            <table>
              <thead>
                <tr>
                  <th id="shipping_id">Id</th>
                  <th id="shipping_country">Country</th>
                  <th id="shipping_city">City</th>
                  <th id="shipping_address">Address</th>
                  <th id="shipping_postal">Postal code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>US</td>
                  <td>New York City</td>
                  <td>Second Street 15</td>
                  <td>10001</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td>
                    <label htmlFor="new-country-profile">
                      <span className="visually-hidden">New country Profile</span>
                      <input id="new-country-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-city-profile">
                      <span className="visually-hidden">New city Profile</span>
                      <input id="new-city-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-street-profile">
                      <span className="visually-hidden">New street Profile</span>
                      <input id="new-street-profile" />
                    </label>
                  </td>
                  <td>
                    <label htmlFor="new-postal-profile">
                      <span className="visually-hidden">New postal code Profile</span>
                      <input id="new-postal-profile" />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </main>
  );
}

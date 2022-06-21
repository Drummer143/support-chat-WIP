import { faStar } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DialogCell.module.css';

const mapRating = dialogRating => {
    let rating;
    if (dialogRating && dialogRating !== -1) {
        rating = ['goldStar', 'goldStar', 'goldStar', 'goldStar', 'goldStar'];
        for (let i = dialogRating; i < 5; i++) {
            rating[i] = 'greyStar';
        }
        rating = rating.map((star, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className={styles[star]} />
        ));
    } else {
        rating = <p>User did not put a rating</p>;
    }

    return rating;
};

export default mapRating;
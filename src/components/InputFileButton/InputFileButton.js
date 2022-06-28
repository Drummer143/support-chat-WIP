import { faPaperclip } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './InputFileButton.module.css';

function InputFileButton({ returnImage, isDisabled = false, text = '', btnStyle = 'circle' }) {
    const style = btnStyle === 'circle' ? 'circle' : 'button';

    return (
        <div className={styles.imageInput}>
            <input
                type="file"
                id="fileInput"
                multiple={true}
                onChange={e => returnImage(e.target.files[0])}
                accept="image/jpeg,image/png"
                style={{ display: 'none' }}
            />
            <button
                type="button"
                onClick={() => document.getElementById('fileInput').click()}
                disabled={isDisabled}
                className={styles[style]}
            >
                {text || <FontAwesomeIcon icon={faPaperclip} />}
            </button>
        </div>
    );
}

export default InputFileButton;

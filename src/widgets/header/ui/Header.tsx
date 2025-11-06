import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.brend}>Торты Ваганян</div>

            <div className={styles.menu}>
                <div>Обо мне</div>
                <div>Контакты</div>
            </div>

        </header>
    );
}

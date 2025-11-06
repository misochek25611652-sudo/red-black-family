// app/page.tsx
import Header from '@/widgets/header/ui/Header';
import styles from './Home.module.scss';

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <Header></Header>
        </div>
    );
}

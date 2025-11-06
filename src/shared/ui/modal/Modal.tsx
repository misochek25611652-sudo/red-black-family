'use client';

// @/shared/ui/modal/Modal.tsx
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Сбрасываем состояние закрытия при открытии модального окна
    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
        }
    }, [isOpen]);

    // Закрываем модалку при нажатии Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
    };

    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose(); // Вызываем onClose только после завершения анимации
            setIsClosing(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Экспонируем функцию handleClose для внешнего использования
    useEffect(() => {
        const handleExternalClose = () => {
            handleClose();
        };

        // Слушаем кастомное событие для программного закрытия с анимацией
        window.addEventListener('closeModalWithAnimation', handleExternalClose);

        return () => {
            window.removeEventListener('closeModalWithAnimation', handleExternalClose);
        };
    }, []);

    if (!isOpen && !isClosing) return null;

    return (
        <div
            ref={backdropRef}
            className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`}
            onClick={handleBackdropClick}
            onAnimationEnd={handleAnimationEnd}
        >
            <button className={styles.closeButton} onClick={handleClose} aria-label="Закрыть">
                ×
            </button>
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}
                onAnimationEnd={handleAnimationEnd}
            >
                {children}
            </div>
        </div>
    );
};

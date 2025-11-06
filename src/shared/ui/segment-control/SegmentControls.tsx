'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './SegmentControl.module.scss';

type Option = { label: React.ReactNode; value: string; disabled?: boolean };

interface Props {
    value?: string;
    defaultValue?: string;
    options: Option[];
    onValueChange?: (val: string) => void;
    className?: string;
    variant?: 'filled' | 'ghost';
    disabled?: boolean;
}

export function SegmentControls({
    value,
    defaultValue,
    options,
    onValueChange,
    className,
    variant = 'filled',
    disabled = false,
}: Props) {
    const isControlled = value !== undefined;
    const [inner, setInner] = useState<string | undefined>(defaultValue ?? options[0]?.value);
    const current = isControlled ? value! : inner!;
    const setCurrent = useCallback(
        (v: string) => {
            if (!isControlled) setInner(v);
            onValueChange?.(v);
        },
        [isControlled, onValueChange]
    );

    const rootRef = useRef<HTMLDivElement | null>(null);
    const thumbRef = useRef<HTMLDivElement | null>(null);

    const updateThumb = useCallback(() => {
        const root = rootRef.current;
        const thumb = thumbRef.current;
        if (!root || !thumb) return;
        const active = root.querySelector<HTMLButtonElement>(
            `button[data-value="${CSS.escape(current)}"]`
        );
        if (!active) return;

        const rootRect = root.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        const x = activeRect.left - rootRect.left + root.scrollLeft;
        const w = activeRect.width;

        thumb.style.transform = `translateX(${x}px)`;
        thumb.style.width = `${w}px`;
    }, [current]);

    useLayoutEffect(updateThumb, [updateThumb]);
    useEffect(() => {
        const ro = new ResizeObserver(updateThumb);
        if (rootRef.current) ro.observe(rootRef.current);
        return () => ro.disconnect();
    }, [updateThumb]);

    return (
        <div
            ref={rootRef}
            className={clsx(
                styles.segmentControls,
                styles[variant],
                disabled && styles.disabled,
                className
            )}
            data-disabled={disabled || undefined}
            data-value={current}
        >
            <div ref={thumbRef} aria-hidden className={styles.thumb} />

            {options.map((opt) => {
                const isActive = current === opt.value;
                return (
                    <button
                        key={opt.value}
                        data-active={isActive || undefined}
                        data-disabled={opt.disabled || disabled || undefined}
                        className={clsx(styles.segment)}
                        type="button"
                        disabled={disabled || opt.disabled}
                        onClick={() => !disabled && !opt.disabled && setCurrent(opt.value)}
                        data-value={opt.value}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

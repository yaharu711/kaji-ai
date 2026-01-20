import { useId, useRef, useState, type ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import styles from "./DropdownSelect.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const RADIUS_CLASS = {
  md: styles.radiusMd,
  lg: styles.radiusLg,
  pill: styles.radiusPill,
} as const;

const VARIANT_CLASS = {
  default: styles.variantDefault,
  soft: styles.variantSoft,
} as const;

const WIDTH_CLASS = {
  auto: styles.widthAuto,
  sm: styles.widthSm,
  md: styles.widthMd,
  lg: styles.widthLg,
  full: styles.widthFull,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Radius = keyof typeof RADIUS_CLASS;
type Variant = keyof typeof VARIANT_CLASS;
type Width = keyof typeof WIDTH_CLASS;

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface DropdownSelectProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  width?: Width;
  size?: Size;
  radius?: Radius;
  variant?: Variant;
}

function DropdownSelect({
  label,
  helperText,
  placeholder = "選択してください",
  options,
  value,
  onChange,
  disabled = false,
  width = "full",
  size = "md",
  radius = "lg",
  variant = "default",
}: DropdownSelectProps) {
  const generatedId = useId();
  const dropdownId = `${generatedId}-dropdown`;
  const labelId = label ? `${generatedId}-label` : undefined;
  const descriptionId = helperText ? `${generatedId}-desc` : undefined;
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = internalOpen;

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const updateOpen = (nextOpen: boolean) => {
    setInternalOpen(nextOpen);
  };

  const handleSelect = (nextValue: string) => {
    if (disabled) {
      return;
    }
    onChange(nextValue);
    updateOpen(false);
    triggerRef.current?.focus();
  };

  const rootClassName = [styles.root, WIDTH_CLASS[width]].filter(Boolean).join(" ");

  const triggerClassName = [
    styles.trigger,
    SIZE_CLASS[size],
    RADIUS_CLASS[radius],
    VARIANT_CLASS[variant],
    disabled ? styles.disabled : "",
    isOpen ? styles.triggerOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  const panelClassName = [styles.panel, RADIUS_CLASS[radius], VARIANT_CLASS[variant]]
    .filter(Boolean)
    .join(" ");

  const listId = `${generatedId}-menu`;

  return (
    <div className={rootClassName}>
      {label ? (
        <label id={labelId} className={styles.label} htmlFor={dropdownId}>
          {label}
        </label>
      ) : null}

      <DropdownMenu.Root open={isOpen} onOpenChange={updateOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            id={dropdownId}
            ref={triggerRef}
            type="button"
            className={triggerClassName}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            disabled={disabled}
          >
            <span className={styles.triggerContent}>
              {selectedOption?.icon ? (
                <span className={styles.triggerIcon}>{selectedOption.icon}</span>
              ) : null}
              <span
                className={[styles.triggerText, !selectedOption ? styles.placeholder : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {selectedOption?.label ?? placeholder}
              </span>
            </span>
            <span
              className={[styles.triggerCaret, isOpen ? styles.triggerCaretOpen : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <ChevronDown size={18} aria-hidden />
            </span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={panelClassName}
            side="bottom"
            align="start"
            sideOffset={10}
            onCloseAutoFocus={(event: Event) => {
              event.preventDefault();
              triggerRef.current?.focus();
            }}
          >
            <DropdownMenu.RadioGroup
              id={listId}
              className={styles.list}
              value={value ?? ""}
              onValueChange={handleSelect}
            >
              {options.length === 0 ? (
                <div className={styles.empty}>選択肢がありません</div>
              ) : (
                options.map((option) => (
                  <DropdownMenu.RadioItem
                    key={option.value}
                    className={styles.option}
                    value={option.value}
                  >
                    <span className={styles.optionContent}>
                      {option.icon ? (
                        <span className={styles.optionIcon}>{option.icon}</span>
                      ) : null}
                      <span className={styles.optionLabel}>{option.label}</span>
                    </span>
                    <span className={styles.optionCheck} aria-hidden>
                      <DropdownMenu.ItemIndicator>
                        <Check size={18} />
                      </DropdownMenu.ItemIndicator>
                    </span>
                  </DropdownMenu.RadioItem>
                ))
              )}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {helperText ? (
        <p id={descriptionId} className={styles.helperText}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default DropdownSelect;

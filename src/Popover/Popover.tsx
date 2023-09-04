import clsx from "clsx";

import { Popover as BasePopover } from "@mui/material";

import styles from "./Popover.module.css";

const Popover: React.FC<PopoverProps> = (props) => {
  const {
    anchorId,
    children,
    anchorEl,
    setAnchorEl,
    className,
    width,
    ...rest
  } = props;
  return (
    <BasePopover
      classes={{
        paper: clsx(
          styles.popoverRoot,
          width && styles[`popoverWidth${width}`],
          className
        ),
      }}
      id={anchorId}
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...rest}
    >
      {children}
    </BasePopover>
  );
};

type PopoverProps = React.PropsWithChildren<{
  className?: string;
  anchorId?: string;
  anchorEl: Element | null;
  setAnchorEl: (anchorEl: Element | null) => void;
  width?: number;
}>;

export default Popover;

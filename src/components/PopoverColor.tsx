import '@/styles/popoverColor.css';
import { BACKGROUND_COLORS } from '@/utils/constants';
import { CircleOff, LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

type TypePopoverColor = {
  ButtonColorRef: React.RefObject<HTMLButtonElement | null>;
  showColors: boolean;
  colorNote: string;
  loading: boolean;
  closeColor: () => void;
  handleChangeColor: (color: string | undefined) => void;
};

const PopoverColor = ({
  ButtonColorRef,
  showColors,
  closeColor,
  colorNote,
  loading,
  handleChangeColor,
}: TypePopoverColor) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        ButtonColorRef.current &&
        !ButtonColorRef.current.contains(e.target as Node)
      ) {
        closeColor();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeColor, ButtonColorRef]);

  return (
    <>
      <div className={`popover-container ${showColors ? 'active' : ''}`} ref={popoverRef}>
        <button onClick={() => handleChangeColor(undefined)} className="btn-circle btn-not-color">
          <CircleOff />
        </button>

        {BACKGROUND_COLORS.map(color => (
          <button
            key={color}
            onClick={() => handleChangeColor(color)}
            className={`btn-circle btn-color ${colorNote === color ? 'btn-color-selection' : ''}`}
            style={{ background: color }}
          />
        ))}
      </div>
      <div
        className="loading-container-color"
        style={loading ? { display: 'block' } : { display: 'none' }}
      >
        <LoaderCircle className="loading-color" />
      </div>
    </>
  );
};

export default PopoverColor;

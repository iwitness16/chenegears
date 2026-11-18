import { AccessIcon } from "./Icons";

export default function AccessibilityButton() {
  return (
    <button className="a11y" aria-label="Accessibility options"><AccessIcon width={26} height={26} /></button>
  );
}

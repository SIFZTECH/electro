import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { PiMopedFrontBold } from "react-icons/pi";

function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <PiMopedFrontBold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <PiMopedFrontBold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <PiMopedFrontBold className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ToggleGroupDemo;

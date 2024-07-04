import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import SpinnerMini from "../components/ui/SpinnerMini";

const RecentOtpOptionButton = ({ channel, isSubmitting }) => {
  <Dialog>
    <DialogTrigger>
      <span className="text-color-primary hover:text-color-primary/80">
        Resend OTP
      </span>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-start">
      <h2 className="font-semibold font-serif mt-2">
        Where you want to resend your OTP?
      </h2>
      <p className="text-muted-foreground text-sm">
        Choose where you want to get your OTP.
      </p>

      <ToggleGroup
        type="single"
        className="mt-2 flex flex-col items-start text-center gap-2"
        onValueChange={(value) => setValue("channel", value)}
      >
        <ToggleGroupItem
          value="number"
          className="data-[state='on']:bg-gray-200"
        >
          Phone: {channel?.number}
        </ToggleGroupItem>
        <ToggleGroupItem value="email" className="">
          Email: {channel?.email}
        </ToggleGroupItem>
      </ToggleGroup>

      <button type="submit" className="mx-2 btn-primary text-sm font-medium">
        {isSubmitting ? <SpinnerMini /> : "Resend"}
      </button>
    </DialogContent>
  </Dialog>;
};

export default RecentOtpOptionButton;

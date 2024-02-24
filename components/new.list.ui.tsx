import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StrategyFormData } from "@/lib/strategy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NewStrategyUIProps {
  onSubmit: (data: string) => void;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewListUI: React.FC<NewStrategyUIProps> = ({
  onSubmit,
  setIsDialogOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<StrategyFormData>();

  return (
    <form
      onSubmit={() => {
        console.log("submit clicked");

        handleSubmit(onSubmit);
      }}
      className="space-y-6"
    >
      <Input placeholder="Name of the List" {...register("")} />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Add List</Button>
      </DialogFooter>
    </form>
  );
};

export default NewListUI;

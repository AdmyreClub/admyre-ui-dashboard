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

  // Define the function that should be called when the form is submitted
  const handleFormSubmit = (data: StrategyFormData) => {
    console.log("clicked");
    
    onSubmit(data.strategyName); // Pass the strategyName to the onSubmit prop
    setIsDialogOpen(false); // Optionally close the dialog upon submission
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} // Correctly use handleSubmit here
      className="space-y-6"
    >
      <Input placeholder="Name of the List" {...register("strategyName")} />
      {/* Show errors if any */}
      {errors.strategyName && <p className="text-red-500">{errors.strategyName.message}</p>}

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

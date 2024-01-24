import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { StrategyFormData } from '@/lib/strategy';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


  interface NewStrategyUIProps {
    onSubmit: (data: StrategyFormData) => void;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const NewStrategyUI: React.FC<NewStrategyUIProps> = ({ onSubmit, setIsDialogOpen }) => {
    const { register, handleSubmit, formState: { errors } } = useFormContext<StrategyFormData>();

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          placeholder="Name of the Strategy"
          {...register("strategyName")}
        />
        {errors.strategyName && <p className="text-red-500">{errors.strategyName.message}</p>}

        <Input
          placeholder="Describe your strategy (Optional)"
          {...register("description")}
        />

        <Label>I want to add influencers by</Label>
        <RadioGroup className='flex flex-col'>
          <div className='flex gap-2'>
            <RadioGroupItem value="manual" {...register("addInfluencersBy")} />
            <Label>Adding Influencers Manually</Label>
          </div>
          <div className='flex gap-2'>
            <RadioGroupItem value="search" {...register("addInfluencersBy")} />
            <Label>Searching Influencers From Database</Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Create Strategy</Button>
        </DialogFooter>
      </form>
    );
  };

  export default NewStrategyUI;

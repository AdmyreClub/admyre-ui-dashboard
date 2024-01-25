import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { document } from "postcss";
import { Separator } from "@/components/ui/separator";
const schema = z.object({
  gender: z.enum(["male", "female", "others"]),
});

interface ChildProps {
  onDataFromChild: (data: string) => void;
  defaultVal: string;
}

const GenderForm: React.FC = ({ onDataFromChild, defaultVal }: ChildProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
     gender: defaultVal
    },
    resolver: zodResolver(schema),
  });
  const [selectedGender, setSelectedGender] = React.useState(null);

  const onSubmit = (data:string) => {
    console.log(data);
    // Handle form submission logic here
  };
  const handleUncheck = () => {
    setValue("gender", null); // Set the value to null to uncheck the radio button
    setSelectedGender(null);
    onDataFromChild(null) // Update the local state
  };

  const { gender } = watch();

  const sendDataToParent = () => {
    // Send data to the parent component using the callback function
    onDataFromChild(gender);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="font-medium leading-none mb-2">Gender</label>
        <p className="text-sm text-muted-foreground mb-4">
            Apply Gender Filters 💀
          </p>
        <div>
          <RadioGroup
            className="mt-3 text-slate-700 font-light flex"
            value={selectedGender ?? register("gender").value}
            onValueChange={(value) => {
              setValue("gender", value);
              setSelectedGender(value);
            }}
          >
            <Label>Male</Label>
            <RadioGroupItem value="MALE"   {...register("MALE")} checked={selectedGender === 'male' ? true : false}/>
            <Separator orientation="vertical"/>
            <Label>Female</Label>
            <RadioGroupItem value="FEMALE"  {...register("FEMALE")} checked={selectedGender === 'female' ? true : false}/>
            <Separator orientation="vertical"/>
            <Label>Others</Label>
            <RadioGroupItem value=""   {...register("")} checked={selectedGender === 'others' ? true : false}/>
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={handleUncheck}>Clear</Button>
          <Button type="submit" onClick={sendDataToParent}>Apply</Button>
        </div>
    </form>
  );
};

export default GenderForm;

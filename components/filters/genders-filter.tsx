import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { document } from "postcss";
const schema = z.object({
  gender: z.enum(["male", "female", "others"]),
});

const GenderForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [selectedGender, setSelectedGender] = React.useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };
  const handleUncheck = () => {
    setValue("gender", null); // Set the value to null to uncheck the radio button
    setSelectedGender(null); // Update the local state
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Gender:</label>
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
            <RadioGroupItem value="male"   {...register("male")} checked={selectedGender === 'male' ? true : false}/>
            <Label>Female</Label>
            <RadioGroupItem value="female"  {...register("female")} checked={selectedGender === 'female' ? true : false}/>
            <Label>Others</Label>
            <RadioGroupItem value="others"   {...register("others")} checked={selectedGender === 'others' ? true : false}/>
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={handleUncheck}>Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
    </form>
  );
};

export default GenderForm;

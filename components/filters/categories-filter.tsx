import React, { useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const schema = z.object({
  multiSelect: z
    .array(z.string())
    .refine((data) => data.length > 0, {
      message: "Please select at least one option",
    }),
});

type FormData = z.infer<typeof schema>;

const CategoriesFormUI: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const options = [
    "Lifestyle",
    "Gadgets & Tech",
    "Beauty",
    "Fashion",
    "Travel",
    "Sports",
    "Photography",
    "Books",
    "Decor",
    "Parenting",
    "Health",
    "Art",
    "Luxury",
    "Education",
    "Fitness",
    "Automobile",
    "Self Improvement",
    "Animal/Pet",
    "Business",
    "Food",
    "Finance",
    "Make-up",
    "Entertainment",
    "Gaming",
    "Wedding",
  ];

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission
    console.log(data);
  };

  const clearForm = () => {
    reset(); // Reset the form values
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Select multiple options:</label>

          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            {options.map((option, index) => (
              <div className="form-check" key={index}>
                <input
                  type="checkbox"
                  {...register("multiSelect", { required: true })}
                  value={option}
                  className="custom-checkbox"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? "Close Drawer" : "Open Drawer"}
          </button>


        </div>
        <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={clearForm}
          >
            Clear
          </button>

        <button type="submit" className="btn">
          Apply
        </button>

        {errors.multiSelect && (
          <div className="error-message">{errors.multiSelect.message}</div>
        )}
      </form>
    </div>
  );
};

export default CategoriesFormUI;

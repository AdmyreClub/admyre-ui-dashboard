import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z, ZodError } from 'zod';

const genderSchema = z.enum(['male', 'female', 'other']);

interface FormData {
  gender: z.infer<typeof genderSchema>;
}

const GenderForm: React.FC = () => {
  const { handleSubmit, control, setError } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await genderSchema.parseAsync(data.gender);
      console.log(data);
    } catch (error) {
      if (error instanceof ZodError) {
        setError('gender', {
          type: 'manual',
          message: 'Please select a valid gender.',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Gender:</label>
        <div>
          <Controller
            name="gender"
            control={control}
            
            rules={{ required: 'Please select a gender' }}
            render={({ field, fieldState }) => (
              <>
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={field.value === 'male'}
                    onChange={() => field.onChange('male')}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={field.value === 'female'}
                    onChange={() => field.onChange('female')}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="other"
                    checked={field.value === 'other'}
                    onChange={() => field.onChange('other')}
                  />
                  Other
                </label>
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GenderForm;
